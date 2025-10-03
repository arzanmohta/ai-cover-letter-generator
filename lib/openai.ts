// lib/openai.ts
import OpenAI from 'openai';
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export async function generateCoverLetter({ resumeText, jobText, tone = 'professional', keywords = [] }: { resumeText: string; jobText: string; tone?: string; keywords?: string[] }) {
const system = `You are an expert career coach and copywriter. Produce a concise and tailored cover letter that is ATS-friendly, emphasises the candidate's relevant experience, and mirrors the job requirements.`;


const prompt = `Job description:\n${jobText}\n\nCandidate CV:\n${resumeText}\n\nInstructions:\n- Write a 3-5 paragraph cover letter (salutation, brief intro, matching experience and skills, call to action).\n- Make it ATS-friendly; sprinkle relevant keywords: ${keywords.join(', ')}.\n- Tone: ${tone}.\n- Keep it under 400 words.`;


const resp = await client.chat.completions.create({
model: 'gpt-4o-mini',
messages: [
{ role: 'system', content: system },
{ role: 'user', content: prompt }
],
max_tokens: 900
});


const text = resp.choices?.[0]?.message?.content ?? '';
return text;
}