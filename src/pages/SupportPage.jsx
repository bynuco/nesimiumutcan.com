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

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
            padding: '40px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        langSwitcherWrapper: {
            // Removed absolute positioning styles
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '30px',
        },
        brand: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#2dd4bf',
            fontSize: '1rem',
            fontWeight: '600',
            marginBottom: '15px',
        },
        dot: {
            width: '8px',
            height: '8px',
            background: '#2dd4bf',
            borderRadius: '50%',
            boxShadow: '0 0 10px #2dd4bf',
        },
        card: {
            backgroundColor: 'rgba(28, 28, 30, 0.6)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '600px',
            padding: '40px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            display: 'flex', // Enable flex layout for card content
            flexDirection: 'column',
        },
        backLink: {
            display: 'inline-flex',
            alignItems: 'center',
            color: 'var(--text-secondary)',
            marginTop: '40px', // increased spacing
            fontSize: '1rem',
            transition: 'color 0.2s',
            textDecoration: 'none',
            // removed alignSelf to let it center in the wrapper
        },

        appHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '30px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '24px',
        },
        appIcon: {
            width: '72px',
            height: '72px',
            borderRadius: '18px',
            backgroundColor: app?.id === 'akor-kitabi' ? '#fff' : '#333',
            padding: app?.id === 'akor-kitabi' ? '12px' : '0',
            boxSizing: 'border-box',
            objectFit: 'contain',
        },
        title: {
            fontSize: '1.8rem', // Slightly reduced from 2rem
            fontWeight: '700',
            marginBottom: '4px', // Reduced spacing
            color: '#fff',
            lineHeight: '1.2',
            marginTop: '0', // Reset default margin to fix alignment
        },
        linksContainer: {
            display: 'flex',
            gap: '10px',
            marginTop: '4px', // Reduced spacing
        },
        storeLink: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            color: '#2dd4bf',
            textDecoration: 'none',
            background: 'rgba(45, 212, 191, 0.1)',
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(45, 212, 191, 0.2)',
            transition: 'all 0.2s',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginTop: '20px',
        },
        input: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '16px',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            fontFamily: 'inherit',
            transition: 'border-color 0.2s',
        },
        textarea: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '16px',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '1rem',
            minHeight: '150px',
            resize: 'vertical',
            outline: 'none',
            fontFamily: 'inherit',
            transition: 'border-color 0.2s',
        },
        submitButton: {
            backgroundColor: '#2dd4bf',
            color: '#0f2027',
            padding: '16px',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.2s, background-color 0.2s',
            marginTop: '10px',
        }
    };

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
            <div style={styles.container}>
                <div style={styles.card}>
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
        <div style={styles.container}>
            <div style={styles.langSwitcherWrapper}>
                <div style={styles.brand}>
                    <div style={styles.dot}></div>
                    nesimiumutcan.com
                </div>
                <LanguageSwitcher />
                <Link to="/" style={styles.backLink}>← {t('backToHome')}</Link>
            </div>

            <div style={styles.card}>

                <div style={styles.appHeader}>
                    <img src={app.icon} alt={app.name} style={styles.appIcon} />
                    <div>
                        <h2 style={styles.title}>{app.name}</h2>
                        <div style={styles.linksContainer}>
                            {app.links.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={styles.storeLink}
                                >
                                    {getIcon(link.label)} {getLabel(link.label)}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '10px' }}>{t('contactUs')}</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '15px' }}>
                        {t('contactText')}
                    </p>

                    {/* Manual Email Option */}
                    <div style={{ background: 'rgba(45, 212, 191, 0.1)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(45, 212, 191, 0.2)' }}>
                        <p style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '5px' }}>
                            {t('writeYourselfText')}
                        </p>
                        <a href={`mailto:${app.supportEmail}`} style={{ color: '#2dd4bf', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.1rem' }}>✉️</span> {app.supportEmail}
                        </a>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', margin: '25px 0', color: 'rgba(255,255,255,0.2)' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'currentColor' }}></div>
                    <span style={{ padding: '0 15px', fontSize: '0.85rem', fontWeight: '600' }}>{t('or')}</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'currentColor' }}></div>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        name="name"
                        placeholder={t('namePlaceholder')}
                        value={formData.name}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                        onFocus={(e) => e.target.style.borderColor = '#2dd4bf'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder={t('emailPlaceholder')}
                        value={formData.email}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                        onFocus={(e) => e.target.style.borderColor = '#2dd4bf'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                    <textarea
                        name="message"
                        placeholder={t('messagePlaceholder')}
                        value={formData.message}
                        onChange={handleInputChange}
                        style={styles.textarea}
                        required
                        onFocus={(e) => e.target.style.borderColor = '#2dd4bf'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                    <button
                        type="submit"
                        style={styles.submitButton}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        {t('submitButton')}
                    </button>
                </form>
            </div>
        </div >
    );
};


export default SupportPage;
