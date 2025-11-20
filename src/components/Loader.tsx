import React from 'react';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.dumbbell}>
                <div className={styles.weight}></div>
                <div className={styles.bar}></div>
                <div className={styles.weight}></div>
            </div>
        </div>
    );
};

export default Loader;
