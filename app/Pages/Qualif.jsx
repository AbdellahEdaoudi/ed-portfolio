"use client";
import React, { useState } from "react";
import { GraduationCap, Briefcase } from "lucide-react";
function Qualif() {
  const [Qlf, setQlf] = useState(false);
  return (
    <section
      id="Qlf"
      className="bg-gray-50 flex  flex-col items-center  px-10 pb-10"
    >
      <div className="text-center pb-10 ">
        <p className="text-4xl font-bold">Qualification</p>
        <p className="text-gray-400 text-sm">My personal journey</p>
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
        <div
          className={` md:flex  justify-center md:space-x-10 md:space-y-0 space-y-5`}
        >
          {/* CMC */}
          <div className="text-center bg-white border w-[380px] px-0.5 flex flex-col items-center pt-7 pb-10 shadow-lg rounded-lg">
            <h1 className="pb-5">
              <p>2024</p> Trainee at the second year level in digital
              development full stack option in the cities of trades and skills{" "}
              <a
                className="text-blue-500"
                target="_blank"
                href="https://www.cmc.ac.ma/fr"
              >
                (Cmc)
              </a>
              .
            </h1>
            <div className=" ">
              <div className="space-y-4">
                <img
                  alt="the cities of trades and skills"
                  src="https://cmc.ac.ma/sites/default/files/styles/479x223/public/2022-12/banner-cmc-laayoune_0.png?itok=ikgS-lSV"
                ></img>
              </div>
            </div>
          </div>
          {/* BAB AHMED */}
          <div className="text-center bg-white border w-[380px] px-0.5 flex flex-col items-center pt-7 pb-10 shadow-lg rounded-lg">
            <h1 className="pb-5">
              <p>2022</p> Bachelor of Physical Sciences at Babe Ahmed High
              School
            </h1>
            <div className=" ">
              <div className="space-y-4 pt-6">
                <img src="./BabAhmedImage.jpg" alt=" Babe Ahmed High School" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Qlf Experience */}
      <div className={`${Qlf ? "block" : "hidden"}`}>
        <h1 className={`  text-5xl`}>سبحان الله</h1>
        <h1 className={`  text-5xl`}>أستغفر الله</h1>
        <h1 className={`  text-5xl`}>الحمد الله</h1>
        <h1 className={`  text-5xl`}>الله أكبر</h1>
      </div>
    </section>
  );
}
export default Qualif;
