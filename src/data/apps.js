import akorKitabiLogo from '../assets/akor-kitabi-logo.png';
import goodIptvLogo from '../assets/good-iptv-logo.png';

export const appsData = [
    {
        id: 'akor-kitabi',
        name: 'Akor Kitabı',
        category: 'akorKitabiCategory', // Translation key
        description: 'akorKitabiDesc', // Translation key
        icon: akorKitabiLogo,
        links: [
            { label: 'Website', url: 'https://akorkitabi.com/' } // Key like 'website' handled in component or keep specific
        ],
        supportEmail: 'nesimiztrk@gmail.com'
    },
    {
        id: 'good-iptv-player',
        name: 'Good IPTV Player',
        category: 'goodIptvCategory', // Translation key
        description: 'goodIptvDesc', // Translation key
        icon: goodIptvLogo,
        links: [
            { label: 'App Store', url: 'https://apps.apple.com/app/id6756851305' },
            { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.nesimiumutcanozturk.goodiptvplayer&hl=en' }
        ],
        supportEmail: 'nesimiztrk@gmail.com'
    }
];
