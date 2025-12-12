# ⭐ Système d'avis automatique Google Reviews

Ce guide explique comment configurer le système d'envoi automatique d'emails de demande d'avis Google aux clients après leur rendez-vous.

---

## 🎯 Objectif

**2 heures après** qu'un rendez-vous accepté soit terminé, le client reçoit automatiquement un email l'invitant à laisser un avis sur la page Google du salon.

**Fonctionnement** :
1. Patricia accepte un rendez-vous → Statut passe à `accepte`
2. Le rendez-vous a lieu (date + heure passées)
3. **2h après** l'heure du RDV, un job automatique s'exécute
4. Le système envoie un email avec un lien direct vers Google Reviews
5. Le rendez-vous est marqué comme "email d'avis envoyé" pour éviter les doublons

---

## 📋 Architecture du système

```
┌─────────────────────────────────────────────────────────────────┐
│  Supabase Edge Function (Cron quotidien à 20h)                  │
│  ↓                                                               │
│  Recherche rendez-vous acceptés passés sans email d'avis        │
│  ↓                                                               │
│  Filtre ceux terminés depuis au moins 2h                        │
│  ↓                                                               │
│  Appelle API Next.js /api/send-review-request                   │
│  ↓                                                               │
│  Envoie email au client avec lien Google Reviews                │
│  ↓                                                               │
│  Marque review_request_sent = TRUE dans BDD                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Configuration étape par étape

### **1. Obtenir le lien Google Reviews du salon**

1. Aller sur [Google Business Profile](https://business.google.com/)
2. Se connecter avec le compte du salon
3. Sélectionner l'établissement **Salon Patricia Osores**
4. Aller dans **"Obtenir plus d'avis"**
5. Copier le **lien court** de type : `https://g.page/r/XXXXXXXXX/review`

**Alternative** : Utiliser la structure :
```
https://search.google.com/local/writereview?placeid=VOTRE_PLACE_ID
```

