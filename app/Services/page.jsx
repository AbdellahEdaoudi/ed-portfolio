import { getTranslation } from "../translations/portfolio/load-translations";
import t from "../translations/metadata/en.json";
import Services from "../Components/Pages/Services";
import Footer from "../Components/Pages/Footer";
import Header from "../Components/Pages/Header";

const meta = t.services;
export const metadata = {
  title: meta?.title || "Abdellah Edaoudi - Services",
  description: meta?.description,
  keywords: meta?.keywords,
  openGraph: {
    title: meta?.title,
    description: meta?.description,
    url: 'https://abdellah-edaoudi.vercel.app/Services',
    siteName: 'Abdellah Edaoudi Portfolio',
    locale: 'en',
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
    canonical: '/en/Services',
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
};

export default async function page() {
  const dictionary = await getTranslation('en');

  return (
    <div>
      <Header content={dictionary.header} lang="en" />
      <Services content={dictionary.services} lang="en" />
      <Footer content={dictionary.footer} lang="en" />
    </div>
  );
}
