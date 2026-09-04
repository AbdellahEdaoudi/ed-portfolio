import t from "../translations/metadata/en.json";
import React from "react";

const meta = t.projects;

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: 'https://abdellah-edaoudi.vercel.app/Projects',
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
    canonical: '/en/Projects',
    languages: {
      'en': '/en/Projects',
      'fr': '/fr/Projects',
      'de': '/de/Projects',
      'zh': '/zh/Projects',
      'nl': '/nl/Projects',
      'es': '/es/Projects',
      'pt': '/pt/Projects',
      'ar': '/ar/Projects',
      'ru': '/ru/Projects',
      'ja': '/ja/Projects',
      'it': '/it/Projects',
      'hi': '/hi/Projects',
      'tr': '/tr/Projects',
      'ko': '/ko/Projects',
      'id': '/id/Projects',
      'pl': '/pl/Projects',
      'sv': '/sv/Projects',
      'vi': '/vi/Projects',
      'fa': '/fa/Projects',
    },
  },
};

import Projects from "../Components/Pages/Projects";
import Footer from "../Components/Pages/Footer";
import Header from "../Components/Pages/Header";
import { getTranslation } from "../translations/portfolio/load-translations";

async function page() {
  const dictionary = await getTranslation('en');

  return (
    <div>
      <Header content={dictionary.header} lang="en" />
      <Projects content={dictionary.projects} lang="en" />
      <Footer content={dictionary.footer} lang="en" />
    </div>
  );
}

export default page;
