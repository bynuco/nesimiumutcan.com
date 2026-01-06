import React from 'react';
import AppCard from './AppCard';
import { appsData } from '../data/apps';

const AppShowcase = () => {
    return (
        <div className="showcase-container">
            <div className="showcase-grid">
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
