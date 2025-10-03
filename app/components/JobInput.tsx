"use client"

import { useState } from "react"

interface JobInputProps {
  onAddJob: (link: string) => void
}

export default function JobInput({ onAddJob }: JobInputProps) {
  const [jobLink, setJobLink] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (jobLink.trim() !== "") {
      onAddJob(jobLink)
      setJobLink("")
    }
  }

  return (
    <div className="p-4 border rounded-2xl shadow-sm bg-white mt-4">
      <h2 className="text-lg font-semibold mb-2">Add Job Application Link</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="url"
          value={jobLink}
          onChange={(e) => setJobLink(e.target.value)}
          placeholder="Paste job URL here..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>
    </div>
  )
}
