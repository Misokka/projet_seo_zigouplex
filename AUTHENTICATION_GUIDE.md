# Guide d'Installation de l'Authentification Admin

## 📋 Vue d'ensemble

Ce guide explique comment configurer l'authentification sécurisée pour l'espace admin du Salon Patricia Osores.

## 🔐 Architecture de sécurité

### Ce qui a été implémenté :

✅ **Page de connexion** (`/admin/login`)
- Formulaire email/mot de passe
- Authentification via Supabase Auth
- Vérification du rôle admin
- Messages d'erreur clairs

✅ **Middleware de protection** (`middleware.ts`)
- Protège toutes les routes `/admin/*` (sauf login)
- Protège toutes les routes API `/api/admin/*`
- Redirection automatique vers login si non authentifié
- Vérification du rôle admin
- Gestion des cookies sécurisés (httpOnly, SameSite=strict)

✅ **Routes API sécurisées**
- `/api/admin/dashboard` - Vérification auth requise
- `/api/admin/rendezvous` - Vérification auth requise
- Fonction helper `verifyAdminAuth()` pour vérifier l'authentification

✅ **Déconnexion**
- Bouton de déconnexion dans le layout admin
- Suppression de la session Supabase
- Redirection vers la page de login

---

## 🚀 Étapes d'installation

### Étape 1 : Créer l'utilisateur admin dans Supabase

#### Option A : Via le Dashboard Supabase (RECOMMANDÉ)

1. Connectez-vous à votre projet Supabase : https://app.supabase.com
2. Allez dans **Authentication** > **Users**
3. Cliquez sur **Add User** > **Create new user**
4. Remplissez :
   - **Email** : `paty10j@hotmail.com`
   - **Password** : [Générez un mot de passe fort - NOTEZ-LE !]
   - ✅ Cochez **Auto Confirm User**
5. Cliquez sur **Create User**

6. Ensuite, allez dans **SQL Editor** et exécutez :

```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'paty10j@hotmail.com';
```

7. Vérifiez que tout fonctionne :

```sql
SELECT 
  id,
  email,
  raw_user_meta_data->>'role' as role,
  created_at,
  last_sign_in_at
FROM auth.users
WHERE email = 'paty10j@hotmail.com';
```

Vous devriez voir `role = 'admin'`

#### Option B : Via SQL uniquement

Exécutez le fichier `supabase_admin_user.sql` dans le SQL Editor de Supabase.

---

### Étape 2 : Vérifier les variables d'environnement

Assurez-vous que votre fichier `.env.local` contient :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key
```

⚠️ **IMPORTANT** : Ne JAMAIS utiliser le `service_role_key` côté client !

---

### Étape 3 : Installer les dépendances

```bash
npm install @supabase/ssr
```

(Déjà fait si vous suivez ce guide)

---

### Étape 4 : Tester l'authentification

1. **Démarrer le serveur de développement** :
   ```bash
   npm run dev
   ```

2. **Tester le flux d'authentification** :
   - Allez sur : `http://localhost:3000/admin`
   - Vous devriez être redirigé vers `/admin/login`
   - Connectez-vous avec :
     - Email : `paty10j@hotmail.com`
     - Mot de passe : [celui que vous avez défini]
   - Vous devriez être redirigé vers `/admin` (tableau de bord)

3. **Tester la protection des routes** :
   - Essayez d'accéder à `/admin/disponibilites` sans être connecté
   - Vous devriez être redirigé vers `/admin/login`

4. **Tester la déconnexion** :
   - Cliquez sur le bouton "Se déconnecter" dans la sidebar
   - Vous devriez être redirigé vers `/admin/login`
   - Essayez d'accéder à `/admin` → redirection vers login ✅

5. **Tester les routes API** :
   - Sans être connecté, essayez d'accéder à :
     ```bash
     curl http://localhost:3000/api/admin/dashboard
     ```
   - Vous devriez recevoir : `{"success":false,"error":"Non authentifié"}`

---

## 🔒 Sécurité mise en place

### Cookies sécurisés
- ✅ **httpOnly** : Les cookies ne sont pas accessibles via JavaScript (protection XSS)
- ✅ **SameSite=strict** : Protection contre les attaques CSRF
- ✅ **Secure** : Cookies uniquement transmis via HTTPS (en production)
- ✅ **Expiration** : 7 jours (configurable dans Supabase)

