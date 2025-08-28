// src/utils/resend.js
// Karena CORS, kita gunakan proxy untuk kirim email
const sendEmailProxy = async (email, name, subject, html) => {
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name, subject, html }),
        });

        if (!response.ok) {
            throw new Error('Gagal kirim email');
        }

        const result = await response.json();
        console.log('📧 Email terkirim:', result);
    } catch (error) {
        console.error('Gagal kirim email:', error);
        throw error;
    }
};

export const sendVerificationEmail = async (email, name) => {
    const html = `
    <h2>Halo ${name},</h2>
    <p>Kode verifikasi Anda: <strong>123456</strong></p>
    <p>Silakan masukkan kode ini di formulir pendaftaran.</p>
    <p>Terima kasih!</p>
  `;
    await sendEmailProxy(email, name, 'Kode Verifikasi Pendaftaran', html);
};

export const sendWelcomeEmail = async (email, name) => {
    const html = `
    <h2>Selamat, ${name}!</h2>
    <p>Anda telah berhasil terdaftar. Terima kasih!</p>
    <p>Kami akan menghubungi Anda segera.</p>
  `;
    await sendEmailProxy(email, name, 'Selamat! Anda Telah Terdaftar', html);
};