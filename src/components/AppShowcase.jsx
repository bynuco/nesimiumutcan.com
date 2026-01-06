import React from 'react';
import AppCard from './AppCard';
import { appsData } from '../data/apps';

const AppShowcase = () => {
    const styles = {
        container: {
            padding: '0 20px 80px', // Reduced top padding
            maxWidth: '1200px',
            margin: '0 auto',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '30px',
            padding: '20px',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.grid}>
                {appsData.map(app => (
                    <AppCard
                        key={app.id}
                        app={app}
                    />
                ))}
            </div>
        </div>
    );
};

export default AppShowcase;
