'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        opacity: {
          ease: 'easeInOut',
          duration: 0.75,
        },
        transform: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
          duration: 3,
        },
      }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}
