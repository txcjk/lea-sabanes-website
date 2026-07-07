import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'lea-sabanes-cookie-consent';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Petit délai pour laisser la page se charger
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  const refuse = () => {
    localStorage.setItem(STORAGE_KEY, 'refused');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
          role="dialog"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
        >
          <div className="max-w-7xl mx-auto bg-white border border-gray-100 rounded-xl shadow-lg p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie size={22} className="text-peach shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p id="cookie-title" className="font-sans text-sm font-semibold text-charcoal mb-1">
                  Ce site utilise des cookies
                </p>
                <p id="cookie-desc" className="font-sans text-sm text-charcoal/70">
                  Nous utilisons des cookies pour charger les polices Google Fonts et analyser la fréquentation du site. 
                  Ces données nous aident à améliorer votre expérience. 
                  Vous pouvez accepter ou refuser leur utilisation.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                onClick={refuse}
                className="px-4 py-2 text-sm font-sans font-medium text-charcoal/60 hover:text-charcoal transition-colors rounded-lg hover:bg-gray-100"
                aria-label="Refuser les cookies"
              >
                Refuser
              </button>
              <button
                onClick={accept}
                className="px-5 py-2 text-sm font-sans font-semibold text-white bg-peach hover:bg-peach/90 transition-colors rounded-lg"
                aria-label="Accepter les cookies"
              >
                Accepter
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
