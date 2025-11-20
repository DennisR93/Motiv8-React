# Motiv8 AntiGravity

A modern, responsive, and bilingual (English/Hebrew) web application for the Motiv8 fitness studio, built with React, TypeScript, and Vite.

## 🚀 Features

*   **Modern Tech Stack**: Built with React 18, TypeScript, and Vite for lightning-fast performance.
*   **Bilingual Support**: Full internationalization (i18n) support for English and Hebrew, including automatic RTL/LTR layout adjustments.
*   **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop devices (280px - 1440px+).
*   **Dynamic Content**: Content is managed via JSON files, making it easy to update text and images without touching code.
*   **Interactive UI**:
    *   Custom Carousels (Swiper) for Gym Gallery and Success Stories.
    *   Animated Mobile Menu and Language Switcher.
    *   Modal forms for lead generation.
*   **Styling**: Scoped styling using SCSS Modules with a consistent design system (variables, mixins).
*   **Accessibility**: Built with WCAG 2.1 guidelines in mind (semantic HTML, ARIA attributes, keyboard navigation).
*   **SEO Friendly**: Uses `react-helmet-async` for managing document head tags.

## 🛠️ Tech Stack & Dependencies

*   **Core**: `react`, `react-dom`, `typescript`, `vite`
*   **Routing**: `react-router-dom`
*   **Styling**: `sass` (SCSS Modules)
*   **Internationalization**: `i18next`, `react-i18next`
*   **UI Components**: `swiper` (Carousels)
*   **Utilities**: `react-helmet-async` (SEO), `@emailjs/browser` (Contact Forms)
*   **Linting**: `eslint`

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/DennisR93/Motiv8-React.git
    cd Motiv8-React
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## 📜 Available Scripts

*   `npm run dev`: Starts the development server with HMR.
*   `npm run build`: Builds the app for production to the `dist` folder.
*   `npm run preview`: Locally preview the production build.
*   `npm run lint`: Runs ESLint to check for code quality issues.

## 📁 Project Structure

```
src/
├── assets/         # Images, icons, and static assets
├── components/     # Reusable UI components (Header, Footer, Carousel, Modal, etc.)
├── data/           # JSON content files (CMS-like structure)
├── pages/          # Page components (Home, About, Training, Contact, etc.)
├── services/       # API services (EmailJS, etc.)
├── styles/         # Global styles, mixins, and variables
├── i18n.ts         # Internationalization configuration
├── main.tsx        # Application entry point
└── router.tsx      # Routing configuration
```

## 🌍 Environment Variables

To enable the contact form functionality, create a `.env` file in the root directory with your EmailJS credentials (see `.env.example`):

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---
© 2025 Motiv8. All rights reserved.
