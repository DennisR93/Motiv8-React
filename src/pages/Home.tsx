import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import styles from './Home.module.scss';
import Carousel from '../components/UI/Carousel/Carousel';

const Home: React.FC = () => {
    const { t } = useTranslation();
    const meetSections = t('home.meet.sections', { returnObjects: true }) as any[];
    const galleryItems = t('home.gallery.items', { returnObjects: true }) as any[];
    const successStoriesItems = t('home.successStories.items', { returnObjects: true }) as any[];

    return (
        <>
            <SEO title={t('common.nav.home')} />
            <div className={styles.homePage}>
                {/* Hero Section */}
                <section className={styles.heroSection}>
                    <div className={`container ${styles.heroContent}`}>
                        <h1>{t('home.hero.title')}</h1>
                        <p>{t('home.hero.subtitle')}</p>
                        <Link to="/pricing" className={`btn ${styles.btnLarge}`}>{t('home.hero.cta')}</Link>
                    </div>
                </section>

                {/* Welcome Section */}
                <section className={`container ${styles.welcomeSection}`}>
                    <div className={styles.welcomeContent}>
                        <h2>{t('home.welcome.title')}</h2>
                        <p>{t('home.welcome.description')}</p>
                    </div>
                </section>

                {/* Meet the Place Section */}
                <section className={styles.meetSection}>
                    <div className="container">
                        <h2 className={styles.sectionTitle}>{t('home.meet.title')}</h2>
                        <div className={styles.meetGrid}>
                            {meetSections && meetSections.map((section, index) => (
                                <div key={index} className={styles.meetCard}>
                                    <h3>{section.title}</h3>
                                    <p>{section.text}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* Gym Gallery Carousel */}
                <section className={styles.gallerySection}>
                    <div className="container">
                        <Carousel
                            title={t('home.gallery.title')}
                            items={galleryItems}
                        />
                    </div>
                </section>

                {/* Success Stories Section */}
                <section className={styles.successSection}>
                    <div className="container">
                        <div className={styles.successHeader}>
                            <h2 className={styles.sectionTitle}>{t('home.successStories.title')}</h2>
                            <p className={styles.sectionSubtitle}>{t('home.successStories.subtitle')}</p>
                        </div>
                        <Carousel items={successStoriesItems} />
                    </div>
                </section>
            </div >
        </>
    );
};

export default Home;