### Protection des routes
- ✅ Middleware Next.js vérifie toutes les requêtes `/admin/*` et `/api/admin/*`
- ✅ Vérification du token Supabase côté serveur
- ✅ Vérification du rôle admin dans les métadonnées utilisateur
- ✅ Aucune donnée sensible exposée côté client

### Authentification
- ✅ Utilise Supabase Auth (OAuth 2.0 / JWT)
- ✅ Mot de passe hashé avec bcrypt par Supabase
- ✅ Tokens rafraîchis automatiquement
- ✅ Session persistante (7 jours par défaut)

---

## 📁 Fichiers créés/modifiés

### Nouveaux fichiers :
- `middleware.ts` - Middleware de protection des routes
- `lib/supabase/client.ts` - Client Supabase pour composants client
- `lib/supabase/server.ts` - Client Supabase pour Server Components
- `lib/supabase/middleware.ts` - Utilitaires Supabase pour middleware
- `lib/auth/verifyAdmin.ts` - Helper de vérification admin
- `app/admin/login/page.tsx` - Page de connexion
- `supabase_admin_user.sql` - Script SQL pour créer l'admin

### Fichiers modifiés :
- `app/admin/layout.tsx` - Ajout du bouton de déconnexion
- `app/api/admin/dashboard/route.ts` - Ajout de la vérification auth
- `app/api/admin/rendezvous/route.ts` - Ajout de la vérification auth
- `tsconfig.json` - Ajout des path aliases (`@/*`)

---

## 🧪 Checklist de validation

- [ ] L'utilisateur admin existe dans Supabase avec `role = 'admin'`
- [ ] Connexion réussie sur `/admin/login`
- [ ] Redirection automatique vers `/admin` après connexion
- [ ] Impossible d'accéder à `/admin` sans être connecté
- [ ] Impossible d'accéder aux API `/api/admin/*` sans être connecté
- [ ] Déconnexion fonctionne et redirige vers `/admin/login`
- [ ] Si déjà connecté, `/admin/login` redirige vers `/admin`
- [ ] Les cookies sont bien définis (vérifier dans DevTools > Application > Cookies)

---

## 🔧 Configuration avancée (optionnel)

### Modifier la durée de session

Dans Supabase Dashboard :
1. Allez dans **Authentication** > **Settings**
2. Modifiez **JWT expiry limit** (par défaut 3600 secondes = 1 heure)
3. Modifiez **Refresh token expiry time** (par défaut 604800 secondes = 7 jours)

### Activer l'authentification à deux facteurs (2FA)

Dans Supabase Dashboard :
1. Allez dans **Authentication** > **Settings**
2. Activez **Enable Phone Auth**
3. Configurez un fournisseur SMS (Twilio, MessageBird, etc.)

---

## 🐛 Dépannage

### Problème : "Non authentifié" après connexion
- Vérifiez que les cookies sont bien définis (DevTools)
- Vérifiez que `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` sont corrects
- Redémarrez le serveur Next.js

### Problème : "Accès non autorisé"
- Vérifiez que l'utilisateur a bien `role = 'admin'` dans ses métadonnées :
  ```sql
  SELECT raw_user_meta_data FROM auth.users WHERE email = 'paty10j@hotmail.com';
  ```

### Problème : Redirection infinie
- Vérifiez que le middleware n'est pas appliqué à `/admin/login`
- Vérifiez la configuration du matcher dans `middleware.ts`

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez la console du navigateur (F12)
2. Vérifiez les logs du serveur Next.js
3. Vérifiez les logs Supabase (Dashboard > Logs)

---

## ✅ Statut de l'implémentation

| Fonctionnalité | Statut |
|----------------|--------|
| Page de login | ✅ Implémenté |
| Protection des routes admin | ✅ Implémenté |
| Protection des API admin | ✅ Implémenté |
| Déconnexion | ✅ Implémenté |
| Cookies sécurisés | ✅ Implémenté |
| Vérification du rôle admin | ✅ Implémenté |
| Création utilisateur admin | ⚠️ À faire manuellement |

---

## 🚀 Prochaines étapes recommandées

1. **Créer l'utilisateur admin dans Supabase** (Étape 1)
2. **Tester le flux d'authentification** (Étape 4)
3. **Configurer un mot de passe fort** pour Patricia
4. **Activer HTTPS en production** (automatique avec Vercel)
5. **Envisager l'ajout d'un système de récupération de mot de passe**

---

**Date de création** : Novembre 2024  
**Version** : 1.0  
**Auteur** : Développement Salon Patricia Osores
