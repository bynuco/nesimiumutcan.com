import React from 'react';
import { Link } from 'react-router-dom';
import { FaGooglePlay, FaAppStoreIos, FaGlobe, FaHeadset } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const AppCard = ({ app }) => {
    const { t } = useLanguage();

    const styles = {
        card: {
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            webkitBackdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            position: 'relative',
            overflow: 'hidden',
        },
        header: {
            display: 'flex',
            gap: '20px',
            alignItems: 'center', // Center vertically with text
        },
        icon: {
            width: '72px', // Reduced from 88px
            height: '72px',
            borderRadius: '18px',
            backgroundColor: app.id === 'akor-kitabi' ? '#fff' : 'transparent',
            padding: app.id === 'akor-kitabi' ? '12px' : '0', // Increased to 24px to significantly shrink visual size
            boxSizing: 'border-box', // Ensure padding doesn't affect total width
            objectFit: 'contain',
            flexShrink: 0,
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        },
        info: {
            flex: 1,
            // Removed paddingTop to let flex align-items: center handle it
        },
        name: {
            fontSize: '1.5rem', // Slightly larger to balance
            fontWeight: '700',
            margin: '0 0 4px 0',
            color: '#fff',
            letterSpacing: '-0.5px',
        },
        category: {
            fontSize: '0.9rem',
            color: '#2dd4bf',
            margin: 0,
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '1px',
        },
        description: {
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: '1.6',
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
        },
        actions: {
            display: 'flex',
            gap: '12px',
            marginTop: 'auto',
            flexWrap: 'wrap',
        },
        button: {
            padding: '12px 20px',
            borderRadius: '14px',
            fontSize: '0.9rem',
            fontWeight: '600',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s',
            cursor: 'pointer',
            border: 'none',
            flexGrow: 1, // Distribute space evenly
            flexBasis: '0', // Force equal width
            minWidth: '140px', // Prevent too small buttons
            textAlign: 'center',
        },
        primaryButton: {
            background: '#fff',
            color: '#000',
        },
        supportButton: {
            background: 'rgba(45, 212, 191, 0.1)',
            color: '#2dd4bf',
            border: '1px solid rgba(45, 212, 191, 0.3)',
            width: '100%',
            // Removed marginTop to align better in flex container if wrapped, 
            // but if we want it separate row, we can keep it or manage via grid/flex
            flexBasis: '100%', // Make support button full width on new row
        }
    };

    const getIcon = (label) => {
        if (label.includes('Google Play')) return <FaGooglePlay />;
        if (label.includes('App Store')) return <FaAppStoreIos size={18} />;
        if (label.includes('Web') || label.includes('Website')) return <FaGlobe />;
        return <FaGlobe />;
    };

    // Helper to translate label if key exists, else return label
    const getLabel = (label) => {
        const key = label.toLowerCase();
        // Check if a translation exists for the lowercase label, e.g., 'website'
        // If not, return original label (e.g. 'Google Play', 'App Store')
        // We can access translations object directly or try t(key) and check if it returns key
        // A simple heuristic: t(key) returns translation or key.
        // However, t('Google Play') returns 'Google Play' if not found, which is correct.
        // But t('Website') might fail if key is 'website'.
        return t(key) !== key ? t(key) : label;
    };

    const PrimaryButton = ({ label, url }) => (
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ ...styles.button, ...styles.primaryButton }}>
            {getIcon(label)}
            {getLabel(label)}
        </a>
    );

    return (
        <div
            style={styles.card}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
            }}
        >
            <div style={styles.header}>
                <img src={app.icon} alt={app.name} style={styles.icon} />
                <div style={styles.info}>
                    <h3 style={styles.name}>{app.name}</h3>
                    <p style={styles.category}>{t(app.category)}</p>
                </div>
            </div>
            <p style={styles.description}>{t(app.description)}</p>
            <div style={styles.actions}>
                {app.links.map((link, index) => (
                    <PrimaryButton key={index} label={link.label} url={link.url} />
                ))}
                <Link
                    to={`/${app.id}/support`}
                    style={{ ...styles.button, ...styles.supportButton }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(45, 212, 191, 0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(45, 212, 191, 0.1)'}
                >
                    <FaHeadset />
                    {t('support')}
                </Link>
            </div>
        </div>
    );
};

export default AppCard;
