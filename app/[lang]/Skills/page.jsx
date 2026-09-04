import Skills from "../../Components/Pages/Skills";
import Footer from "../../Components/Pages/Footer";
import { getTranslation } from "../../translations/portfolio/load-translations";
import Header from "../../Components/Pages/Header";


import { getMetadata } from "../../translations/metadata/load-metadata";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const t = await getMetadata(lang);
    const meta = t.skills;

    return {
        title: meta?.title,
        description: meta?.description,
        keywords: meta?.keywords,
        openGraph: {
            title: meta?.title,
            description: meta?.description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}/Skills`,
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
            canonical: `/${lang}/Skills`,
            languages: {
                'en': '/en/Skills',
                'fr': '/fr/Skills',
                'de': '/de/Skills',
                'zh': '/zh/Skills',
                'nl': '/nl/Skills',
                'es': '/es/Skills',
                'pt': '/pt/Skills',
                'ar': '/ar/Skills',
                'ru': '/ru/Skills',
                'ja': '/ja/Skills',
                'it': '/it/Skills',
                'hi': '/hi/Skills',
                'tr': '/tr/Skills',
                'ko': '/ko/Skills',
                'id': '/id/Skills',
                'pl': '/pl/Skills',
                'sv': '/sv/Skills',
                'vi': '/vi/Skills',
                'fa': '/fa/Skills',
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
            <Skills content={dictionary.skills} lang={lang} />
            <Footer content={dictionary.footer} lang={lang} />
        </div>
    );
}
