import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const MentionsLegales = () => {
  return (
    <main className="min-h-screen pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <Helmet>
        <title>Mentions Légales | Léa Sabanès</title>
        <link rel="canonical" href="https://leasabanes.fr/mentions-legales" />
        <meta name="description" content="Mentions légales du site de Léa Sabanès, secrétaire indépendante en gestion administrative." />
        <meta property="og:image" content="https://leasabanes.fr/images/lea-profile.webp" />
        <meta property="og:image:alt" content="Léa Sabanès - Gestion Administrative" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://leasabanes.fr/images/lea-profile.webp" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-4xl text-charcoal mb-8">Mentions Légales</h1>

        <div className="prose prose-lg prose-headings:font-serif prose-headings:text-charcoal prose-p:font-sans prose-p:text-charcoal/80 max-w-none space-y-8">
          
          <section>
            <h2>Éditeur du site</h2>
            <p>
              Le site <strong>leasabanes.fr</strong> est édité par Léa Sabanès, 
              entrepreneur individuel (EI), dont le siège social est situé en France.
            </p>
            <ul>
              <li><strong>Nom :</strong> Léa Sabanès</li>
              <li><strong>Statut juridique :</strong> Entrepreneur Individuel (EI)</li>
              <li><strong>Email :</strong> sabaneslea33@gmail.com</li>
              <li><strong>Téléphone :</strong> 07 50 65 72 62</li>
            </ul>
          </section>

          <section>
            <h2>Responsable de la publication</h2>
            <p>
              La directrice de la publication est Léa Sabanès, en sa qualité d'entrepreneur individuel.
            </p>
          </section>

          <section>
            <h2>Hébergement</h2>
            <p>
              Le site est hébergé par <strong>Vercel Inc.</strong>, dont le siège social est situé au 
              440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
            </p>
          </section>

          <section>
            <h2>Propriété intellectuelle</h2>
            <p>
              L'ensemble des éléments constituant ce site (textes, graphismes, logo, photographies) 
              est la propriété exclusive de Léa Sabanès, sauf mentions contraires. 
              Toute reproduction, distribution, modification ou utilisation de ces éléments 
              sans autorisation préalable est strictement interdite.
            </p>
          </section>

          <section>
            <h2>Limitation de responsabilité</h2>
            <p>
              Léa Sabanès s'efforce de fournir des informations aussi précises que possible. 
              Toutefois, elle ne pourra être tenue responsable des omissions, inexactitudes ou 
              carences dans la mise à jour. Les informations présentes sur le site sont fournies 
              à titre indicatif et sont susceptibles d'évoluer.
            </p>
          </section>

          <section>
            <h2>Liens hypertextes</h2>
            <p>
              Le site peut contenir des liens vers d'autres sites. Léa Sabanès ne peut être tenue 
              responsable du contenu de ces sites externes.
            </p>
          </section>
        </div>
      </motion.div>
    </main>
  );
};

export default MentionsLegales;
