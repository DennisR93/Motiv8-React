import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'react-i18next';
import { Navigation, Autoplay, A11y } from 'swiper/modules';
import styles from './Carousel.module.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

interface CarouselItem {
    image: string;
    text: string;
    alt?: string;
}

interface CarouselProps {
    title?: string;
    items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ title, items }) => {
    const shouldLoop = items.length > 1;

    if (!items || items.length === 0) {
        return null;
    }

    const [swiperInstance, setSwiperInstance] = React.useState<any>(null);
    const [isPaused, setIsPaused] = React.useState(false);
    const { t } = useTranslation(); // Need to import useTranslation

    const toggleAutoplay = () => {
        if (!swiperInstance) return;

        if (isPaused) {
            swiperInstance.autoplay.start();
            setIsPaused(false);
        } else {
            swiperInstance.autoplay.stop();
            setIsPaused(true);
        }
    };

    return (
        <div className={styles.carouselContainer}>
            {title && <h2 className={styles.sectionTitle}>{title}</h2>}

            <Swiper
                modules={[Navigation, Autoplay, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                centeredSlides={true}
                navigation={shouldLoop} // Only show arrows if loop is enabled
                loop={shouldLoop}
                autoplay={shouldLoop ? {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                } : false}
                onSwiper={setSwiperInstance}
                className={styles.swiperContainer}
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className={styles.slideContent}>
                            <div className={styles.imageWrapper}>
                                <img
                                    src={item.image}
                                    alt={item.alt || item.text}
                                    loading="lazy"
                                />
                            </div>
                            <p className={styles.text}>{item.text}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {shouldLoop && (
                <button
                    className={styles.autoplayControl}
                    onClick={toggleAutoplay}
                    aria-label={isPaused ? t('common.play') : t('common.pause')}
                    title={isPaused ? t('common.play') : t('common.pause')}
                >
                    {isPaused ? (
                        <svg viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                    )}
                </button>
            )}
        </div>
    );
};

export default Carousel;
