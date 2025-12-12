-- ===================================================
-- Script pour créer l'utilisateur admin Patricia
-- ===================================================
-- À exécuter dans Supabase SQL Editor
-- ===================================================

-- 1. Créer l'utilisateur admin via Supabase Auth
-- Note: Vous devrez créer cet utilisateur via le Dashboard Supabase
-- ou via l'API Supabase Auth Management
-- Email: paty10j@hotmail.com
-- Password: [À définir - utilisez un mot de passe fort]

-- 2. Une fois l'utilisateur créé, mettre à jour ses métadonnées
-- Remplacez 'USER_ID_HERE' par l'ID réel de l'utilisateur créé
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'paty10j@hotmail.com';

-- 3. Vérification
SELECT 
  id,
  email,
  raw_user_meta_data->>'role' as role,
  created_at,
  last_sign_in_at
FROM auth.users
WHERE email = 'paty10j@hotmail.com';

-- ===================================================
-- INSTRUCTIONS D'UTILISATION :
-- ===================================================
-- 
-- OPTION 1 : Via le Dashboard Supabase (RECOMMANDÉ)
-- 1. Allez dans Authentication > Users
-- 2. Cliquez sur "Add User"
-- 3. Email: paty10j@hotmail.com
-- 4. Password: [Générez un mot de passe fort]
-- 5. Cochez "Auto Confirm User"
-- 6. Cliquez sur "Create User"
-- 7. Puis exécutez le UPDATE ci-dessus dans SQL Editor
--
-- OPTION 2 : Via SQL uniquement
-- Utilisez la fonction Supabase Auth Management API
-- (nécessite le service_role_key - à ne JAMAIS exposer côté client)
--
-- ===================================================
