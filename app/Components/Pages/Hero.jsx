import Image from "next/image";
import Link from "next/link";
import { 
  FaReact, 
  FaNodeJs
} from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiNestjs
} from "react-icons/si";

function Hero({ content, lang }) {
  if (!content) return null;

  const isRtl = lang === "ar" || lang === "fa";

  const floatingBadges = content.floatingBadges || {
    frontend: {
      title: "React.js & Next.js",
      subtitle: isRtl ? "واجهات متطورة" : "Modern UI"
    },
    backend: {
      title: "Node.js & NestJS",
      subtitle: isRtl ? "واجهات خلفية" : "Backend APIs"
    }
  };

  const socialLinks = [
    { id: "linkedin", href: "https://www.linkedin.com/in/abdellah-edaoudi", icon: "/icons/linkedin.svg", alt: "LinkedIn" },
    { id: "github", href: "https://github.com/AbdellahEdaoudi", icon: "/icons/github.svg", alt: "GitHub" },
    { id: "youtube", href: "https://www.youtube.com/@edaoudi.abdellah", icon: "/icons/youtube.svg", alt: "YouTube" },
    { id: "twitter", href: "https://x.com/Edaoudi_abde", icon: "/icons/twitter.svg", alt: "X (Twitter)" },
    { id: "instagram", href: "https://www.instagram.com/edaoudi_abdellah/", icon: "/icons/instagram.svg", alt: "Instagram" }
  ];

  return (
    <section className="mx-4 min-h-[calc(100vh-5rem)] flex items-center justify-center py-6">
      <div className="flex md:flex-row flex-col-reverse items-center justify-center gap-8 md:gap-14 lg:gap-24 w-full max-w-6xl duration-300">
        
        {/* Profile Content - Centered */}
        <div className="space-y-6 flex flex-col items-center justify-center text-center">
          
          {/* Greeting - Responsive text size and natural wrapping to prevent overflow in all languages */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-snug break-words max-w-xl" dir="auto">
            {content.greeting}
          </h1>

          {/* Role */}
          <h2 className="text-2xl md:text-[1.7rem] font-bold dark:text-blue-400 text-blue-600 text-center">
            {content.role}
          </h2>

          {/* Description Box */}
          <p className="border border-white/40 dark:border-slate-800 rounded-2xl md:w-[460px] text-justify p-4 sm:p-5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm shadow-xl text-gray-800 dark:text-gray-200 leading-relaxed transition-all duration-500 hover:bg-white/80 dark:hover:bg-slate-900/90">
            {content.description}
          </p>

          {/* Social Links */}
          <div className="flex gap-3 justify-center pt-2">
            {socialLinks.map((social) => (
              <Link
                key={social.id}
                href={social.href}
                target="_blank"
                className="hover:scale-110 transition-all duration-300 active:scale-95 bg-white/60 dark:bg-slate-800/60 p-2.5 rounded-xl border border-gray-200/60 dark:border-slate-700/50 shadow-sm hover:shadow-md dark:hover:shadow-blue-900/20 hover:-translate-y-0.5 backdrop-blur-sm"
                title={`${social.alt} - Abdellah Edaoudi`}
              >
                <Image
                  src={social.icon}
                  alt={`Abdellah Edaoudi ${social.alt}`}
                  width={28}
                  height={28}
                  className="w-7 h-7 drop-shadow-sm dark:brightness-110"
                />
              </Link>
            ))}
          </div>

        </div>

        {/* Image Section - With Combined Floating Badges (React.js & Next.js) and (Node.js & NestJS) */}
        <div className="relative group animate-float shrink-0 my-4 md:my-0">
          {/* Decorative Brackets */}
          <div className="absolute -top-6 -left-6 text-blue-600/10 dark:text-blue-400/20 text-[6rem] font-serif transition-all duration-700 group-hover:-translate-x-3 group-hover:-translate-y-3 select-none leading-none pointer-events-none">
            {isRtl ? '}' : '{'}
          </div>
          <div className="absolute -bottom-6 -right-6 text-purple-600/10 dark:text-blue-400/20 text-[6rem] font-serif transition-all duration-700 group-hover:translate-x-3 group-hover:translate-y-3 select-none leading-none pointer-events-none">
            {isRtl ? '{' : '}'}
          </div>

          <div className="absolute -inset-6 bg-gradient-to-br from-blue-100/30 via-purple-50/30 to-transparent dark:from-blue-500/20 dark:via-blue-600/10 dark:to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          {/* Border Outline */}
          <div className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} w-full h-full border border-gray-100 dark:border-slate-800 rounded-[2.5rem] transition-transform duration-500 ${isRtl ? 'group-hover:translate-x-2' : 'group-hover:-translate-x-2'} group-hover:translate-y-2`}></div>

          {/* Profile Card Frame */}
          <div className="relative z-10 p-[1px] bg-gradient-to-br from-gray-200 via-white to-gray-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.01]">
            <div className="relative bg-white dark:bg-slate-900 p-2 rounded-[2.5rem] overflow-hidden">
              <div className="overflow-hidden rounded-[2rem] bg-gray-100 dark:bg-slate-800 relative md:w-80 md:h-[360px] w-64 h-72 sm:w-72 sm:h-80">
                {/* Loader / Placeholder Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-pulse"></div>

                <Image
                  src="/profile/new-profile.jpg"
                  className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105 relative z-10"
                  alt="Abdellah Edaoudi - Full Stack Developer"
                  width={500}
                  height={500}
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 dark:via-blue-500/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              </div>
            </div>
          </div>

          {/* Floating Badge 1: React.js & Next.js (Top) */}
          <div className={`absolute ${isRtl ? '-top-3 -left-3 sm:-top-4 sm:-left-6' : '-top-3 -right-3 sm:-top-4 sm:-right-6'} z-30 animate-float`}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-gray-200/80 dark:border-slate-700/80 shadow-lg hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-1.5">
                <div className="p-1 rounded-md bg-cyan-500/10 text-cyan-500 dark:text-cyan-400">
                  <FaReact className="w-3.5 h-3.5" />
                </div>
                <div className="p-1 rounded-md bg-black dark:bg-slate-800 text-white">
                  <SiNextdotjs className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">
                  {floatingBadges.frontend.title}
                </span>
                <span className="text-[9px] text-gray-500 dark:text-gray-400 font-medium">
                  {floatingBadges.frontend.subtitle}
                </span>
              </div>
            </div>
          </div>

          {/* Floating Badge 2: Node.js & NestJS (Bottom) */}
          <div className={`absolute ${isRtl ? '-bottom-3 -right-3 sm:-bottom-4 sm:-right-6' : '-bottom-3 -left-3 sm:-bottom-4 sm:-left-6'} z-30 animate-float-slow`}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-gray-200/80 dark:border-slate-700/80 shadow-lg hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-1.5">
                <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <FaNodeJs className="w-3.5 h-3.5" />
                </div>
                <div className="p-1 rounded-md bg-red-500/10 text-red-500">
                  <SiNestjs className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">
                  {floatingBadges.backend.title}
                </span>
                <span className="text-[9px] text-gray-500 dark:text-gray-400 font-medium">
                  {floatingBadges.backend.subtitle}
                </span>
              </div>
            </div>
          </div>

          {/* Vertical Text */}
          <div className={`absolute ${isRtl ? '-left-6' : '-right-6'} top-10 hidden sm:flex flex-col items-center gap-4 z-20`}>
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-blue-500"></div>
            <span className={`[writing-mode:vertical-lr] ${isRtl ? 'rotate-180' : ''} text-[10px] uppercase tracking-[0.4em] font-bold text-blue-600 dark:text-blue-400 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-2 rounded-full border border-blue-100 dark:border-blue-900/50 shadow-sm transition-transform duration-500 group-hover:-translate-y-2`}>
              {content.portfolio || "Portfolio"} {new Date().getFullYear()}
            </span>
          </div>

          {/* Corner Decoration */}
          <div className={`absolute -bottom-2 ${isRtl ? '-right-2 border-b-2 border-r-2 rounded-br-xl' : '-left-2 border-b-2 border-l-2 rounded-bl-xl'} w-10 h-10 border-purple-500/20 dark:border-blue-400/30 transition-all duration-500 group-hover:-translate-x-2 group-hover:translate-y-2`}></div>
        </div>

      </div>
    </section>
  );
}

export default Hero;