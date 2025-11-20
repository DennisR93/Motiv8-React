import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'react-i18next';
// import { Navigation, Autoplay, A11y } from 'swiper/modules';
import styles from './Carousel.module.scss';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/autoplay';

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
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isPaused, setIsPaused] = React.useState(false);
    const [direction, setDirection] = React.useState<'ltr' | 'rtl'>('ltr');

    const shouldLoop = items.length > 1;

    if (!items || items.length === 0) {
        return null;
    }

    // Detect RTL/LTR direction
    React.useEffect(() => {
        const dir = document.documentElement.getAttribute('dir') as 'ltr' | 'rtl';
        setDirection(dir || 'ltr');
    }, []);

    // Auto-advance slides
    React.useEffect(() => {
        if (!shouldLoop || isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, shouldLoop, items.length]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const toggleAutoplay = () => {
        setIsPaused(!isPaused);
    };

    const currentItem = items[currentIndex];

    return (
        <div className={styles.carouselContainer}>
            {title && <h2 className={styles.sectionTitle}>{title}</h2>}

            {/* Row 1: Arrows and Image */}
            <div className={styles.carouselContentWrapper}>
                {/* Left Arrow */}
                {shouldLoop && (
                    <button
                        className={styles.navArrow}
                        onClick={goToPrevious}
                        aria-label={t('common.prev')}
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
                        </svg>
                    </button>
                )}

                {/* Image Container */}
                <div className={styles.imageContainer}>
                    <div className={styles.slideContent}>
                        <div
                            className={styles.imageWrapper}
                            role="img"
                            aria-label={currentItem.alt || currentItem.text}
                        >
                            {/* Grey placeholder box */}
                            <div style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#ccc',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                color: '#666'
                            }}>
                                Slide {currentIndex + 1}
                            </div>
                            {/* Original image - commented out for debugging
                            <img
                                src={currentItem.image}
                                alt={currentItem.alt || currentItem.text}
                                loading="lazy"
                            />
                            */}
                        </div>
                        <p className={styles.text}>{currentItem.text}</p>
                    </div>
                </div>

                {/* Right Arrow */}
                {shouldLoop && (
                    <button
                        className={styles.navArrow}
                        onClick={goToNext}
                        aria-label={t('common.next')}
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Row 2: Play/Pause Button */}
            {shouldLoop && (
                <button
                    className={styles.autoplayControl}
                    onClick={toggleAutoplay}
                    aria-label={isPaused ? t('common.play') : t('common.pause')}
                    title={isPaused ? t('common.play') : t('common.pause')}
                    data-direction={direction}
                >
                    {isPaused ? (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                    )}
                </button>
            )}
        </div>
    );
};


export default Carousel;
