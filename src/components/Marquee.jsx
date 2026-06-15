import { motion } from 'framer-motion';

const Marquee = ({ items, speed = 20 }) => {
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap py-4">
      <motion.div
        className="flex gap-8 md:gap-16 items-center"
        animate={{
          x: [0, -33.33 + '%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
        whileHover={{
          animationPlayState: 'paused',
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 md:gap-16 shrink-0">
            <span className="font-sans font-semibold tracking-wider text-sm md:text-base text-shadow">
              {item}
            </span>
            <span className="text-white/60">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
