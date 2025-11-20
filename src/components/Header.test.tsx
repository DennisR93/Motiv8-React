import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';

// Mock useTranslation
const changeLanguageMock = vi.fn();
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations: Record<string, string> = {
                'common.brandName': 'Motiv8',
                'common.nav.home': 'Home',
                'common.nav.about': 'About',
                'common.nav.training': 'Training',
                'common.nav.pricing': 'Pricing',
                'common.nav.contact': 'Contact',
            };
            return translations[key] || key;
        },
        i18n: {
            language: 'en',
            changeLanguage: changeLanguageMock,
        },
    }),
}));

describe('Header', () => {
    it('renders logo and navigation links', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        expect(screen.getByAltText('Motiv8')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('toggles mobile menu when hamburger is clicked', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const hamburger = screen.getByLabelText('Toggle menu');
        expect(hamburger).toHaveAttribute('aria-expanded', 'false');

        fireEvent.click(hamburger);
        expect(hamburger).toHaveAttribute('aria-expanded', 'true');

        fireEvent.click(hamburger);
        expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    });

    it('toggles language dropdown', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const dropdownTrigger = screen.getByText('English');
        fireEvent.click(dropdownTrigger);

        expect(screen.getByRole('listbox')).toBeInTheDocument();
        expect(screen.getByText('עברית')).toBeInTheDocument();
    });

    it('changes language when option is clicked', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const dropdownTrigger = screen.getByText('English');
        fireEvent.click(dropdownTrigger);

        const hebrewOption = screen.getByText('עברית');
        fireEvent.click(hebrewOption);

        expect(changeLanguageMock).toHaveBeenCalledWith('he');
    });
});
