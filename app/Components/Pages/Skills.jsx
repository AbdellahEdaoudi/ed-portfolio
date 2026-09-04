import React from "react";
import { FaReact, FaNodeJs, FaGitAlt, FaDocker, FaStripe, FaPaypal, FaLock, FaUserShield, FaCloud, FaSitemap, FaGithub, FaShieldAlt, FaTachometerAlt, FaCheckDouble, FaEnvelope, FaGoogle } from "react-icons/fa";
import { SiNextdotjs, SiMongodb, SiTailwindcss, SiJavascript, SiTypescript, SiPostman, SiMongoose, SiJsonwebtokens, SiCloudinary, SiSocketdotio, SiVercel } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import Image from "next/image";

function Skills({ content }) {
  if (!content) return null;

  const skillsData = {
    frontend: [
      { name: "NextJS", icon: <SiNextdotjs />, color: "text-black dark:text-white", hoverText: "group-hover:text-black dark:group-hover:text-white", hoverBorder: "group-hover:border-black dark:group-hover:border-white group-hover:ring-[5px] group-hover:ring-gray-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-gray-200 group-hover:to-transparent dark:group-hover:from-gray-700/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-gray-500/30" },
      { name: "ReactJS", icon: <FaReact />, color: "text-blue-500", hoverText: "group-hover:text-blue-600", hoverBorder: "group-hover:border-blue-500 group-hover:ring-[5px] group-hover:ring-blue-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-transparent dark:group-hover:from-blue-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-blue-500/30" },
      { name: "TailwindCss", icon: <SiTailwindcss />, color: "text-teal-500", hoverText: "group-hover:text-teal-600", hoverBorder: "group-hover:border-teal-500 group-hover:ring-[5px] group-hover:ring-teal-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-teal-100 group-hover:to-transparent dark:group-hover:from-teal-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-teal-500/30" },
      { name: "JavaScript", icon: <SiJavascript />, color: "text-yellow-400", hoverText: "group-hover:text-yellow-500", hoverBorder: "group-hover:border-yellow-400 group-hover:ring-[5px] group-hover:ring-yellow-400/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-yellow-100 group-hover:to-transparent dark:group-hover:from-yellow-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-yellow-400/30" },
      { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-600", hoverText: "group-hover:text-blue-700", hoverBorder: "group-hover:border-blue-600 group-hover:ring-[5px] group-hover:ring-blue-600/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-transparent dark:group-hover:from-blue-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-blue-600/30" },
    ],
    backend: [
      { name: "NodeJS", icon: <FaNodeJs />, color: "text-green-500", hoverText: "group-hover:text-green-600", hoverBorder: "group-hover:border-green-500 group-hover:ring-[5px] group-hover:ring-green-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-green-100 group-hover:to-transparent dark:group-hover:from-green-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-green-500/30" },
      { name: "ExpressJs", isImage: true, src: '/Skills/ExpressJs.png', hoverText: "group-hover:text-gray-800 dark:group-hover:text-gray-200", hoverBorder: "group-hover:border-gray-700 dark:group-hover:border-gray-300 group-hover:ring-[5px] group-hover:ring-gray-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-gray-200 group-hover:to-transparent dark:group-hover:from-gray-700/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-gray-500/30" },
      { name: "NestJS", isImage: true, src: '/Skills/Nestjs.png', hoverText: "group-hover:text-red-600", hoverBorder: "group-hover:border-red-600 group-hover:ring-[5px] group-hover:ring-red-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-red-100 group-hover:to-transparent dark:group-hover:from-red-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-red-500/30" },
      { name: "RESTful APIs", icon: <TbApi />, color: "text-gray-700 dark:text-gray-300", hoverText: "group-hover:text-gray-900 dark:group-hover:text-white", hoverBorder: "group-hover:border-gray-700 dark:group-hover:border-gray-300 group-hover:ring-[5px] group-hover:ring-gray-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-gray-200 group-hover:to-transparent dark:group-hover:from-gray-700/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-gray-500/30" },
    ],
    database: [
      { name: "MongoDB", icon: <SiMongodb />, color: "text-green-700", hoverText: "group-hover:text-green-800", hoverBorder: "group-hover:border-green-700 group-hover:ring-[5px] group-hover:ring-green-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-green-100 group-hover:to-transparent dark:group-hover:from-green-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-green-500/30" },
      { name: "Mongoose", icon: <SiMongoose />, color: "text-red-800", hoverText: "group-hover:text-red-900", hoverBorder: "group-hover:border-red-800 group-hover:ring-[5px] group-hover:ring-red-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-red-100 group-hover:to-transparent dark:group-hover:from-red-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-red-500/30" },
    ],
    auth: [
      { name: "JWT", icon: <SiJsonwebtokens />, color: "text-pink-500", hoverText: "group-hover:text-pink-600", hoverBorder: "group-hover:border-pink-500 group-hover:ring-[5px] group-hover:ring-pink-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-pink-100 group-hover:to-transparent dark:group-hover:from-pink-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-pink-500/30" },
      { name: "Bcrypt", icon: <FaLock />, color: "text-yellow-500", hoverText: "group-hover:text-yellow-600", hoverBorder: "group-hover:border-yellow-500 group-hover:ring-[5px] group-hover:ring-yellow-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-yellow-100 group-hover:to-transparent dark:group-hover:from-yellow-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-yellow-500/30" },
      { name: "RBAC", icon: <FaUserShield />, color: "text-blue-700", hoverText: "group-hover:text-blue-800", hoverBorder: "group-hover:border-blue-700 group-hover:ring-[5px] group-hover:ring-blue-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-transparent dark:group-hover:from-blue-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-blue-500/30" },
      { name: "Helmet.js", icon: <FaShieldAlt />, color: "text-purple-500", hoverText: "group-hover:text-purple-600", hoverBorder: "group-hover:border-purple-500 group-hover:ring-[5px] group-hover:ring-purple-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-purple-100 group-hover:to-transparent dark:group-hover:from-purple-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-purple-500/30" },
      { name: "Rate Limiting", icon: <FaTachometerAlt />, color: "text-red-500", hoverText: "group-hover:text-red-600", hoverBorder: "group-hover:border-red-500 group-hover:ring-[5px] group-hover:ring-red-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-red-100 group-hover:to-transparent dark:group-hover:from-red-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-red-500/30" },
      { name: "Zod / Joi", icon: <FaCheckDouble />, color: "text-emerald-500", hoverText: "group-hover:text-emerald-600", hoverBorder: "group-hover:border-emerald-500 group-hover:ring-[5px] group-hover:ring-emerald-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-emerald-100 group-hover:to-transparent dark:group-hover:from-emerald-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-emerald-500/30" },
    ],
    payments: [
      { name: "Stripe", icon: <FaStripe />, color: "text-indigo-500", hoverText: "group-hover:text-indigo-600", hoverBorder: "group-hover:border-indigo-500 group-hover:ring-[5px] group-hover:ring-indigo-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-indigo-100 group-hover:to-transparent dark:group-hover:from-indigo-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-indigo-500/30" },
      { name: "PayPal", icon: <FaPaypal />, color: "text-blue-700", hoverText: "group-hover:text-blue-800", hoverBorder: "group-hover:border-blue-700 group-hover:ring-[5px] group-hover:ring-blue-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-transparent dark:group-hover:from-blue-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-blue-500/30" },
      { name: "Cloudinary", icon: <SiCloudinary />, color: "text-blue-400", hoverText: "group-hover:text-blue-500", hoverBorder: "group-hover:border-blue-400 group-hover:ring-[5px] group-hover:ring-blue-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-transparent dark:group-hover:from-blue-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-blue-500/30" },
      { name: "Email Services", icon: <FaEnvelope />, color: "text-red-500", hoverText: "group-hover:text-red-600", hoverBorder: "group-hover:border-red-500 group-hover:ring-[5px] group-hover:ring-red-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-red-100 group-hover:to-transparent dark:group-hover:from-red-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-red-500/30" },
      { name: "Google OAuth", icon: <FaGoogle />, color: "text-blue-500", hoverText: "group-hover:text-blue-600", hoverBorder: "group-hover:border-blue-500 group-hover:ring-[5px] group-hover:ring-blue-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-transparent dark:group-hover:from-blue-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-blue-500/30" },
    ],
    devops: [
      { name: "Docker", icon: <FaDocker />, color: "text-blue-400", hoverText: "group-hover:text-blue-500", hoverBorder: "group-hover:border-blue-400 group-hover:ring-[5px] group-hover:ring-blue-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-transparent dark:group-hover:from-blue-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-blue-500/30" },
      { name: "Git", icon: <FaGitAlt />, color: "text-orange-500", hoverText: "group-hover:text-orange-600", hoverBorder: "group-hover:border-orange-500 group-hover:ring-[5px] group-hover:ring-orange-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-orange-100 group-hover:to-transparent dark:group-hover:from-orange-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-orange-500/30" },
      { name: "GitHub", icon: <FaGithub />, color: "text-black dark:text-white", hoverText: "group-hover:text-black dark:group-hover:text-white", hoverBorder: "group-hover:border-black dark:group-hover:border-white group-hover:ring-[5px] group-hover:ring-gray-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-gray-100 group-hover:to-transparent dark:group-hover:from-gray-700/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-gray-500/30" },
      { name: "Postman", icon: <SiPostman />, color: "text-orange-400", hoverText: "group-hover:text-orange-500", hoverBorder: "group-hover:border-orange-400 group-hover:ring-[5px] group-hover:ring-orange-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-orange-100 group-hover:to-transparent dark:group-hover:from-orange-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-orange-500/30" },
      { name: "Vercel", icon: <SiVercel />, color: "text-black dark:text-white", hoverText: "group-hover:text-black dark:group-hover:text-white", hoverBorder: "group-hover:border-black dark:group-hover:border-white group-hover:ring-[5px] group-hover:ring-gray-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-gray-100 group-hover:to-transparent dark:group-hover:from-gray-700/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-gray-500/30" },
      { name: "Studio3T", isImage: true, src: '/Skills/Studio3T.png', hoverText: "group-hover:text-green-600", hoverBorder: "group-hover:border-green-600 group-hover:ring-[5px] group-hover:ring-green-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-green-100 group-hover:to-transparent dark:group-hover:from-green-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-green-500/30" },
    ],
    other: [
      { name: "Socket.IO", icon: <SiSocketdotio />, color: "text-black dark:text-white", hoverText: "group-hover:text-black dark:group-hover:text-white", hoverBorder: "group-hover:border-black dark:group-hover:border-white group-hover:ring-[5px] group-hover:ring-gray-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-gray-100 group-hover:to-transparent dark:group-hover:from-gray-700/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-gray-500/30" },
      { name: "SaaS Arch", icon: <FaCloud />, color: "text-blue-300", hoverText: "group-hover:text-blue-400", hoverBorder: "group-hover:border-blue-300 group-hover:ring-[5px] group-hover:ring-blue-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-transparent dark:group-hover:from-blue-900/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-blue-500/30" },
      { name: "MVC Pattern", icon: <FaSitemap />, color: "text-gray-600 dark:text-gray-400", hoverText: "group-hover:text-gray-700 dark:group-hover:text-gray-300", hoverBorder: "group-hover:border-gray-600 dark:group-hover:border-gray-400 group-hover:ring-[5px] group-hover:ring-gray-500/20", hoverBg: "group-hover:bg-gradient-to-br group-hover:from-gray-100 group-hover:to-transparent dark:group-hover:from-gray-700/50 dark:group-hover:to-transparent", hoverShadow: "group-hover:shadow-xl group-hover:shadow-gray-500/30" },
    ]
  };

  const renderSection = (title, items) => (
    <div className='bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-gray-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col items-center h-full shadow-md'>
      <h1 className='pb-4 font-bold text-gray-900 dark:text-white text-lg border-b border-gray-200/80 dark:border-slate-800 w-full text-center mb-6'>
        {title}
      </h1>
      <div className='flex flex-wrap justify-center gap-6 w-full'>
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2 group cursor-default">
            <div className={`
              p-3 bg-gray-50 dark:bg-slate-800/80 rounded-xl border border-gray-100 dark:border-slate-700 
              transition-all duration-300
              ${item.hoverBorder} ${item.hoverBg} ${item.hoverShadow} group-hover:shadow-lg
            `}>
              <span className={`flex items-center justify-center w-8 h-8 ${item.color || ''}`}>
                {item.isImage ? (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                    <Image fill sizes="32px" src={item.src} alt={item.name} className="object-contain" />
                  </div>
                ) : (
                  <span className="text-3xl">{item.icon}</span>
                )}
              </span>
            </div>
            <span className={`
              text-gray-900 dark:text-gray-100 text-sm font-bold whitespace-nowrap mt-1 
              transition-colors duration-300
              ${item.hoverText}
            `}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id='skill' className='pt-4 pb-10 flex flex-col items-center md:px-10 px-5'>
      <div className="text-center mb-10">
        <p className="text-4xl font-bold text-gray-900 dark:text-white">{content.title}</p>
        <p className="text-gray-400 text-sm">{content.subtitle}</p>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl'>
        {renderSection(content.frontendTitle, skillsData.frontend)}
        {renderSection(content.backendTitle, skillsData.backend)}
        {renderSection(content.authTitle, skillsData.auth)}
        {renderSection(content.databaseTitle, skillsData.database)}
        {renderSection(content.paymentsTitle, skillsData.payments)}
        {renderSection(content.toolsTitle, skillsData.devops)}
        {renderSection(content.otherTitle, skillsData.other)}

        {/* SoftSkills */}
        <div className='bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-gray-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col items-center h-full shadow-md'>
          <h1 className='pb-4 font-bold text-gray-900 dark:text-white text-lg border-b border-gray-200/80 dark:border-slate-800 w-full text-center mb-6'>
            {content.softSkillsTitle}
          </h1>
          <div className='flex flex-wrap justify-center gap-6 w-full'>
            {content.softSkills && content.softSkills.map((tl, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group cursor-default">
                <div className="p-1 rounded-full border-2 border-transparent group-hover:border-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:shadow-lg group-hover:shadow-blue-200 dark:group-hover:shadow-blue-900/30 transition-all duration-300">
                  <div className="w-14 h-14 relative rounded-full overflow-hidden border border-gray-200 dark:border-slate-700">
                    <Image fill sizes="56px" src={tl.image} alt={tl.name} className="object-cover" />
                  </div>
                </div>
                <span className='text-gray-900 dark:text-gray-100 text-sm font-bold whitespace-nowrap mt-1 group-hover:text-blue-500 transition-colors duration-300'>
                  {tl.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
