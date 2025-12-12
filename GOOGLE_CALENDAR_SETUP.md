# 📅 Configuration Google Calendar - Synchronisation automatique des rendez-vous

Ce guide explique comment configurer la synchronisation automatique des rendez-vous de Patricia avec son Google Calendar.

---

## 🎯 Objectif

Lorsque Patricia **accepte** un rendez-vous dans l'interface admin, un événement est automatiquement créé dans son Google Calendar personnel avec :
- **Titre** : Rendez-vous avec [Nom du client]
- **Date et heure** : Créneau réservé
- **Durée** : Calculée selon le service (coupe, coloration, etc.)
- **Description** : Détails du service, coordonnées du client
- **Rappels** : 24h avant et 1h avant

---

## 📋 Prérequis

- Un compte Google (Gmail de Patricia)
- Accès à [Google Cloud Console](https://console.cloud.google.com/)
- Variables d'environnement configurées dans Vercel ou `.env.local`

---

## 🛠️ Étapes de configuration

### **1. Créer un projet Google Cloud**

1. Aller sur [Google Cloud Console](https://console.cloud.google.com/)
2. Cliquer sur **"Sélectionner un projet"** → **"Nouveau projet"**
3. Nom du projet : `Salon Patricia Osores Calendar`
4. Cliquer sur **"Créer"**

---

### **2. Activer l'API Google Calendar**

1. Dans le projet créé, aller dans **"API et services"** → **"Bibliothèque"**
2. Rechercher **"Google Calendar API"**
3. Cliquer sur **"Activer"**

---

### **3. Créer des identifiants OAuth 2.0**

1. Aller dans **"API et services"** → **"Identifiants"**
2. Cliquer sur **"Créer des identifiants"** → **"ID client OAuth"**
3. Type d'application : **"Application Web"**
4. Nom : `Patricia Calendar Client`
5. **URI de redirection autorisés** : ajouter `https://developers.google.com/oauthplayground`
6. Cliquer sur **"Créer"**
7. **Copier** le `Client ID` et le `Client Secret` (vous en aurez besoin)

---

### **4. Obtenir le Refresh Token**

1. Aller sur [OAuth 2.0 Playground](https://developers.google.com/oauthplayground)
2. Cliquer sur l'icône **⚙️ (Settings)** en haut à droite
3. Cocher **"Use your own OAuth credentials"**
4. Entrer :
   - **OAuth Client ID** : (copié à l'étape 3)
   - **OAuth Client Secret** : (copié à l'étape 3)
5. Dans la liste de gauche, chercher **"Google Calendar API v3"**
6. Sélectionner :
   - ✅ `https://www.googleapis.com/auth/calendar`
   - ✅ `https://www.googleapis.com/auth/calendar.events`
7. Cliquer sur **"Authorize APIs"**
8. **Se connecter avec le compte Gmail de Patricia**
9. Autoriser l'accès
10. Cliquer sur **"Exchange authorization code for tokens"**
11. **Copier le `Refresh Token`** (commence par `1//...`)

---

### **5. Trouver l'ID du calendrier de Patricia**

Par défaut, utilisez `primary` pour le calendrier principal.

Si vous voulez utiliser un calendrier spécifique :
1. Ouvrir [Google Calendar](https://calendar.google.com/)
2. Aller dans **Paramètres** → Sélectionner le calendrier
3. Faire défiler jusqu'à **"Intégrer le calendrier"**
4. Copier l'**ID du calendrier** (ex: `patricia@gmail.com`)

---

### **6. Configurer les variables d'environnement**

Ajouter ces variables dans `.env.local` (développement) et dans **Vercel** (production) :

```env
# Google Calendar API
GOOGLE_CLIENT_ID=123456789-xxxxxxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxxxxx
GOOGLE_REFRESH_TOKEN=1//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GOOGLE_CALENDAR_ID=primary
```

**⚠️ Important** : 
- Le `GOOGLE_REFRESH_TOKEN` ne doit **JAMAIS** être commité dans Git
- Ces credentials sont **sensibles**, protégez-les

---

### **7. Installer la dépendance npm**

Dans le terminal du projet :

```bash
npm install googleapis
```

---

### **8. Tester la synchronisation**

1. Démarrer le serveur Next.js : `npm run dev`
2. Se connecter à l'interface admin
3. Accepter un rendez-vous
4. Vérifier dans le **Google Calendar de Patricia** que l'événement apparaît

---

## 🔍 Vérification et débogage

### **Logs dans la console**

Lors de l'acceptation d'un rendez-vous, vous devriez voir dans les logs :

```
✅ Événement créé dans Google Calendar: https://calendar.google.com/...
✅ Événement ajouté au Google Calendar de Patricia
```

### **En cas d'erreur**

Si vous voyez :
```
⚠️ Erreur Google Calendar (non-bloquant): ...
```

**Solutions possibles** :
1. Vérifier que les variables d'environnement sont bien définies
2. Vérifier que l'API Google Calendar est activée
3. Régénérer le Refresh Token (étape 4)
4. Vérifier que le compte Gmail de Patricia est bien celui utilisé pour générer le token

---

## 🎨 Personnalisation

### **Modifier la durée des rendez-vous**

Dans `lib/googleCalendarService.ts`, fonction `getServiceDuration()` :

```typescript
function getServiceDuration(service: string): number {
  const durations: Record<string, number> = {
    'Coupe femme': 60,      // 1h
    'Coloration': 120,       // 2h
    'Balayage': 120,         // 2h
    // Ajoutez ou modifiez selon vos besoins
  }
  return durations[service] || 60 // Durée par défaut
}
```

### **Modifier les rappels**

Dans `lib/googleCalendarService.ts`, section `reminders` :

```typescript
reminders: {
  useDefault: false,
  overrides: [
    { method: 'popup', minutes: 60 },    // 1h avant
    { method: 'popup', minutes: 1440 },  // 24h avant
    { method: 'email', minutes: 120 },   // Email 2h avant (optionnel)
  ],
}
```

### **Modifier la couleur de l'événement**

Dans `lib/googleCalendarService.ts`, `colorId` :

```typescript
colorId: '11', // Rouge
```

**Couleurs disponibles** :
- 1 = Lavande
- 2 = Sauge
- 3 = Raisin
- 4 = Flamant
- 5 = Banane
- 6 = Mandarine
- 7 = Paon
- 8 = Graphite
- 9 = Myrtille
- 10 = Basilic
- 11 = Tomate (rouge)

---

## 🔐 Sécurité

- **NE JAMAIS** partager ou commiter les credentials OAuth
- Le système utilise OAuth 2.0 avec refresh token (sécurisé)
- Les tokens sont stockés côté serveur uniquement
- Même si Calendar échoue, le rendez-vous reste validé (non-bloquant)

---

## ✅ Checklist de configuration

- [ ] Projet Google Cloud créé
- [ ] Google Calendar API activée
- [ ] Identifiants OAuth 2.0 créés
- [ ] Refresh Token obtenu via OAuth Playground
- [ ] Variables d'environnement ajoutées dans `.env.local`
- [ ] Variables d'environnement ajoutées dans Vercel
- [ ] Package `googleapis` installé
- [ ] Test effectué avec un rendez-vous accepté
- [ ] Événement visible dans Google Calendar de Patricia

---

## 📞 Support

En cas de problème, consultez :
- [Documentation Google Calendar API](https://developers.google.com/calendar/api/guides/overview)
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground)
- Logs du serveur Next.js pour les erreurs détaillées
