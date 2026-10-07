import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, CheckCircle, Loader2, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';
import { supabase } from '../lib/supabaseClient';
import Button from './Button';

const Footer = () => {
  const { selectedProfile, setSelectedProfile } = useProfile();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profile: 'particulier',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Derive profile from context, falling back to form state
  const effectiveProfile = selectedProfile || formData.profile;

  const validateField = (name, value) => {
    if (!value.trim()) {
      return 'Ce champ est requis.';
    }
    if (name === 'email' && value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        return 'Veuillez entrer une adresse email valide.';
      }
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Bidirectional sync: when user changes dropdown, highlight corresponding card
    if (name === 'profile') {
      setSelectedProfile(value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    let hasErrors = false;
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'profile') {
        const error = validateField(key, value);
        if (error) {
          newErrors[key] = error;
          hasErrors = true;
        }
      }
    });
    
    if (hasErrors) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, message: true });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert({
          nom_complet: formData.name,
          email: formData.email,
          profil: formData.profile,
          message: formData.message
        });

      if (error) {
        console.error('Supabase error:', error);
        setSubmitError('Une erreur est survenue. Veuillez réessayer.');
        return;
      }

      setShowModal(true);
      setFormData({ name: '', email: '', profile: 'particulier', message: '' });
      setSelectedProfile(null);
      
    } catch (err) {
      console.error('Submit error:', err);
      setSubmitError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmitError(null);
    setErrors({});
    setTouched({});
  };

  return (
    <footer id="contact" className="bg-charcoal text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="space-y-8">
            <div>
              <p className="font-serif text-3xl mb-2 text-white">Léa Sabanès</p>
              <p className="font-script text-2xl text-peach">Votre organisation, ma priorité.</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-linen">
                <div className="w-10 h-10 rounded-full bg-peach flex items-center justify-center">
                  <Phone size={20} className="text-white" />
                </div>
                <a href="tel:+33750657262" className="font-sans text-lg hover:text-peach transition-colors">07 50 65 72 62</a>
              </div>
              
              <div className="flex items-center gap-4 text-linen">
                <div className="w-10 h-10 rounded-full bg-peach flex items-center justify-center">
                  <Mail size={20} className="text-white" />
                </div>
                <a href="mailto:contact@leasabanes.fr" className="font-sans text-lg hover:text-peach transition-colors">
                  contact@leasabanes.fr
                </a>
              </div>
              
              <div className="flex items-center gap-4 text-linen">
                <div className="w-10 h-10 rounded-full bg-peach flex items-center justify-center">
                  <MapPin size={20} className="text-white" />
                </div>
                <span className="font-sans text-lg">Interventions à distance et sur rendez-vous</span>
              </div>
            </div>
          </div>

          <div className="bg-white text-charcoal rounded-xl p-8 shadow-lg">
            <h3 className="font-serif text-2xl mb-6">Besoin d'un coup de pouce ?</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block font-sans text-sm font-medium mb-1">Nom complet</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  name="name" 
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-peach focus:border-peach outline-none transition-all ${
                    touched.name && errors.name ? 'border-red-200 ring-2 ring-red-200' : 'border-gray-300'
                  }`}
                  placeholder="Jean Dupont"
                  aria-invalid={touched.name && errors.name ? 'true' : 'false'}
                  aria-describedby={touched.name && errors.name ? 'contact-name-error' : undefined}
                />
                {touched.name && errors.name && (
                  <p id="contact-name-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                    <AlertCircle size={14} /> {errors.name}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="contact-email" className="block font-sans text-sm font-medium mb-1">Adresse Email</label>
                <input 
                  type="email" 
                  id="contact-email" 
                  name="email" 
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-peach focus:border-peach outline-none transition-all ${
                    touched.email && errors.email ? 'border-red-200 ring-2 ring-red-200' : 'border-gray-300'
                  }`}
                  placeholder="jean.dupont@email.com"
                  aria-invalid={touched.email && errors.email ? 'true' : 'false'}
                  aria-describedby={touched.email && errors.email ? 'contact-email-error' : undefined}
                />
                {touched.email && errors.email && (
                  <p id="contact-email-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                    <AlertCircle size={14} /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-profile" className="block font-sans text-sm font-medium mb-1">Vous êtes...</label>
                <select 
                  id="contact-profile" 
                  name="profile"
                  value={effectiveProfile}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-peach focus:border-peach outline-none transition-all bg-white ${
                    selectedProfile ? 'border-peach ring-2 ring-peach/30' : 'border-gray-300'
                  }`}
                >
                  <option value="particulier">Un Particulier</option>
                  <option value="professionnel">Un Professionnel</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-sans text-sm font-medium mb-1">Votre message</label>
                <textarea 
                  id="contact-message" 
                  name="message" 
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-peach focus:border-peach outline-none transition-all resize-none ${
                    touched.message && errors.message ? 'border-red-200 ring-2 ring-red-200' : 'border-gray-300'
                  }`}
                  placeholder="Comment puis-je vous aider ?"
                  aria-invalid={touched.message && errors.message ? 'true' : 'false'}
                  aria-describedby={touched.message && errors.message ? 'contact-message-error' : undefined}
                ></textarea>
                {touched.message && errors.message && (
                  <p id="contact-message-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                    <AlertCircle size={14} /> {errors.message}
                  </p>
                )}
              </div>

              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                  {submitError}
                </div>
              )}

              <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={20} /> Envoi en cours...
                  </span>
                ) : (
                  "Envoyer mon message"
                )}
              </Button>
            </form>
          </div>
          
        </div>

        <div className="mt-12 pt-8 border-t border-peach/30 text-center text-linen/70 font-sans text-sm space-y-3">
          <div className="flex justify-center gap-6">
            <Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link to="/politique-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} Léa Sabanès. Tous droits réservés.</p>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white text-charcoal p-8 rounded-xl shadow-2xl max-w-md w-full relative"
              role="document"
            >
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-charcoal"
                aria-label="Fermer la modale"
              >
                <X size={24} />
              </button>
              <div className="flex flex-col items-center text-center">
                <CheckCircle size={64} className="text-peach mb-4" aria-hidden="true" />
                <h4 id="modal-title" className="font-serif text-2xl font-bold mb-2">Message envoyé !</h4>
                <p id="modal-desc" className="font-sans text-gray-600">Merci de m'avoir contactée. Je reviendrai vers vous dans les plus brefs délais.</p>
                <Button variant="outline" className="mt-6" onClick={closeModal}>
                  Fermer
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
