# Léa Sabanès - Gestion Administrative

Site vitrine pour Léa Sabanès, secrétaire indépendante en gestion administrative et accompagnement.

## 🚀 Déploiement

### 1. Supabase (Base de données)

1. Créer un compte sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Aller dans l'éditeur SQL (SQL Editor)
4. Copier-coller le contenu de `supabase/init.sql`
5. Exécuter le script
6. Récupérer :
   - **Project URL** : `Settings > API > Project URL`
   - **anon public** key : `Settings > API > anon public`

### 2. Configuration locale

1. Copier `.env.example` en `.env`
2. Remplir les variables :

```bash
VITE_SUPABASE_URL=https://votre-project.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key
```

### 3. Vercel (Hébergement)

1. Créer un compte sur [vercel.com](https://vercel.com)
2. Cliquer "New Project"
3. Importer le repo GitHub `lea-sabanes-website`
4. Framework : **Vite**
5. Ajouter les variables d'environnement :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Deploy

### 4. GitHub

Repo : `https://github.com/txcjk/lea-sabanes-website`

```bash
npm install
npm run dev      # Développement
npm run build    # Production
```

## 🎨 Stack Technique

- **React 19** + **Vite**
- **Tailwind CSS v4** + **Framer Motion**
- **React Router** + **React Helmet Async**
- **Supabase** (PostgreSQL + Auth)
- **Lucide React** (icônes)

## 📁 Architecture

```
src/
├── components/          # Composants réutilisables
│   ├── Header.jsx
│   ├── Footer.jsx          # Formulaire + Contact
│   ├── Marquee.jsx         # Bandeau infini
│   ├── ServiceCard.jsx     # Carte de service
│   ├── BlogPreview.jsx     # Aperçu blog
│   ├── Button.jsx
│   └── Card.jsx
├── context/
│   └── ProfileContext.jsx  # State global profil
├── lib/
│   └── supabaseClient.js   # Client Supabase
├── pages/
│   ├── Home.jsx
│   ├── BlogIndex.jsx
│   └── BlogPost.jsx
├── data/
│   └── blogData.js         # Données articles
└── App.jsx
```

## 🔒 Sécurité

- **RLS** activé sur la table `leads`
- **Insert anonyme** uniquement (pas de lecture)
- **Variables d'environnement** exclues de Git (.gitignore)

## 📄 License

© 2026 Léa Sabanès. Tous droits réservés.
