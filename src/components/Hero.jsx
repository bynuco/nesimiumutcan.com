import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Hero = () => {
    const { t } = useLanguage();

    const styles = {
        container: {
            padding: '120px 20px 80px',
            textAlign: 'center',
            maxWidth: '1000px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
        },
        bgGlow: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(45, 212, 191, 0.15) 0%, rgba(0,0,0,0) 70%)',
            zIndex: -1,
            pointerEvents: 'none',
        },
        brand: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#2dd4bf', // Teal text color
            fontSize: '1rem',
            fontWeight: '600',
            marginBottom: '20px', // Reduced margin
        },
        dot: {
            width: '8px',
            height: '8px',
            background: '#2dd4bf',
            borderRadius: '50%',
            boxShadow: '0 0 10px #2dd4bf',
        },
        title: {
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: '800',
            marginBottom: '30px',
            color: '#fff',
            lineHeight: '1.1',
            letterSpacing: '-1px',
        },
        highlight: {
            background: 'linear-gradient(135deg, #2dd4bf 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        },
        subtitle: {
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: '1.8',
            maxWidth: '700px',
            margin: '0 auto 50px',
            fontWeight: '400',
        },
        contactButton: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'linear-gradient(135deg, #2dd4bf 0%, #0891b2 100%)',
            color: '#fff',
            padding: '18px 40px',
            borderRadius: '50px',
            fontWeight: '700',
            fontSize: '1.2rem',
            textDecoration: 'none',
            marginBottom: '40px',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 30px rgba(45, 212, 191, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.bgGlow}></div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
                <div style={styles.brand}>
                    <div style={styles.dot}></div>
                    nesimiumutcan.com
                </div>
                {/* Language Switcher placed here as requested */}
                <LanguageSwitcher />
            </div>

            <h1 style={styles.title}>
                {t('heroTitleStart')} <br />
                <span style={styles.highlight}>{t('heroTitleEnd')}</span>
            </h1>

            <p style={styles.subtitle}>
                {t('heroSubtitle')}
            </p>

            <a href="mailto:nesimiztrk@gmail.com"
                style={styles.contactButton}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(45, 212, 191, 0.5)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(45, 212, 191, 0.4)';
                }}
            >
                <FaPaperPlane />
                {t('contactButton')}
            </a>
        </div>
    );
};

export default Hero;
