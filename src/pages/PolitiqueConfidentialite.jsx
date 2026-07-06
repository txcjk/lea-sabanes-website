import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const PolitiqueConfidentialite = () => {
  return (
    <main className="min-h-screen pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <Helmet>
        <title>Politique de Confidentialité | Léa Sabanès</title>
        <meta name="description" content="Politique de confidentialité et protection des données personnelles du site de Léa Sabanès." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-4xl text-charcoal mb-8">Politique de Confidentialité</h1>

        <div className="prose prose-lg prose-headings:font-serif prose-headings:text-charcoal prose-p:font-sans prose-p:text-charcoal/80 max-w-none space-y-8">
          
          <section>
            <h2>1. Collecte des données</h2>
            <p>
              Les données personnelles collectées via le formulaire de contact sont :
            </p>
            <ul>
              <li>Nom complet</li>
              <li>Adresse email</li>
              <li>Type de profil (particulier ou professionnel)</li>
              <li>Message</li>
            </ul>
            <p>
              Ces données sont collectées uniquement lorsque vous remplissez volontairement 
              le formulaire de contact présent sur le site.
            </p>
          </section>

          <section>
            <h2>2. Finalité du traitement</h2>
            <p>
              Les données collectées ont pour seule finalité de permettre à Léa Sabanès 
              de répondre à votre demande de contact et d'établir une relation commerciale. 
              Elles ne sont en aucun cas utilisées à des fins de prospection commerciale 
              sans votre consentement explicite.
            </p>
          </section>

          <section>
            <h2>3. Base légale</h2>
            <p>
              Le traitement de vos données est fondé sur votre consentement (article 6.1.a du RGPD), 
              manifesté par l'envoi volontaire du formulaire de contact.
            </p>
          </section>

          <section>
            <h2>4. Destinataires des données</h2>
            <p>
              Les données collectées sont exclusivement destinées à Léa Sabanès. 
              Elles ne sont ni vendues, ni cédées, ni communiquées à des tiers.
            </p>
          </section>

          <section>
            <h2>5. Durée de conservation</h2>
            <p>
              Les données sont conservées pendant une durée maximale de 3 ans à compter 
              du dernier contact. Passé ce délai, elles sont supprimées.
            </p>
          </section>

          <section>
            <h2>6. Sécurité</h2>
            <p>
              Les données sont stockées de manière sécurisée via Supabase, 
              un fournisseur de base de données certifié SOC 2 et conforme au RGPD. 
              Les échanges entre votre navigateur et le serveur sont protégés par 
              un chiffrement HTTPS.
            </p>
          </section>

          <section>
            <h2>7. Cookies</h2>
            <p>
              Le site utilise des cookies strictement nécessaires à son fonctionnement 
              (Google Fonts pour l'affichage des polices). Un bandeau de consentement 
              vous permet d'accepter ou de refuser ces cookies.
            </p>
          </section>

          <section>
            <h2>8. Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) 
              et à la loi Informatique et Libertés, vous disposez des droits suivants :
            </p>
            <ul>
              <li><strong>Droit d'accès :</strong> connaître les données détenues vous concernant</li>
              <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
              <li><strong>Droit d'effacement :</strong> demander la suppression de vos données</li>
              <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à : <strong>sabaneslea33@gmail.com</strong>.
            </p>
          </section>

          <section>
            <h2>9. Réclamation</h2>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire 
              une réclamation auprès de la CNIL (Commission Nationale de l'Informatique 
              et des Libertés) sur <a href="https://www.cnil.fr">www.cnil.fr</a>.
            </p>
          </section>
        </div>
      </motion.div>
    </main>
  );
};

export default PolitiqueConfidentialite;
