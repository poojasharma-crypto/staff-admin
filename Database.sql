ALTER TABLE staff
ADD COLUMN IF NOT EXISTS gender ENUM('Male','Female','Other') NULL AFTER name;