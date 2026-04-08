-- Create the tables
CREATE TABLE public.stocks (
    symbol TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    change NUMERIC NOT NULL,
    change_percent NUMERIC NOT NULL
);

CREATE TABLE public.portfolio (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    symbol TEXT REFERENCES public.stocks(symbol) ON DELETE CASCADE,
    shares NUMERIC NOT NULL,
    average_price NUMERIC NOT NULL
);

CREATE TABLE public.watchlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    symbol TEXT REFERENCES public.stocks(symbol) ON DELETE CASCADE
);

CREATE TABLE public.news (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    summary TEXT,
    time TEXT NOT NULL,
    source TEXT NOT NULL,
    image_url TEXT
);

CREATE TABLE public.chart_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    symbol TEXT REFERENCES public.stocks(symbol) ON DELETE CASCADE,
    time TEXT NOT NULL,
    value NUMERIC NOT NULL
);

-- Seed data for stocks
INSERT INTO public.stocks (symbol, name, price, change, change_percent) VALUES
('NVDA', 'NVIDIA CORP', 924.12, 30.5, 3.42),
('AAPL', 'APPLE INC', 189.45, 1.54, 0.82),
('TSLA', 'TESLA INC', 172.63, -2.01, -1.15),
('BTC', '比特幣', 68430.50, 1250.40, 1.86),
('MSFT', 'MICROSOFT', 415.50, 5.10, 1.24);

-- Seed data for portfolio
INSERT INTO public.portfolio (symbol, shares, average_price) VALUES
('AAPL', 150, 150.00),
('NVDA', 45, 600.00),
('MSFT', 80, 300.00),
('TSLA', 120, 200.00);

-- Seed data for watchlist
INSERT INTO public.watchlist (symbol) VALUES
('NVDA'), ('AAPL'), ('TSLA'), ('BTC');

-- Seed data for news
INSERT INTO public.news (id, category, title, summary, time, source, image_url) VALUES
('1', '分析', '蘋果的 AI 策略：為何分析師看好 2024 年產品週期', '深入探討驅動下一代神經引擎的晶片進展，以及這對利潤的意義。', '4 小時前', 'The Ledger', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbt2axdVYLUT0oq7tvzpkz9fwERt6e9sP8e9HzwJyrmFyMS7f3Yz8n58pfsbDJBE6Jc8LUG_I3zSA9AivnuKlAE3guBoKTTPx-mFQrswvIqr-Ox-kgHIMwh5Pv0eY9ihjouObWynhUSzxAJlFdD8oVusUTpU83pL-WSpPIzATdXgPdELF1eIPQeHs_senRZoSfDQ-J3VRndm2MAH7WvpjFZvOKr6CIxmwHdvQAouptU9Bp4oUcVSX8SbTY4bxxad5ytTSGpo8eIyk'),
('2', '快訊', 'Vision Pro 將於 7 月前推廣至 5 個新市場。', '', '12:45 PM', 'WSJ', null),
('3', '供應鏈', '鴻海報告第一季組裝效率創紀錄。', '', '09:15 AM', 'Reuters', null),
('4', '法規', '歐盟合規：蘋果更新 App Store 政策。', '', 'Yesterday', 'Bloomberg', null);

-- Seed data for chart_data (Mock for AAPL)
INSERT INTO public.chart_data (symbol, time, value) VALUES
('AAPL', '09:00', 185.20),
('AAPL', '10:00', 186.50),
('AAPL', '11:00', 185.80),
('AAPL', '12:00', 187.90),
('AAPL', '13:00', 188.40),
('AAPL', '14:00', 189.10),
('AAPL', '15:00', 189.45);
