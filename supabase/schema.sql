-- 재고 관리 시스템 데이터베이스 스키마
-- Supabase SQL Editor에서 실행하세요

-- 제품 테이블
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(100),
  min_stock INTEGER DEFAULT 0,
  current_stock INTEGER DEFAULT 0,
  unit VARCHAR(20) DEFAULT '개',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 출고처 테이블
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  code VARCHAR(50) UNIQUE,
  contact VARCHAR(100),
  address TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 출고 테이블
CREATE TABLE IF NOT EXISTS shipments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  shipment_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 출고 상세 테이블
CREATE TABLE IF NOT EXISTS shipment_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID REFERENCES shipments(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2),
  notes TEXT
);

-- 재고 이력 테이블
CREATE TABLE IF NOT EXISTS inventory_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  type VARCHAR(50), -- 'in', 'out', 'adjustment'
  quantity INTEGER NOT NULL,
  before_stock INTEGER,
  after_stock INTEGER,
  reference_id UUID, -- shipment_id or purchase_id
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 템플릿 테이블
CREATE TABLE IF NOT EXISTS templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  type VARCHAR(50), -- 'shipment', 'order'
  data JSONB NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_clients_code ON clients(code);
CREATE INDEX IF NOT EXISTS idx_shipments_client_id ON shipments(client_id);
CREATE INDEX IF NOT EXISTS idx_shipments_date ON shipments(shipment_date);
CREATE INDEX IF NOT EXISTS idx_shipment_items_shipment_id ON shipment_items(shipment_id);
CREATE INDEX IF NOT EXISTS idx_shipment_items_product_id ON shipment_items(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_logs_product_id ON inventory_logs(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_logs_type ON inventory_logs(type);

-- Updated_at 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shipments_updated_at BEFORE UPDATE ON shipments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) 정책
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- 인증된 사용자를 위한 정책 (예시)
-- 모든 인증된 사용자가 읽기 가능
CREATE POLICY "Products are viewable by authenticated users" ON products
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Products are editable by authenticated users" ON products
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Clients are viewable by authenticated users" ON clients
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Clients are editable by authenticated users" ON clients
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Shipments are viewable by authenticated users" ON shipments
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Shipments are editable by authenticated users" ON shipments
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Shipment items are viewable by authenticated users" ON shipment_items
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Shipment items are editable by authenticated users" ON shipment_items
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Inventory logs are viewable by authenticated users" ON inventory_logs
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Inventory logs are editable by authenticated users" ON inventory_logs
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Templates are viewable by authenticated users" ON templates
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Templates are editable by authenticated users" ON templates
  FOR ALL USING (auth.role() = 'authenticated');

-- 실시간 구독을 위한 Publication (Supabase Realtime)
ALTER PUBLICATION supabase_realtime ADD TABLE products;
ALTER PUBLICATION supabase_realtime ADD TABLE shipments;
ALTER PUBLICATION supabase_realtime ADD TABLE inventory_logs;

-- 샘플 데이터 (선택사항)
-- INSERT INTO products (sku, name, category, min_stock, current_stock, unit) VALUES
-- ('PRD001', '노트북 스탠드', '사무용품', 10, 50, '개'),
-- ('PRD002', '무선 마우스', '전자제품', 20, 100, '개'),
-- ('PRD003', 'USB-C 케이블', '전자제품', 30, 150, '개'),
-- ('PRD004', 'A4 용지', '사무용품', 5, 25, '박스'),
-- ('PRD005', '화이트보드 마커', '사무용품', 50, 200, '개');

-- INSERT INTO clients (name, code, contact, address) VALUES
-- ('ABC 회사', 'CL001', '02-1234-5678', '서울시 강남구'),
-- ('XYZ 기업', 'CL002', '02-9876-5432', '서울시 서초구'),
-- ('123 상사', 'CL003', '031-1111-2222', '경기도 성남시');