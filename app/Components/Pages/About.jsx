import { Award, Briefcase, Headset, StickyNote } from '../Icons';
import Image from "next/image";
import Link from "next/link";


function About({ content, lang }) {

  if (!content) return null;

  return (
    <section id="about" className="pt-4 pb-10">
      <div className="text-center mb-2">
        <p className="text-4xl font-bold dark:text-white">{content.title}</p>
        <p className="text-gray-400 text-sm">{content.subtitle}</p>
      </div>
      <div className="md:flex md:items-center md:justify-center space-y-4 md:space-x-28 pt-2 md:pt-7 px-4">
        <div className="flex flex-col md:items-start items-center md:flex-row gap-6 md:gap-28">
          {/* Image Section - About Page Premium Version */}
          <div className="relative group animate-float">
            <div className="absolute -top-6 -left-6 text-blue-600/10 dark:text-blue-400/20 text-[6rem] font-serif transition-all duration-700 group-hover:-translate-x-3 group-hover:-translate-y-3 select-none leading-none">
              {lang === 'ar' || lang === 'fa' ? '}' : '{'}
            </div>
            <div className="absolute -bottom-6 -right-6 text-purple-600/10 dark:text-blue-400/20 text-[6rem] font-serif transition-all duration-700 group-hover:translate-x-3 group-hover:translate-y-3 select-none leading-none">
              {lang === 'ar' || lang === 'fa' ? '{' : '}'}
            </div>
            <div className="absolute -inset-6 bg-gradient-to-br from-blue-100/30 via-purple-50/30 to-transparent dark:from-blue-500/20 dark:via-blue-600/10 dark:to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className={`absolute top-4 ${lang === 'ar' || lang === 'fa' ? 'left-4' : 'right-4'} w-full h-full border border-gray-100 dark:border-slate-800 rounded-[2.5rem] transition-transform duration-500 ${lang === 'ar' || lang === 'fa' ? 'group-hover:translate-x-2' : 'group-hover:-translate-x-2'} group-hover:translate-y-2`}></div>

            <div className="relative z-10 p-[1px] bg-gradient-to-bl from-gray-200 via-white to-gray-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.01]">
              <div className="relative bg-white dark:bg-slate-900 p-2 rounded-[2.5rem] overflow-hidden">
                <div className="overflow-hidden rounded-[2rem] relative">
                  <Image
                    src="/about/image.jpg"
                    alt="Abdellah Edaoudi - About Me"
                    className="md:w-80 object-cover w-72 sm:w-80 transform transition-transform duration-1000 group-hover:scale-105"
                    width={500}
                    height={500}
                    priority
                  />

                  <div className="absolute bottom-0 right-0 p-2 bg-gradient-to-tl from-white via-white/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 z-20">
                    <div className="flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-[8px] font-black uppercase tracking-tighter text-blue-900 dark:text-blue-400 leading-none">Abdellah Edaoudi</span>
                      <span className="text-[6px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 leading-none mt-1">Software Developer</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 dark:via-blue-500/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <ul className="flex gap-4 items-center justify-center pt-4">
              <li className="flex flex-col items-center text-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm p-4 rounded-2xl border border-white/40 dark:border-slate-800 shadow-lg transition-all hover:bg-white/80 dark:hover:bg-slate-900">
                <Award className="dark:text-blue-400" />
                <span className="text-[13px] font-semibold dark:text-gray-100">{content.experience}</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">
                  +{new Date().getFullYear() - 2024} {content.experienceDetail}
                </span>
              </li>
              <li className="flex flex-col items-center text-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm py-4 md:px-4 px-2 rounded-2xl border border-white/40 dark:border-slate-800 shadow-lg transition-all hover:bg-white/80 dark:hover:bg-slate-900">
                <Briefcase className="dark:text-blue-400" />
                <span className="text-[13px] font-semibold dark:text-gray-100">{content.completed}</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">
                  +23 {content.completedDetail}
                </span>
              </li>
              <li className="flex flex-col items-center text-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm px-5 duration-300 md:px-6 py-4 rounded-2xl border border-white/40 dark:border-slate-800 shadow-lg transition-all hover:bg-white/80 dark:hover:bg-slate-900">
                <Headset className="dark:text-blue-400" />
                <span className="text-[13px] font-semibold dark:text-gray-100">{content.support}</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">
                  {content.supportDetail}
                </span>
              </li>
            </ul>
            <p className="text-justify md:w-[400px] text-gray-700 dark:text-gray-300 px-2 leading-relaxed">
              {content.description}
            </p>
            <div className="flex items-center flex-wrap justify-center gap-4">
              <Link
                href={content.Cv}
                target="_blank"
                className="flex p-3 rounded-lg bg-black dark:bg-blue-700 dark:hover:bg-blue-700 hover:scale-[1.03] duration-300 text-white gap-2"
              >
                {content.downloadCv} <StickyNote />
              </Link>
              <Link
                href={content.coverLetter}
                target="_blank"
                className="flex p-3 rounded-lg border-2 border-black dark:border-blue-500 text-black dark:text-blue-400 dark:hover:bg-blue-950/50 hover:scale-[1.03] duration-300 gap-2"
              >
                {content.downloadCoverLetter} <StickyNote />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
