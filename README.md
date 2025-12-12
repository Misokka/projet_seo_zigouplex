# 💈 Salon Patricia Osores - Système de réservation complet

Site web professionnel pour le salon de coiffure Patricia Osores à Juprelle (Liège), Belgique.

---

## 🌟 Fonctionnalités principales

### ✨ Pour les clients
- 📅 **Réservation en ligne** en 3 étapes (Service → Date/Heure → Confirmation)
- 📧 **Emails automatiques** de confirmation et de validation
- ⭐ **Demande d'avis Google** automatique après le rendez-vous

### 👩‍💼 Pour Patricia (Admin)
- 🔒 **Interface sécurisée** avec authentification (Supabase Auth)
- 📊 **Dashboard** avec statistiques temps réel
- 📆 **Gestion des disponibilités** (ajout/suppression de créneaux)
- ✅ **Gestion des rendez-vous** (accepter/refuser en 1 clic)
- 📱 **Synchronisation Google Calendar** automatique
- 📧 **Notifications email** pour chaque nouvelle demande

---

## 🚀 Nouvelles fonctionnalités (v2.0)

### 1️⃣ Synchronisation Google Calendar
- Chaque rendez-vous accepté → Ajouté automatiquement au calendrier de Patricia
- Visible sur téléphone, ordinateur, tablette
- Rappels automatiques 24h et 1h avant le rendez-vous
- Anti-doublon intelligent

### 2️⃣ Système d'avis automatique
- 2h après chaque rendez-vous → Email automatique au client
- Lien direct vers Google Reviews du salon
- Cron quotidien à 20h (Supabase Edge Function)
- Tracking pour éviter les doublons

📖 **Guides de configuration** :
- [`GOOGLE_CALENDAR_SETUP.md`](./GOOGLE_CALENDAR_SETUP.md) - Configuration Google Calendar
- [`REVIEW_SYSTEM_SETUP.md`](./REVIEW_SYSTEM_SETUP.md) - Configuration système d'avis
- [`INSTALLATION_GUIDE.md`](./INSTALLATION_GUIDE.md) - Installation des nouvelles fonctionnalités

---

## 🛠️ Technologies utilisées

- **Frontend** : Next.js 15 (App Router), React, TypeScript, Tailwind CSS
- **Backend** : Next.js API Routes, Supabase PostgreSQL
- **Authentication** : Supabase Auth (OAuth 2.0/JWT)
- **Emails** : Nodemailer + Gmail SMTP
- **Calendar** : Google Calendar API (googleapis)
- **Cron** : Supabase Edge Functions + pg_cron
- **Hosting** : Vercel
- **Database** : Supabase (PostgreSQL)

---

## 📦 Installation

### Prérequis
- Node.js 18+
- Compte Supabase
- Compte Vercel (pour déploiement)
- Compte Google Cloud (pour Calendar API)
- Compte Gmail avec mot de passe d'application

### Installation locale

```bash
# Cloner le projet
git clone https://github.com/votre-username/projet_seo_zigouplex.git
cd projet_seo_zigouplex

# Installer les dépendances
npm install

# Installer googleapis (pour Google Calendar)
npm install googleapis

# Copier le fichier d'environnement
cp .env.example .env.local

# Éditer .env.local avec vos vraies valeurs
# Voir INSTALLATION_GUIDE.md pour les détails
```

### Configuration de la base de données

```bash
# 1. Créer un projet Supabase sur https://app.supabase.com

# 2. Exécuter les migrations SQL dans l'ordre :
# - supabase_setup.sql
# - supabase_disponibilites.sql
# - supabase_admin_user.sql
# - supabase_review_tracking.sql

# 3. Configurer le cron pour les avis
# - supabase_cron_setup.sql
```

### Démarrage

```bash
# Développement
npm run dev

# Build de production
npm run build
npm start

# Générer sitemap
npm run sitemap
```

Le site sera accessible sur `http://localhost:3000`

---

## 📚 Documentation complète

### Guides d'installation et configuration
- [`INSTALLATION_GUIDE.md`](./INSTALLATION_GUIDE.md) - Installation des nouvelles fonctionnalités
- [`GOOGLE_CALENDAR_SETUP.md`](./GOOGLE_CALENDAR_SETUP.md) - Configuration Google Calendar
- [`REVIEW_SYSTEM_SETUP.md`](./REVIEW_SYSTEM_SETUP.md) - Configuration système d'avis

### Guides d'authentification
- [`AUTHENTICATION_GUIDE.md`](./AUTHENTICATION_GUIDE.md) - Guide complet authentification
- [`AUTHENTICATION_SUMMARY.md`](./AUTHENTICATION_SUMMARY.md) - Résumé système auth
- [`AUTHENTICATION_TECH.md`](./AUTHENTICATION_TECH.md) - Détails techniques
- [`AUTH_QUICKSTART.md`](./AUTH_QUICKSTART.md) - Démarrage rapide

