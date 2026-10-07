import { motion } from 'framer-motion';
import { Briefcase, User, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useProfile } from '../context/ProfileContext';
import Marquee from '../components/Marquee';
import ServiceCard from '../components/ServiceCard';
import BlogPreview from '../components/BlogPreview';
import { blogData } from '../data/blogData';

const Home = () => {
  const { setSelectedProfile } = useProfile();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const proServices = [
    "Gestion administrative courante",
    "Facturation & suivi des paiements",
    "Relances clients & fournisseurs",
    "Gestion de dossiers & documents",
    "Secrétariat externalisé",
    "Préparation de tableaux de suivi",
    "Support RH & gestion du personnel"
  ];

  const particulierServices = [
    "Démarches administratives",
    "Courriers & déclarations",
    "Organismes publics",
    "Dossiers retraite",
    "Successions",
    "Classement & organisation"
  ];

  const values = ['RIGUEUR', 'DISCRÉTION', 'RÉACTIVITÉ', 'CONFIANCE'];
  const latestPosts = blogData.slice(0, 2);

  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile);
    scrollToContact();
  };

  const handleCTAClick = () => {
    scrollToContact();
  };

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Accueil | Léa Sabanès - Gestion Administrative</title>
        <link rel="canonical" href="https://leasabanes.fr/" />
        <meta name="description" content="L'administration simplifiée, en toute confiance. Services d'assistance administrative pour professionnels et particuliers." />
        <meta property="og:title" content="Léa Sabanès - Gestion Administrative & Accompagnement" />
        <meta property="og:description" content="Déléguez vos tâches administratives à une experte de confiance. Rigueur, discrétion, réactivité." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:image" content="https://leasabanes.fr/images/lea-profile.webp" />
        <meta property="og:image:alt" content="Léa Sabanès - Gestion Administrative" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Léa Sabanès - Gestion Administrative" />
        <meta name="twitter:description" content="Services d'assistance administrative pour professionnels et particuliers." />
        <meta name="twitter:image" content="https://leasabanes.fr/images/lea-profile.webp" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Léa Sabanès - Gestion Administrative",
            "description": "Services d'assistance administrative et accompagnement pour professionnels et particuliers.",
            "url": "https://leasabanes.fr",
            "telephone": "+33750657262",
            "email": "sabaneslea33@gmail.com",
            "areaServed": "France",
            "priceRange": "€",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+33750657262",
              "contactType": "Service client",
              "availableLanguage": "French"
            }
          }
        `}</script>
      </Helmet>

      <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-6"
          >
            <h1 className="font-serif text-5xl md:text-6xl text-charcoal font-bold leading-tight">
              L'administration simplifiée,
            </h1>
            <p className="font-script text-4xl text-peach">en toute confiance.</p>
            <p className="font-sans text-lg text-charcoal/80 max-w-lg mt-6">
              Déléguez vos tâches administratives à une experte de confiance pour vous recentrer sur l'essentiel. Que vous soyez un professionnel ou un particulier, je vous accompagne avec rigueur et discrétion.
            </p>
            <motion.button
              onClick={handleCTAClick}
              className="inline-flex items-center gap-3 px-8 py-4 bg-peach text-white font-sans font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-peach/90 transition-all group mt-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Me contacter
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-white border-4 border-white max-h-[500px]">
              <img
                src="/images/lea-profile.webp"
                alt="Léa Sabanès - Gestion Administrative"
                width="600"
                height="800"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-peach/20 rounded-full blur-2xl -z-10"></div>
          </motion.div>
        </div>
      </section>

      <div className="bg-peach text-white">
        <Marquee items={values} speed={15} />
      </div>

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-charcoal mb-4">Mes Services</h2>
          <p className="font-sans text-lg text-charcoal/70">Un accompagnement sur-mesure adapté à vos besoins</p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <ServiceCard
            title="POUR LES PROFESSIONNELS"
            icon={Briefcase}
            iconBg="bg-peach/20 text-peach"
            services={proServices}
            quote="Votre partenaire pour une gestion optimisée."
            profileType="professionnel"
            accentColor="border-t-peach"
            onSelectProfile={handleSelectProfile}
          />

          <ServiceCard
            title="POUR LES PARTICULIERS"
            icon={User}
            iconBg="bg-charcoal/10 text-charcoal"
            services={particulierServices}
            quote="Vos démarches simplifiées, je m'occupe de tout."
            profileType="particulier"
            accentColor="border-t-charcoal"
            onSelectProfile={handleSelectProfile}
          />
        </motion.div>
      </section>

      <BlogPreview posts={latestPosts} />

    </main>
  );
};

export default Home;
