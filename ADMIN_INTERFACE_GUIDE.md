# Documentation Interface Admin - Gestion des Rendez-vous

## 📋 Vue d'ensemble

L'interface admin permet à Patricia de :
- ✅ Visualiser tous les rendez-vous en temps réel
- ✅ Filtrer par statut (en attente, accepté, refusé)
- ✅ Accepter ou refuser les demandes
- ✅ Envoyer automatiquement des emails de confirmation/refus aux clients
- ✅ Rechercher par nom, téléphone, email ou service

## 🌐 URLs

- **Interface Admin** : `http://localhost:3000/admin/rendezvous`
- **API GET (liste)** : `http://localhost:3000/api/admin/rendezvous`
- **API PATCH (mise à jour)** : `http://localhost:3000/api/admin/rendezvous`

## 🔄 Flux de fonctionnement

### 1. Chargement initial

```
┌─────────────────┐
│  RendezVousAdmin │
│   (useEffect)    │
└────────┬─────────┘
         │
         ▼
    GET /api/admin/rendezvous
         │
         ▼
   ┌─────────────┐
   │  Supabase   │
   │ (rendezvous)│
   └─────────────┘
         │
         ▼
  Affichage des RDV
```

### 2. Acceptation d'un rendez-vous

```
┌────────────────┐
│ Clic "Accepter"│
└────────┬────────┘
         │
         ▼
  PATCH /api/admin/rendezvous
  { id: "xxx", statut: "accepte" }
         │
         ├──> Mise à jour Supabase
         │
         └──> Envoi email confirmation
              au client
         │
         ▼
  Rafraîchissement UI
```

### 3. Refus d'un rendez-vous

```
┌────────────────┐
│ Clic "Refuser" │
└────────┬────────┘
         │
         ▼
  PATCH /api/admin/rendezvous
  { id: "xxx", statut: "refuse" }
         │
         ├──> Mise à jour Supabase
         │
         └──> Envoi email refus
              au client
         │
         ▼
  Rafraîchissement UI
```

## 📊 Fonctionnalités de l'interface

### Filtres et recherche

```tsx
// Filtres disponibles
- Tous : Affiche tous les rendez-vous
- En attente : Affiche uniquement les rendez-vous en attente
- Acceptés : Affiche uniquement les rendez-vous acceptés
- Refusés : Affiche uniquement les rendez-vous refusés

// Recherche
Recherche dans : nom, téléphone, email, service
```

### Badges de statut

| Statut      | Badge              | Couleur |
|-------------|--------------------|---------|
| en_attente  | 🟡 En attente      | Jaune   |
| accepte     | 🟢 Accepté         | Vert    |
| refuse      | 🔴 Refusé          | Rouge   |

### Actions disponibles

**Pour les rendez-vous en attente :**
- ✓ Accepter → Change le statut + Envoie email de confirmation
- ✕ Refuser → Change le statut + Envoie email de refus

**Pour tous les rendez-vous :**
- Détails → Affiche les informations complètes

## 📧 Emails automatiques

### Email d'acceptation

**Déclencheur :** Patricia clique sur "Accepter"

**Destinataire :** Email du client (si renseigné)

**Contenu :**
```
Objet : Votre rendez-vous est confirmé ! ✅

Bonjour [nom],

Excellente nouvelle ! Votre rendez-vous au Salon Patricia Osores est confirmé.

Date : [date]
Heure : [heure]
Service : [service]

Nous vous attendons avec plaisir !
```

### Email de refus

**Déclencheur :** Patricia clique sur "Refuser"

**Destinataire :** Email du client (si renseigné)

**Contenu :**
```
Objet : Votre demande de rendez-vous

Bonjour [nom],

Malheureusement, le créneau horaire que vous avez demandé 
n'est pas disponible.

💡 Nous vous invitons à :
• Proposer un autre créneau via notre site
• Nous contacter directement par téléphone
```

## 🎨 Interface utilisateur

### États de chargement

1. **Chargement initial**
   - Spinner animé
   - Message "Chargement des rendez-vous..."

2. **Mise à jour en cours**
   - Boutons désactivés
   - Affichage "..." pendant l'action

3. **Aucun rendez-vous**
   - Message : "Aucun rendez-vous trouvé pour le moment."

### Messages de feedback

**Succès :**
```
✅ Rendez-vous accepté et email de confirmation envoyé
❌ Rendez-vous refusé et email envoyé
```

**Erreur :**
```
⚠️ Impossible de mettre à jour le statut
⚠️ Impossible de charger les rendez-vous. Vérifiez votre connexion.
```

## 🔧 API Routes

### GET /api/admin/rendezvous

**Description :** Récupère tous les rendez-vous triés par date de création (DESC)

**Requête :**
```bash
curl -X GET http://localhost:3000/api/admin/rendezvous
```

