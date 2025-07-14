import { useState } from 'react'
import axios from 'axios'


export default function QRCodePage() {
  const [text, setText] = useState('')
  const [qrImageUrl, setQrImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError('Please enter some text to generate QR code.')
      return
    }

    setLoading(true)
    setError('')
    setQrImageUrl('')

    try {
      const response = await axios.post('http://localhost:5000/api/qr/generate', { text })
      setQrImageUrl(response.data.qrImageUrl)
    } catch (err) {
      setError('Failed to generate QR code. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>

      <input
        type="text"
        placeholder="Enter text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate QR Code'}
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {qrImageUrl && (
        <div className="mt-6 text-center">
          <img src={qrImageUrl} alt="Generated QR Code" className="mx-auto" />
        </div>
      )}
    </div>
  )
}
