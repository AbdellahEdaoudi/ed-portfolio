import Image from "next/image";
import { CalendarIcon, MapPinIcon, School } from '../Icons';


export default function Education({ content }) {

  if (!content) return null;

  return (
    <section className="py-5 mx-auto sm:mx-16 md:mx-28 lg:mx-52">
      <div className="text-center mb-6">
        <p className="text-4xl font-bold dark:text-white">{content.title}</p>
        <p className="text-gray-400 text-sm">{content.subtitle}</p>
      </div>
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          {content.items && content.items.map((item, index) => (
            <div key={index} className="overflow-hidden transition-all hover:shadow-xl ring-1 ring-gray-200 dark:ring-slate-800 rounded-2xl bg-white/70 dark:bg-[#0b1b2b]/70 backdrop-blur-sm shadow-md">
              <div className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 border-r-2 rounded-l-2xl border-r-gray-100 dark:border-r-slate-800 overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.institution}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h3 className="text-xl font-bold mb-2 dark:text-white">{item.degree}</h3>
                    <div className="flex gap-2 items-center mb-4">
                      <span className="text-sky-950 dark:text-blue-400"><School width={18} /></span>
                      <span dangerouslySetInnerHTML={{ __html: item.institution }} className="text-sm dark:text-gray-300"></span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      {item.startDate && item.endDate && (
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <CalendarIcon className="mr-2 h-4 w-4 text-green-500 dark:text-blue-400" />
                          {item.startDate} - {item.endDate}
                        </div>
                      )}
                      {item.location && (
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <MapPinIcon className="mr-2 h-4 w-4 text-red-400" />
                          {item.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
