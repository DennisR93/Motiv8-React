import React, { useEffect, useRef } from 'react';
import styles from './InfoModal.module.scss';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    text: string;
    icon?: React.ReactNode;
    primaryAction?: {
        label: string;
        onClick: () => void;
    };
    showBackButton?: boolean;
    backButtonLabel?: string;
}

const InfoModal: React.FC<InfoModalProps> = ({
    isOpen,
    onClose,
    title,
    subtitle,
    text,
    icon,
    primaryAction,
    showBackButton = true,
    backButtonLabel = 'Close' // Default label, should be localized in parent
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Close on click outside
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modalContainer} ref={modalRef} role="dialog" aria-modal="true">
                <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className={styles.content}>
                    {icon && <div className={styles.iconWrapper}>{icon}</div>}

                    <h2 className={styles.title}>{title}</h2>
                    {subtitle && <h3 className={styles.subtitle}>{subtitle}</h3>}
                    <p className={styles.text}>{text}</p>

                    <div className={styles.actions}>
                        {primaryAction && (
                            <button className={styles.primaryButton} onClick={primaryAction.onClick}>
                                {primaryAction.label}
                            </button>
                        )}

                        {showBackButton && (
                            <button className={styles.backButton} onClick={onClose}>
                                {backButtonLabel}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
