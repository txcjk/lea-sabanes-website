import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import Card from './Card';

const ServiceCard = ({
  title,
  icon: Icon,
  iconBg,
  services,
  quote,
  profileType,
  accentColor,
  onSelectProfile,
}) => {
  const { selectedProfile } = useProfile();
  const isActive = selectedProfile === profileType;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card
        className={`h-full flex flex-col p-8 transition-all duration-300 border-t-4 ${
          isActive
            ? `shadow-2xl ring-2 ring-peach scale-[1.02] ${accentColor}`
            : `hover:shadow-lg ${accentColor}`
        }`}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center`}>
            <Icon size={24} />
          </div>
          <h3 className="font-serif text-2xl text-charcoal">{title}</h3>
        </div>

        <ul className="space-y-4 flex-grow mb-8">
          {services.map((service, idx) => (
            <motion.li
              key={idx}
              className="flex items-start gap-3 group/item"
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Check
                  size={20}
                  className="text-peach shrink-0 mt-0.5 group-hover/item:text-teal transition-colors"
                />
              </motion.div>
              <span className="font-sans text-charcoal/80">{service}</span>
            </motion.li>
          ))}
        </ul>

        <p className="font-serif italic text-peach text-lg mb-6">{quote}</p>

        <button
          onClick={() => onSelectProfile(profileType)}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-peach text-white font-sans font-medium text-sm hover:bg-peach/90 transition-colors group/btn"
        >
          Sélectionner ce profil
          <ArrowRight
            size={16}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </button>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
