
import Home from "../Components/Pages/Home";
import About from "../Components/Pages/About";
import Services from "../Components/Pages/Services";
import Header from "../Components/Pages/Header";
import Skills from "../Components/Pages/Skills";
import Projects from "../Components/Pages/Projects";
import Education from "../Components/Pages/Education";
import Experience from "../Components/Pages/Experience";
import Contact from "../Components/Pages/Contact";
import Footer from "../Components/Pages/Footer";
import { getTranslation } from "../translations/portfolio/load-translations";
import { getMetadata } from "../translations/metadata/load-metadata";

export async function generateStaticParams() {
    return [
        { lang: 'en' },
        { lang: 'es' },
        { lang: 'fr' },
        { lang: 'ar' },
        { lang: 'de' },
        { lang: 'ru' },
        { lang: 'ja' },
        { lang: 'zh' },
        { lang: 'nl' },
        { lang: 'pt' },
        { lang: 'it' },
        { lang: 'tr' },
        { lang: 'ko' },
        { lang: 'hi' },
        { lang: 'id' },
        { lang: 'pl' },
        { lang: 'sv' },
        { lang: 'vi' },
        { lang: 'fa' },
    ];
}

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const t = await getMetadata(lang);
    const meta = t.home;

    return {
        title: meta?.title,
        description: meta?.description,
        keywords: meta?.keywords,
        openGraph: {
            title: meta?.openGraph?.title,
            description: meta?.openGraph?.description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}`,
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
            title: meta?.twitter?.title,
            description: meta?.twitter?.description,
            creator: '@Edaoudi_abde',
            images: ['https://abdellah-edaoudi.vercel.app/profile/new-profile.jpg'],
        },
        alternates: {
            canonical: `/${lang}`,
            languages: {
                'en': '/en',
                'fr': '/fr',
                'de': '/de',
                'zh': '/zh',
                'nl': '/nl',
                'es': '/es',
                'pt': '/pt',
                'ar': '/ar',
                'ru': '/ru',
                'ja': '/ja',
                'it': '/it',
                'hi': '/hi',
                'tr': '/tr',
                'ko': '/ko',
                'id': '/id',
                'pl': '/pl',
                'sv': '/sv',
                'vi': '/vi',
                'fa': '/fa',
                'ar': '/ar',
            },
        },
    }
}

export default async function Page({ params }) {
    const { lang } = await params;
    const dictionary = await getTranslation(lang);
    return (
        <>
            <Header content={dictionary.header} lang={lang} />
            <Home content={dictionary.home} lang={lang} />
            <About content={dictionary.about} lang={lang} />
            <Services content={dictionary.services} lang={lang} />
            <Skills content={dictionary.skills} lang={lang} />
            <Projects content={dictionary.projects} lang={lang} />
            <Experience content={dictionary.experience} lang={lang} />
            <Education content={dictionary.education} lang={lang} />
            <Contact content={dictionary.contact} lang={lang} />
            <Footer content={dictionary.footer} lang={lang} />
        </>
    );
}

