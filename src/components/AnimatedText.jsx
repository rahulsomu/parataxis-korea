import React from "react";
import { useTranslation } from "../context/TranslationContext";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedText1 = () => {
  const { language } = useTranslation();

  const lines = {
    en: ["Built on trust.", "Powered by expertise.", "Led by operators."],
    kr: ["신뢰를 기본으로.", "전문성을 더해.", "실행으로 앞서갑니다."],
  };

  const container = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.12,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.08,
        staggerDirection: -1,
        duration: 0.3,
      },
    },
  };

  const item = {
    initial: {
      y: 20,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="animated-text-wrapper">
      <AnimatePresence mode="wait" initial={true}>
        <motion.div
          className="animated-text"
          key={language}
          variants={container}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {lines[language].map((line, index) => (
            <motion.div
              key={`${language}-${index}`}
              variants={item}
              className="hero-line"
              style={{ opacity: 1 }}
            >
              {line}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default React.memo(AnimatedText1);
