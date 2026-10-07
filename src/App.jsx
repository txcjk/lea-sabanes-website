import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ProfileProvider } from './context/ProfileContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Loading from './pages/Loading';

const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'));
const PolitiqueConfidentialite = lazy(() => import('./pages/PolitiqueConfidentialite'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <ProfileProvider>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Header />
        <main id="main-content" className="grow" tabIndex={-1}>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </ProfileProvider>
  );
}

export default App;
