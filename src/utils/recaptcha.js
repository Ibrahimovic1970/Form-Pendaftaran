// src/utils/recaptcha.js
export const executeRecaptcha = () => {
    return new Promise((resolve) => {
        // Simulasi reCAPTCHA v3
        setTimeout(() => {
            const token = 'recaptcha-token-' + Math.random();
            console.log('✅ reCAPTCHA berhasil:', token);
            resolve(token);
        }, 500);
    });
};