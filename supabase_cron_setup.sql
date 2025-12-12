-- Activer l'extension pg_cron (si pas déjà activée)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Supprimer le job existant seulement s'il existe
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'send-review-requests-daily') THEN
    PERFORM cron.unschedule('send-review-requests-daily');
    RAISE NOTICE 'Ancien job send-review-requests-daily supprimé.';
  END IF;
END $$;

-- Créer le job qui s'exécute tous les jours à 20h00 (heure de Bruxelles)
SELECT cron.schedule(
  'send-review-requests-daily',  -- Nom du job
  '0 20 * * *',                  -- Tous les jours à 20h00
  $$
  SELECT
    net.http_post(
      url := 'https://yywgluwtlhabsxbbgvqo.supabase.co/functions/v1/send-review-requests',
      headers := jsonb_build_object(
        'Content-Type','application/json',
        'Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5d2dsdXd0bGhhYnN4YmJndnFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzOTg4NzAsImV4cCI6MjA3Nzk3NDg3MH0.1pSnLYL_goHs9BOzYNKalbLUniTeJPxtBSnu7sic-KU'
      )
    );
  $$
);

-- Vérification
SELECT * FROM cron.job WHERE jobname = 'send-review-requests-daily';

DO $$
BEGIN
  RAISE NOTICE '✅ Cron configuré : send-review-requests-daily — tous les jours à 20h00 (heure de Bruxelles)';
  RAISE NOTICE '⚠️ Pensez à remplacer YOUR_SUPABASE_ANON_KEY par votre clé réelle.';
END $$;
