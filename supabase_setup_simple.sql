-- Script SQL simplifié pour Supabase
-- Ce script peut être exécuté même si la table existe déjà

-- Créer la table si elle n'existe pas
CREATE TABLE IF NOT EXISTS rendezvous (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  telephone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  heure TIME NOT NULL,
  message TEXT,
  statut TEXT DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'accepte', 'refuse')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Si la table existe déjà, ajoutez created_at si elle n'existe pas
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name='rendezvous' AND column_name='created_at'
  ) THEN
    ALTER TABLE rendezvous ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
END $$;

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_rendezvous_date ON rendezvous(date);
CREATE INDEX IF NOT EXISTS idx_rendezvous_statut ON rendezvous(statut);
CREATE INDEX IF NOT EXISTS idx_rendezvous_created_at ON rendezvous(created_at DESC);

-- Commentaires pour la documentation
COMMENT ON TABLE rendezvous IS 'Table des demandes de rendez-vous du salon Patricia Osores';
COMMENT ON COLUMN rendezvous.statut IS 'Statut du rendez-vous: en_attente, accepte, ou refuse';
