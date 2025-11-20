import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className={styles.siteFooter}>
            <div className={`container ${styles.footerContainer}`}>
                <div className={styles.footerLinks}>
                    <Link to="/privacy">{t('common.footer.privacy')}</Link>
                    <Link to="/accessibility">{t('common.footer.accessibility')}</Link>
                </div>
                <div className={styles.copyright}>
                    &copy; {year} {t('common.brandName')}. {t('common.footer.rights')}.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
