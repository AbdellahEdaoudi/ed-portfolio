import { getTranslation } from "../translations/portfolio/load-translations";
import t from "../translations/metadata/en.json";
import About from "../Components/Pages/About";
import Footer from "../Components/Pages/Footer";
import Header from "../Components/Pages/Header";


const meta = t.about;
export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: 'https://abdellah-edaoudi.vercel.app/About',
    siteName: 'Abdellah Edaoudi Portfolio',
    locale: 'en',
    type: 'website',
    images: [
      {
        url: 'https://abdellah-edaoudi.vercel.app/profile/new-profile.jpg',
        width: 1200,
        height: 630,
        alt: meta.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    creator: '@Edaoudi_abde',
    images: ['https://abdellah-edaoudi.vercel.app/profile/new-profile.jpg'],
  },
  alternates: {
    canonical: '/en/About',
    languages: {
      'en': '/en/About',
      'fr': '/fr/About',
      'de': '/de/About',
      'zh': '/zh/About',
      'nl': '/nl/About',
      'es': '/es/About',
      'pt': '/pt/About',
      'ar': '/ar/About',
      'ru': '/ru/About',
      'ja': '/ja/About',
      'it': '/it/About',
      'hi': '/hi/About',
      'tr': '/tr/About',
      'ko': '/ko/About',
      'id': '/id/About',
      'pl': '/pl/About',
      'sv': '/sv/About',
      'vi': '/vi/About',
      'fa': '/fa/About',
    },
  },
};

export default async function page() {
  const dictionary = await getTranslation('en');

  return (
    <div>
      <Header content={dictionary.header} lang="en" />
      <About content={dictionary.about} lang="en" />
      <Footer content={dictionary.footer} lang="en" />
    </div>
  );
}

