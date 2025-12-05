import React from "react";
import { PublicHeader } from "@/shared/ui/PublicHeader";
import { DayNightBackground } from "@/shared/ui/backgrounds/DayNightBackground";
import { Login } from "@/features/auth/login/Login";
import { motion, Variants } from "framer-motion";

type SocialButtonProps = {
  label: string;
  iconSrc: string;
  onClick?: () => void;
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const auraVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.26, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const socialRowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.26, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const socialButtonVariants: Variants = {
  hidden: { opacity: 0, y: 6, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 20 },
  },
};

const MotionButton = motion.button;

const SocialButton: React.FC<SocialButtonProps> = ({ label, iconSrc, onClick }) => (
  <MotionButton
    type="button"
    onClick={onClick}
    aria-label={label}
    variants={socialButtonVariants}
    className="
      inline-flex h-14 w-14 items-center justify-center 
      rounded-2xl bg-surface border border-border shadow-soft 
      transition-all hover:-translate-y-1 hover:shadow-lg hover:brightness-110 
      active:scale-95 focus-visible:outline-none focus-visible:ring-2 
      focus-visible:ring-primary/60
    "
  >
    <img src={iconSrc} alt={label} className="h-7 w-7 object-contain" />
  </MotionButton>
);

export const LoginPage: React.FC = () => {
  return (
    <>
      <DayNightBackground />
      <PublicHeader />

      <div className="tf-container min-h-[calc(100vh-80px)] flex items-center justify-center py-10 md:py-16 relative z-10">
        <motion.div
          className="relative flex flex-col items-center gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="
              pointer-events-none absolute inset-x-[-40px] -top-4 
              bottom-[-32px] rounded-[40px] bg-primary-soft/40 blur-3xl
            "
            variants={auraVariants}
          />

          <motion.div variants={cardVariants} className="relative z-10">
            <Login />
          </motion.div>

          <motion.div variants={socialRowVariants} className="relative z-10 flex items-center gap-4">
            <SocialButton label="Google" iconSrc="/icons/auth/google.png" />
            <SocialButton label="Facebook" iconSrc="/icons/auth/facebook.png" />
            <SocialButton label="GitHub" iconSrc="/icons/auth/github.png" />
            <SocialButton label="LinkedIn" iconSrc="/icons/auth/linkedin.png" />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};
