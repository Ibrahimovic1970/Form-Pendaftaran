import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { addParticipant } from '../utils/firebase';
import { translations } from '../utils/translations';

export default function RegistrationForm({ lang = 'id', onRegister }) {
    const t = translations[lang];
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState('form');
    const [verificationCode, setVerificationCode] = useState('');
    const [inputCode, setInputCode] = useState('');

    const formRef = useRef();

    useEffect(() => {
        gsap.fromTo(formRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };
        if (name === 'name') {
            if (!value) delete newErrors.name;
            else if (value.length < 2) newErrors.name = lang === 'id' ? 'Minimal 2 karakter' : 'At least 2 characters';
            else delete newErrors.name;
        }
        if (name === 'email') {
            if (!value) delete newErrors.email;
            else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = lang === 'id' ? 'Email tidak valid' : 'Invalid email';
            else delete newErrors.email;
        }
        setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.name || formData.name.length < 2) newErrors.name = lang === 'id' ? 'Nama terlalu pendek' : 'Name too short';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = lang === 'id' ? 'Email tidak valid' : 'Invalid email';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            // ✅ Simpan ke Firestore
            await addParticipant({ name: formData.name, email: formData.email, status: 'pending' });

            // ✅ Panggil callback
            onRegister({ name: formData.name, email: formData.email, status: 'pending' });

            // Simulasi verifikasi
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            setVerificationCode(code);
            setStep('verify');
        } catch (error) {
            setErrors({ submit: 'Gagal mengirim data. Coba lagi.' });
        }
    };

    const handleVerify = () => {
        if (inputCode === verificationCode) {
            setStep('success');
            gsap.fromTo('.success', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 });
        } else {
            gsap.fromTo('#code-input', { x: -10 }, { x: 10, duration: 0.1, repeat: 5, yoyo: true });
        }
    };

    return (
        <div ref={formRef} className="container">
            <h1 className="title">{t.title}</h1>
            <p className="subtitle">{t.subtitle}</p>

            {step === 'form' && (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>{t.name}</label>
                        <div className="input-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={t.name}
                            />
                        </div>
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    <div className="form-group">
                        <label>{t.email}</label>
                        <div className="input-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={t.email}
                            />
                        </div>
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    {errors.submit && <p className="error">{errors.submit}</p>}

                    <button type="submit">
                        {t.register}
                    </button>
                </form>
            )}

            {step === 'verify' && (
                <div className="mt-6 p-5 border border-blue-200 rounded-lg bg-blue-50">
                    <p className="text-sm text-blue-800 mb-3">
                        {t.codeSent} <strong>{formData.email}</strong>
                    </p>
                    <input
                        id="code-input"
                        type="text"
                        placeholder={t.enterCode}
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="w-full px-3 py-2 border border-blue-300 rounded text-center text-lg tracking-widest"
                        maxLength="6"
                    />
                    <button onClick={handleVerify} className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold">
                        {t.verify}
                    </button>
                </div>
            )}

            {step === 'success' && (
                <div className="success">
                    <div className="flex justify-center mb-2">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <p>{t.success}</p>
                    <p className="text-sm mt-1">{t.thankYou}</p>
                </div>
            )}
        </div>
    );
}