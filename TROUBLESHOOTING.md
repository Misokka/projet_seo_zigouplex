# 🔧 Guide de dépannage rapide

## ❌ Erreur 500 lors de l'acceptation/refus d'un rendez-vous

### Problème
```
AxiosError: Request failed with status code 500
PATCH http://localhost:3000/api/admin/rendezvous 500 (Internal Server Error)
```

### ✅ Solutions appliquées

1. **Suppression de `updated_at` dans la route PATCH**
   - Supabase n'avait pas encore de colonne `updated_at`
   - Le code a été mis à jour pour ne plus utiliser cette colonne

2. **Suppression de `created_at` manuel dans la route POST**
   - Supabase génère automatiquement `created_at` avec DEFAULT NOW()
   - Pas besoin de le spécifier manuellement

### 🔄 Étapes pour résoudre

#### Étape 1 : Vérifier la structure de la table Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Ouvrez votre projet
3. Allez dans **Table Editor** → **rendezvous**
4. Vérifiez que la table a ces colonnes :

| Colonne    | Type          | Nullable | Default         |
|------------|---------------|----------|-----------------|
| id         | uuid          | Non      | gen_random_uuid() |
| nom        | text          | Non      | -               |
| telephone  | text          | Non      | -               |
| email      | text          | Oui      | -               |
| service    | text          | Non      | -               |
| date       | date          | Non      | -               |
| heure      | time          | Non      | -               |
| message    | text          | Oui      | -               |
| statut     | text          | Non      | 'en_attente'    |
| created_at | timestamptz   | Oui      | NOW()           |

#### Étape 2 : Si la colonne `created_at` manque

Exécutez ce SQL dans l'éditeur SQL de Supabase :

```sql
ALTER TABLE rendezvous 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
```

#### Étape 3 : Redémarrer le serveur

```bash
# Dans le terminal, arrêtez le serveur (Ctrl+C)
# Puis redémarrez
npm run dev
```

#### Étape 4 : Tester à nouveau

1. Allez sur `/admin/rendezvous`
2. Cliquez sur "Rafraîchir" 🔄
3. Essayez d'accepter ou refuser un rendez-vous

### 🔍 Vérifier les logs du serveur

Si l'erreur persiste, vérifiez les logs dans le terminal où tourne `npm run dev`.

Vous devriez voir des messages comme :
- `Erreur Supabase PATCH :` (si erreur Supabase)
- `Erreur lors de la récupération du rendez-vous :` (si RDV introuvable)
- `Erreur lors de l'envoi de l'email :` (si erreur email)

### 📝 Autres erreurs possibles

#### Erreur : "Rendez-vous introuvable" (404)

**Cause :** L'ID du rendez-vous n'existe pas dans Supabase

**Solution :**
- Rafraîchissez la liste des rendez-vous
- Vérifiez que le rendez-vous existe dans Supabase

#### Erreur : "Statut mis à jour mais l'envoi d'email a échoué"

**Cause :** Le statut a été mis à jour, mais l'email n'a pas pu être envoyé

**Solutions :**
- Vérifiez `EMAIL_USER` et `EMAIL_PASS` dans `.env`
- Vérifiez que le client a un email renseigné
- Vérifiez les logs du serveur pour l'erreur email exacte

#### Erreur : "Impossible de charger les rendez-vous"

**Cause :** Problème de connexion à Supabase

**Solutions :**
- Vérifiez `NEXT_PUBLIC_SUPABASE_URL` dans `.env`
- Vérifiez `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans `.env`
- Vérifiez que Supabase est accessible
- Désactivez RLS temporairement pour tester

### 🔐 Désactiver RLS pour les tests

Si vous avez activé Row Level Security sur la table `rendezvous`, désactivez-le temporairement :

```sql
-- Dans l'éditeur SQL de Supabase
ALTER TABLE rendezvous DISABLE ROW LEVEL SECURITY;
```

Plus tard, vous pourrez le réactiver et créer des policies appropriées.

### ✅ Checklist finale

- [ ] Table `rendezvous` existe dans Supabase
- [ ] Colonne `created_at` existe avec DEFAULT NOW()
- [ ] RLS désactivé pour les tests
- [ ] Variables d'environnement correctes dans `.env`
- [ ] Serveur redémarré après les modifications
- [ ] Console du navigateur ouverte (F12) pour voir les erreurs
- [ ] Logs du serveur surveillés dans le terminal

### 🎯 Test après correction

1. Créez un nouveau rendez-vous via `/pages/rendezvous`
2. Allez sur `/admin/rendezvous`
3. Cliquez sur "✓ Accepter"
4. Vérifiez le message de succès vert
5. Vérifiez l'email reçu
6. Vérifiez Supabase → statut doit être "accepte"

---

## 💡 Rappel : Structure minimale requise

Votre table Supabase doit AU MINIMUM avoir :

```sql
CREATE TABLE rendezvous (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  telephone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  heure TIME NOT NULL,
  message TEXT,
  statut TEXT DEFAULT 'en_attente',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Si votre table n'a pas cette structure, utilisez `supabase_setup_simple.sql`.

---

**Dernière mise à jour :** ${new Date().toLocaleString()}
