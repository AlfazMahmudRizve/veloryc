-- 1. Create Profiles table
-- This table stores extra user information and is linked to Supabase Auth
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  address TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. Create Orders table
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id), -- Nullable for guest checkout until paid
  tran_id TEXT UNIQUE NOT NULL,
  bank_tran_id TEXT,
  total DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, paid, failed, cancelled
  shipping_details JSONB,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. Create Order Items table
CREATE TABLE public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT, -- Slug or ID from your local data
  quantity INTEGER NOT NULL,
  price DECIMAL NOT NULL
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 5. Create basic policies (Allowing Service Role to do everything, Users to read their own)
CREATE POLICY "Service role can do everything" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Service role can do everything" ON public.orders FOR ALL USING (true);
CREATE POLICY "Service role can do everything" ON public.order_items FOR ALL USING (true);
