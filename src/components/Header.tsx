import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';
import logo from '../assets/images/logo/Motiv8Small.png';

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLButtonElement>(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        setIsOpen(false);
        closeMenu();
    };

    useEffect(() => {
        document.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    // Close dropdown and mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Close Language Dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }

            // Close Mobile Menu
            if (
                isMenuOpen &&
                navRef.current &&
                !navRef.current.contains(event.target as Node) &&
                hamburgerRef.current &&
                !hamburgerRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    const currentLang = i18n.language === 'he' ? 'עברית' : 'English';

    return (
        <header className={styles.siteHeader}>
            <div className={`container ${styles.headerContainer}`}>

                {/* Mobile Hamburger Button */}
                <button
                    ref={hamburgerRef}
                    className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </button>

                <div className={styles.logo}>
                    <Link to="/" onClick={closeMenu}>
                        <img src={logo} alt={t('common.brandName')} />
                    </Link>
                </div>

                {/* Navigation - Desktop & Mobile Wrapper */}
                <div ref={navRef} className={`${styles.navWrapper} ${isMenuOpen ? styles.open : ''}`}>
                    <nav className={styles.mainNav}>
                        <ul>
                            <li><NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>{t('common.nav.home')}</NavLink></li>
                            <li><NavLink to="/about" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>{t('common.nav.about')}</NavLink></li>
                            <li><NavLink to="/training" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>{t('common.nav.training')}</NavLink></li>
                            <li><NavLink to="/pricing" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>{t('common.nav.pricing')}</NavLink></li>
                            <li><NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>{t('common.nav.contact')}</NavLink></li>
                        </ul>
                    </nav>

                    <div className={styles.langDropdown} ref={dropdownRef}>
                        <button
                            className={styles.dropdownTrigger}
                            onClick={toggleDropdown}
                            aria-expanded={isOpen}
                            aria-haspopup="listbox"
                        >
                            {currentLang}
                            <svg
                                className={`${styles.arrow} ${isOpen ? styles.open : ''}`}
                                width="10"
                                height="6"
                                viewBox="0 0 10 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {isOpen && (
                            <ul className={styles.dropdownMenu} role="listbox">
                                <li
                                    onClick={() => changeLanguage('he')}
                                    className={i18n.language === 'he' ? styles.active : ''}
                                    role="option"
                                    aria-selected={i18n.language === 'he'}
                                >
                                    עברית
                                </li>
                                <li
                                    onClick={() => changeLanguage('en')}
                                    className={i18n.language === 'en' ? styles.active : ''}
                                    role="option"
                                    aria-selected={i18n.language === 'en'}
                                >
                                    English
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
