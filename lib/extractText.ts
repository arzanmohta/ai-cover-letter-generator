// lib/extractText.ts
import fs from "fs"
const pdfParse = require("pdf-parse")
import mammoth from "mammoth"

export async function extractTextFromPdf(path: string) {
  const data = fs.readFileSync(path)
  const res = await pdfParse(data)
  return res.text
}

export async function extractTextFromDocx(path: string) {
  const buffer = fs.readFileSync(path)
  const res = await mammoth.extractRawText({ buffer })
  return res.value
}

export async function extractTextFromFile(path: string, mimeType: string) {
  if (mimeType === "application/pdf") return extractTextFromPdf(path)

  if (
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    path.endsWith(".docx")
  ) {
    return extractTextFromDocx(path)
  }

  // fallback: plain text
  return fs.readFileSync(path, "utf-8")
}
