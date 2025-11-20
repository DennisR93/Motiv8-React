import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import styles from './Contact.module.scss';

const Contact: React.FC = () => {
    const { t } = useTranslation();
    const methods = t('contact.methods', { returnObjects: true }) as any;

    const handleWhatsapp = () => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const number = methods.whatsapp.value;
        const url = isMobile
            ? `whatsapp://send?phone=${number}`
            : `https://web.whatsapp.com/send?phone=${number}`;
        window.open(url, '_blank');
    };

    return (
        <>
            <SEO title={t('contact.title')} />
            <div className={`container ${styles.pageContainer}`}>
                <h1>{t('contact.title')}</h1>
                <p className={styles.subtitle}>{t('contact.subtitle')}</p>

                <div className={styles.contactGrid}>
                    <button onClick={handleWhatsapp} className={styles.contactCard}>
                        <div className={`${styles.iconWrapper} ${styles.whatsappIcon}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382C17.112 14.022 15.202 13.082 14.932 12.932C14.662 12.782 14.502 12.732 14.202 13.182C13.902 13.632 13.052 14.632 12.812 14.932C12.572 15.232 12.362 15.232 12.092 15.097C11.822 14.962 10.962 14.677 9.92205 13.752C9.08205 13.002 8.52205 12.082 8.37205 11.812C8.22205 11.542 8.34205 11.407 8.48205 11.272C8.60205 11.152 8.75205 10.962 8.88205 10.812C9.01205 10.662 9.06205 10.542 9.15205 10.362C9.24205 10.182 9.20205 10.017 9.14205 9.882C9.08205 9.747 8.64205 8.667 8.46205 8.232C8.28205 7.812 8.10205 7.862 7.96205 7.862H7.58205C7.28205 7.862 6.80205 7.972 6.40205 8.412C6.00205 8.852 4.86205 9.932 4.86205 12.137C4.86205 14.342 6.46205 16.472 6.68205 16.772C6.90205 17.072 9.85205 21.617 14.352 23.567C15.422 24.032 16.262 24.302 16.912 24.512C17.942 24.842 18.882 24.797 19.622 24.687C20.442 24.567 22.152 23.652 22.502 22.662C22.852 21.672 22.852 20.832 22.752 20.667C22.652 20.502 22.382 20.412 22.112 20.277L17.472 14.382Z" fill="white" />
                            </svg>
                        </div>
                        <h2>{methods.whatsapp.label}</h2>
                        <p>{methods.whatsapp.value}</p>
                    </button>

                    <a href={`tel:${methods.phone.value}`} className={styles.contactCard}>
                        <div className={`${styles.iconWrapper} ${styles.phoneIcon}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 16.92V19.92C22.0011 20.1986 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2137 21.3521 21.4019C21.1468 21.5902 20.9046 21.7336 20.6411 21.8228C20.3776 21.912 20.0987 21.9452 19.823 21.92C16.7665 21.5877 13.8298 20.5425 11.26 18.86C8.89503 17.2878 6.89265 15.2044 5.40001 12.74C3.8097 10.0553 2.8177 6.97794 2.51001 3.78001C2.48504 3.49183 2.51904 3.20057 2.60982 2.92494C2.7006 2.64932 2.84619 2.39537 3.03737 2.17933C3.22855 1.96329 3.46118 1.78987 3.72042 1.67016C3.97966 1.55045 4.25986 1.48711 4.54301 1.48401H7.54301C8.02534 1.48032 8.49252 1.65354 8.8588 1.97192C9.22508 2.2903 9.46833 2.73459 9.54301 3.22001C9.68166 4.26984 9.93849 5.29996 10.306 6.28001C10.4532 6.66842 10.4851 7.09232 10.3978 7.49987C10.3105 7.90742 10.1078 8.28081 9.81501 8.57401L8.54501 9.84401C9.96765 12.3462 12.0428 14.4214 14.545 15.844L15.815 14.574C16.1082 14.2812 16.4816 14.0785 16.8892 13.9912C17.2967 13.9039 17.7206 13.9358 18.109 14.083C19.0891 14.4505 20.1192 14.7073 21.169 14.846C21.6593 14.9223 22.107 15.1718 22.4252 15.5447C22.7435 15.9176 22.9128 16.3911 22.893 16.879L22 16.92Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h2>{methods.phone.label}</h2>
                        <p>{methods.phone.value}</p>
                    </a>

                    <a href={`mailto:${methods.email.value}`} className={styles.contactCard}>
                        <div className={`${styles.iconWrapper} ${styles.emailIcon}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 6L12 13L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h2>{methods.email.label}</h2>
                        <p>{methods.email.value}</p>
                    </a>

                    <div className={styles.contactCard}>
                        <div className={`${styles.iconWrapper} ${styles.instagramIcon}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7615 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.5205 8.00901 14.3715 8.36737 15.0011 8.99694C15.6306 9.6265 15.989 10.4775 15.998 11.368L16 11.37Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M17.5 6.5H17.51" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h2>{methods.instagram.label}</h2>
                        <p>{methods.instagram.value}</p>
                    </div>

                    <div className={styles.contactCard}>
                        <div className={`${styles.iconWrapper} ${styles.facebookIcon}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h2>{methods.facebook.label}</h2>
                        <p>{methods.facebook.value}</p>
                    </div>
                </div>

                <div className={styles.mapContainer}>
                    <iframe
                        title="Motiv8 Gym Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3373.956976829528!2d34.8566723!3d32.2916667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d406666666667%3A0x6666666666666666!2sHaBonim%20St%208%2C%20Netanya!5e0!3m2!1sen!2sil!4v1634567890123!5m2!1sen!2sil"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </>
    );
};

export default Contact;
