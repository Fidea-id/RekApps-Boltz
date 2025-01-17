/*
  # Initial Schema Setup for RekApps

  1. New Tables
    - `warga` (Residents)
      - `id` (uuid, primary key)
      - `name` (text)
      - `home_number` (text)
      - `home_street` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `activity` (Financial Activities)
      - `id` (uuid, primary key)
      - `description` (text)
      - `type` (enum: 'income' or 'expenses')
      - `payment_type` (enum: 'transfer' or 'cash')
      - `amount` (numeric)
      - `date` (date)
      - `warga_id` (uuid, foreign key, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create custom types
CREATE TYPE activity_type AS ENUM ('income', 'expenses');
CREATE TYPE payment_type AS ENUM ('transfer', 'cash');

-- Create warga table
CREATE TABLE IF NOT EXISTS warga (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  home_number text NOT NULL,
  home_street text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create activity table
CREATE TABLE IF NOT EXISTS activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  description text NOT NULL,
  type activity_type NOT NULL,
  payment_type payment_type NOT NULL,
  amount numeric NOT NULL CHECK (amount > 0),
  date date NOT NULL DEFAULT CURRENT_DATE,
  warga_id uuid REFERENCES warga(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE warga ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for authenticated users" ON warga
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable write access for authenticated users" ON warga
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Enable read access for authenticated users" ON activity
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable write access for authenticated users" ON activity
  FOR ALL TO authenticated USING (true);

-- Insert dummy data
INSERT INTO warga (name, home_number, home_street) VALUES
  ('John Doe', 'A1', 'Jalan Mawar'),
  ('Jane Smith', 'B2', 'Jalan Melati'),
  ('Bob Johnson', 'C3', 'Jalan Anggrek');

INSERT INTO activity (description, type, payment_type, amount, date, warga_id) VALUES
  ('Monthly Dues - John', 'income', 'cash', 100000, CURRENT_DATE - INTERVAL '5 days', (SELECT id FROM warga WHERE name = 'John Doe')),
  ('Street Lamp Maintenance', 'expenses', 'transfer', 250000, CURRENT_DATE - INTERVAL '3 days', NULL),
  ('Monthly Dues - Jane', 'income', 'transfer', 100000, CURRENT_DATE - INTERVAL '2 days', (SELECT id FROM warga WHERE name = 'Jane Smith')),
  ('Trash Collection', 'expenses', 'cash', 300000, CURRENT_DATE - INTERVAL '1 day', NULL);