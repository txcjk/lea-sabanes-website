import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import Card from './Card';

const BlogPreview = ({ posts }) => {
  const formatDate = (dateStr) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateStr));
  };

  // Grille adaptative : la home n'affiche que les 2 derniers articles et une
  // 3e colonne vide laissait un grand blanc à droite. En dessous de 3 articles
  // on réduit le nombre de colonnes pour que la rangée remplisse la section.
  const COLS = { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3' };
  const gridCols = COLS[Math.min(posts.length, 3)] || 'lg:grid-cols-3';

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl text-charcoal mb-4">Mes Conseils Récents</h2>
        <p className="font-sans text-lg text-charcoal/70">
          Astuces et actualités pour mieux vivre votre administration
        </p>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-8`}>
        {posts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card className="h-full flex flex-col hover:shadow-lg transition-all group overflow-hidden">
              {post.image && (
                <Link to={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
                  <img
                    src={post.image}
                    alt=""
                    loading="lazy"
                    className="w-full aspect-video object-cover"
                  />
                </Link>
              )}
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

                <h3 className="font-serif text-xl text-charcoal font-bold mb-3 group-hover:text-peach transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="font-sans text-sm text-charcoal/80 mb-6 flex-grow line-clamp-2">
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
      </div>
    </section>
  );
};

export default BlogPreview;
