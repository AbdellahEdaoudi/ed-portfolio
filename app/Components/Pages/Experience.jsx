import { CalendarIcon, MapPinIcon, Briefcase, Trophy } from '../Icons';

export default function Experience({ content }) {

    if (!content) return null;

    return (
        <section className="py-5 min-h-screen">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-6">
                    <h2 className="text-4xl font-bold dark:text-white">{content.title}</h2>
                    <p className="text-gray-400 text-sm">{content.subtitle}</p>
                </div>

                <div className="grid gap-6">
                    {content.items && content.items.map((item, index) => (
                        <div key={index} className="bg-white/70 dark:bg-[#0b1b2b]/70 backdrop-blur-sm border border-gray-100 dark:border-[#13283d] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                            {/* Card Top Border */}
                            <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-blue-600 dark:to-blue-400 transform scale-x-100 transition-transform duration-500 origin-left"></div>

                            <div className="p-5 md:p-6">
                                <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-default">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1 text-gray-600 dark:text-gray-400 font-medium text-sm">
                                            <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-md text-xs flex items-center gap-1 font-semibold dark:border dark:border-blue-900/40">
                                                <Briefcase className="w-3 h-3" /> {item.company}
                                            </span>
                                            <span className="text-gray-300 dark:text-gray-600">|</span>
                                            <span className="text-gray-500 dark:text-gray-400">{item.type}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:items-end gap-1.5 text-sm">
                                        <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 font-semibold bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 px-2.5 py-1 rounded-md w-fit">
                                            <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-blue-500 dark:text-blue-400" />
                                            {item.startDate} - {item.endDate}
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                            {item.duration && (
                                                <span>{item.duration}</span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <MapPinIcon className="w-3 h-3 text-red-400" /> {item.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Separator */}
                                <div className="border-t border-gray-100 dark:border-[#13283d] my-4"></div>

                                <div className="space-y-3">
                                    {(item.responsibilities || item.description) && (
                                        <div>
                                            <h4 className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-slate-200 uppercase tracking-widest mb-3">
                                                <Trophy className="w-4 h-4 hidden text-amber-500" />
                                                {item.achievementsLabel}
                                            </h4>
                                            <ul className="grid grid-cols-1 gap-2">
                                                {(item.responsibilities || item.description).map((text, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed group/item">
                                                        <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full group-hover/item:scale-125 transition-transform flex-shrink-0"></span>
                                                        {text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
