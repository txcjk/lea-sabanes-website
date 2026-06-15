import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { blogData } from '../data/blogData';
import Button from '../components/Button';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogData.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="font-serif text-3xl text-charcoal mb-4">Article introuvable</h1>
        <p className="font-sans text-charcoal/70 mb-6">L'article que vous cherchez n'existe pas ou a été déplacé.</p>
        <Button onClick={() => navigate('/blog')} variant="primary">Retour au blog</Button>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateStr));
  };

  return (
    <article className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <Helmet>
        <title>{post.title} | Léa Sabanès Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="article:published_time" content={post.date} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "${post.title}",
            "description": "${post.excerpt}",
            "datePublished": "${post.date}",
            "author": {
              "@type": "Person",
              "name": "Léa Sabanès"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Léa Sabanès - Gestion Administrative",
              "logo": {
                "@type": "ImageObject",
                "url": "https://leasabanes.fr/favicon.svg"
              }
            }
          }
        `}</script>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-charcoal/60 hover:text-peach transition-colors mb-8 font-sans text-sm font-medium"
        >
          <ArrowLeft size={16} /> Retour aux articles
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm font-sans text-charcoal/60 mb-6">
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} />
              {post.readTime}
            </span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal font-bold leading-tight mb-6">
            {post.title}
          </h1>
          
          <p className="font-sans text-xl text-peach italic">
            {post.excerpt}
          </p>
        </header>

        {/* The content itself is strict semantic HTML provided by the data file */}
        <div 
          className="prose prose-lg prose-headings:font-serif prose-headings:text-charcoal prose-p:font-sans prose-p:text-charcoal/80 prose-a:text-teal hover:prose-a:text-peach prose-strong:text-charcoal max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
      </motion.div>
    </article>
  );
};



export default BlogPost;
