import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect, vi } from 'vitest';
import SEO from './SEO';

// Mock useTranslation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            if (key === 'common.brandName') return 'Motiv8';
            if (key === 'home.hero.subtitle') return 'Default Description';
            return key;
        },
    }),
}));

describe('SEO', () => {
    it('updates document title', async () => {
        render(
            <HelmetProvider>
                <SEO title="Test Page" />
            </HelmetProvider>
        );

        await waitFor(() => {
            expect(document.title).toBe('Test Page | Motiv8');
        });
    });

    it('sets meta description', async () => {
        render(
            <HelmetProvider>
                <SEO title="Test Page" description="Custom Description" />
            </HelmetProvider>
        );

        await waitFor(() => {
            const metaDescription = document.querySelector('meta[name="description"]');
            expect(metaDescription).toHaveAttribute('content', 'Custom Description');
        });
    });

    it('uses default description if not provided', async () => {
        render(
            <HelmetProvider>
                <SEO title="Test Page" />
            </HelmetProvider>
        );

        await waitFor(() => {
            const metaDescription = document.querySelector('meta[name="description"]');
            expect(metaDescription).toHaveAttribute('content', 'Default Description');
        });
    });
});
