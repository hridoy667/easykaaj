import { useState } from 'react'
import axios from 'axios'

export default function QRMaker() {
  const [text, setText] = useState('')
  const [qrUrl, setQrUrl] = useState('')

  const handleGenerate = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/qr/generate', { text })
      setQrUrl(res.data.qrImageUrl)
    } catch (err) {
      alert('QR code generation failed.')
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto mt-10 text-center">
      <h2 className="text-2xl font-bold mb-4">QR Code Generator</h2>
      <input
        type="text"
        placeholder="Enter text or link"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Generate QR
      </button>

      {qrUrl && (
        <div className="mt-6">
          <img src={qrUrl} alt="Generated QR Code" className="mx-auto" />
          <a
            href={qrUrl}
            download="qr.png"
            className="mt-2 inline-block text-blue-600 underline"
          >
            Download QR
          </a>
        </div>
      )}
    </div>
  )
}
