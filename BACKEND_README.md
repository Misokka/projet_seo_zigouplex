# Configuration Backend - Système de Rendez-vous

## 📋 Vue d'ensemble

Ce système permet de gérer les demandes de rendez-vous pour le salon Patricia Osores avec :
- ✅ Enregistrement dans Supabase
- ✅ Envoi d'emails automatiques (Patricia + Client)
- ✅ Gestion des statuts (en_attente, accepte, refuse)

## 🚀 Installation

### 1. Installer les dépendances

```bash
npm install @supabase/supabase-js nodemailer @types/nodemailer
```

### 2. Configuration Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Créez un nouveau projet ou utilisez un projet existant
3. Dans l'éditeur SQL, exécutez le script `supabase_setup.sql`
4. Vérifiez que la table `rendezvous` a été créée

### 3. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec :

```env
# Email (Gmail)
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_application

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://yywgluwtlhabsxbbgvqo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5d2dsdXd0bGhhYnN4YmJndnFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzOTg4NzAsImV4cCI6MjA3Nzk3NDg3MH0.1pSnLYL_goHs9BOzYNKalbLUniTeJPxtBSnu7sic-KU
```

### 4. Configurer Gmail pour Nodemailer

1. Allez sur [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Activez la validation en deux étapes
3. Créez un "Mot de passe d'application" :
   - Allez dans "Sécurité" → "Validation en deux étapes" → "Mots de passe d'application"
   - Sélectionnez "Autre (nom personnalisé)"
   - Nommez-le "Salon Patricia Osores"
   - Copiez le mot de passe généré dans `EMAIL_PASS`

## 📁 Structure des fichiers

```
projet_seo_zigouplex/
├── lib/
│   ├── supabaseClient.ts          # Client Supabase
│   └── emailService.ts             # Service d'envoi d'emails
├── app/
│   ├── api/
│   │   └── rendezvous/
│   │       └── route.ts            # Route API POST /api/rendezvous
│   └── components/
│       └── RendezVous.tsx          # Formulaire frontend
├── supabase_setup.sql              # Script SQL pour créer la table
└── .env.local                      # Variables d'environnement (à créer)
```

## 🔄 Flux de fonctionnement

1. **Client remplit le formulaire** (`RendezVous.tsx`)
2. **Envoi POST** vers `/api/rendezvous`
3. **Validation** des champs obligatoires
4. **Enregistrement** dans Supabase (table `rendezvous`)
5. **Envoi d'emails** :
   - Email à Patricia avec les détails
   - Email de confirmation au client
6. **Réponse JSON** au frontend

## 📊 Structure de la table `rendezvous`

| Colonne      | Type      | Description                          |
|--------------|-----------|--------------------------------------|
| id           | UUID      | Identifiant unique                   |
| nom          | VARCHAR   | Nom du client                        |
| telephone    | VARCHAR   | Numéro de téléphone                  |
| email        | VARCHAR   | Email (optionnel)                    |
| service      | VARCHAR   | Service demandé                      |
| date         | DATE      | Date souhaitée                       |
| heure        | TIME      | Heure souhaitée                      |
| message      | TEXT      | Message optionnel                    |
| statut       | VARCHAR   | en_attente, accepte, ou refuse       |
| created_at   | TIMESTAMP | Date de création                     |
| updated_at   | TIMESTAMP | Date de dernière modification        |

## 🧪 Test de l'API

```bash
# Démarrer le serveur de développement
npm run dev

# Tester avec curl
curl -X POST http://localhost:3000/api/rendezvous \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Marie Dupont",
    "telephone": "0486123456",
    "email": "marie@gmail.com",
    "service": "Balayage",
    "date": "2025-11-12",
    "heure": "14:30",
    "message": "Merci de confirmer par SMS"
  }'
```

## ✅ Réponses API

### Succès (200)
```json
{
  "success": true,
  "message": "Demande enregistrée et emails envoyés",
  "data": {
    "id": "uuid",
    "nom": "Marie Dupont",
    ...
  }
}
```

### Erreur validation (400)
```json
{
  "success": false,
  "error": "Les champs nom, téléphone, service, date et heure sont obligatoires"
}
```

### Erreur serveur (500)
```json
{
  "success": false,
  "error": "Erreur lors de l'enregistrement dans la base de données"
}
```

## 🔒 Sécurité

- ✅ Les clés API Supabase sont publiques mais limitées (anon key)
- ✅ Le mot de passe email est dans `.env` (jamais committé)
- ✅ Validation des données côté serveur
- ⚠️ Pour la production, ajoutez :
  - Rate limiting
  - CAPTCHA
  - Authentification admin pour l'espace de gestion

## 📧 Emails envoyés

### Email à Patricia
- **Objet** : Nouvelle demande de rendez-vous — [nom]
- **Contenu** : Détails complets de la demande

### Email au client
- **Objet** : Confirmation de votre demande de rendez-vous
- **Contenu** : Confirmation et rappel des informations

## 🐛 Débogage

Si les emails ne s'envoient pas :
1. Vérifiez que `EMAIL_USER` et `EMAIL_PASS` sont corrects
2. Assurez-vous d'utiliser un mot de passe d'application Gmail
3. Vérifiez les logs dans la console : `console.error('Erreur lors de l'envoi des emails :', emailError)`

Si Supabase ne fonctionne pas :
1. Vérifiez que la table `rendezvous` existe
2. Vérifiez les variables `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Consultez les logs Supabase dans leur dashboard

## 📝 Notes importantes

- **Production** : Changez `NEXT_PUBLIC_API_URL` pour votre domaine de production
- **Email Patricia** : L'email est envoyé à `EMAIL_USER` (modifiable dans `emailService.ts`)
- **Timezone** : Les timestamps sont en UTC

## 🚀 Prochaines étapes

1. ✅ Tester le formulaire en local
2. ✅ Vérifier la réception des emails
3. ✅ Consulter Supabase pour voir les données enregistrées
4. 🔲 Créer l'interface admin pour gérer les rendez-vous
5. 🔲 Déployer sur Vercel
6. 🔲 Configurer les variables d'environnement en production
