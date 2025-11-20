import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Layout from './Layout';

// Mock Header and Footer to simplify testing
vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>,
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>,
}));

describe('Layout', () => {
    it('renders header, footer, and outlet content', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<div data-testid="page-content">Page Content</div>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
        expect(screen.getByTestId('page-content')).toBeInTheDocument();
    });
});
