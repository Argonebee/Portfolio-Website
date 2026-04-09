const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000
const ALLOWED_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

const messages = []

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
  }),
)
app.use(express.json())

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({
      message: 'Name, email, and message are required.',
    })
  }

  const payload = {
    id: Date.now(),
    name: String(name).trim(),
    email: String(email).trim(),
    message: String(message).trim(),
    createdAt: new Date().toISOString(),
  }

  messages.push(payload)
  console.log('New contact message:', payload)

  return res.status(201).json({
    message: 'Message received successfully.',
  })
})

app.get('/messages', (req, res) => {
  res.status(200).json({ count: messages.length, messages })
})

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
