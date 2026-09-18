import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  MessageCircle, 
  Navigation, 
  CheckCircle, 
  ExternalLink,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('General Medical Inquiry');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      alert('Please complete all required fields.');
      return;
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setPhone('');
      setMessage('');
    }, 4000);
  };

  const getDirectWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello Ali Welfare Trust Hospital Qila Didar Singh,\n\nName: ${name || 'Patient'}\nPhone: ${phone || 'Not provided'}\nSubject: ${subject}\nMessage: ${message || 'I would like more information about your medical services.'}`
    );
    return `https://wa.me/${HOSPITAL_INFO.whatsapp}?text=${text}`;
  };

  return (
    <section id="contact" className="pt-6 sm:pt-8 pb-12 sm:pb-16 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-teal-50/70 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-50/50 rounded-full blur-3xl -z-10" />

      <div className="site-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-[#087f8c] text-xs font-bold uppercase tracking-wider mb-2.5">
            <MapPin className="w-3.5 h-3.5 text-[#087f8c]" />
            <span>24/7 Accessibility & Assistance</span>
          </div>

          <div className="font-urdu text-2xl sm:text-3xl font-bold text-[#087f8c] mb-1.5 drop-shadow-xs">
            ہسپتال کا پتہ، رابطہ اور ایمرجنسی سروسز
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#092f3a] tracking-tight">
            Contact & Hospital Location <br />
            <span className="text-[#087f8c]">Always Within Reach</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6b7f84]">
            Located conveniently on Chahal Kalan Road in Qila Didar Singh, Gujranwala with dedicated ambulance access and 24/7 triage reception.
          </p>
        </div>

        {/* High-End Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Direct Contact & Emergency Desk */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Contact Details Card */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 h-full flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-[#092f3a] mb-5">
                  Hospital Administration & Emergency
                </h3>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#087f8c] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-800 uppercase tracking-wider">Address & Campus</p>
                      <p className="text-sm sm:text-base font-extrabold text-[#092f3a]">
                        {HOSPITAL_INFO.address}
                      </p>
                      <p className="text-xs text-[#087f8c] font-bold mt-0.5">
                        Qila Didar Singh, Gujranwala District, Punjab
                      </p>
                    </div>
                  </div>

                  {/* Emergency Phone & Call Button */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-slate-800 uppercase tracking-wider">24/7 Emergency & Ambulance</p>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <a
                          href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
                          className="text-base sm:text-lg font-mono font-black text-rose-700 hover:text-rose-800 underline"
                        >
                          {HOSPITAL_INFO.emergencyPhone}
                        </a>
                        <a
                          href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
                          className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-black flex items-center gap-1 shadow-sm transition-transform active:scale-95"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call Emergency</span>
                        </a>
                      </div>
                      <p className="text-xs text-slate-700 font-medium mt-1">
                        Direct line to 24/7 Emergency Trauma & Triage Ward
                      </p>
                    </div>
                  </div>

                  {/* General Helpline & Booking */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#087f8c] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-slate-800 uppercase tracking-wider">Helpline & Specialist OPD Desk</p>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <a
                          href={`tel:${HOSPITAL_INFO.phone}`}
                          className="text-base sm:text-lg font-mono font-black text-[#092f3a] hover:text-[#087f8c] underline"
                        >
                          {HOSPITAL_INFO.phone}
                        </a>
                        <a
                          href={`tel:${HOSPITAL_INFO.phone}`}
                          className="px-3 py-1 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call Desk</span>
                        </a>
                      </div>
                      <p className="text-xs text-slate-700 font-medium mt-1">
                        For OPD appointments, diagnostic tests & general inquiries
                      </p>
                    </div>
                  </div>

                  {/* OPD Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-800 uppercase tracking-wider">Operating Hours</p>
                      <p className="text-sm font-extrabold text-[#092f3a]">
                        Emergency & Dialysis: <span className="text-[#087f8c] font-black">24 Hours / 7 Days</span>
                      </p>
                      <p className="text-xs text-slate-700 font-semibold mt-0.5">
                        Specialist OPD Clinics: 9:00 AM – 2:00 PM & 5:00 PM – 9:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* Campus Patient Amenities Pills */}
                <div className="mt-5 pt-4 border-t border-slate-200/80">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Key On-Site Amenities & Accreditations
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 bg-white p-2 rounded-xl border border-slate-200/60 shadow-2xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#087f8c] shrink-0" />
                      <span className="font-semibold text-[11.5px]">Free Patient Parking</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700 bg-white p-2 rounded-xl border border-slate-200/60 shadow-2xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#087f8c] shrink-0" />
                      <span className="font-semibold text-[11.5px]">Wheelchair Accessible</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700 bg-white p-2 rounded-xl border border-slate-200/60 shadow-2xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#087f8c] shrink-0" />
                      <span className="font-semibold text-[11.5px]">24/7 Power Generator</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700 bg-white p-2 rounded-xl border border-slate-200/60 shadow-2xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#087f8c] shrink-0" />
                      <span className="font-semibold text-[11.5px]">On-Site Pharmacy</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Actions: Call + WhatsApp + Directions */}
              <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center gap-2.5">
                <a
                  href={`tel:${HOSPITAL_INFO.phone}`}
                  className="px-4 py-2.5 rounded-xl bg-[#087f8c] hover:bg-[#045d67] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Hospital: {HOSPITAL_INFO.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${HOSPITAL_INFO.whatsapp}?text=Hello%20Ali%20Welfare%20Trust%20Hospital%20Qila%20Didar%20Singh`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#0d8b85] hover:bg-[#045d67] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Helpdesk</span>
                </a>

                <a
                  href="https://maps.google.com/?q=Ali+Welfare+Trust+Hospital+Qila+Didar+Singh+Gujranwala"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-[#092f3a] text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[#087f8c]" />
                  <span>Directions</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry / Patient Feedback Form */}
          <div
            className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl flex flex-col justify-between relative"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#087f8c]">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#092f3a]">
                    Patient Assistance & Inquiries
                  </h3>
                  <p className="text-xs text-[#6b7f84]">
                    Have questions regarding treatments, donations, or free healthcare assistance?
                  </p>
                </div>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center bg-teal-50 rounded-2xl border border-teal-200 p-6">
                  <CheckCircle className="w-12 h-12 text-[#087f8c] mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-[#092f3a] mb-1">
                    Inquiry Transmitted Successfully
                  </h4>
                  <p className="text-xs text-[#087f8c] font-medium">
                    Thank you! Our hospital helpdesk will review your message and contact your phone number shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#092f3a] mb-1">
                      Subject / Concern *
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-[#092f3a] focus:outline-none focus:border-[#087f8c]"
                    >
                      <option value="General Medical Inquiry">General Medical Inquiry</option>
                      <option value="Kidney Dialysis Registration">Kidney Dialysis Registration</option>
                      <option value="Free Eye Cataract Camp">Free Eye Cataract Camp Information</option>
                      <option value="Donation Verification (Meezan Bank)">Donation Verification (Meezan Bank)</option>
                      <option value="Free Zakat Patient Assistance">Free Zakat Patient Assistance Application</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#092f3a] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariq Mehmood"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-[#092f3a] focus:outline-none focus:border-[#087f8c]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#092f3a] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0300-1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-[#092f3a] focus:outline-none focus:border-[#087f8c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#092f3a] mb-1">
                      Message / Medical History Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please write your questions or details here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-[#092f3a] focus:outline-none focus:border-[#087f8c]"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:w-1/2 py-3 rounded-xl bg-[#087f8c] hover:bg-[#045d67] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </button>

                    <a
                      href={getDirectWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-1/2 py-3 rounded-xl bg-[#0d8b85] hover:bg-[#045d67] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send Direct on WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>

            <p className="text-[11px] text-[#6b7f84] mt-6 text-center">
              All communications are strictly confidential under hospital medical privacy protocols.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
