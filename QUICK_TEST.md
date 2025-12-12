# ✅ Checklist de test rapide - Interface Admin

## 🎯 Test en 5 minutes

### ✅ 1. Vérifier que le serveur démarre (30 secondes)

```bash
npm run dev
```

**Attendu :** Serveur démarre sur `http://localhost:3000` sans erreur

---

### ✅ 2. Créer un rendez-vous de test (1 minute)

1. Allez sur : `http://localhost:3000/pages/rendezvous`
2. Remplissez :
   - Nom : **Test Admin**
   - Téléphone : **0486123456**
   - Email : **VOTRE EMAIL** (important pour recevoir les notifications)
   - Service : **Balayage**
   - Date : **Demain**
   - Heure : **14:00**
   - Message : _Test interface admin_
3. Cliquez sur **"Confirmer la demande"**

**Attendu :** 
- Message de succès vert
- Email reçu à votre adresse (vérifiez spam si besoin)

---

### ✅ 3. Vérifier Supabase (30 secondes)

1. Allez sur [https://supabase.com](https://supabase.com)
2. Ouvrez votre projet
3. Allez dans **Table Editor** → **rendezvous**

**Attendu :** 
- Votre rendez-vous est visible
- Statut = `en_attente`

---

### ✅ 4. Ouvrir l'interface admin (30 secondes)

1. Allez sur : `http://localhost:3000/admin/rendezvous`

**Attendu :** 
- Page charge avec un loader
- Affiche votre rendez-vous
- Badge 🟡 En attente visible

---

### ✅ 5. Tester l'acceptation (1 minute)

1. Cliquez sur **"✓ Accepter"**

**Attendu :** 
- Message vert : "✅ Rendez-vous accepté et email de confirmation envoyé"
- Badge devient 🟢 Accepté
- Boutons "Accepter/Refuser" disparaissent
- **Email de confirmation reçu** (vérifiez votre boîte)

**Contenu de l'email attendu :**
```
Objet : Votre rendez-vous est confirmé ! ✅
Contenu : 
- Excellente nouvelle !
- Date, heure, service affichés
```

---

### ✅ 6. Créer un 2ème RDV pour tester le refus (1 minute)

1. Retournez sur `/pages/rendezvous`
2. Créez un nouveau rendez-vous (avec votre email)
3. Retournez sur `/admin/rendezvous`
4. Cliquez sur **"✕ Refuser"**

**Attendu :** 
- Message : "❌ Rendez-vous refusé et email envoyé"
- Badge devient 🔴 Refusé
- **Email de refus reçu**

**Contenu de l'email attendu :**
```
Objet : Votre demande de rendez-vous
Contenu : 
- Créneau non disponible
- Invitation à proposer un autre horaire
```

---

### ✅ 7. Tester les filtres (30 secondes)

1. Cliquez sur le menu déroulant
2. Sélectionnez **"Acceptés"**

**Attendu :** 
- Affiche seulement les RDV acceptés (1 visible)

3. Sélectionnez **"Refusés"**

**Attendu :** 
- Affiche seulement les RDV refusés (1 visible)

---

### ✅ 8. Tester la recherche (30 secondes)

1. Dans la barre de recherche, tapez : **"Test"**

**Attendu :** 
- Affiche les 2 rendez-vous contenant "Test" dans le nom

---

### ✅ 9. Tester le rafraîchissement (15 secondes)

1. Cliquez sur le bouton **🔄**

**Attendu :** 
- Les données sont rechargées
- Aucune erreur dans la console

---

### ✅ 10. Vérifier Supabase (30 secondes)

1. Retournez dans Supabase
2. Table **rendezvous**

**Attendu :** 
- RDV 1 : statut = `accepte`
- RDV 2 : statut = `refuse`
- `updated_at` mis à jour

---

## 🎉 Résultat

Si tous les tests sont ✅ :
- **Votre système est 100% opérationnel !**
- Patricia peut maintenant gérer les rendez-vous
- Les clients reçoivent des emails automatiques

---

## ⚠️ Si quelque chose ne fonctionne pas

### Email non reçu ?
- ✅ Vérifiez le dossier spam
- ✅ Vérifiez `EMAIL_USER` et `EMAIL_PASS` dans `.env`
- ✅ Vérifiez les logs du serveur (terminal)

### Erreur "Impossible de charger les rendez-vous" ?
- ✅ Vérifiez que Supabase est accessible
- ✅ Vérifiez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ Ouvrez la console du navigateur (F12) pour voir l'erreur exacte

### Erreur "Impossible de mettre à jour le statut" ?
- ✅ Vérifiez que l'ID du rendez-vous existe
- ✅ Vérifiez les permissions Supabase (RLS désactivé pour les tests)
- ✅ Consultez les logs du serveur

---

## 📊 Score de réussite

- ✅ 10/10 tests : **Système parfait ! 🎉**
- ✅ 8-9/10 tests : **Très bien, quelques ajustements mineurs**
- ✅ 6-7/10 tests : **Bon début, vérifiez la configuration**
- ⚠️ <6/10 tests : **Consultez ADMIN_INTERFACE_GUIDE.md pour le dépannage**

---

**Temps total du test :** ~5 minutes  
**Prêt pour la production ?** Après ajout de l'authentification admin

---

## 📝 Après les tests

Si tout fonctionne, vous pouvez :
1. ✅ Partager le lien `/admin/rendezvous` à Patricia
2. ✅ Mettre le site en production sur Vercel
3. ✅ Ajouter l'authentification pour sécuriser l'admin
4. ✅ Configurer les variables d'environnement en production

**Félicitations ! Votre système de gestion de rendez-vous est opérationnel ! 🚀**
