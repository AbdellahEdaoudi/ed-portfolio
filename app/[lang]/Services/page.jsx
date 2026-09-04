import { getTranslation } from "../../translations/portfolio/load-translations";
import { getMetadata } from "../../translations/metadata/load-metadata";
import Services from "../../Components/Pages/Services";
import Footer from "../../Components/Pages/Footer";
import Header from "../../Components/Pages/Header";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const t = await getMetadata(lang);
    const meta = t.services;

    return {
        title: meta?.title,
        description: meta?.description,
        keywords: meta?.keywords,
        openGraph: {
            title: meta?.title,
            description: meta?.description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}/Services`,
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
            canonical: `/${lang}/Services`,
            languages: {
                'en': '/en/Services',
                'fr': '/fr/Services',
                'de': '/de/Services',
                'zh': '/zh/Services',
                'nl': '/nl/Services',
                'es': '/es/Services',
                'pt': '/pt/Services',
                'ar': '/ar/Services',
                'ru': '/ru/Services',
                'ja': '/ja/Services',
                'it': '/it/Services',
                'hi': '/hi/Services',
                'tr': '/tr/Services',
                'ko': '/ko/Services',
                'id': '/id/Services',
                'pl': '/pl/Services',
                'sv': '/sv/Services',
                'vi': '/vi/Services',
                'fa': '/fa/Services',
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
            <Services content={dictionary.services} lang={lang} />
            <Footer content={dictionary.footer} lang={lang} />
        </div>
    );
}
