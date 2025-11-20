import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import styles from './Privacy.module.scss';

const Privacy: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO title={t('privacy.title')} />
            <div className={`container ${styles.pageContainer}`}>
                <h1>{t('privacy.title')}</h1>
                <div className={styles.content}>
                    <p>{t('privacy.content')}</p>
                </div>
            </div>
        </>
    );
};

export default Privacy;
