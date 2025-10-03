"use client"

import { useState } from "react"

interface CVUploadProps {
  onUpload: (file: File) => void
}

export default function CVUpload({ onUpload }: CVUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFileName(file.name)
      onUpload(file)
    }
  }

  return (
    <div className="p-4 border rounded-2xl shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-2">Upload Your CV</h2>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-600 file:text-white
                   hover:file:bg-blue-700"
      />
      {fileName && (
        <p className="mt-2 text-sm text-gray-500">Uploaded: {fileName}</p>
      )}
    </div>
  )
}
