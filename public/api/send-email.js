// public/api/send-email.js
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { email, name, subject, html } = req.body;

    try {
        const response = await axios.post(
            'https://api.resend.com/emails',
            {
                from: 'Pendaftaran <onboarding@yourdomain.com>',
                to: [email],
                subject,
                html,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer re_1234567890abcdef`,
                },
            }
        );

        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});