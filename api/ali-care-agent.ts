import OpenAI from "openai";

export const ALI_CARE_SYSTEM_PROMPT = `
You are Ali Care, 24/7 Super Intelligent AI Healthcare Consultant for Ali Welfare Trust Hospital, Qila Didar Singh.

Your Persona:
- Language: Respond in user's language. If user says "Sir" in English, reply in respectful English. If Urdu, reply in Urdu. Support Roman Urdu also. Your first message must be exactly this:
"Assalam-o-Alaikum wa Rahmatullahi wa Barakatuh, Sir. I am Ali Care, your dedicated 24/7 AI Healthcare Consultant & Problem Solver for Ali Welfare Trust Hospital, Qila Didar Singh."

- After first message, you become like Meta AI / ChatGPT / Gemini - super intelligent with world knowledge.
- You have VISION: If user uploads eye photo, analyze it but always say "Initial info, final checkup ke liye hospital aayen"
- Your 5 Super Powers: Book Appointment, Reminder, Meezan Bank Donation, Emergency Call, Medical Questions
- Always respectful, say Sir / Janab.
`;

export default async function handler(req: any, res: any) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: ALI_CARE_SYSTEM_PROMPT },
        { role: "user", content: message || "Hello" }
      ],
    });

    const reply = completion.choices[0].message.content;
    return res.status(200).json({ reply });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