Pour trouver le Place ID :
- Aller sur [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
- Rechercher "Salon Patricia Osores, Juprelle"
- Copier le **Place ID**

---

### **2. Configurer les variables d'environnement**

Ajouter dans `.env.local` et **Vercel** :

```env
# Google Reviews
GOOGLE_REVIEW_URL=https://g.page/r/XXXXXXXXX/review

# Sécurité API interne (générer une clé aléatoire forte)
INTERNAL_API_SECRET=your-random-secret-key-min-32-chars
```

**Générer un secret sécurisé** :
```bash
# Dans le terminal (Node.js)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### **3. Exécuter la migration de base de données**

Dans le **SQL Editor de Supabase** :

1. Ouvrir `supabase_review_tracking.sql`
2. Copier tout le contenu
3. Coller dans le SQL Editor de Supabase
4. Cliquer sur **"Run"**

**Vérification** :
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'rendezvous' 
AND column_name IN ('review_request_sent', 'review_request_sent_at');
```

Vous devriez voir :
- `review_request_sent` → boolean
- `review_request_sent_at` → timestamp with time zone

---

### **4. Déployer l'Edge Function Supabase**

**Installation du CLI Supabase** (si pas déjà fait) :
```bash
npm install -g supabase
```

**Login** :
```bash
supabase login
```

**Déployer la fonction** :
```bash
supabase functions deploy send-review-requests
```

**Configurer les variables d'environnement** dans Supabase Dashboard :
1. Aller dans **Settings** → **Edge Functions**
2. Ajouter les secrets :
   ```
   NEXT_PUBLIC_SITE_URL=https://votre-site.vercel.app
   INTERNAL_API_SECRET=your-random-secret-key-min-32-chars
   ```

---

### **5. Configurer le Cron (exécution quotidienne)**

**Option A : pg_cron (recommandé pour Supabase)**

Dans le **SQL Editor de Supabase** :

1. Ouvrir `supabase_cron_setup.sql`
2. Remplacer `YOUR_SUPABASE_PROJECT_URL` par votre vraie URL
3. Remplacer `YOUR_SUPABASE_ANON_KEY` par votre clé publique
4. Exécuter le script

**Vérifier le cron** :
```sql
SELECT * FROM cron.job WHERE jobname = 'send-review-requests-daily';
```

**Option B : Supabase Platform Cron (alternative)**

Créer `.config/functions/send-review-requests.json` :
```json
{
  "schedule": "0 20 * * *",
  "region": "eu-west-1"
}
```

---

### **6. Tester le système**

**Test manuel de la fonction** :

```bash
curl -X POST https://VOTRE_PROJET.supabase.co/functions/v1/send-review-requests \
  -H "Authorization: Bearer VOTRE_ANON_KEY" \
  -H "Content-Type: application/json"
```

**Test complet** :
1. Créer un rendez-vous avec une date/heure passée depuis 3h
2. L'accepter dans l'interface admin
3. Marquer manuellement `review_request_sent = FALSE`
4. Exécuter la fonction manuellement (curl ci-dessus)
5. Vérifier que l'email est reçu
6. Vérifier que `review_request_sent = TRUE` dans la BDD

**Forcer un test avec SQL** :
```sql
-- Créer un RDV de test passé
INSERT INTO rendezvous (nom, email, telephone, service, date, heure, statut, review_request_sent)
VALUES ('Test Client', 'votre-email@test.com', '+32470000000', 'Coupe femme', 
        (CURRENT_DATE - INTERVAL '1 day')::text, 
        '10:00', 'accepte', FALSE);

-- Vérifier
SELECT * FROM rendezvous WHERE nom = 'Test Client';

-- Exécuter manuellement la fonction ou attendre le cron
```

---

## 📧 Contenu de l'email d'avis

L'email contient :
- **Sujet** : "Comment s'est passé votre rendez-vous ?"
- **Message personnalisé** avec nom du client
- **Rappel** du service et de la date
- **Bouton CTA bleu** : "⭐ Laisser un avis Google"
- **Lien direct** vers la page Google Reviews du salon
- **Coordonnées complètes** du salon

**Aperçu de l'email** : voir `lib/emailService.ts` → fonction `sendReviewRequestEmail()`

---

## ⏰ Planification et timing

- **Cron** : Tous les jours à **20h00** (heure Europe/Brussels)
- **Filtre** : Rendez-vous terminés depuis **au moins 2 heures**
- **Évite les doublons** : Vérifie `review_request_sent = FALSE`

**Exemple** :
- Rendez-vous : Lundi 14h00
- Rendez-vous terminé : Lundi ~15h00
- Éligibilité : Lundi 17h00 (2h après)
- Envoi effectif : Lundi 20h00 (passage du cron)

---

## 🔍 Monitoring et logs

### **Voir les rendez-vous éligibles**

```sql
SELECT id, nom, email, date, heure, statut, review_request_sent, review_request_sent_at
FROM rendezvous
WHERE statut = 'accepte' 
  AND review_request_sent = FALSE
  AND email IS NOT NULL
  AND date <= CURRENT_DATE
ORDER BY date DESC, heure DESC;
```

### **Voir les avis déjà envoyés**

```sql
SELECT nom, email, date, heure, review_request_sent_at
FROM rendezvous
WHERE review_request_sent = TRUE
ORDER BY review_request_sent_at DESC
LIMIT 20;
```

### **Logs de la Edge Function**

Dans Supabase Dashboard :
1. **Edge Functions** → `send-review-requests`
2. Onglet **Logs**
3. Voir les exécutions et erreurs

### **Logs de l'API Next.js**

Dans Vercel Dashboard :
1. **Functions** → `/api/send-review-request`
2. Voir les invocations et erreurs

---

## 🎨 Personnalisation

### **Modifier le délai d'envoi (2h par défaut)**

Dans `supabase/functions/send-review-requests/index.ts` :

```typescript
// Changer 2 * 60 * 60 * 1000 pour modifier
const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000)

// Exemples :
// 1 heure  : 1 * 60 * 60 * 1000
// 4 heures : 4 * 60 * 60 * 1000
// 1 jour   : 24 * 60 * 60 * 1000
```

### **Modifier l'heure du cron**

Dans `supabase_cron_setup.sql` :

```sql
'0 20 * * *' -- 20h00
'0 9 * * *'  -- 9h00
'0 12 * * *' -- 12h00
'0 21 * * *' -- 21h00
```

**Format cron** : `minute heure jour mois jour_semaine`

### **Modifier le template d'email**

Dans `lib/emailService.ts` → fonction `sendReviewRequestEmail()`, personnaliser :
- Le texte du message
- Les couleurs (codes hexa)
- Le bouton CTA
- La signature

---

## 🔐 Sécurité

✅ **API protégée** : `INTERNAL_API_SECRET` empêche les appels non autorisés
✅ **Pas de spam** : Chaque client ne reçoit qu'**un seul email** par RDV
✅ **Données sensibles** : Les secrets ne sont jamais exposés côté client
✅ **Rate limiting** : Supabase limite automatiquement les appels Edge Functions

---

## 🚨 Troubleshooting

### **Aucun email n'est envoyé**

1. Vérifier que le cron s'exécute : `SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 10;`
2. Vérifier les logs de la Edge Function (Supabase Dashboard)
3. Vérifier que `INTERNAL_API_SECRET` est identique dans Supabase et Vercel
4. Vérifier que `NEXT_PUBLIC_SITE_URL` pointe vers le bon domaine
5. Vérifier les credentials Nodemailer (`EMAIL_USER`, `EMAIL_PASS`)

### **Erreur "Non autorisé" (401)**

Le token `INTERNAL_API_SECRET` ne correspond pas entre Supabase et Vercel.

**Solution** :
- Régénérer un nouveau secret
- L'ajouter dans `.env.local`, Vercel ET Supabase Edge Functions secrets

### **Emails en double**

Si `review_request_sent` ne se met pas à `TRUE` :

**Vérifier la migration** :
```sql
SELECT review_request_sent FROM rendezvous WHERE id = 'ID_TEST';
```

**Forcer la mise à jour** :
```sql
UPDATE rendezvous SET review_request_sent = TRUE WHERE email = 'test@example.com';
```

### **Lien Google Reviews ne fonctionne pas**

1. Vérifier que `GOOGLE_REVIEW_URL` est bien défini
2. Tester le lien manuellement dans un navigateur
3. Utiliser le format `https://g.page/r/PLACE_ID/review`

---

## ✅ Checklist de configuration

- [ ] Lien Google Reviews obtenu
- [ ] Variable `GOOGLE_REVIEW_URL` ajoutée
- [ ] Variable `INTERNAL_API_SECRET` générée et ajoutée
- [ ] Migration SQL `supabase_review_tracking.sql` exécutée
- [ ] Colonnes `review_request_sent` et `review_request_sent_at` créées
- [ ] Edge Function déployée : `supabase functions deploy send-review-requests`
- [ ] Secrets ajoutés dans Supabase Dashboard
- [ ] Cron configuré (pg_cron ou Supabase Platform)
- [ ] Test manuel effectué avec succès
- [ ] Email de test reçu avec bon lien Google Reviews

---

## 📊 Statistiques d'avis

**Voir le taux d'envoi d'emails** :
```sql
SELECT 
  COUNT(*) FILTER (WHERE review_request_sent = TRUE) as emails_envoyes,
  COUNT(*) FILTER (WHERE review_request_sent = FALSE AND statut = 'accepte') as en_attente,
  COUNT(*) as total_acceptes
FROM rendezvous 
WHERE statut = 'accepte';
```

**Rendez-vous du dernier mois avec statut d'email** :
```sql
SELECT nom, email, date, heure, 
       CASE WHEN review_request_sent THEN 'Envoyé' ELSE 'En attente' END as statut_email,
       review_request_sent_at
FROM rendezvous
WHERE statut = 'accepte' 
  AND date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY date DESC, heure DESC;
```

---

## 📞 Support

**Ressources** :
- [Documentation Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Documentation pg_cron](https://github.com/citusdata/pg_cron)
- Logs serveur Next.js : Vercel Dashboard
- Logs Edge Function : Supabase Dashboard

**En cas de problème** :
1. Consulter les logs dans Supabase
2. Vérifier les variables d'environnement
3. Tester manuellement avec curl
4. Vérifier la migration BDD
