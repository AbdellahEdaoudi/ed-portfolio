import { getTranslation } from "../translations/portfolio/load-translations";
import t from "../translations/metadata/en.json";
import Experience from "../Components/Pages/Experience";
import Footer from "../Components/Pages/Footer";
import Header from "../Components/Pages/Header";


const meta = t.experience;
export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: 'https://abdellah-edaoudi.vercel.app/Experience',
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
    canonical: '/en/Experience',
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
};


async function page() {
  const dictionary = await getTranslation('en');

  return (
    <div>
      <Header content={dictionary.header} lang="en" />
      <Experience content={dictionary.experience} lang="en" />
      <Footer content={dictionary.footer} lang="en" />
    </div>
  );
}

export default page;
