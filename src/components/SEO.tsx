import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
    title: string;
    description?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
    const { t } = useTranslation();
    const siteTitle = t('common.brandName');
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || t('home.hero.subtitle')} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
    );
};

export default SEO;
