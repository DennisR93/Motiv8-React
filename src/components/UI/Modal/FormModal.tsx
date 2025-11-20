import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './FormModal.module.scss';
import InfoModal from './InfoModal';
import { submitContactForm, ContactFormData } from '../../../services/contactService';

interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    planName: string;
    planPrice?: string;
    planPeriod?: string;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose, planName, planPrice, planPeriod }) => {
    const { t } = useTranslation();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const [formData, setFormData] = useState<ContactFormData>({
        fullName: '',
        email: '',
        phone: '',
        plan: '',
        contactMethod: 'whatsapp'
    });

    const [errors, setErrors] = useState<Partial<ContactFormData>>({});

    useEffect(() => {
        if (isOpen) {
            // Format plan display string
            const formattedPlan = planPrice
                ? `${planName} - ${planPrice}${planPeriod ? ` / ${planPeriod}` : ''}`
                : planName;

            setFormData(prev => ({ ...prev, plan: formattedPlan }));
            setStatus('idle');
            setErrors({});
        }
    }, [isOpen, planName, planPrice, planPeriod]);

    const validate = (): boolean => {
        const newErrors: Partial<ContactFormData> = {};
        let isValid = true;

        if (!formData.fullName.trim()) {
            newErrors.fullName = t('modals.form.errors.required');
            isValid = false;
        }

        if (!formData.phone.trim()) {
            newErrors.phone = t('modals.form.errors.required');
            isValid = false;
        } else if (!/^\d{9,10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = t('modals.form.errors.invalidPhone');
            isValid = false;
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t('modals.form.errors.invalidEmail');
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('submitting');

        try {
            await submitContactForm(formData);
            setStatus('success');
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof ContactFormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    // Success Modal
    if (status === 'success') {
        return (
            <InfoModal
                isOpen={isOpen}
                onClose={onClose}
                title={t('modals.form.success.title')}
                text={t('modals.form.success.message')}
                icon={
                    <div className={styles.successIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </div>
                }
                primaryAction={{
                    label: t('common.close'),
                    onClick: onClose
                }}
                showBackButton={false}
            />
        );
    }

    // Error Modal
    if (status === 'error') {
        return (
            <InfoModal
                isOpen={isOpen}
                onClose={() => setStatus('idle')} // Go back to form on close
                title={t('modals.form.error.title')}
                text={t('modals.form.error.message')}
                icon={
                    <div className={styles.errorIcon} style={{ color: '#D32F2F', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                    </div>
                }
                primaryAction={{
                    label: t('common.tryAgain'),
                    onClick: () => setStatus('idle')
                }}
                showBackButton={true}
                backButtonLabel={t('common.cancel')}
            />
        );
    }

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modalContainer} role="dialog" aria-modal="true">
                <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <h2 className={styles.title}>{t('modals.form.title')}</h2>
                <p className={styles.subtitle}>{t('modals.form.subtitle')}</p>

                <form onSubmit={handleSubmit} className={styles.formContent}>
                    <div className={styles.formGroup}>
                        <label htmlFor="fullName">{t('modals.form.labels.fullName')} *</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={errors.fullName ? styles.error : ''}
                            disabled={status === 'submitting'}
                        />
                        {errors.fullName && <span className={styles.errorMessage}>{errors.fullName}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="plan">{t('modals.form.labels.plan')}</label>
                        <input
                            type="text"
                            id="plan"
                            name="plan"
                            value={formData.plan}
                            readOnly
                            className={styles.readOnlyInput} // You might want to add this style
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="phone">{t('modals.form.labels.phone')} *</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={errors.phone ? styles.error : ''}
                            disabled={status === 'submitting'}
                            dir="ltr"
                        />
                        {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">{t('modals.form.labels.email')}</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? styles.error : ''}
                            disabled={status === 'submitting'}
                            dir="ltr"
                        />
                        {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label>{t('modals.form.labels.contactMethod')}</label>
                        <div className={styles.radioGroup}>
                            <label>
                                <input
                                    type="radio"
                                    name="contactMethod"
                                    value="whatsapp"
                                    checked={formData.contactMethod === 'whatsapp'}
                                    onChange={handleChange}
                                    disabled={status === 'submitting'}
                                />
                                {t('modals.form.methods.whatsapp')}
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="contactMethod"
                                    value="call"
                                    checked={formData.contactMethod === 'call'}
                                    onChange={handleChange}
                                    disabled={status === 'submitting'}
                                />
                                {t('modals.form.methods.call')}
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="contactMethod"
                                    value="email"
                                    checked={formData.contactMethod === 'email'}
                                    onChange={handleChange}
                                    disabled={status === 'submitting'}
                                />
                                {t('modals.form.methods.email')}
                            </label>
                        </div>
                    </div>

                    <button type="submit" className={styles.submitButton} disabled={status === 'submitting'}>
                        {status === 'submitting' ? t('common.sending') : t('common.send')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormModal;
