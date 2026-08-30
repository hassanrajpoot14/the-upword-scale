/** Shared Framer Motion spring presets — weighted SaaS feel */
export const SPRING = {
  reveal: { type: "spring", stiffness: 80, damping: 15 },
  hover: { type: "spring", stiffness: 320, damping: 22 },
  snappy: { type: "spring", stiffness: 260, damping: 24 },
};

export const HOVER_LIFT = { y: -6, scale: 1.01 };
export const HOVER_LIFT_STRONG = { y: -8, scale: 1.015 };

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.04) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const revealChild = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING.reveal,
  },
};
