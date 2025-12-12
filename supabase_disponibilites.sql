-- Table pour gérer les disponibilités du salon
CREATE TABLE IF NOT EXISTS disponibilites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  heure TIME NOT NULL,
  est_disponible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Index pour améliorer les performances des requêtes
  CONSTRAINT unique_date_heure UNIQUE (date, heure)
);

-- Index pour les recherches fréquentes
CREATE INDEX idx_disponibilites_date ON disponibilites(date);
CREATE INDEX idx_disponibilites_est_disponible ON disponibilites(est_disponible);
CREATE INDEX idx_disponibilites_date_disponible ON disponibilites(date, est_disponible);

-- Activer Row Level Security (RLS)
ALTER TABLE disponibilites ENABLE ROW LEVEL SECURITY;

-- Policy : tout le monde peut lire les disponibilités
CREATE POLICY "Les disponibilités sont visibles par tous" 
  ON disponibilites 
  FOR SELECT 
  USING (true);

-- Policy : seuls les utilisateurs authentifiés peuvent ajouter des disponibilités
CREATE POLICY "Seuls les admins peuvent ajouter des disponibilités" 
  ON disponibilites 
  FOR INSERT 
  WITH CHECK (true); -- À modifier selon votre système d'authentification

-- Policy : seuls les utilisateurs authentifiés peuvent modifier des disponibilités
CREATE POLICY "Seuls les admins peuvent modifier des disponibilités" 
  ON disponibilites 
  FOR UPDATE 
  USING (true); -- À modifier selon votre système d'authentification

-- Policy : seuls les utilisateurs authentifiés peuvent supprimer des disponibilités
CREATE POLICY "Seuls les admins peuvent supprimer des disponibilités" 
  ON disponibilites 
  FOR DELETE 
  USING (true); -- À modifier selon votre système d'authentification

-- Données de test (optionnel - à supprimer en production)
INSERT INTO disponibilites (date, heure, est_disponible) VALUES
  (CURRENT_DATE, '09:00', true),
  (CURRENT_DATE, '09:30', true),
  (CURRENT_DATE, '10:00', true),
  (CURRENT_DATE, '10:30', true),
  (CURRENT_DATE, '11:00', true),
  (CURRENT_DATE, '11:30', true),
  (CURRENT_DATE + 1, '09:00', true),
  (CURRENT_DATE + 1, '09:30', true),
  (CURRENT_DATE + 1, '10:00', true),
  (CURRENT_DATE + 2, '14:00', true),
  (CURRENT_DATE + 2, '14:30', true),
  (CURRENT_DATE + 2, '15:00', true),
  (CURRENT_DATE + 3, '09:00', true),
  (CURRENT_DATE + 3, '11:30', true),
  (CURRENT_DATE + 3, '12:00', true),
  (CURRENT_DATE + 4, '12:00', true),
  (CURRENT_DATE + 4, '15:30', true),
  (CURRENT_DATE + 4, '16:00', true);

COMMENT ON TABLE disponibilites IS 'Table stockant les créneaux horaires disponibles pour les rendez-vous';
COMMENT ON COLUMN disponibilites.date IS 'Date du créneau';
COMMENT ON COLUMN disponibilites.heure IS 'Heure de début du créneau';
COMMENT ON COLUMN disponibilites.est_disponible IS 'true = créneau libre, false = créneau réservé';