**Réponse (200) :**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "nom": "Marie Dupont",
      "telephone": "0486123456",
      "email": "marie@example.com",
      "service": "Balayage",
      "date": "2025-11-15",
      "heure": "14:30",
      "message": "Message optionnel",
      "statut": "en_attente",
      "created_at": "2025-11-10T10:00:00Z",
      "updated_at": "2025-11-10T10:00:00Z"
    }
  ]
}
```

**Réponse (500) :**
```json
{
  "success": false,
  "error": "Erreur lors de la récupération des rendez-vous"
}
```

### PATCH /api/admin/rendezvous

**Description :** Met à jour le statut d'un rendez-vous et envoie un email au client

**Requête :**
```bash
curl -X PATCH http://localhost:3000/api/admin/rendezvous \
  -H "Content-Type: application/json" \
  -d '{
    "id": "uuid-du-rendez-vous",
    "statut": "accepte"
  }'
```

**Body :**
```json
{
  "id": "uuid",
  "statut": "accepte" | "refuse" | "en_attente"
}
```

**Réponse (200) :**
```json
{
  "success": true,
  "message": "Rendez-vous accepté",
  "data": {
    "id": "uuid",
    "statut": "accepte",
    ...
  }
}
```

**Réponse (400) - Validation :**
```json
{
  "success": false,
  "error": "Les champs id et statut sont obligatoires"
}
```

**Réponse (404) - Introuvable :**
```json
{
  "success": false,
  "error": "Rendez-vous introuvable"
}
```

**Réponse (500) - Erreur serveur :**
```json
{
  "success": false,
  "error": "Erreur lors de la mise à jour du statut"
}
```

## 🧪 Tests

### Test 1 : Affichage des rendez-vous

1. Créez quelques rendez-vous via le formulaire client
2. Allez sur `/admin/rendezvous`
3. Vérifiez que tous les rendez-vous s'affichent
4. Vérifiez que les badges de statut sont corrects

### Test 2 : Filtres

1. Changez le filtre à "En attente"
2. Vérifiez que seuls les RDV en attente s'affichent
3. Testez les autres filtres

### Test 3 : Recherche

1. Entrez un nom dans la barre de recherche
2. Vérifiez que les résultats sont filtrés
3. Testez avec téléphone, email, service

### Test 4 : Acceptation

1. Cliquez sur "Accepter" pour un rendez-vous
2. Vérifiez le message de succès
3. Vérifiez l'email reçu par le client
4. Vérifiez le statut dans Supabase

### Test 5 : Refus

1. Cliquez sur "Refuser" pour un rendez-vous
2. Vérifiez le message de succès
3. Vérifiez l'email reçu par le client
4. Vérifiez le statut dans Supabase

### Test 6 : Rafraîchissement

1. Cliquez sur le bouton 🔄
2. Vérifiez que les données sont rechargées

## 🔒 Sécurité (à implémenter plus tard)

### Protection de l'interface admin

Pour la production, ajoutez :

1. **Authentification**
   ```tsx
   // Middleware de protection
   if (!session) {
     redirect('/login')
   }
   ```

2. **Protection de la route API**
   ```ts
   // Vérifier un token ou une session
   const token = request.headers.get('Authorization')
   if (!token || !isValidToken(token)) {
     return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
   }
   ```

3. **Row Level Security (RLS) dans Supabase**
   ```sql
   -- Activer RLS sur la table rendezvous
   ALTER TABLE rendezvous ENABLE ROW LEVEL SECURITY;
   
   -- Politique pour les admins uniquement
   CREATE POLICY "Admin only" ON rendezvous
     FOR ALL USING (auth.role() = 'admin');
   ```

## 📈 Optimisations futures

1. **Pagination**
   - Limiter à 20 rendez-vous par page
   - Ajouter des boutons Précédent/Suivant

2. **Notifications en temps réel**
   - Utiliser Supabase Realtime
   - Afficher les nouveaux RDV sans rafraîchir

3. **Statistiques**
   - Nombre de RDV par mois
   - Services les plus demandés
   - Taux d'acceptation

4. **Export**
   - Exporter en CSV/Excel
   - Filtrer par date

5. **Notes internes**
   - Ajouter des notes sur chaque RDV
   - Historique des modifications

## 🐛 Dépannage

### L'interface ne charge pas les rendez-vous

1. Vérifiez la console du navigateur (F12)
2. Vérifiez que `NEXT_PUBLIC_API_URL` est correct
3. Vérifiez les logs du serveur
4. Testez l'API directement avec curl

### Les emails ne sont pas envoyés

1. Vérifiez que le client a un email renseigné
2. Vérifiez les logs serveur pour les erreurs d'email
3. Vérifiez `EMAIL_USER` et `EMAIL_PASS`
4. Vérifiez le dossier spam du client

### La mise à jour du statut ne fonctionne pas

1. Vérifiez la console du navigateur
2. Vérifiez les permissions Supabase (RLS)
3. Vérifiez que l'ID du rendez-vous est correct

## 📝 Notes importantes

- Les rendez-vous sont triés par date de création (plus récent en premier)
- Les emails ne sont envoyés que si le client a renseigné son email
- Les changements de statut sont instantanés
- L'interface se rafraîchit automatiquement après chaque action

---

**Documentation mise à jour le :** ${new Date().toLocaleDateString()}
