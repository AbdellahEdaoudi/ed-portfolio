import React from "react";
import Skills from "../Components/Skills";
import Projects from "../Components/Projects";
import Qualif from "../Components/Qualif";
import Footer from "../Components/Footer";
import Contact from "../Components/Contact";
import Header from "../Components/Header";

export const metadata = {
  title: "Abdellah Edaoudi - Skills",
  description:
    "Explore the technical skills and expertise of Abdellah Edaoudi, including frontend and backend development skills.",
  keywords:
    "Abdellah Edaoudi, Skills, Frontend Development, Backend Development, NextJS, ExpressJs, MongoDB, TailwindCss, Docker",
  ogTitle: "Abdellah Edaoudi - Skills",
  ogDescription:
    "Explore the technical skills and expertise of Abdellah Edaoudi, including frontend and backend development skills.",
  ogImage: "https://ed-portfolioo.vercel.app/profile-pic.png",
  ogUrl: "https://ed-portfolioo.vercel.app/Skills",
  twitterTitle: "Abdellah Edaoudi - Skills",
  twitterDescription:
    "Explore the technical skills and expertise of Abdellah Edaoudi, including frontend and backend development skills.",
  twitterImage: "https://ed-portfolioo.vercel.app/profile-pic.png",
  twitterCard: "summary_large_image",
};
function page() {
  return (
    <div>
      <Skills />
      <Projects />
      <Qualif />
      <Contact />
      <Footer />
    </div>
  );
}

export default page;