### Guides de déploiement et utilisation
- [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) - Déploiement en production
- [`GUIDE_CONNEXION_PATRICIA.md`](./GUIDE_CONNEXION_PATRICIA.md) - Guide utilisateur Patricia
- [`TESTING_GUIDE.md`](./TESTING_GUIDE.md) - Tests du système
- [`TROUBLESHOOTING.md`](./TROUBLESHOOTING.md) - Dépannage

### Référence technique
- [`SYSTEM_COMPLETE.md`](./SYSTEM_COMPLETE.md) - Vue d'ensemble complète du système

---

## 🔐 Sécurité

- ✅ Authentification avec Supabase Auth (OAuth 2.0)
- ✅ Cookies sécurisés (httpOnly, Secure, SameSite=Strict)
- ✅ Protection des routes avec middleware Next.js
- ✅ Vérification de rôle admin
- ✅ API protégées côté serveur
- ✅ Variables d'environnement pour secrets
- ✅ HTTPS obligatoire en production

---

## 🗄️ Structure du projet

```
projet_seo_zigouplex/
├── app/
│   ├── page.tsx                      # Page d'accueil
│   ├── rendezvous/                   # Système de réservation
│   ├── admin/                        # Interface admin
│   │   ├── login/                    # Page de connexion
│   │   ├── disponibilites/           # Gestion créneaux
│   │   └── rendezvous/               # Gestion RDV
│   └── api/
│       ├── rendezvous/               # API réservation
│       ├── disponibilites/           # API créneaux
│       ├── send-review-request/      # API avis (interne)
│       └── admin/                    # API admin protégées
├── lib/
│   ├── emailService.ts               # Envoi emails (5 types)
│   ├── googleCalendarService.ts      # Sync Google Calendar 🆕
│   ├── supabaseClient.ts             # Client Supabase
│   ├── supabase/                     # Clients SSR
│   └── auth/                         # Vérification admin
├── supabase/
│   └── functions/
│       └── send-review-requests/     # Edge Function avis 🆕
├── middleware.ts                     # Protection routes
├── *.sql                             # Migrations BDD
└── *.md                              # Documentation
```

---

## 🔧 Configuration des variables d'environnement

Voir `.env.example` pour la liste complète.

**Variables essentielles** :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Email
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=mot-de-passe-application

# Google Calendar 🆕
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
GOOGLE_CALENDAR_ID=primary

# Google Reviews 🆕
GOOGLE_REVIEW_URL=https://g.page/r/XXX/review

# Sécurité 🆕
INTERNAL_API_SECRET=[secret-32-chars+]

# Site
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

---

## 🚀 Déploiement

### Sur Vercel (recommandé)

```bash
# Installation CLI
npm i -g vercel

# Déploiement
vercel --prod
```

**Ou via GitHub** :
1. Pusher le code sur GitHub
2. Connecter le repo sur Vercel
3. Configurer les variables d'environnement
4. Déploiement automatique à chaque push

📖 Voir [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) pour les détails complets.

---

## 📊 Workflow utilisateur

### Client (Visiteur)
1. Visite le site → Clique "Prendre rendez-vous"
2. Sélectionne service, date, heure
3. Remplit formulaire → Confirme
4. Reçoit email de confirmation
5. Attend validation de Patricia

### Patricia (Admin)
1. Reçoit email de notification
2. Se connecte à `/admin/login`
3. Voit les demandes en attente
4. Accepte → Client reçoit email + événement créé dans Google Calendar 🆕
5. 2h après le RDV → Client reçoit email pour laisser avis 🆕

---

## 📈 Fonctionnalités futures (optionnel)

- [ ] SMS notifications (Twilio)
- [ ] 2FA pour compte admin
- [ ] Export PDF des rendez-vous
- [ ] Système de compte client
- [ ] Multi-langue (FR/EN)
- [ ] Vue calendrier mensuel
- [ ] Statistiques avancées

---

## 🐛 Support et dépannage

### Problèmes courants

**Authentification** :
- Voir [`TROUBLESHOOTING.md`](./TROUBLESHOOTING.md)

**Google Calendar** :
- Voir [`GOOGLE_CALENDAR_SETUP.md`](./GOOGLE_CALENDAR_SETUP.md)

**Système d'avis** :
- Voir [`REVIEW_SYSTEM_SETUP.md`](./REVIEW_SYSTEM_SETUP.md)

### Logs

**Développement** : Console terminal
**Production** : Vercel Dashboard → Functions → Logs

---

## 📄 Licence

Projet privé - Tous droits réservés

---

## 👨‍💻 Auteur

Développé avec GitHub Copilot pour le **Salon Patricia Osores**  
📍 Rue de la Station 117, 4450 Juprelle (Liège), Belgique  
📞 +32 470 12 34 56

---

## 🙏 Remerciements

- Next.js & Vercel
- Supabase
- Google Cloud Platform
- Tailwind CSS

---

**Version** : 2.0.0  
**Date** : Novembre 2024  
**Statut** : Production Ready ✅
