import { getTranslation } from "../translations/portfolio/load-translations";
import t from "../translations/metadata/en.json";
import Footer from "../Components/Pages/Footer";
import Contact from "../Components/Pages/Contact";
import Header from "../Components/Pages/Header";

const meta = t.contact;
export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: 'https://abdellah-edaoudi.vercel.app/Contact',
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
    canonical: '/en/Contact',
    languages: {
      'en': '/en/Contact',
      'fr': '/fr/Contact',
      'de': '/de/Contact',
      'zh': '/zh/Contact',
      'nl': '/nl/Contact',
      'es': '/es/Contact',
      'pt': '/pt/Contact',
      'ar': '/ar/Contact',
      'ru': '/ru/Contact',
      'ja': '/ja/Contact',
      'it': '/it/Contact',
      'hi': '/hi/Contact',
      'tr': '/tr/Contact',
      'ko': '/ko/Contact',
      'id': '/id/Contact',
      'pl': '/pl/Contact',
      'sv': '/sv/Contact',
      'vi': '/vi/Contact',
      'fa': '/fa/Contact',
    },
  },
};

async function page() {
  const dictionary = await getTranslation('en');

  return (
    <div>
      <Header content={dictionary.header} lang="en" />
      <Contact content={dictionary.contact} lang="en" />
      <Footer content={dictionary.footer} lang="en" />
    </div>
  );
}

export default page;
