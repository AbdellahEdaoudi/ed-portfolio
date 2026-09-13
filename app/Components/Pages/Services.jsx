import React from 'react';

function Services({ content }) {
  if (!content) return null;
  const { title, subtitle, items } = content;

  return (
    <section id="services" className="pb-7 pt-4 md:mx-7">
      <div className="text-center mb-6">
        <p className="text-4xl font-bold text-gray-900 dark:text-white">{title}</p>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center px-4 max-w-7xl mx-auto">
        {items?.map((item, index) => (
          <div key={index} className="bg-white/70 dark:bg-[#0b1b2b]/70 backdrop-blur-sm flex flex-col w-full max-w-sm hover:-translate-y-2 border border-emerald-100/50 dark:border-[#13283d] duration-300 rounded-2xl shadow-xl hover:shadow-emerald-500/20 dark:hover:shadow-blue-500/20 p-6 transition-all group">
            <div className="w-14 h-14 bg-emerald-50 dark:bg-blue-950/60 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500 dark:group-hover:bg-blue-600 transition-colors duration-300 shadow-sm">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-emerald-600 dark:text-blue-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 {index === 0 && <><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></>}
                 {index === 1 && <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />}
                 {index === 2 && <> <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/> <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/> </>}
                 {index === 3 && <> <ellipse cx="12" cy="5" rx="9" ry="3"/> <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/> <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/> </>}
                 {index === 4 && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>}
                 {index === 5 && <> <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/> <line x1="3" y1="9" x2="21" y2="9"/> <line x1="9" y1="21" x2="9" y2="9"/> </>}
                 {index > 5 && <circle cx="12" cy="12" r="10" />}
               </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-emerald-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
