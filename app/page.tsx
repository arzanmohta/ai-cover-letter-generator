"use client"

import { useState } from "react"
import CVUpload from "./components/CVUpload"
import JobInput from "./components/JobInput"
import CoverLetterPreview from "./components/CoverLetterPreview"

export default function HomePage() {
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [jobs, setJobs] = useState<string[]>([])
  const [letters, setLetters] = useState<{ job: string; content: string }[]>([])

  // Called when CV is uploaded
  const handleCvUpload = (file: File) => {
    setCvFile(file)
    console.log("Uploaded CV:", file.name)
  }

  // Called when job link is added
  const handleAddJob = (link: string) => {
    setJobs((prev) => [...prev, link])
  }

  // Simulate AI generation (replace with API call later)
  const generateLetters = async () => {
    if (!cvFile || jobs.length === 0) {
      alert("Please upload a CV and add at least one job link.")
      return
    }

    const generated = jobs.map((job, i) => ({
      job,
      content: `Generated Cover Letter ${i + 1}\n\nDear Hiring Manager,\n\nThis is a placeholder letter for the job at ${job}.`
    }))

    setLetters(generated)
  }

  // Download handler (replace with real API for PDF/DOCX)
  const handleDownload = (format: "pdf" | "docx", index: number) => {
    const letter = letters[index]
    const blob = new Blob([letter.content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `cover-letter-${index + 1}.${format === "pdf" ? "txt" : "docx"}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">AI Cover Letter Generator</h1>

      {/* Upload CV */}
      <CVUpload onUpload={handleCvUpload} />

      {/* Add job links */}
      <JobInput onAddJob={handleAddJob} />

      {/* Generate button */}
      <button
        onClick={generateLetters}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Generate Cover Letters
      </button>

      {/* Preview generated letters */}
      <CoverLetterPreview letters={letters} onDownload={handleDownload} />
    </main>
  )
}
