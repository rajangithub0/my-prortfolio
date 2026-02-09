import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

/* ------------------ Data ------------------ */
const experiences = [
  {
    role: "Web developer",
    company: "Rana Accountancy",
    duration: "2018-2022",
    description:
      "Built high-performance apps, integrated AI features, improved engagement by 10%",
  },
  {
    role: "Full Stack Developer (Internship)",
    company: "Skill Academy ",
    duration: "2023",
    description:
      "Built and maintained internal web applications.Developed UI components and improved performance.",
  },
  {
    role: "Operater",
    company: "Kunatum Paper Ltd",
    duration: "2023-Present",
    description: "Worked on animations and scroll-based interactions.",
  },
];

/* ------------------ Experience Item ------------------ */
function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const scale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(
    scrollYProgress,
    [start, end],
    [idx % 2 === 0 ? 30 : -30, 0],
  );
  const x = useTransform(scrollYProgress, [start, end], [-24, 0]);

  /* ---------- Desktop ---------- */
  if (layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        {/* Dot */}
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white 
                     shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          style={{ scale, opacity }}
        />

        {/* Connector */}
        <div
          className={`absolute ${
            idx % 2 === 0 ? "-top-8" : "-bottom-8"
          } w-px h-8 bg-white/40`}
        />

        {/* Card */}
        <motion.article
          className={`absolute ${
            idx % 2 === 0 ? "bottom-12" : "top-12"
          } bg-gray-900/80 backdrop-blur border border-gray-700/70 
          rounded-xl p-7 w-[320px] shadow-lg`}
          style={{ opacity, y, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <h3 className="text-xl font-semibold">{exp.role}</h3>
          <p className="text-sm text-gray-400 mb-3">
            {exp.company} · {exp.duration}
          </p>
          <p className="text-sm text-gray-300 wrap-break-word overflow-wrap-break-word">
            {exp.description}
          </p>
        </motion.article>
      </div>
    );
  }

  /* ---------- Mobile ---------- */
  return (
    <div className="relative flex items-start mb-10">
      <motion.div
        className="absolute -left-10 top-3 z-10 w-7 h-7 rounded-full bg-white
                   shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
        style={{ scale, opacity }}
      />

      <motion.article
        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 
                   rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
        style={{ opacity, x }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <h3 className="text-lg font-semibold wrap-break-word overflow-wrap-break-word">
          {exp.role}
        </h3>
        <p className="text-sm text-gray-400 mb-2 wrap-break-word overflow-wrap-break-word">
          {exp.company} · {exp.duration}
        </p>
        <p className="text-sm text-gray-300 wrap-break-word overflow-wrap-break-word">
          {exp.description}
        </p>
      </motion.article>
    </div>
  );
}

/* ------------------ Main Component ------------------ */
export default function Experience() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  /* ---------- Screen Check ---------- */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile
    ? 160 * experiences.length
    : 120 * experiences.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = useMemo(
    () => experiences.map((_, i) => (i + 1) / experiences.length),
    [],
  );

  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="relative text-white bg-black">
      <div
        ref={sceneRef}
        className="relative"
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-bold mt-6 text-center">
            Experience
          </h2>

          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {!isMobile && (
              <div className="relative w-full max-w-7xl">
                {/* Timeline */}
                <div className="relative h-1.5 bg-white/15 rounded">
                  <motion.div
                    className="absolute top-0 left-0 h-1.5 bg-white rounded origin-left"
                    style={{ width: lineSize }}
                  />
                </div>

                {/* Items */}
                <div className="relative flex justify-between mt-0">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Mobile list */}
            {isMobile && (
              <div className="w-full mt-10">
                {experiences.map((exp, idx) => (
                  <ExperienceItem
                    key={idx}
                    exp={exp}
                    idx={idx}
                    start={idx === 0 ? 0 : thresholds[idx - 1]}
                    end={thresholds[idx]}
                    scrollYProgress={scrollYProgress}
                    layout="mobile"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
