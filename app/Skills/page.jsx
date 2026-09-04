import t from "../translations/metadata/en.json";
import React from "react";

const meta = t.skills;

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: 'https://abdellah-edaoudi.vercel.app/Skills',
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
    canonical: '/en/Skills',
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
};

import Skills from "../Components/Pages/Skills";
import Footer from "../Components/Pages/Footer";
import Header from "../Components/Pages/Header";
import { getTranslation } from "../translations/portfolio/load-translations";


async function page() {
  const dictionary = await getTranslation('en');

  return (
    <div>
      <Header content={dictionary.header} lang="en" />
      <Skills content={dictionary.skills} lang="en" />
      <Footer content={dictionary.footer} lang="en" />
    </div>
  );
}

export default page;
