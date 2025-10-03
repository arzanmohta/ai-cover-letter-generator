// app/api/generate/route.ts
import { NextResponse } from 'next/server';
import { generateCoverLetter } from '../../../lib/openai';
import { generateDocxBuffer } from '../../../lib/docxGenerator';


export async function POST(req: Request) {
const body = await req.json();
const { resumeText, jobTexts, tone = 'professional', exportType = 'docx' } = body;


if (!resumeText || !jobTexts || !Array.isArray(jobTexts)) {
return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
}


const results: { jobText: string; coverLetter: string; filename?: string; docxBase64?: string }[] = [];


for (let i = 0; i < jobTexts.length; i++) {
const jobText = jobTexts[i];
const cl = await generateCoverLetter({ resumeText, jobText, tone });


const filename = `cover-letter-${i + 1}.docx`;
if (exportType === 'docx') {
const buffer = await generateDocxBuffer(filename, cl);
const base64 = buffer.toString('base64');
results.push({ jobText, coverLetter: cl, filename, docxBase64: base64 });
} else {
// for PDF: return the HTML/text and let the client convert OR use Puppeteer server-side (not implemented here)
results.push({ jobText, coverLetter: cl, filename });
}
}


return NextResponse.json({ results });
}