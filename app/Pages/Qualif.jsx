"use client";
import React, { useContext, useState } from "react";
import { GraduationCap, Briefcase, Download } from "lucide-react";
import { MyContext } from "../Context/MyContext";
import Link from "next/link";

const QualifEn = {
  title: "Qualification",
  subtitle: "My personal journey",
  dip:`Diploma in digital development web Full Stack option in
              Cities of Professions and Skills.`,
  bac: `Bachelor of Physical Sciences at Babe Ahmed High School`,
  exL:"Regional Academy of Education and Training",
  dc:`During this internship, I had the opportunity to work on a web development
   project for task management. My main role was to design and develop a functional web application using React JS, Node JS technology. I also integrated the Tailwind CSS style library. I worked closely with 
  the team to understand project requirements and deliver an efficient and user-friendly solution.`
};
const QualifFr = {
  title: "Qualification",
  subtitle: "Mon parcours personnel",
  dip: `Diplôme en Développement Digital option web Full Stack
              aux Cités des Métiers et des Compétences.`,
  bac: `Baccalauréat en Sciences Physiques au Lycée Babe Ahmed`,
  exL : ` Académie Régionale d'Éducation et de Formation `,
  dc:`Lors de ce stage, j'ai eu l'opportunité de travailler sur un développement web
   projet de gestion des tâches. Mon rôle principal était de concevoir et développer une application web fonctionnelle utilisant la technologie React JS, Node JS. J'ai également intégré la bibliothèque de styles CSS Tailwind. J'ai travaillé en étroite collaboration avec 
  l'équipe pour comprendre les exigences du projet et fournir une solution efficace et conviviale.`
};

function Qualif() {
  const [Qlf, setQlf] = useState(false);
  const { EnOrFr } = useContext(MyContext);
  const Qualif = EnOrFr === "en" ? QualifEn : QualifFr;

  return (
    <section
      id="Qlf"
      className="bg-gray-50 flex  flex-col items-center pt-4  px-10 pb-10"
    >
      <div className="text-center pb-10 ">
        <p className="text-4xl font-bold">{Qualif.title}</p>
        <p className="text-gray-400 text-sm">{Qualif.subtitle}</p>
        <div className="flex gap-5 pt-5">
          <h1
            onClick={() => {
              Qlf ? setQlf(!Qlf) : setQlf(Qlf);
            }}
            className="flex  gap-3 cursor-grabbing hover:drop-shadow-lg"
          >
            <GraduationCap /> Education
          </h1>
          <h1
            onClick={() => {
              Qlf ? setQlf(Qlf) : setQlf(!Qlf);
            }}
            className="flex  gap-3 cursor-grabbing hover:drop-shadow-lg"
          >
            <Briefcase /> Experience
          </h1>
        </div>
      </div>
      {/* Qlf Education */}
      <div className={`${Qlf ? "hidden" : "block"}`}>
        <div className={` md:flex  justify-center md:space-x-10 md:space-y-0 space-y-5`}>
          {/* CMC */}
          <Link target="_blank" href={"https://www.linkedin.com/posts/abdellah-edaoudi-0bbba02a5_my-experience-in-d%C3%A9veloppement-digital-activity-7229862265754161152-QhTd?utm_source=share&utm_medium=member_desktop"} className=" hover:scale-105 duration-300 cursor-pointer bg-white border w-[380px] px-0.5 flex flex-col items-center pt-4 pb-5 shadow-lg rounded-lg">
            <div className="pb-1">
              <p className="mx-5 ">
              <span className="underline text-gray-700">2022 - 2024</span> : {Qualif.dip}{" "}
              <span
                className="text-blue-500"
                target="_blank"
                href="https://www.cmc.ac.ma/fr"
              >
                (Cmc).
              </span>
              </p>
            </div>
            <div className=" ">
              <div className="space-y-7">
                <img
                  alt="the cities of trades and skills"
                  src="/cmc-maroc.png"
                ></img>
              </div>
            </div>
          </Link>
          {/* BAB AHMED */}
          <div className="hover:scale-105 duration-300 cursor-pointer text-center bg-white border w-[380px] px-0.5 flex flex-col items-center pt-4  shadow-lg rounded-lg">
            <h1 className="pb-2">
              <p className="mx-1"><span className="underline text-gray-700">2022</span> : {Qualif.bac}</p>
            </h1>
            <div className=" ">
              <div className="space-y-4 pt-6 ">
                <img src="./BabAhmedImage.jpg" alt=" Babe Ahmed High School" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Qlf Experience */}
      <div className={`${Qlf ? "block" : "hidden"}`}>
        <div
          className={`md:flex  justify-center md:space-x-10 md:space-y-0 space-y-5`}
        >
          {/* STAGE */}
<div className="bg-white border px-10 md:flex items-start pt-7 pb-10 shadow-lg rounded-lg">
  <div className="flex items-center justify-center">
    <img src="./acad.jpg" alt="acadImg" />
  </div>
  <div className="pt-5">
    <h1 className="text-center text-red-500 pb-4">{EnOrFr === "en" ? "Internship" :"Stage"}</h1>
    <ul>
      <li className="pl-5">
        <b>Company:</b>  {Qualif.exL}
      </li>
      <li className="pl-5">
        <b>Description:</b> <br />
        <p className="">
          {Qualif.dc}
       </p>
      </li>
      {/* <a href="/AttestaiondeStage.pdf" download className="float-right bg-green-500 p-2 rounded-md">
        Attestation De Stage
      </a> */}
    </ul>
  </div>
</div>

        </div>
      </div>
    </section>
  );
}
export default Qualif;
