import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import styles from './Pricing.module.scss';
import FormModal from '../components/UI/Modal/FormModal';

interface PricingPlan {
    id: string;
    name: string;
    popular?: boolean;
    price: {
        monthly: string;
        quarterly: string;
        annual: string;
    };
    features: string[];
    cta: string;
}

type BillingCycle = 'monthly' | 'quarterly' | 'annual';

const Pricing: React.FC = () => {
    const { t } = useTranslation();
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

    // Cast the plans to the interface
    const plans = t('pricing.plans', { returnObjects: true }) as PricingPlan[];

    const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePlanClick = (plan: PricingPlan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPlan(null);
    };

    return (
        <>
            <SEO title={t('common.nav.pricing')} />
            <div className={`container ${styles.pageContainer}`}>
                <div className={styles.header}>
                    <h1>{t('pricing.title')}</h1>
                    <p className={styles.subtitle}>{t('pricing.subtitle')}</p>
                </div>

                <div className={styles.toggleContainer}>
                    <button
                        className={`${styles.toggleBtn} ${billingCycle === 'monthly' ? styles.active : ''}`}
                        onClick={() => setBillingCycle('monthly')}
                    >
                        {t('pricing.toggle.monthly')}
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${billingCycle === 'quarterly' ? styles.active : ''}`}
                        onClick={() => setBillingCycle('quarterly')}
                    >
                        {t('pricing.toggle.quarterly')}
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${billingCycle === 'annual' ? styles.active : ''}`}
                        onClick={() => setBillingCycle('annual')}
                    >
                        {t('pricing.toggle.annual')}
                    </button>
                </div>

                <div className={styles.pricingGrid}>
                    {plans.map((plan) => (
                        <div key={plan.id} className={`${styles.pricingCard} ${plan.popular ? styles.popular : ''}`}>
                            {plan.popular && <div className={styles.popularBadge}>Most Popular</div>}
                            <h2 className={styles.planName}>{plan.name}</h2>
                            <div className={styles.priceContainer}>
                                <span className={styles.currency}>₪</span>
                                <span className={styles.price}>{plan.price[billingCycle]}</span>
                                <span className={styles.period}>/{billingCycle === 'monthly' ? t('pricing.toggle.mo') : billingCycle === 'quarterly' ? t('pricing.toggle.qtr') : t('pricing.toggle.yr')}</span>
                            </div>
                            <ul className={styles.featuresList}>
                                {plan.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={styles.ctaBtn}
                                onClick={() => handlePlanClick(plan)}
                            >
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {selectedPlan && (
                <FormModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    planName={selectedPlan.name}
                    planPrice={selectedPlan.price[billingCycle]}
                    planPeriod={billingCycle === 'monthly' ? 'Month' : billingCycle === 'quarterly' ? 'Quarter' : 'Year'}
                />
            )}
        </>
    );
};

export default Pricing;
