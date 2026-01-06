import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { appsData } from '../data/apps';
import { FaGooglePlay, FaAppStoreIos, FaGlobe } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

const SupportPage = () => {
    const { appName } = useParams();
    const { t } = useLanguage();
    const app = appsData.find(a => a.id === appName);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });



    const getIcon = (label) => {
        if (label.includes('Google Play')) return <FaGooglePlay />;
        if (label.includes('App Store')) return <FaAppStoreIos />;
        return <FaGlobe />;
    };
    const getLabel = (label) => {
        const key = label.toLowerCase();
        return t(key) !== key ? t(key) : label;
    };

    if (!app) {
        return (
            <div className="support-container">
                <div className="support-card">
                    <h2 style={{ color: '#fff' }}>{t('appNotFound')}</h2>
                    <Link to="/" style={{ color: '#2dd4bf', marginTop: '20px', display: 'inline-block' }}>{t('backToHome')}</Link>
                </div>
            </div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Construct dynamic subject and body based on current language
        const subject = `${app.name} ${t('subjectPrefix')}${formData.name}`;
        const body = `${t('bodyName')}${formData.name}\n${t('bodyEmail')}${formData.email}\n\n${t('bodyMessage')}\n${formData.message}`;
        window.location.href = `mailto:${app.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className="support-container">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
                <div className="support-brand">
                    <div style={{ width: '8px', height: '8px', background: '#2dd4bf', borderRadius: '50%', boxShadow: '0 0 10px #2dd4bf' }}></div>
                    nesimiumutcan.com
                </div>
                <LanguageSwitcher />
                <Link to="/" className="support-back-link">← {t('backToHome')}</Link>
            </div>

            <div className="support-card">

                <div className="support-header">
                    <img src={app.icon} alt={app.name} className="support-app-icon" style={{ backgroundColor: app?.id === 'akor-kitabi' ? '#fff' : '#333', padding: app?.id === 'akor-kitabi' ? '12px' : '0' }} />
                    <div>
                        <h2 className="support-title">{app.name}</h2>
                        <div className="support-links-container">
                            {app.links.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="support-store-link"
                                >
                                    {getIcon(link.label)} {getLabel(link.label)}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '20px', width: '100%' }}>
                    <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '10px', marginTop: 0 }}>{t('contactUs')}</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.9rem', marginBottom: '15px', margin: '0 0 15px 0' }}>
                        {t('contactText')}
                    </p>

                    {/* Manual Email Option */}
                    <div style={{ background: 'rgba(45, 212, 191, 0.1)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(45, 212, 191, 0.2)', width: '100%', boxSizing: 'border-box' }}>
                        <p style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '5px', margin: 0 }}>
                            {t('writeYourselfText')}
                        </p>
                        <a href={`mailto:${app.supportEmail}`} style={{ color: '#2dd4bf', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', wordBreak: 'break-all', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>✉️</span> {app.supportEmail}
                        </a>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: 'rgba(255,255,255,0.2)', width: '100%' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'currentColor' }}></div>
                    <span style={{ padding: '0 12px', fontSize: '0.85rem', fontWeight: '600', flexShrink: 0 }}>{t('or')}</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'currentColor' }}></div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                    <input
                        type="text"
                        name="name"
                        placeholder={t('namePlaceholder')}
                        value={formData.name}
                        onChange={handleInputChange}
                        className="support-input"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder={t('emailPlaceholder')}
                        value={formData.email}
                        onChange={handleInputChange}
                        className="support-input"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder={t('messagePlaceholder')}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="support-textarea"
                        required
                    />
                    <button
                        type="submit"
                        className="support-submit-button"
                    >
                        {t('submitButton')}
                    </button>
                </form>
            </div>
        </div >
    );
};


export default SupportPage;
