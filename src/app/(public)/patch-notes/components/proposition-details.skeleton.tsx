import React from 'react';
import { motion } from 'framer-motion';

export const PropositionDetailsSkeleton: React.FC = () => {
  return (
    <motion.div
      className="h-full w-1/2 px-10 pt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="h-full w-full focus:outline-none rounded-lg gap-4 flex flex-col animate-pulse">
        <div className="bg-gray-200 w-full h-40 rounded"></div>

        <div className="">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex">
              <div className="bg-gray-200 w-1/2 h-10 rounded-l"></div>
              <div className="bg-gray-100 w-1/2 h-10 rounded-r"></div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="bg-gray-200 w-full h-10 rounded"></div>
          <div className="bg-gray-100 w-full h-40 rounded"></div>
        </div>

        <div className="bg-gray-100 w-full h-60 rounded"></div>
      </div>
    </motion.div>
  );
};
