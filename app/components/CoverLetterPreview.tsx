"use client"

import { useState } from "react"

interface CoverLetterPreviewProps {
  letters: { job: string; content: string }[]
  onDownload: (format: "pdf" | "docx", index: number) => void
}

export default function CoverLetterPreview({
  letters,
  onDownload,
}: CoverLetterPreviewProps) {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="p-4 border rounded-2xl shadow-sm bg-white mt-4">
      <h2 className="text-lg font-semibold mb-2">Generated Cover Letters</h2>
      {letters.length === 0 ? (
        <p className="text-sm text-gray-500">No cover letters generated yet.</p>
      ) : (
        <ul className="space-y-4">
          {letters.map((letter, i) => (
            <li
              key={i}
              className={`p-3 border rounded-lg cursor-pointer transition ${
                selected === i ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => setSelected(i)}
            >
              <h3 className="font-semibold text-blue-600">
                For Job {i + 1}: {letter.job}
              </h3>
              {selected === i && (
                <div className="mt-2">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700">
                    {letter.content}
                  </pre>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => onDownload("pdf", i)}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Download PDF
                    </button>
                    <button
                      onClick={() => onDownload("docx", i)}
                      className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Download DOCX
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
