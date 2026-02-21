-- 1. Create Profiles table (safe version)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  address TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Add is_admin if it doesn't exist
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='profiles' AND COLUMN_NAME='is_admin') THEN
    ALTER TABLE public.profiles ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

-- 2. Create Products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  category TEXT,
  stock INTEGER DEFAULT 0,
  image_url TEXT,
  ingredients JSONB DEFAULT '[]',
  accent_class TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. Create Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  tran_id TEXT UNIQUE NOT NULL,
  bank_tran_id TEXT,
  total DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending', 
  shipping_details JSONB,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 4. Create Order Items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id), 
  quantity INTEGER NOT NULL,
  price DECIMAL NOT NULL
);

-- 5. Analytics View: Stock Alerts (Drop and Recreate for updates)
DROP VIEW IF EXISTS public.products_stock_alerts;
CREATE VIEW public.products_stock_alerts AS
SELECT id, name, stock
FROM public.products
WHERE stock < 10;

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 7. Create basic policies (using IF NOT EXISTS logic via DO block if needed, but simple re-run usually works or errors gracefully on policy exist)
-- Note: Supabase UI is often better for managing policies, but these are for service role parity.
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Public read access for products" ON public.products;
    CREATE POLICY "Public read access for products" ON public.products FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "Service role can do everything" ON public.profiles;
    CREATE POLICY "Service role can do everything" ON public.profiles FOR ALL USING (true);
    
    DROP POLICY IF EXISTS "Service role can do everything" ON public.products;
    CREATE POLICY "Service role can do everything" ON public.products FOR ALL USING (true);
    
    DROP POLICY IF EXISTS "Service role can do everything" ON public.orders;
    CREATE POLICY "Service role can do everything" ON public.orders FOR ALL USING (true);
    
    DROP POLICY IF EXISTS "Service role can do everything" ON public.order_items;
    CREATE POLICY "Service role can do everything" ON public.order_items FOR ALL USING (true);
END $$;
