-- Migration pour le système d'avis automatiques
-- Ajoute le tracking des emails de demande d'avis envoyés

-- Ajouter les colonnes de tracking dans la table rendezvous
ALTER TABLE rendezvous 
ADD COLUMN IF NOT EXISTS review_request_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS review_request_sent_at TIMESTAMPTZ;

-- Ajouter un commentaire pour documenter les colonnes
COMMENT ON COLUMN rendezvous.review_request_sent IS 'Indique si un email de demande d''avis Google a été envoyé au client';
COMMENT ON COLUMN rendezvous.review_request_sent_at IS 'Date et heure d''envoi de l''email de demande d''avis';

-- Créer un index pour optimiser les requêtes de la fonction cron
CREATE INDEX IF NOT EXISTS idx_rendezvous_review_tracking 
ON rendezvous(statut, date, heure, review_request_sent) 
WHERE statut = 'accepte' AND review_request_sent = FALSE;

-- Afficher un message de confirmation
DO $$
BEGIN
  RAISE NOTICE 'Migration terminée : colonnes review_request_sent et review_request_sent_at ajoutées avec succès';
END $$;
