import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ScrollToTop from './ScrollToTop';

// Helper component to trigger route changes
const TestComponent = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate('/new-route')}>Go to new route</button>
        </div>
    );
};

describe('ScrollToTop', () => {
    beforeEach(() => {
        // Mock window.scrollTo
        window.scrollTo = vi.fn();
    });

    it('scrolls to top when route changes', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<TestComponent />} />
                    <Route path="/new-route" element={<div>New Route</div>} />
                </Routes>
            </MemoryRouter>
        );

        // Verify initial call (optional, depending on implementation it might run on mount)
        // In our case, it runs on mount because pathname is defined.
        expect(window.scrollTo).toHaveBeenCalledWith(0, 0);

        // Reset mock to clear the initial call
        vi.mocked(window.scrollTo).mockClear();

        // Trigger route change
        const userActor = (await import('@testing-library/user-event')).default.setup();
        await userActor.click(document.querySelector('button')!);

        // Verify scroll to top was called again
        expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });
});
