const BASE_URL = 'https://abdellah-edaoudi.vercel.app';
const LANGUAGES = ['en','ar', 'es', 'fr', 'ru', 'ja', 'zh', 'de', 'nl', 'pt', 'it', 'hi', 'tr', 'ko', 'id', 'pl', 'sv', 'vi', 'fa'];
const ROUTES = ['', 'About', 'Services', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'];

export default function sitemap() {
    const urls = [];

    const DOCUMENTS = {
        cv: {
            en: "/cv/cv-abdellah-edaoudi-en.pdf",
            fr: "/cv/cv-abdellah-edaoudi-fr.pdf",
            es: "/cv/cv-abdellah-edaoudi-es.pdf",
        },
        coverLetter: {
            en: "/cl/Cover-Letter-Abdellah-Edaoudi-EN.pdf",
            fr: "/cl/Lettre-de-Motivation-Abdellah-Edaoudi-FR.pdf",
            es: "/cl/Carta-de-Presentacion-Abdellah-Edaoudi-ES.pdf",
        }
    };



    // Language routes
    LANGUAGES.forEach((lang) => {
        ROUTES.forEach((route) => {
            const isHome = route === '';
            const url = isHome
                ? `${BASE_URL}/${lang}`
                : `${BASE_URL}/${lang}/${route}`;

            urls.push({
                url,
                lastModified: new Date(),
                changeFrequency: isHome ? 'weekly' : 'monthly',
                priority: isHome ? 1 : 0.8,
            });
        });
    });

    // CV and cover letter routes
    Object.values(DOCUMENTS).forEach((group) => {
        Object.values(group).forEach((path) => {
            urls.push({
                url: `${BASE_URL}${path}`,
                lastModified: new Date(),
                changeFrequency: 'yearly',
                priority: 0.6,
            });
        });
    });

    return urls;
}