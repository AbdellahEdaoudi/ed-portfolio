import Footer from "../../Components/Pages/Footer";
import { getTranslation } from "../../translations/portfolio/load-translations";
import Header from "../../Components/Pages/Header";
import Education from "../../Components/Pages/Education";

import { getMetadata } from "../../translations/metadata/load-metadata";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const t = await getMetadata(lang);
    const meta = t.education;

    return {
        title: meta?.title,
        description: meta?.description,
        keywords: meta?.keywords,
        openGraph: {
            title: meta?.title,
            description: meta?.description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}/Education`,
            siteName: 'Abdellah Edaoudi Portfolio',
            locale: lang,
            type: 'website',
            images: [
                {
                    url: 'https://abdellah-edaoudi.vercel.app/profile/new-profile.jpg',
                    width: 1200,
                    height: 630,
                    alt: meta?.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: meta?.title,
            description: meta?.description,
            creator: '@Edaoudi_abde',
            images: ['https://abdellah-edaoudi.vercel.app/profile/new-profile.jpg'],
        },
        alternates: {
            canonical: `/${lang}/Education`,
            languages: {
                'en': '/en/Education',
                'fr': '/fr/Education',
                'de': '/de/Education',
                'zh': '/zh/Education',
                'nl': '/nl/Education',
                'es': '/es/Education',
                'pt': '/pt/Education',
                'ar': '/ar/Education',
                'ru': '/ru/Education',
                'ja': '/ja/Education',
                'it': '/it/Education',
                'hi': '/hi/Education',
                'tr': '/tr/Education',
                'ko': '/ko/Education',
                'id': '/id/Education',
                'pl': '/pl/Education',
                'sv': '/sv/Education',
                'vi': '/vi/Education',
                'fa': '/fa/Education',
            },
        },
    }
}

export default async function Page({ params }) {
    const { lang } = await params;
    const dictionary = await getTranslation(lang);
    return (
        <div>
            <Header content={dictionary.header} lang={lang} />
            <Education content={dictionary.education} lang={lang} />
            <Footer content={dictionary.footer} lang={lang} />
        </div>
    );
}
