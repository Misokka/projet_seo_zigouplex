# 🚀 Installation des nouvelles fonctionnalités

## ✨ Fonctionnalités ajoutées

### 1️⃣ **Synchronisation automatique avec Google Calendar**
- Chaque rendez-vous accepté → Ajouté automatiquement au Google Calendar de Patricia
- Visible sur téléphone, ordinateur, tablette
- Rappels automatiques 24h et 1h avant

### 2️⃣ **Système d'avis Google automatique**
- 2h après le rendez-vous → Email automatique au client
- Lien direct vers Google Reviews du salon
- Évite les doublons, 1 seul email par rendez-vous

---

## 📦 Installation des dépendances

```bash
npm install googleapis
```

---

## ⚙️ Configuration requise

### **1. Nouvelles variables d'environnement**

Ajouter dans `.env.local` **ET** dans **Vercel** :

```env
# Google Calendar API
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
GOOGLE_CALENDAR_ID=primary

# Google Reviews
GOOGLE_REVIEW_URL=https://g.page/r/VOTRE_PLACE_ID/review

# Sécurité API
INTERNAL_API_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
```

### **2. Migration base de données Supabase**

Exécuter dans le **SQL Editor de Supabase** :

```bash
# Ouvrir et exécuter :
supabase_review_tracking.sql
```

Ajoute les colonnes :
- `review_request_sent` (boolean)
- `review_request_sent_at` (timestamp)

### **3. Déployer l'Edge Function Supabase**

```bash
# Installer le CLI Supabase
npm install -g supabase

# Login
supabase login

# Déployer la fonction
supabase functions deploy send-review-requests
```

**Dans Supabase Dashboard → Edge Functions → Secrets**, ajouter :
- `NEXT_PUBLIC_SITE_URL` = votre URL de production
- `INTERNAL_API_SECRET` = même valeur que dans Vercel

### **4. Configurer le Cron**

Dans le **SQL Editor de Supabase**, exécuter :

```bash
# Ouvrir et adapter :
supabase_cron_setup.sql
```

⚠️ **Remplacer** dans le fichier :
- `YOUR_SUPABASE_PROJECT_URL` → votre vraie URL Supabase
- `YOUR_SUPABASE_ANON_KEY` → votre clé publique

---

## 📚 Guides de configuration détaillés

### **Google Calendar**
Suivre le guide complet : [`GOOGLE_CALENDAR_SETUP.md`](./GOOGLE_CALENDAR_SETUP.md)

**Étapes clés** :
1. Créer projet Google Cloud
2. Activer Google Calendar API
3. Créer credentials OAuth 2.0
4. Obtenir Refresh Token
5. Ajouter les variables d'environnement

### **Système d'avis Google**
Suivre le guide complet : [`REVIEW_SYSTEM_SETUP.md`](./REVIEW_SYSTEM_SETUP.md)

**Étapes clés** :
1. Obtenir lien Google Reviews du salon
2. Générer `INTERNAL_API_SECRET`
3. Exécuter migration SQL
4. Déployer Edge Function
5. Configurer cron quotidien

---

## ✅ Checklist complète

### **Préparation**
- [ ] `npm install googleapis` exécuté
- [ ] Toutes les variables d'environnement ajoutées dans `.env.local`
- [ ] Toutes les variables d'environnement ajoutées dans **Vercel**

### **Google Calendar**
- [ ] Projet Google Cloud créé
- [ ] Google Calendar API activée
- [ ] Credentials OAuth obtenus
- [ ] Refresh Token généré
- [ ] Variables `GOOGLE_*` configurées

### **Système d'avis**
- [ ] Lien Google Reviews obtenu
- [ ] `GOOGLE_REVIEW_URL` configuré
- [ ] `INTERNAL_API_SECRET` généré (32+ caractères)
- [ ] Migration `supabase_review_tracking.sql` exécutée
- [ ] Colonnes `review_request_sent` créées
- [ ] Edge Function déployée
- [ ] Secrets Supabase configurés
- [ ] Cron configuré (`supabase_cron_setup.sql`)

### **Tests**
- [ ] Test Google Calendar : accepter un RDV → vérifier création événement
- [ ] Test email avis : créer RDV passé → forcer envoi → vérifier réception

---

## 🧪 Tests rapides

### **Tester Google Calendar**

1. Se connecter à l'interface admin
2. Accepter un rendez-vous
3. Vérifier dans les logs serveur :
   ```
   ✅ Événement créé dans Google Calendar
   ```
4. Ouvrir Google Calendar de Patricia → Voir l'événement

### **Tester le système d'avis**

**Option A : Test manuel via SQL**

