# 🚀 Guide de Déploiement - Production

## Checklist avant déploiement

### ✅ 1. Créer le compte admin dans Supabase

**CRITIQUE** : Sans cette étape, vous ne pourrez pas vous connecter à `/admin/login`

1. Allez sur https://app.supabase.com
2. **Authentication** > **Users** > **Add User**
3. Email : `paty10j@hotmail.com`
4. Password : [Créez un mot de passe FORT - notez-le !]
5. ✅ Cochez "Auto Confirm User"
6. **Create User**

7. **SQL Editor** > Exécutez :
```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'paty10j@hotmail.com';
```

8. Vérifiez :
```sql
SELECT email, raw_user_meta_data->>'role' as role 
FROM auth.users 
WHERE email = 'paty10j@hotmail.com';
```

**Résultat attendu** : `role = 'admin'` ✅

---

### ✅ 2. Vérifier les variables d'environnement

#### Fichier `.env.local` (développement)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key-ici
NEXT_PUBLIC_API_URL=/api
```

#### Variables sur Vercel (production)

1. Allez sur https://vercel.com
2. Sélectionnez votre projet
3. **Settings** > **Environment Variables**
4. Ajoutez :

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` | Production, Preview, Development |
| `NEXT_PUBLIC_API_URL` | `/api` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | `https://votre-domaine.com` | Production, Preview, Development |
| `EMAIL_USER` | `votre-email@gmail.com` | Production, Preview, Development |
| `EMAIL_PASS` | `mot-de-passe-application-16-car` | Production, Preview, Development |
| `GOOGLE_CLIENT_ID` | `123456789-xxx.apps.googleusercontent.com` | Production, Preview, Development |
| `GOOGLE_CLIENT_SECRET` | `GOCSPX-xxxxxx` | Production, Preview, Development |
| `GOOGLE_REFRESH_TOKEN` | `1//xxxxxxxxx` | Production, Preview, Development |
| `GOOGLE_CALENDAR_ID` | `primary` | Production, Preview, Development |
| `GOOGLE_REVIEW_URL` | `https://g.page/r/XXX/review` | Production, Preview, Development |
| `INTERNAL_API_SECRET` | `[secret-32-chars+]` | Production, Preview, Development |

⚠️ **IMPORTANT** : 
- Ne JAMAIS exposer le `service_role_key`
- Seule la `anon_key` publique doit être utilisée

---

### ✅ 3. Configurer Supabase pour la production

#### A. Configurer l'URL du site dans Supabase

1. Supabase Dashboard > **Authentication** > **URL Configuration**
2. **Site URL** : `https://votre-domaine.com`
3. **Redirect URLs** : 
   - `https://votre-domaine.com/admin`
   - `https://votre-domaine.com/admin/login`

#### B. Activer les emails de confirmation (optionnel)

1. **Authentication** > **Email Templates**
2. Personnalisez les templates d'emails si nécessaire
3. Vérifiez que "Enable email confirmations" est activé

#### C. Configurer la sécurité des cookies

Dans **Authentication** > **Settings** :
- ✅ **JWT expiry limit** : 3600 (1 heure)
- ✅ **Refresh token expiry** : 604800 (7 jours)
- ✅ **Enable custom access token hook** : Non (sauf besoin spécifique)

---

### ✅ 4. Déployer sur Vercel

#### Option A : Déploiement automatique (GitHub)

1. Commitez et pushez votre code :
```bash
git add .
git commit -m "feat: ajout authentification admin complète"
git push origin main
```

2. Vercel déploiera automatiquement

#### Option B : Déploiement manuel

```bash
npm run build
vercel --prod
```

---

### ✅ 5. Tester en production

Après déploiement, testez **dans cet ordre** :

#### Test 1 : Protection des routes
```
1. Allez sur : https://votre-domaine.com/admin
2. ✅ Vous devez être redirigé vers /admin/login
```

#### Test 2 : Connexion
```
1. Sur /admin/login, connectez-vous avec :
   - Email : paty10j@hotmail.com
   - Password : [votre mot de passe]
2. ✅ Vous devez être redirigé vers /admin
3. ✅ Vous devez voir le tableau de bord
```

#### Test 3 : Cookies sécurisés
```
1. Ouvrez DevTools (F12)
2. Application > Cookies > votre-domaine.com
3. ✅ Vérifiez que les cookies Supabase sont présents
4. ✅ Vérifiez HttpOnly = ✅
5. ✅ Vérifiez Secure = ✅
6. ✅ Vérifiez SameSite = Strict
```

#### Test 4 : Navigation admin
```
1. Cliquez sur "Disponibilités"
2. ✅ La page charge sans redirection
3. Cliquez sur "Rendez-vous"
4. ✅ La page charge sans redirection
```

#### Test 5 : API protégées
```
1. Ouvrez un nouvel onglet en navigation privée
2. Allez sur : https://votre-domaine.com/api/admin/dashboard
3. ✅ Vous devez voir : {"success":false,"error":"Non authentifié"}
```

#### Test 6 : Déconnexion
```
1. Cliquez sur "Se déconnecter"
2. ✅ Vous devez être redirigé vers /admin/login
3. Essayez d'aller sur /admin
4. ✅ Vous devez être redirigé vers /admin/login
```

---

