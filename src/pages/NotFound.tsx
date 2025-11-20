import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO title={t('common.notFound.title')} />
            <div className={`container ${styles.pageContainer}`}>
                <h1>{t('common.notFound.title')}</h1>
                <p>{t('common.notFound.message')}</p>
                <Link to="/" className="btn">{t('common.notFound.homeButton')}</Link>
            </div>
        </>
    );
};

export default NotFound;
