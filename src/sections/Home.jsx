import React, { useMemo, useEffect, useState } from "react";
import ParticlesBackground from "./../components/ParticlesBackground";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import avator from "../assets/avator.png";

const socials = [
  { icon: FaXTwitter, label: "X", href: "#my twitter link" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "my linkedlin link" },
  { icon: FaGithub, label: "Github", href: "my github link" },
];

const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgbs(13, 88, 204,0.9)) drop-shadow(0 0 18px rgbs(16, 185, 129,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: { duration: 0.08 },
  },
};

export default function Home() {
  // List of roles shown in the typewriter animation
  const roles = useMemo(
    () => [
      "Web Developer",
      "MERN Stack Developer",
      "Frontend Developer",
      "Backend Developer",
    ],
    []
  );

  // State for typewriter animation
  const [index, setIndex] = useState(0); // Current role index
  const [subIndex, setSubIndex] = useState(0); // Current character index
  const [deleting, setDeleting] = useState(false); // Typing / deleting toggle

  // Typewriter effect logic
  useEffect(() => {
    const currentText = roles[index];

    const timeout = setTimeout(
      () => {
        // Typing characters
        if (!deleting && subIndex < currentText.length) {
          setSubIndex((v) => v + 1);
        }
        // Pause after typing is complete
        else if (!deleting && subIndex === currentText.length) {
          setTimeout(() => setDeleting(true), 1500);
        }
        // Deleting characters
        else if (deleting && subIndex > 0) {
          setSubIndex((v) => v - 1);
        }
        // Move to next role
        else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((v) => (v + 1) % roles.length);
        }
      },
      deleting ? 40 : 60
    );

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section
      id="home"
      className="w-full h-screen relative bg-black overflow-hidden"
    >
      {/* Particle animation background */}
      <ParticlesBackground />

      {/* Background gradient effects */}
      <div className="absolute inset-0">
        {/* Top-left glowing blob */}
        <div
          className="absolute -top-32 -left-32
          w-[70vw] sm:w-[50vw] md:w-[40vw]
          h-[70vw] sm:h-[50vw] md:h-[40vw]
          max-w-xl
          rounded-full
          bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
          opacity-30 blur-[120px] animate-pulse"
        />

        {/* Bottom-right glowing blob */}
        <div
          className="absolute bottom-0 right-0
          w-[70vw] sm:w-[50vw] md:w-[40vw]
          h-[70vw] sm:h-[50vw] md:h-[40vw]
          max-w-xl
          rounded-full
          bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
          opacity-30 blur-[120px] animate-pulse delay-500"
        />

        {/* Main content container */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center h-full text-center lg:text-left">
            <div className="max-w-3xl mx-auto lg:mx-0 lg:pr-24">
              {/* Animated role text */}
              <motion.div
                className="mb-3 text-xl sm:text-2xl md:text-3xl font-semibold text-white min-h-[1.6em]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span>{roles[index].substring(0, subIndex)}</span>
                <span className="inline-block w-0.5 ml-1 bg-white animate-pulse h-[1em]" />
              </motion.div>

              {/* Main heading */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold
                text-transparent bg-clip-text
                bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                Hello, I'm
                <br />
                <span className="block text-white text-6xl md:text-7xl font-bold">
                  Rajan
                </span>
              </motion.h1>

              {/* Short description */}
              <motion.p
                className="mt-6 text-lg text-gray-300 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                I turn complex ideas into seamless, high-impact web experiences
                — building modern, scalable, and lightning-fast applications
                that make a difference.
              </motion.p>

              {/* Action buttons */}
              <motion.div
                className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-full text-white font-medium
                  bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]
                  hover:scale-105 transition-transform"
                >
                  View My Work
                </a>

                <a
                  href="/Rajan.pdf"
                  download
                  className="px-6 py-3 rounded-full bg-white text-black font-medium
                  hover:bg-gray-200 hover:scale-105 transition-transform"
                >
                  My Resume
                </a>
              </motion.div>
              <div className="mt-10 flex gap-5 text-2xl md:text-3xl  lg:text-4xl justify-start">
                {socials.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    href={href}
                    key={label}
                    target="_blank"
                    aria-label={label}
                    rel="noopener noreferrer"
                    variants={glowVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="text-gray-300"
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          <div className=" relative hidden lg:block">
            <div
              className="absolute top 1/2 -translate-y-1/2 pointer-events-none"
              style={{
                right: "10px",
                width: "min(22vw,410px)",
                height: "(40 vw,410px)",
                borderRadius: "50%",
                filter: "blur(38px)",
                opacity: 0.32,
                background:
                  "conic-gradient(from 0deg, #1cd8d2, #00bf8f,302b63,#1cd8d2)",
              }}
            />
            <motion.img
              src={avator}
              alt="Rajan"
              className=" absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none"
              style={{
                right: "30px",
                width: "min(45w,780px)",
                maxHeight: "90vh",
              }}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
