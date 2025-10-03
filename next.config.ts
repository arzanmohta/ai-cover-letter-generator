import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  api: {
    bodyParser: false, // required for file uploads (formidable, busboy, etc.)
  },
}

export default nextConfig
