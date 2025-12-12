-- Création de la table rendezvous dans Supabase
-- Exécutez ce script dans l'éditeur SQL de Supabase

CREATE TABLE IF NOT EXISTS rendezvous (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  service VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  heure TIME NOT NULL,
  message TEXT,
  statut VARCHAR(20) DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'accepte', 'refuse')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_rendezvous_date ON rendezvous(date);
CREATE INDEX IF NOT EXISTS idx_rendezvous_statut ON rendezvous(statut);
CREATE INDEX IF NOT EXISTS idx_rendezvous_created_at ON rendezvous(created_at DESC);

-- Trigger pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rendezvous_updated_at
  BEFORE UPDATE ON rendezvous
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Commentaires pour la documentation
COMMENT ON TABLE rendezvous IS 'Table des demandes de rendez-vous du salon Patricia Osores';
COMMENT ON COLUMN rendezvous.statut IS 'Statut du rendez-vous: en_attente, accepte, ou refuse';
