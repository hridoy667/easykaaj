import { useState } from 'react'
import axios from 'axios'

export default function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [qrUrl, setQrUrl] = useState(null)

  const generateQR = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/qr', { text })
      setQrUrl(res.data.qrImageUrl)
    } catch (err) {
      alert('QR generation failed')
      console.error(err)
    }
  }

  return (
    <div className="text-center space-y-4">
      <input
        type="text"
        placeholder="Enter text or URL"
        className="px-4 py-2 border rounded-md w-full max-w-md"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button
        onClick={generateQR}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Generate QR
      </button>

      {qrUrl && (
        <div className="mt-6">
          <img src={qrUrl} alt="Generated QR Code" className="mx-auto" />
          <p className="text-gray-600 mt-2">QR for: {text}</p>
        </div>
      )}
    </div>
  )
}
