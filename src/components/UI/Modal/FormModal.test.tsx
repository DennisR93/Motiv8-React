import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FormModal from './FormModal';
import * as contactService from '../../../services/contactService';

// Mock useTranslation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations: Record<string, string> = {
                'modals.form.title': 'Contact Form',
                'modals.form.subtitle': 'Fill details',
                'modals.form.labels.fullName': 'Full Name',
                'modals.form.labels.phone': 'Phone',
                'modals.form.labels.email': 'Email',
                'modals.form.labels.plan': 'Plan',
                'modals.form.labels.contactMethod': 'Contact Method',
                'modals.form.methods.whatsapp': 'WhatsApp',
                'modals.form.methods.call': 'Call',
                'modals.form.methods.email': 'Email',
                'common.send': 'Send',
                'common.sending': 'Sending...',
                'modals.form.errors.required': 'Required',
                'modals.form.errors.invalidPhone': 'Invalid Phone',
                'modals.form.errors.invalidEmail': 'Invalid Email',
                'modals.form.success.title': 'Success',
                'modals.form.success.message': 'Message sent',
                'modals.form.error.title': 'Error',
                'modals.form.error.message': 'Failed to send',
                'common.close': 'Close',
                'common.tryAgain': 'Try Again',
                'common.cancel': 'Cancel',
            };
            return translations[key] || key;
        },
    }),
}));

// Mock contactService
vi.mock('../../../services/contactService', () => ({
    submitContactForm: vi.fn(),
}));

describe('FormModal', () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
        planName: 'Basic Plan',
        planPrice: '100',
        planPeriod: 'month',
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders form fields correctly', () => {
        render(<FormModal {...defaultProps} />);

        expect(screen.getByLabelText(/Full Name/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone/)).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: /Email/ })).toBeInTheDocument();
        expect(screen.getByDisplayValue('Basic Plan - 100 / month')).toBeInTheDocument();
    });

    it('validates required fields', async () => {
        render(<FormModal {...defaultProps} />);

        const submitButton = screen.getByText('Send');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getAllByText('Required')).toHaveLength(2); // Name and Phone
        });
        expect(contactService.submitContactForm).not.toHaveBeenCalled();
    });

    it('submits form with valid data', async () => {
        (contactService.submitContactForm as any).mockResolvedValue({});

        render(<FormModal {...defaultProps} />);

        fireEvent.change(screen.getByLabelText(/Full Name/), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Phone/), { target: { value: '0501234567' } });
        // Use getByRole to specifically target the email input, not the radio button
        fireEvent.change(screen.getByRole('textbox', { name: /Email/ }), { target: { value: 'john@example.com' } });

        const submitButton = screen.getByText('Send');
        fireEvent.click(submitButton);

        expect(screen.getByText('Sending...')).toBeInTheDocument();

        await waitFor(() => {
            expect(contactService.submitContactForm).toHaveBeenCalledWith({
                fullName: 'John Doe',
                email: 'john@example.com',
                phone: '0501234567',
                plan: 'Basic Plan - 100 / month',
                contactMethod: 'whatsapp',
            });
        });

        // Should show success modal
        expect(screen.getByText('Success')).toBeInTheDocument();
    });

    it('shows error modal on submission failure', async () => {
        (contactService.submitContactForm as any).mockRejectedValue(new Error('Network error'));

        render(<FormModal {...defaultProps} />);

        fireEvent.change(screen.getByLabelText(/Full Name/), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Phone/), { target: { value: '0501234567' } });

        const submitButton = screen.getByText('Send');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Error')).toBeInTheDocument();
        });
    });
});