### ✅ 6. Configuration DNS (si domaine personnalisé)

Si vous utilisez un domaine personnalisé (ex: salonpatricia.com) :

#### Sur Vercel :
1. **Settings** > **Domains**
2. Ajoutez votre domaine : `salonpatricia.com`
3. Notez les enregistrements DNS fournis

#### Chez votre registrar (ex: OVH, Gandi, Namecheap) :
1. Allez dans la gestion DNS
2. Ajoutez un enregistrement **A** ou **CNAME** :
   - Type : A
   - Nom : @
   - Valeur : [IP fournie par Vercel]
   
3. Ajoutez un enregistrement **CNAME** pour www :
   - Type : CNAME
   - Nom : www
   - Valeur : cname.vercel-dns.com

**Propagation** : Attendre 1-24h

---

### ✅ 7. HTTPS et sécurité

#### Vercel active automatiquement :
- ✅ **HTTPS/SSL** : Certificat Let's Encrypt gratuit
- ✅ **HTTP → HTTPS** : Redirection automatique
- ✅ **HSTS** : Strict-Transport-Security activé
- ✅ **Cookies Secure** : Automatique en HTTPS

Rien à faire ! 🎉

---

### ✅ 8. Monitoring et logs

#### Voir les logs en production :

**Sur Vercel** :
1. Votre projet > **Deployments** > [Dernier déploiement]
2. **Functions** > Cliquez sur une fonction
3. Voir les logs en temps réel

**Sur Supabase** :
1. **Logs** > **Auth Logs** : Voir les tentatives de connexion
2. **Logs** > **Database** : Voir les requêtes SQL

---

## 🔒 Checklist de sécurité finale

- [ ] Compte admin créé dans Supabase avec `role='admin'`
- [ ] Mot de passe FORT pour Patricia (12+ caractères)
- [ ] Variables d'environnement configurées sur Vercel
- [ ] HTTPS activé (automatique sur Vercel)
- [ ] Cookies sécurisés (HttpOnly, Secure, SameSite=Strict)
- [ ] Impossible d'accéder à `/admin` sans login
- [ ] Impossible d'accéder aux API `/api/admin/*` sans auth
- [ ] Déconnexion fonctionne correctement
- [ ] Pas de `service_role_key` exposée côté client
- [ ] Row Level Security (RLS) activé dans Supabase

---

## 🐛 Dépannage production

### Problème : "Non authentifié" après connexion

**Solution** :
1. Vérifiez les cookies dans DevTools
2. Vérifiez que les variables d'environnement sont bien définies sur Vercel
3. Redéployez le site : `vercel --prod`

### Problème : Redirection infinie entre /admin et /admin/login

**Solution** :
1. Vérifiez que `middleware.ts` est bien déployé
2. Vérifiez que l'utilisateur a `role='admin'` dans Supabase
3. Supprimez les cookies et reconnectez-vous

### Problème : CORS errors

**Solution** :
1. Dans Supabase : **Settings** > **API**
2. **Allowed origins** : Ajoutez votre domaine production

### Problème : Cookies non définis

**Solution** :
1. Vérifiez que vous êtes en HTTPS (requis pour cookies Secure)
2. Vérifiez la configuration des cookies dans middleware.ts

---

## 📊 Métriques à surveiller

### Authentification :
- Nombre de tentatives de connexion échouées
- Temps de session moyen
- Fréquence des déconnexions

### Performance :
- Temps de chargement de `/admin/login`
- Temps de chargement du tableau de bord
- Temps de réponse des API `/api/admin/*`

**Outils** :
- Vercel Analytics : Performance
- Supabase Logs : Authentification
- Google Analytics : Utilisation

---

## 🎯 Post-déploiement

### Actions à faire une fois en prod :

1. **Envoyer les identifiants à Patricia** :
   ```
   URL : https://votre-domaine.com/admin/login
   Email : paty10j@hotmail.com
   Mot de passe : [communiquer de manière sécurisée]
   ```

2. **Former Patricia** :
   - Comment se connecter
   - Comment gérer les disponibilités
   - Comment accepter/refuser les rendez-vous
   - Comment se déconnecter

3. **Sauvegarder les identifiants** :
   - Dans un gestionnaire de mots de passe (1Password, Bitwarden)
   - Ne JAMAIS les envoyer par email non chiffré

4. **Activer la 2FA (optionnel mais recommandé)** :
   - Supabase Auth supporte la 2FA
   - Configuration dans **Authentication** > **Settings**

---

## 🔄 Mises à jour futures

Pour déployer des modifications :

```bash
# 1. Faire les modifications
git add .
git commit -m "feat: description des changements"

# 2. Pousser sur GitHub
git push origin main

# 3. Vercel déploie automatiquement
# Vérifier sur : https://vercel.com/votre-username/votre-projet
```

---

## 📞 Support

En cas de problème en production :

1. **Consulter les logs Vercel** : https://vercel.com/dashboard
2. **Consulter les logs Supabase** : https://app.supabase.com
3. **Vérifier le status** : https://status.vercel.com
4. **Vérifier Supabase** : https://status.supabase.com

---

**Date** : Novembre 2024  
**Version** : 1.0 - Production Ready ✅  
**Checklist** : ⬜ Compte admin créé | ⬜ Variables env | ⬜ Tests passés
