import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

export default function IntroAnimation({ onFinish }) {
  const greetings = useMemo(
    () => [
      "مرحبا", // Arabic
      "Hello", // English
      "Hola", // Spanish
      "Bonjour", // French
      "Hallo", // German
      "Ciao", // Italian
      "Olá", // Portuguese
      "Привет", // Russian
      "你好", // Chinese
      "こんにちは", // Japanese
      "안녕하세요", // Korean
      "नमस्ते", // Hindi
      "Hej", // Swedish
      "Merhaba", // Turkish
      "Γεια", // Greek
      "שלום", // Hebrew
      "Halo", // Indonesian
      "สวัสดี", // Thai
      "Xin chào", // Vietnamese
      "Cześć", // Polish
      "Salam", // Persian/Urdu
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const id = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 180);

      return () => clearTimeout(id);
    } else {
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [index, greetings.length]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black text-white overflow-hidden"
          initial={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            key={index}
            className="text-5xl md:text-7xl lg:text-8xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.12 }}
          >
            {greetings[index]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
