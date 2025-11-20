import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import styles from './Training.module.scss';

interface TrainingOption {
    title: string;
    desc: string;
}

const Training: React.FC = () => {
    const { t } = useTranslation();
    const options = t('training.options', { returnObjects: true }) as TrainingOption[];
    const hours = t('training.hours', { returnObjects: true }) as any;

    return (
        <>
            <SEO title={t('training.title')} />
            <div className={`container ${styles.pageContainer}`}>
                <h1>{t('training.title')}</h1>

                <div className={styles.optionsGrid}>
                    {options && options.map((option, index) => (
                        <div key={index} className={styles.optionCard}>
                            <h2>{option.title}</h2>
                            <p>{option.desc}</p>
                            {option.features && (
                                <ul className={styles.featuresList}>
                                    {option.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                {hours && (
                    <div className={styles.hoursSection}>
                        <h2>{hours.title}</h2>
                        <div className={styles.hoursGrid}>
                            <div className={styles.hourItem}>
                                <span className={styles.day}>{hours.weekdays.label}</span>
                                <span className={styles.time}>{hours.weekdays.time}</span>
                            </div>
                            <div className={styles.hourItem}>
                                <span className={styles.day}>{hours.friday.label}</span>
                                <span className={styles.time}>{hours.friday.time}</span>
                            </div>
                            <div className={styles.hourItem}>
                                <span className={styles.day}>{hours.saturday.label}</span>
                                <span className={styles.time}>{typeof hours.saturday.time === 'string' ? hours.saturday.time : hours.saturday.time}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Training;
