import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import styles from './About.module.scss';

const About: React.FC = () => {
    const { t } = useTranslation();
    const timeline = t('about.history.timeline', { returnObjects: true }) as any[];
    const team = t('about.team.members', { returnObjects: true }) as any[];
    const testimonials = t('about.testimonials.list', { returnObjects: true }) as any[];

    return (
        <>
            <SEO title={t('about.title')} />
            <div className={`container ${styles.pageContainer}`}>
                <h1>{t('about.title')}</h1>

                {/* Mission & Vision */}
                <div className={styles.missionVisionGrid}>
                    <section className={styles.mvCard}>
                        <h2>{t('about.mission.title')}</h2>
                        <p>{t('about.mission.text')}</p>
                    </section>
                    <section className={styles.mvCard}>
                        <h2>{t('about.vision.title')}</h2>
                        <p>{t('about.vision.text')}</p>
                    </section>
                </div>

                {/* History Timeline */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('about.history.title')}</h2>
                    <div className={styles.timeline}>
                        {timeline && timeline.map((item, index) => (
                            <div key={index} className={styles.timelineItem}>
                                <div className={styles.timelineContent}>
                                    <div className={styles.year}>{item.year}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('about.team.title')}</h2>
                    <div className={styles.teamGrid}>
                        {team && team.map((member, index) => (
                            <div key={index} className={styles.teamCard}>
                                <div className={styles.avatarPlaceholder}>{member.name.charAt(0)}</div>
                                <h3>{member.name}</h3>
                                <span className={styles.role}>{member.role}</span>
                                <p>{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('about.testimonials.title')}</h2>
                    <div className={styles.testimonialsGrid}>
                        {testimonials && testimonials.map((item, index) => (
                            <div key={index} className={styles.testimonialCard}>
                                <p className={styles.quote}>"{item.quote}"</p>
                                <p className={styles.author}>- {item.author}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default About;
