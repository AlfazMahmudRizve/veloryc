-- 1. Create Profiles table
-- This table stores extra user information and is linked to Supabase Auth
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  address TEXT,
  is_admin BOOLEAN DEFAULT FALSE, -- Admin flag
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. Create Products table
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  category TEXT,
  stock INTEGER DEFAULT 0, -- Stock management
  image_url TEXT,
  ingredients JSONB DEFAULT '[]',
  accent_class TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. Create Orders table
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  tran_id TEXT UNIQUE NOT NULL,
  bank_tran_id TEXT,
  total DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, paid, failed, cancelled
  shipping_details JSONB,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 4. Create Order Items table
CREATE TABLE public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id), -- Linked to database products
  quantity INTEGER NOT NULL,
  price DECIMAL NOT NULL
);

-- 5. Analytics View: Stock Alerts
CREATE VIEW public.products_stock_alerts AS
SELECT id, name, stock
FROM public.products
WHERE stock < 10;

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 7. Create basic policies
CREATE POLICY "Public read access for products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Service role can do everything" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Service role can do everything" ON public.products FOR ALL USING (true);
CREATE POLICY "Service role can do everything" ON public.orders FOR ALL USING (true);
CREATE POLICY "Service role can do everything" ON public.order_items FOR ALL USING (true);
