import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import styles from './Accessibility.module.scss';

const Accessibility: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO title={t('accessibility.title')} />
            <div className={`container ${styles.pageContainer}`}>
                <h1>{t('accessibility.title')}</h1>
                <div className={styles.content}>
                    <p>{t('accessibility.content')}</p>
                </div>
            </div>
        </>
    );
};

export default Accessibility;
