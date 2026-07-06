import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <Helmet>
        <title>Page introuvable | Léa Sabanès</title>
        <meta name="description" content="La page que vous cherchez n'existe pas ou a été déplacée." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <FileQuestion size={80} className="text-peach mx-auto mb-6" aria-hidden="true" />
        
        <h1 className="font-serif text-5xl text-charcoal mb-4">Page introuvable</h1>
        
        <p className="font-sans text-lg text-charcoal/70 mb-8">
          La page que vous cherchez n'existe pas ou a été déplacée. 
          Vérifiez l'adresse ou retournez à l'accueil.
        </p>

        <Link to="/">
          <Button variant="primary" className="gap-2">
            <ArrowLeft size={18} /> Retour à l'accueil
          </Button>
        </Link>
      </motion.div>
    </main>
  );
};

export default NotFound;
