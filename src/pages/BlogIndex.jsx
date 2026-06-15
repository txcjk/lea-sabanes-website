import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { blogData } from '../data/blogData';
import Card from '../components/Card';

const BlogIndex = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Format date to French locale
  const formatDate = (dateStr) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateStr));
  };

  return (
    <main className="min-h-screen pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Helmet>
        <title>Le Blog | Léa Sabanès</title>
        <meta name="description" content="Découvrez nos articles et conseils sur la gestion administrative, l'organisation et les démarches pour les PME et les particuliers." />
        <meta property="og:title" content="Le Blog | Léa Sabanès" />
        <meta property="og:description" content="Conseils, astuces et actualités pour mieux vivre votre administration au quotidien." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Le Blog | Léa Sabanès" />
        <meta name="twitter:description" content="Conseils et actualités sur la gestion administrative." />
      </Helmet>

      <div className="text-center mb-16">
        <h1 className="font-serif text-5xl text-charcoal mb-4">Le Blog</h1>
        <p className="font-sans text-lg text-charcoal/70 max-w-2xl mx-auto">
          Conseils, astuces et actualités pour mieux vivre votre administration au quotidien.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {blogData.map((post) => (
          <motion.div key={post.id} variants={itemVariants}>
            <Card className="h-full flex flex-col hover:shadow-lg transition-all group">
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-4 text-xs font-sans text-charcoal/60 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                </div>
                
                <h2 className="font-serif text-xl text-charcoal font-bold mb-3 group-hover:text-teal transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="font-sans text-sm text-charcoal/80 mb-6 flex-grow">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-peach font-sans font-semibold text-sm hover:text-charcoal transition-colors mt-auto"
                >
                  Lire l'article <ArrowRight size={16} />
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
};

export default BlogIndex;
