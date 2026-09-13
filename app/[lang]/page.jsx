
import Hero from "../Components/Pages/Hero";
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
    const meta = t?.hero || {};

    const title = meta.title || "Abdellah Edaoudi | Full Stack Developer";
    const description = meta.description || "Official portfolio of Abdellah Edaoudi";
    const keywords = meta.keywords || "";

    return {
        title,
        description,
        keywords,
        openGraph: {
            title: meta?.openGraph?.title || title,
            description: meta?.openGraph?.description || description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}`,
            siteName: 'Abdellah Edaoudi Portfolio',
            locale: lang,
            type: 'website',
            images: [
                {
                    url: 'https://abdellah-edaoudi.vercel.app/profile/new-profile.jpg',
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: meta?.twitter?.title || title,
            description: meta?.twitter?.description || description,
            creator: '@Edaoudi_abde',
            images: ['https://abdellah-edaoudi.vercel.app/profile/new-profile.jpg'],
        },
        alternates: {
            canonical: `https://abdellah-edaoudi.vercel.app/${lang}`,
            languages: {
                'x-default': 'https://abdellah-edaoudi.vercel.app/en',
                'en': 'https://abdellah-edaoudi.vercel.app/en',
                'fr': 'https://abdellah-edaoudi.vercel.app/fr',
                'de': 'https://abdellah-edaoudi.vercel.app/de',
                'zh': 'https://abdellah-edaoudi.vercel.app/zh',
                'nl': 'https://abdellah-edaoudi.vercel.app/nl',
                'es': 'https://abdellah-edaoudi.vercel.app/es',
                'pt': 'https://abdellah-edaoudi.vercel.app/pt',
                'ar': 'https://abdellah-edaoudi.vercel.app/ar',
                'ru': 'https://abdellah-edaoudi.vercel.app/ru',
                'ja': 'https://abdellah-edaoudi.vercel.app/ja',
                'it': 'https://abdellah-edaoudi.vercel.app/it',
                'hi': 'https://abdellah-edaoudi.vercel.app/hi',
                'tr': 'https://abdellah-edaoudi.vercel.app/tr',
                'ko': 'https://abdellah-edaoudi.vercel.app/ko',
                'id': 'https://abdellah-edaoudi.vercel.app/id',
                'pl': 'https://abdellah-edaoudi.vercel.app/pl',
                'sv': 'https://abdellah-edaoudi.vercel.app/sv',
                'vi': 'https://abdellah-edaoudi.vercel.app/vi',
                'fa': 'https://abdellah-edaoudi.vercel.app/fa',
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
            <Hero content={dictionary.hero} lang={lang} />
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

