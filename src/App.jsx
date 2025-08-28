import React, { useState, useEffect } from 'react';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './components/AdminDashboard';
import LanguageSwitcher from './components/LanguageSwitcher';
import './index.css';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [lang, setLang] = useState('id');

  // Load bahasa dari localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'id';
    setLang(savedLang);
  }, []);

  const handleRegister = (newUser) => {
    console.log('✅ Peserta baru:', newUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <nav className="navbar">
        <div className="logo">Pendaftaran Online</div>
        <div className="nav-links">
          <a href="#" className="nav-link active">Home</a>
          <a href="#" className="nav-link">About</a>
          <a href="#" className="nav-link">Contact</a>
        </div>
        <LanguageSwitcher lang={lang} setLang={setLang} />
      </nav>

      <div className="tab-container">
        <button
          className={`tab ${!isAdminView ? 'active' : ''}`}
          onClick={() => setIsAdminView(false)}
        >
          📝 {lang === 'id' ? 'Form Pendaftaran' : 'Registration Form'}
        </button>
        <button
          className={`tab ${isAdminView ? 'active' : ''}`}
          onClick={() => setIsAdminView(true)}
        >
          👨‍💼 {lang === 'id' ? 'Admin Dashboard' : 'Admin Dashboard'}
        </button>
      </div>

      {!isAdminView ? (
        <RegistrationForm
          lang={lang}
          onRegister={handleRegister}
        />
      ) : (
        <AdminDashboard
          lang={lang}
        />
      )}
    </div>
  );
}