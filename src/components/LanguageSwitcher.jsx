import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = ({ style = {} }) => {
    const { language, setLanguage } = useLanguage();

    const languages = [
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
        { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
        { code: 'ru', label: 'Русский', flag: '🇷🇺' }
    ];

    const defaultStyles = {
        container: {
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            ...style
        },
        button: {
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            fontSize: '1.2rem',
            transition: 'all 0.2s',
            opacity: 0.7,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        active: {
            background: 'rgba(45, 212, 191, 0.3)',
            opacity: 1,
            boxShadow: '0 0 10px rgba(45, 212, 191, 0.2)',
            transform: 'scale(1.1)',
        }
    };

    return (
        <div style={defaultStyles.container}>
            {languages.map(lang => (
                <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    style={{
                        ...defaultStyles.button,
                        ...(language === lang.code ? defaultStyles.active : {})
                    }}
                    title={lang.label}
                >
                    {lang.flag}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
