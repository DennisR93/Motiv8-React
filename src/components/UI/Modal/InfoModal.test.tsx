import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InfoModal from './InfoModal';

describe('InfoModal', () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
        title: 'Test Title',
        text: 'Test Message',
    };

    it('renders nothing when not open', () => {
        const { container } = render(<InfoModal {...defaultProps} isOpen={false} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('renders content when open', () => {
        render(<InfoModal {...defaultProps} />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Message')).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
        render(<InfoModal {...defaultProps} />);
        const closeButton = screen.getByLabelText('Close modal');
        fireEvent.click(closeButton);
        expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('calls onClose when back button is clicked', () => {
        render(<InfoModal {...defaultProps} showBackButton={true} backButtonLabel="Back" />);
        const backButton = screen.getByText('Back');
        fireEvent.click(backButton);
        expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('calls primaryAction.onClick when primary button is clicked', () => {
        const primaryAction = {
            label: 'Confirm',
            onClick: vi.fn(),
        };
        render(<InfoModal {...defaultProps} primaryAction={primaryAction} />);

        const primaryButton = screen.getByText('Confirm');
        fireEvent.click(primaryButton);
        expect(primaryAction.onClick).toHaveBeenCalled();
    });
});