```sql
-- Créer un RDV de test passé
INSERT INTO rendezvous (nom, email, telephone, service, date, heure, statut, review_request_sent)
VALUES ('Test Avis', 'votre-email@test.com', '+32470000000', 'Coupe femme', 
        (CURRENT_DATE - INTERVAL '1 day')::text, '10:00', 'accepte', FALSE);

-- Puis exécuter la fonction manuellement (voir ci-dessous)
```

**Option B : Test via curl**

```bash
curl -X POST https://VOTRE_PROJET.supabase.co/functions/v1/send-review-requests \
  -H "Authorization: Bearer VOTRE_ANON_KEY" \
  -H "Content-Type: application/json"
```

Vérifier :
- Email reçu avec lien Google Reviews
- `review_request_sent = TRUE` dans la BDD

---

## 🔧 Commandes utiles

### **Voir les rendez-vous éligibles pour avis**

```sql
SELECT nom, email, date, heure, review_request_sent
FROM rendezvous
WHERE statut = 'accepte' 
  AND review_request_sent = FALSE
  AND email IS NOT NULL
  AND date <= CURRENT_DATE
ORDER BY date DESC;
```

### **Voir les avis déjà envoyés**

```sql
SELECT nom, email, date, review_request_sent_at
FROM rendezvous
WHERE review_request_sent = TRUE
ORDER BY review_request_sent_at DESC
LIMIT 10;
```

### **Forcer l'envoi pour un RDV spécifique (test)**

```sql
UPDATE rendezvous 
SET review_request_sent = FALSE 
WHERE id = 'ID_DU_RDV';
```

### **Vérifier le cron Supabase**

```sql
SELECT * FROM cron.job WHERE jobname = 'send-review-requests-daily';
SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 5;
```

---

## 📊 Monitoring

### **Logs Google Calendar**

Dans le terminal serveur Next.js (local) ou Vercel (production), chercher :
```
✅ Événement créé dans Google Calendar
⚠️ Erreur Google Calendar (non-bloquant)
```

### **Logs système d'avis**

**Supabase Edge Function** :
- Dashboard → Edge Functions → `send-review-requests` → Logs

**API Next.js** :
- Vercel → Functions → `/api/send-review-request` → Logs

**Base de données** :
```sql
SELECT 
  COUNT(*) FILTER (WHERE review_request_sent = TRUE) as emails_envoyes,
  COUNT(*) FILTER (WHERE statut = 'accepte') as total_acceptes
FROM rendezvous;
```

---

## 🚨 Dépannage rapide

### **Google Calendar ne synchronise pas**

1. Vérifier les variables `GOOGLE_*` dans `.env.local` et Vercel
2. Vérifier que l'API est activée dans Google Cloud Console
3. Régénérer le Refresh Token si expiré
4. Consulter les logs serveur pour l'erreur exacte

### **Emails d'avis non envoyés**

1. Vérifier que le cron s'exécute : `SELECT * FROM cron.job;`
2. Vérifier les logs Edge Function (Supabase Dashboard)
3. Vérifier que `INTERNAL_API_SECRET` est identique dans Supabase et Vercel
4. Vérifier `NEXT_PUBLIC_SITE_URL` pointe vers le bon domaine
5. Tester manuellement avec curl

### **Erreur "Non autorisé" (401)**

Le token `INTERNAL_API_SECRET` ne correspond pas.

**Solution** :
```bash
# Générer nouveau secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Ajouter dans :
# 1. .env.local
# 2. Vercel → Environment Variables
# 3. Supabase → Edge Functions → Secrets
```

---

## 📞 Support

**Documentation complète** :
- [`GOOGLE_CALENDAR_SETUP.md`](./GOOGLE_CALENDAR_SETUP.md) - Configuration Google Calendar
- [`REVIEW_SYSTEM_SETUP.md`](./REVIEW_SYSTEM_SETUP.md) - Configuration système d'avis
- [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) - Déploiement production

**Ressources externes** :
- [Google Calendar API Docs](https://developers.google.com/calendar/api/guides/overview)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [pg_cron Documentation](https://github.com/citusdata/pg_cron)

---

## 🎉 Fonctionnalités activées

Une fois la configuration terminée, voici ce qui se passe automatiquement :

### **Lors de l'acceptation d'un rendez-vous**
1. ✅ Email de confirmation envoyé au client
2. ✅ Événement créé dans Google Calendar de Patricia
3. ✅ Rappels programmés (24h et 1h avant)

### **Après le rendez-vous (quotidien à 20h)**
1. 🔍 Le système détecte les RDV terminés depuis 2h+
2. 📧 Envoi automatique d'email de demande d'avis
3. ⭐ Client peut laisser avis Google en 1 clic
4. ✅ Marquage dans la BDD pour éviter doublons

**Résultat** : Patricia voit tous ses RDV sur son téléphone et reçoit plus d'avis Google naturellement ! 🎊
