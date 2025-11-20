import emailjs from '@emailjs/browser';

interface EmailData {
    fullName: string;
    plan?: string;
    phone: string;
    email?: string;
    contactMethod: string;
}

/**
 * Sends an email using EmailJS.
 * 
 * Prerequisites:
 * 1. Create an account at https://www.emailjs.com/
 * 2. Create a Service (e.g., Gmail)
 * 3. Create an Email Template with these variables:
 *    - {{fullName}}
 *    - {{plan}}
 *    - {{phone}}
 *    - {{email}}
 *    - {{contactMethod}}
 * 4. Add the following environment variables to your .env file:
 *    - VITE_EMAILJS_SERVICE_ID
 *    - VITE_EMAILJS_TEMPLATE_ID
 *    - VITE_EMAILJS_PUBLIC_KEY
 */
export const sendEmail = async (data: EmailData): Promise<void> => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS is not configured. Check your environment variables.');
        throw new Error('EmailJS configuration missing');
    }

    try {
        const templateParams = {
            fullName: data.fullName,
            plan: data.plan || 'Not selected',
            phone: data.phone,
            email: data.email || 'Not provided',
            contactMethod: data.contactMethod
        };

        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
};
