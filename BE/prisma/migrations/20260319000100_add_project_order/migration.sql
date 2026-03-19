ALTER TABLE "projects"
ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0;

WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC, id ASC) - 1 AS rn
  FROM "projects"
)
UPDATE "projects" p
SET "order" = r.rn
FROM ranked r
WHERE p.id = r.id;
