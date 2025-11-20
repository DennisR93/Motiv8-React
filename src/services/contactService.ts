export interface ContactFormData {
    fullName: string;
    email: string;
    phone: string;
    plan: string;
    contactMethod: 'whatsapp' | 'call' | 'email';
}

// import { sendEmail } from './emailService';

export const submitContactForm = async (data: ContactFormData): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate random error (10% chance)
    // if (Math.random() < 0.1) {
    //     throw new Error('Network error');
    // }

    console.log('Form submitted successfully:', data);

    // TODO: To enable real email sending:
    // 1. Configure .env with EmailJS credentials
    // 2. Uncomment the import above
    // 3. Uncomment the line below and remove the mock logic
    // await sendEmail(data);
};
