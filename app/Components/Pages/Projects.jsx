import Image from 'next/image';
import Link from 'next/link';

function Projects({ content }) {
  if (!content) return null;
  const { items: projects, title, subtitle, preview, readMore, showLess, requirementsLabel, githubView, frontendLabel, backendLabel } = content;

  return (
    <section id="prtfl" className="pb-7 pt-4">
      <div className="text-center mb-6">
        <p className="text-4xl font-bold dark:text-white">{title}</p>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 justify-items-center px-4">
        {projects?.map((p, i) => (
          <div key={i} className="bg-white/70 dark:bg-[#0b1b2b]/70 backdrop-blur-sm flex flex-col w-80 hover:scale-[1.03] border border-white/40 dark:border-[#13283d] duration-300 rounded-lg shadow-2xl pb-4 mb-5 overflow-hidden transition-all hover:bg-white/80 dark:hover:bg-[#112438]">
            <Link href={p.websiteUrl} target="_blank" rel="noopener noreferrer">
              <Image width={800} height={450}
                className="w-96 rounded-md border-b-2 cursor-pointer dark:border-[#13283d]"
                src={p.image}
                alt={p.title || "Project Image"}
                priority={i < 3}
              />
            </Link>
            <div>
              <div className="flex justify-between items-start gap-2 px-3 py-3">
                <h1 className="text-[16px] underline flex-1 leading-snug break-words min-w-0 dark:text-white">{p.title}</h1>
                <Link href={p.websiteUrl} className="flex-shrink-0 flex items-center gap-1 hover:scale-105 duration-300 hover:text-sky-500 hover:bg-sky-50 border p-1 rounded-md bg-gray-100 dark:bg-slate-800 dark:border-slate-700 dark:text-blue-400 dark:hover:bg-blue-950/60" target="_blank">
                  <Image src="/Projects/WebSite.png" width={17} height={17} alt="WebSite" />
                  <span className="ml-1 text-xs sm:text-sm font-medium whitespace-nowrap">{preview}</span>
                </Link>
              </div>
              {/* Description */}
              <div className="relative px-3 py-2 text-[12px] border text-gray-500 dark:text-gray-300 dark:border-[#13283d]">
                <input type="checkbox" id={`expand-${i}`} className="peer hidden" />
                <h2 className="line-clamp-5 peer-checked:line-clamp-none peer-checked:h-auto overflow-hidden transition-all duration-300">
                  {p.description}
                </h2>
                {p.description.length > 200 && (
                  <>
                    <label htmlFor={`expand-${i}`} className="text-blue-500 dark:text-blue-400 cursor-pointer block mt-1 hover:underline peer-checked:hidden text-right">
                      {readMore}
                    </label>
                    <label htmlFor={`expand-${i}`} className="text-blue-500 dark:text-blue-400 cursor-pointer hidden mt-1 hover:underline peer-checked:block text-right">
                      {showLess}
                    </label>
                  </>
                )}
              </div>
              {/* technologies */}
              <div className="flex flex-wrap gap-2 justify-around py-2 px-1 border dark:border-[#13283d]">
                {p.technologies.map((tech, i) => (
                  <div key={i} className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 rounded-full px-1 py-0.5 shadow-sm hover:shadow-md transition-shadow duration-300 text-xs dark:border dark:border-slate-700">
                    <Image src={tech.logo} alt={tech.name} width={18} height={18} className="rounded-full w-[18px] h-[18px]" />
                    <p className="text-xs text-gray-700 dark:text-gray-300">{tech.name}</p>
                  </div>
                ))}
              </div>
              {/* github urls and Requirements */}
              <div className="flex flex-wrap justify-around items-center mt-3 gap-2 px-2">
                {p.githubFrontendUrl && (
                  <Link href={p.githubFrontendUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 p-2 rounded-md border border-gray-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 shadow-sm hover:shadow-md">
                    <Image src={"/icons/github.svg"} alt={"Github Logo"} width={20} height={20} className="mr-1 rounded-full dark:brightness-125" />
                    <span className="text-sm">
                      {(p.type === "backend" || (!p.githubBackendUrl && !p.githubNestjsBackendUrl)) ? githubView : frontendLabel}
                    </span>
                  </Link>
                )}
                {p.githubBackendUrl && (
                  <Link href={p.githubBackendUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 p-2 rounded-md border border-gray-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 shadow-sm hover:shadow-md">
                    <Image src={"/icons/github.svg"} alt={"Github Logo"} width={20} height={20} className="mr-1 rounded-full dark:brightness-125" />
                    <span className="text-sm">
                      {p.githubNestjsBackendUrl ? `${backendLabel} (Node.js)` : backendLabel}
                    </span>
                  </Link>
                )}
                {p.githubNestjsBackendUrl && (
                  <Link href={p.githubNestjsBackendUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 p-2 rounded-md border border-gray-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 shadow-sm hover:shadow-md">
                    <Image src={"/icons/github.svg"} alt={"Github Logo"} width={20} height={20} className="mr-1 rounded-full dark:brightness-125" />
                    <span className="text-sm">{backendLabel} (NestJS)</span>
                  </Link>
                )}
                {p.Requirements && (
                  <Link href={p.Requirements} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-blue-400 transition-colors duration-300 p-2 rounded-md border border-gray-300 dark:border-slate-700 hover:border-black dark:hover:border-blue-400 shadow-sm hover:shadow-md">
                    <Image src={"/Projects/WebSite.png"} alt={"Requirements Icon"} width={18} height={18} className="brightness-0 dark:invert" />
                    <span className="text-sm">{requirementsLabel}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;

