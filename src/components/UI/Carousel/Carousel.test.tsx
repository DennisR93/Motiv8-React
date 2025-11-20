import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Carousel from './Carousel';

// Mock useTranslation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations: Record<string, string> = {
                'common.prev': 'Previous',
                'common.next': 'Next',
                'common.play': 'Play',
                'common.pause': 'Pause',
            };
            return translations[key] || key;
        },
    }),
}));

describe('Carousel', () => {
    const mockItems = [
        { image: 'img1.jpg', text: 'Slide 1', alt: 'Alt 1' },
        { image: 'img2.jpg', text: 'Slide 2', alt: 'Alt 2' },
        { image: 'img3.jpg', text: 'Slide 3', alt: 'Alt 3' },
    ];

    it('renders correctly with items', () => {
        render(<Carousel items={mockItems} />);
        // Use getAllByText because "Slide 1" appears in both the placeholder and the text
        expect(screen.getAllByText('Slide 1')[0]).toBeInTheDocument();
        expect(screen.getByLabelText('Alt 1')).toBeInTheDocument();
    });

    it('renders nothing if no items provided', () => {
        const { container } = render(<Carousel items={[]} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('navigates to next slide', () => {
        render(<Carousel items={mockItems} />);

        const nextButton = screen.getByLabelText('Next');
        fireEvent.click(nextButton);

        expect(screen.getAllByText('Slide 2')[0]).toBeInTheDocument();
    });

    it('navigates to previous slide', () => {
        render(<Carousel items={mockItems} />);

        const prevButton = screen.getByLabelText('Previous');
        fireEvent.click(prevButton);

        // Should wrap around to the last slide
        expect(screen.getAllByText('Slide 3')[0]).toBeInTheDocument();
    });

    it('auto-advances slides', () => {
        vi.useFakeTimers();
        render(<Carousel items={mockItems} />);

        act(() => {
            vi.advanceTimersByTime(5000);
        });

        expect(screen.getAllByText('Slide 2')[0]).toBeInTheDocument();
        vi.useRealTimers();
    });

    it('pauses auto-advance when pause button is clicked', () => {
        vi.useFakeTimers();
        render(<Carousel items={mockItems} />);

        const pauseButton = screen.getByLabelText('Pause');
        fireEvent.click(pauseButton);

        act(() => {
            vi.advanceTimersByTime(5000);
        });

        // Should stay on the first slide
        expect(screen.getAllByText('Slide 1')[0]).toBeInTheDocument();
        expect(screen.getByLabelText('Play')).toBeInTheDocument();
        vi.useRealTimers();
    });
});
