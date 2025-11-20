import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Footer from './Footer';

// Mock useTranslation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations: Record<string, string> = {
                'common.footer.privacy': 'Privacy Policy',
                'common.footer.accessibility': 'Accessibility',
                'common.brandName': 'Motiv8',
                'common.footer.rights': 'All rights reserved',
            };
            return translations[key] || key;
        },
    }),
}));

describe('Footer', () => {
    it('renders footer links correctly', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
        expect(screen.getByText('Accessibility')).toBeInTheDocument();
    });

    it('renders copyright text with current year', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        const year = new Date().getFullYear();
        expect(screen.getByText((content) => content.includes(`© ${year} Motiv8`))).toBeInTheDocument();
        expect(screen.getByText((content) => content.includes('All rights reserved'))).toBeInTheDocument();
    });
});
