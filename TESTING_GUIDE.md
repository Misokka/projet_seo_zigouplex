# Guide de test du système de rendez-vous

## ✅ Checklist avant de tester

### 1. Configuration Supabase
- [ ] Compte Supabase créé
- [ ] Projet créé sur Supabase
- [ ] Script `supabase_setup.sql` exécuté dans l'éditeur SQL
- [ ] Table `rendezvous` visible dans le Table Editor

### 2. Configuration Email (Gmail)
- [ ] Validation en deux étapes activée sur Gmail
- [ ] Mot de passe d'application créé
- [ ] `EMAIL_USER` et `EMAIL_PASS` ajoutés dans `.env`

### 3. Dépendances installées
- [ ] `npm install` exécuté
- [ ] Packages `@supabase/supabase-js` et `nodemailer` installés

## 🧪 Tests

### Test 1 : Démarrage du serveur

```bash
npm run dev
```

Vérifiez que le serveur démarre sans erreur sur `http://localhost:3000`

### Test 2 : Test manuel via le formulaire

1. Ouvrez `http://localhost:3000/pages/rendezvous`
2. Remplissez le formulaire :
   - Nom : Votre nom
   - Téléphone : 0486123456
   - Email : Votre email
   - Service : Balayage
   - Date : Une date future
   - Heure : 14:30
   - Message : Test
3. Cliquez sur "Confirmer la demande"
4. Vérifiez le message de succès

### Test 3 : Vérification Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Ouvrez votre projet
3. Allez dans "Table Editor" → "rendezvous"
4. Vérifiez que votre demande est enregistrée

### Test 4 : Vérification emails

1. **Email à Patricia** : Vérifiez la boîte de réception de `EMAIL_USER`
   - Objet : "Nouvelle demande de rendez-vous — [votre nom]"
   - Contenu : Détails de la demande

2. **Email au client** : Vérifiez votre boîte email
   - Objet : "Confirmation de votre demande de rendez-vous"
   - Contenu : Message de confirmation

### Test 5 : Test avec curl (optionnel)

```bash
curl -X POST http://localhost:3000/api/rendezvous \
  -H "Content-Type: application/json" \
  -d "{\"nom\":\"Test User\",\"telephone\":\"0486123456\",\"email\":\"test@example.com\",\"service\":\"Coupe femme\",\"date\":\"2025-11-15\",\"heure\":\"10:00\",\"message\":\"Test curl\"}"
```

Réponse attendue :
```json
{
  "success": true,
  "message": "Demande enregistrée et emails envoyés",
  "data": { ... }
}
```

## 🐛 Dépannage

### Erreur : "Les variables d'environnement Supabase sont manquantes"
→ Vérifiez que `.env` contient `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
→ Redémarrez le serveur après modification du `.env`

### Erreur : "Erreur lors de l'enregistrement dans la base de données"
→ Vérifiez que la table `rendezvous` existe dans Supabase
→ Vérifiez les permissions (RLS) dans Supabase :
   - Allez dans "Authentication" → "Policies"
   - Assurez-vous que la table `rendezvous` accepte les insertions

### Erreur : "Erreur lors de l'envoi des emails"
→ Vérifiez `EMAIL_USER` et `EMAIL_PASS`
→ Assurez-vous d'utiliser un mot de passe d'application, pas votre mot de passe Gmail normal
→ Vérifiez les logs dans la console du serveur

### Les emails ne sont pas reçus
→ Vérifiez le dossier spam
→ Vérifiez que le service Gmail est bien configuré
→ Testez avec un email simple via un script Node.js séparé

## 📊 Dashboard de suivi

### Console du serveur (Terminal)
Surveillez les logs :
- ✅ Requêtes POST reçues
- ✅ Insertions Supabase
- ❌ Erreurs éventuelles

### Supabase Dashboard
- Table `rendezvous` : Voir toutes les demandes
- Logs : Voir les requêtes API
- Auth : Gérer les permissions

### Gmail
- Emails reçus par Patricia
- Emails de confirmation envoyés

## 🚀 Une fois les tests réussis

1. ✅ Le formulaire fonctionne
2. ✅ Les données sont dans Supabase
3. ✅ Les emails sont envoyés
4. ➡️ Prochaine étape : Créer l'interface admin pour gérer les rendez-vous
5. ➡️ Déploiement sur Vercel

## 💡 Conseils

- Utilisez toujours des dates futures pour les tests
- Vérifiez les logs dans la console pour déboguer
- Testez avec et sans email optionnel
- Testez la validation (champs manquants)
- Gardez Supabase ouvert pour voir les données en temps réel

## 📝 Exemple de test complet

```javascript
// Test avec fetch (dans la console du navigateur)
fetch('http://localhost:3000/api/rendezvous', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nom: 'Marie Dupont',
    telephone: '0486123456',
    email: 'marie@example.com',
    service: 'Balayage',
    date: '2025-11-15',
    heure: '14:30',
    message: 'Je préfère le matin si possible'
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err))
```

---

**Besoin d'aide ?** Vérifiez `BACKEND_README.md` pour plus de détails.
