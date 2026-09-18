import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Phone, 
  Calendar, 
  Heart, 
  MapPin, 
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  ExternalLink,
  MessageSquare,
  Clock,
  CheckCircle2,
  Globe,
  Bell,
  Stethoscope,
  PhoneCall
} from 'lucide-react';
import { HOSPITAL_INFO, BANK_DETAILS } from '../data/hospitalData';
import { useHospitalContent } from '../context/HospitalContentContext';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  urdu?: string;
  sources?: Array<{ title?: string; uri: string }>;
  actions?: Array<{
    label: string;
    action: () => void;
  }>;
}

interface HospitalAIAgentProps {
  onOpenBooking: (deptId?: string, docId?: string) => void;
  onOpenDonation: () => void;
}

export const HospitalAIAgent: React.FC<HospitalAIAgentProps> = ({
  onOpenBooking,
  onOpenDonation
}) => {
  const { content } = useHospitalContent();
  const aiSettings = content?.aiSettings;
  const emergencyPhone = content?.header?.emergencyPhone || HOSPITAL_INFO.emergencyPhone;
  const helplinePhone = content?.header?.helpline || HOSPITAL_INFO.helpline;

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const defaultWelcomeEnglish = 
    "Assalam-o-Alaikum wa Rahmatullahi wa Barakatuh, Sir. I am Ali Care, your dedicated 24/7 AI Healthcare Consultant & Problem Solver for Ali Welfare Trust Hospital, Qila Didar Singh.\n\nRespected Sir, I can book an appointment with our specialist doctors, provide appointment reminder guidelines, guide your Meezan Bank Zakat & Sadqah donations, answer any medical question with live internet intelligence, or connect an immediate call. How may I serve you today, Sir?";
  
  const defaultWelcomeUrdu =
    "السلام علیکم محترم جناب! میں علی کیئر ہوں، علی ویلفیئر ٹرسٹ ہسپتال قلعہ دیدار سنگھ کا 24/7 ذہین معاون۔ فرمائیے سر، میں آپ کے لیے ڈاکٹر کی اپائنٹمنٹ، یاد دہانی، عطیات یا طبی معلومات میں کس طرح خدمت کر سکتا ہوں؟";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: defaultWelcomeEnglish,
      urdu: defaultWelcomeUrdu,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { label: "Book Specialist Doctor", action: () => onOpenBooking() },
        { label: "Patient Appointment Reminder", action: () => handleSend("Can you provide an appointment reminder and guidelines for patients visiting Ali Welfare Trust Hospital?") },
        { label: "Meezan Bank Donation Guide", action: () => handleSend("Please guide me step by step on making a donation or Zakat payment via Meezan Bank.") },
        { label: "Call Hospital Emergency Desk", action: () => { window.location.href = `tel:${emergencyPhone}`; } }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Setup Web Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInputValue(transcript);
            handleSend(transcript);
          }
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      alert("Voice recognition is not supported in this browser. Please type your message.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.warn("Speech start error:", e);
        setIsListening(false);
      }
    }
  };

  const handleSpeak = (text: string, msgId: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const quickPrompts = [
    { label: "Book Doctor", prompt: "Sir, please help me book an appointment with a specialist doctor at Ali Welfare Trust Hospital." },
    { label: "Appointment Reminder", prompt: "Sir, what are the important reminder guidelines for a patient attending an appointment at Ali Welfare Trust Hospital?" },
    { label: "Donate Guide", prompt: "Sir, could you please provide step-by-step guidance on donating Zakat or Sadqah via Meezan Bank?" },
    { label: "Free Dialysis Timings", prompt: "What are the timings and registration requirements for free kidney dialysis?" },
    { label: "Make Direct Call", prompt: "Sir, I want to call the hospital helpline right now." }
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Build chat history
    const history = messages
      .slice(-6)
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history
        })
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.reply || data.response || "Thank you for reaching out, Sir. How else may I assist you today?";
        const urduText = data.urduReply;
        const sources = data.sources;

        // Determine context-driven action buttons
        const actions: Array<{ label: string; action: () => void }> = [];
        const lowerReply = replyText.toLowerCase();

        if (lowerReply.includes('appointment') || lowerReply.includes('doctor') || lowerReply.includes('opd') || lowerReply.includes('consultation')) {
          actions.push({
            label: "Open Appointment Booking Form",
            action: () => { setIsOpen(false); onOpenBooking(); }
          });
        }
        if (lowerReply.includes('dialysis') || lowerReply.includes('kidney')) {
          actions.push({
            label: "Book Free Dialysis Consultation",
            action: () => { setIsOpen(false); onOpenBooking('dialysis'); }
          });
        }
        if (lowerReply.includes('donat') || lowerReply.includes('zakat') || lowerReply.includes('meezan') || lowerReply.includes('bank')) {
          actions.push({
            label: "View Meezan Bank Details & Slip",
            action: () => { setIsOpen(false); onOpenDonation(); }
          });
        }
        if (lowerReply.includes('call') || lowerReply.includes('emergency') || lowerReply.includes('hotline') || lowerReply.includes('helpline')) {
          actions.push({
            label: `Call Emergency: ${emergencyPhone}`,
            action: () => { window.location.href = `tel:${emergencyPhone}`; }
          });
          actions.push({
            label: `Call Helpline: ${helplinePhone}`,
            action: () => { window.location.href = `tel:${helplinePhone}`; }
          });
        }

        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: replyText,
          urdu: urduText,
          sources: sources && sources.length > 0 ? sources : undefined,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions: actions.length > 0 ? actions : undefined
        };

        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error("Server error");
      }
    } catch {
      // Intelligent fallback when offline
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Peace be upon you, Sir. I am Ali Care. Ali Welfare Trust Hospital Qila Didar Singh is ready to serve you 24/7:\n• Emergency Hotline: ${emergencyPhone}\n• General Helpline: ${helplinePhone}\n• 100% Free Kidney Dialysis & Ophthalmology\n• Campus Location: Chahal Kalan Road, Qila Didar Singh, Gujranwala\n\nHow can I serve you today, Sir?`,
        urdu: `السلام علیکم محترم جناب! علی ویلفیئر ٹرسٹ ہسپتال قلعہ دیدار سنگھ 24/7 آپ کی خدمت کے لیے تیار ہے۔ ایمرجنسی ہاٹ لائن: ${emergencyPhone}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          { label: "Book Appointment Form", action: () => { setIsOpen(false); onOpenBooking(); } },
          { label: "Donate via Meezan Bank", action: () => { setIsOpen(false); onOpenDonation(); } },
          { label: `Direct Call: ${emergencyPhone}`, action: () => { window.location.href = `tel:${emergencyPhone}`; } }
        ]
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Ali Care AI Agent Trigger Button */}
      {/* Positioned cleanly on bottom-left to prevent any overlap with the call/donate buttons on bottom-right */}
      <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group px-4 py-3 rounded-full bg-gradient-to-r from-[#092f3a] via-[#087f8c] to-[#045d67] text-white shadow-2xl hover:scale-105 active:scale-98 transition-all duration-200 cursor-pointer flex items-center gap-3 border-2 border-teal-200/50 hover:shadow-teal-900/40"
          title="Ali Care — 24/7 Intelligent AI Agent"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-teal-400/20 border border-teal-200/40 flex items-center justify-center">
              <Bot className="w-5 h-5 text-teal-200 group-hover:scale-110 transition-transform" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#092f3a] animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#092f3a]" />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-wide text-white">Ali Care</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-bold border border-amber-300/30">AI</span>
            </div>
            <span className="text-[11px] text-teal-100 font-medium hidden sm:inline">Intelligent Assistant</span>
          </div>
        </button>
      </div>

      {/* AI Agent Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:left-6 z-50 w-full sm:w-[460px] sm:max-w-lg h-full sm:h-[630px] bg-white sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in sm:zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#092f3a] via-[#0b3b48] to-[#045d67] text-white p-4 sm:p-5 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-200 shadow-xs">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-white tracking-wide">
                    Ali Care
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online & Active
                  </span>
                </div>
                <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                  <Globe className="w-3 h-3 text-amber-300" />
                  <span>Internet-Powered Hospital & Problem Solver</span>
                </p>
                <p className="font-urdu text-xs text-amber-300 mt-0.5">
                  طبی معاون — علی ویلفیئر ٹرسٹ ہسپتال
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href={`tel:${emergencyPhone}`}
                className="p-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                title={`Direct Call: ${emergencyPhone}`}
              >
                <PhoneCall className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                  }
                  setIsOpen(false);
                }}
                className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-slate-50 border-b border-slate-200 p-2.5 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSend(qp.prompt)}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-teal-50 border border-slate-200 text-[#092f3a] text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer shadow-2xs hover:border-teal-300"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#f8fafb]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#087f8c] text-white rounded-br-none'
                      : 'bg-white text-[#092f3a] border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  
                  {msg.urdu && (
                    <p className="font-urdu text-xs sm:text-sm text-[#087f8c] font-bold mt-2 pt-2 border-t border-slate-100">
                      {msg.urdu}
                    </p>
                  )}

                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                      <span className="font-semibold text-teal-700 flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        Verified Internet Sources:
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {msg.sources.slice(0, 3).map((src, idx) => (
                          <a
                            key={idx}
                            href={src.uri}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-teal-700 hover:text-teal-900 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 hover:underline"
                          >
                            <span>{src.title || "Reference"}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
                      {msg.actions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={act.action}
                          className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#087f8c] font-bold text-xs text-left transition-colors cursor-pointer border border-teal-200 flex items-center justify-between"
                        >
                          <span>{act.label}</span>
                          <span>→</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-1 px-1">
                  <span className="text-[10px] text-[#6b7f84]">
                    {msg.time}
                  </span>
                  {msg.sender === 'bot' && (
                    <button
                      onClick={() => handleSpeak(msg.text, msg.id)}
                      className="text-[#6b7f84] hover:text-[#087f8c] transition-colors p-0.5 cursor-pointer"
                      title={speakingMsgId === msg.id ? "Stop voice audio" : "Listen via voice"}
                    >
                      {speakingMsgId === msg.id ? (
                        <VolumeX className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white px-3.5 py-2.5 rounded-xl border border-slate-200 w-fit shadow-2xs">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[11px] text-[#087f8c] font-semibold">Ali Care is searching and reasoning...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box with Voice Mic & Text-To-Speech */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex-shrink-0 ${
                  isListening
                    ? 'bg-rose-500 text-white border-rose-600 animate-pulse shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-[#092f3a] border-slate-200'
                }`}
                title={isListening ? "Listening... click to stop" : "Speak to Ali Care (Voice Input)"}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                placeholder={isListening ? "Listening to your voice..." : "Ask Ali Care anything in English or اردو..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#092f3a] focus:outline-none focus:border-[#087f8c] bg-slate-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-xl bg-[#087f8c] hover:bg-[#045d67] disabled:opacity-50 text-white transition-colors cursor-pointer shadow-sm flex-shrink-0"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
