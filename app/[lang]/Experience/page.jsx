import Experience from "../../Components/Pages/Experience";
import Footer from "../../Components/Pages/Footer";
import { getTranslation } from "../../translations/portfolio/load-translations";
import Header from "../../Components/Pages/Header";


import { getMetadata } from "../../translations/metadata/load-metadata";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const t = await getMetadata(lang);
    const meta = t.experience;

    return {
        title: meta?.title,
        description: meta?.description,
        keywords: meta?.keywords,
        openGraph: {
            title: meta?.title,
            description: meta?.description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}/Experience`,
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
            canonical: `/${lang}/Experience`,
            languages: {
                'en': '/en/Experience',
                'fr': '/fr/Experience',
                'de': '/de/Experience',
                'zh': '/zh/Experience',
                'nl': '/nl/Experience',
                'es': '/es/Experience',
                'pt': '/pt/Experience',
                'ar': '/ar/Experience',
                'ru': '/ru/Experience',
                'ja': '/ja/Experience',
                'it': '/it/Experience',
                'hi': '/hi/Experience',
                'tr': '/tr/Experience',
                'ko': '/ko/Experience',
                'id': '/id/Experience',
                'pl': '/pl/Experience',
                'sv': '/sv/Experience',
                'vi': '/vi/Experience',
                'fa': '/fa/Experience',
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
            <Experience content={dictionary.experience} lang={lang} />
            <Footer content={dictionary.footer} lang={lang} />
        </div>
    );
}
