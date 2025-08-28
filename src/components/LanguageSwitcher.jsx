import React from 'react';

export default function LanguageSwitcher({ lang, setLang }) {
    return (
        <div className="lang-switcher">
            <button
                className={lang === 'id' ? 'active' : ''}
                onClick={() => setLang('id')}
            >
                ID
            </button>
            <button
                className={lang === 'en' ? 'active' : ''}
                onClick={() => setLang('en')}
            >
                EN
            </button>
        </div>
    );
}