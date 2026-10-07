import { motion } from 'framer-motion';

// La boucle translate -50% ne laisse à mi-parcours que la moitié de la bande à
// l'écran : il faut assez de répétitions pour qu'une moitié couvre la largeur
// d'un écran, même 4K. Une copie (4 mots) ≈ 930 px de contenu, donc 10 copies
// ≈ 9 300 px et une moitié ≈ 4 650 px > 3 840 px. 
const REPEATS = 10;

const Marquee = ({ items, speed = 20 }) => {
  const duplicatedItems = Array.from({ length: REPEATS }, () => items).flat();
  // speed = secondes pour parcourir une copie de la liste : garde la même
  // vitesse visuelle (px/s) quelle que soit la largeur totale de la bande.
  const duration = (speed * REPEATS) / 2;

  return (
    <div className="overflow-hidden whitespace-nowrap py-4">
      <motion.div
        className="flex gap-8 md:gap-16 items-center"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration,
            ease: 'linear',
          },
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
