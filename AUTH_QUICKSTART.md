# 🔐 Authentification Admin - Installation Rapide

## ⚡ TL;DR - Étapes critiques

### 1. Créer le compte admin dans Supabase (5 minutes)

```bash
# 1. Aller sur https://app.supabase.com
# 2. Authentication > Users > Add User
# 3. Email: paty10j@hotmail.com
# 4. Password: [CRÉER UN MOT DE PASSE FORT - NOTER LE !]
# 5. ✅ Cocher "Auto Confirm User"
# 6. Create User

# 7. SQL Editor > Exécuter :
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'paty10j@hotmail.com';
```

### 2. Tester en local

```bash
npm run dev

# Ouvrir : http://localhost:3000/admin
# ✅ Doit rediriger vers /admin/login
# ✅ Se connecter avec les identifiants
# ✅ Doit rediriger vers /admin
```

### 3. Déployer

```bash
# Variables d'environnement sur Vercel :
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_API_URL=/api

# Déployer :
git push origin main  # Vercel déploie automatiquement
```

---

## 📚 Documentation complète

| Guide | Contenu | Audience |
|-------|---------|----------|
| **AUTHENTICATION_GUIDE.md** | Installation détaillée, configuration, tests | Développeurs |
| **AUTHENTICATION_SUMMARY.md** | Résumé exécutif du système | Chef de projet |
| **AUTHENTICATION_TECH.md** | Architecture technique, sécurité, API | Développeurs avancés |
| **DEPLOYMENT_GUIDE.md** | Déploiement production, DNS, HTTPS | DevOps |
| **GUIDE_CONNEXION_PATRICIA.md** | Comment se connecter (simple) | Patricia (utilisateur final) |
| **AUTH_QUICKSTART.md** | Ce fichier (démarrage rapide) | Tous |

---

## ✅ Ce qui a été implémenté

### Fonctionnalités :
- ✅ Page de connexion `/admin/login`
- ✅ Protection de toutes les routes `/admin/*`
- ✅ Protection de toutes les API `/api/admin/*`
- ✅ Bouton de déconnexion
- ✅ Cookies sécurisés (httpOnly, SameSite, Secure)
- ✅ Vérification du rôle admin
- ✅ Session persistante (7 jours)

### Sécurité :
- ✅ Authentification Supabase (OAuth 2.0 / JWT)
- ✅ Middleware Next.js
- ✅ Vérification serveur
- ✅ Pas de clés secrètes côté client
- ✅ Protection XSS, CSRF, MITM

---

## 🎯 Checklist avant lancement

- [ ] Compte admin créé dans Supabase
- [ ] `role='admin'` ajouté dans `user_metadata`
- [ ] Variables d'environnement configurées
- [ ] Test de connexion réussi
- [ ] Test de déconnexion réussi
- [ ] Test d'accès non authentifié (doit bloquer)
- [ ] HTTPS activé en production (Vercel)
- [ ] Mot de passe fort communiqué à Patricia
- [ ] Patricia formée à l'utilisation

---

## 🔒 Comptes et accès

### Compte admin :
- **Email** : `paty10j@hotmail.com`
- **Rôle** : `admin`
- **Accès** : Tout l'espace `/admin/*`

### Création d'autres admins (futur) :
```sql
-- 1. Créer l'utilisateur dans Supabase Dashboard
-- 2. Ajouter le rôle :
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'nouvel-admin@example.com';
```

---

## 📞 Support rapide

### Problème : "Non authentifié" après connexion
```bash
# 1. Vérifier les cookies (DevTools > Application > Cookies)
# 2. Vérifier variables d'env
# 3. Redémarrer le serveur
```

### Problème : "Accès non autorisé"
```sql
-- Vérifier le rôle dans Supabase
SELECT email, raw_user_meta_data->>'role' as role
FROM auth.users
WHERE email = 'paty10j@hotmail.com';

-- Résultat attendu : role = 'admin'
```

### Problème : Redirection infinie
```bash
# 1. Supprimer tous les cookies
# 2. Se déconnecter de Supabase
# 3. Reconnecter avec les bons identifiants
```

---

## 🚀 Commandes utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Déploiement Vercel
vercel --prod

# Vérifier TypeScript
npx tsc --noEmit
```

---

## 📊 Structure des fichiers

```
✅ middleware.ts                         Protection routes
✅ lib/supabase/client.ts               Client browser
✅ lib/supabase/server.ts               Client serveur
✅ lib/supabase/middleware.ts           Utilitaires
✅ lib/auth/verifyAdmin.ts              Helper vérification
✅ app/admin/login/page.tsx             Page connexion
✅ app/admin/layout.tsx                 Bouton déconnexion
✅ app/api/admin/dashboard/route.ts     API protégée
✅ app/api/admin/rendezvous/route.ts    API protégée
✅ supabase_admin_user.sql              Script SQL
```

---

## 🎨 Technologies

- **Next.js 15** : Framework React
- **Supabase Auth** : Authentification
- **@supabase/ssr** : Gestion sessions
- **TypeScript** : Typage statique
- **Tailwind CSS** : Styling

---

## ✨ Prochaines étapes

1. ⚠️ **Créer le compte admin** (voir section 1)
2. ✅ Tester en local
3. ✅ Déployer sur Vercel
4. ✅ Tester en production
5. ✅ Former Patricia

---

**Version** : 1.0  
**Date** : Novembre 2024  
**Statut** : Production Ready ✅
