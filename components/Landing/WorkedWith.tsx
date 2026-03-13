"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import Image from "next/image";

const experiences = [
  {
    company: "75Way Technologies",
    logo: "/75way.jpg",
    role: "Full Stack Developer",
    period: "2025 - Present",
    location: "Mohali, Phase 8B Punjab",
    description: "Led development of enterprise SaaS platforms and mobile applications, implementing scalable microservice architectures.",
    tech: ["React", "Node.JS", "React Native", "Next.JS", "TypeScript"],
  },
  {
    company: "CMPDI",
    logo: "/cmpdi1.png",
    role: "Software Developer",
    period: "2021 - 2022",
    location: "Ranchi, Jharkhand",
    description: "Developed internal management systems and data visualization dashboards for mining operations.",
    tech: ["Python", "React", "PostgreSQL", "Docker"],
  },
  {
    company: "Hashbit Solutions",
    logo: "/hashbit.jpg",
    role: "Frontend Developer",
    period: "2020 - 2021",
    location: "Remote",
    description: "Built responsive web applications and contributed to open-source projects using modern frontend frameworks.",
    tech: ["React", "Next.js", "Tailwind CSS", "Firebase"],
  },
];

export const WorkedWith = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-4xl font-bold text-white mb-4"
        >
          Worked <span className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">With</span>
          <hr className="bg-linear-to-r from-blue-400 to-emerald-400 h-1 w-xs mx-auto mt-3" />

        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-400 text-lg"
        >
          Companies and organizations I've collaborated with
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full bg-slate-900/40 hover:bg-slate-900/60 transition-all duration-300 p-4 flex flex-col group backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="h-12 w-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Image
                    src={exp.logo}
                    alt={exp.company}
                    width={48}
                    height={48}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {exp.company}
                  </h3>
                  <p className="text-blue-500 font-medium text-sm">{exp.role}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <FiCalendar className="h-4 w-4" />
                  <span>{exp.period}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiMapPin className="h-4 w-4" />
                  <span>{exp.location}</span>
                </div>
              </div>

              <p className="text-slate-400 mb-8 leading-relaxed grow text-sm">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600/20 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
