export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          sku: string
          name: string
          category: string | null
          weight: number // 무게 (kg)
          grade: '대' | '중' | '소' | null // 등급
          pieces_per_pallet: number // 팔레트당 개별 수량
          min_stock: number
          current_stock: number
          unit: string
          price_per_unit: number | null // 단가
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sku: string
          name: string
          category?: string | null
          weight?: number
          grade?: '대' | '중' | '소' | null
          pieces_per_pallet?: number
          min_stock?: number
          current_stock?: number
          unit?: string
          price_per_unit?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sku?: string
          name?: string
          category?: string | null
          weight?: number
          grade?: '대' | '중' | '소' | null
          pieces_per_pallet?: number
          min_stock?: number
          current_stock?: number
          unit?: string
          price_per_unit?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          name: string
          code: string | null
          contact: string | null
          address: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          code?: string | null
          contact?: string | null
          address?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string | null
          contact?: string | null
          address?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      shipments: {
        Row: {
          id: string
          client_id: string | null
          shipment_date: string
          status: string
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id?: string | null
          shipment_date: string
          status?: string
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string | null
          shipment_date?: string
          status?: string
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      shipment_items: {
        Row: {
          id: string
          shipment_id: string | null
          product_id: string | null
          quantity: number
          unit_price: number | null
          notes: string | null
        }
        Insert: {
          id?: string
          shipment_id?: string | null
          product_id?: string | null
          quantity: number
          unit_price?: number | null
          notes?: string | null
        }
        Update: {
          id?: string
          shipment_id?: string | null
          product_id?: string | null
          quantity?: number
          unit_price?: number | null
          notes?: string | null
        }
      }
      inventory_logs: {
        Row: {
          id: string
          product_id: string | null
          type: string | null
          quantity: number
          before_stock: number | null
          after_stock: number | null
          reference_id: string | null
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id?: string | null
          type?: string | null
          quantity: number
          before_stock?: number | null
          after_stock?: number | null
          reference_id?: string | null
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string | null
          type?: string | null
          quantity?: number
          before_stock?: number | null
          after_stock?: number | null
          reference_id?: string | null
          created_by?: string | null
          created_at?: string
        }
      }
      templates: {
        Row: {
          id: string
          name: string
          type: string | null
          data: Json
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type?: string | null
          data: Json
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string | null
          data?: Json
          created_by?: string | null
          created_at?: string
        }
      }
      settlements: {
        Row: {
          id: string
          client_id: string | null
          settlement_date: string
          period_start: string
          period_end: string
          status: 'pending' | 'confirmed' | 'paid' | 'cancelled'
          total_amount: number
          tax_amount: number
          discount_amount: number
          net_amount: number
          payment_method: string | null
          payment_date: string | null
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id?: string | null
          settlement_date: string
          period_start: string
          period_end: string
          status?: 'pending' | 'confirmed' | 'paid' | 'cancelled'
          total_amount?: number
          tax_amount?: number
          discount_amount?: number
          net_amount?: number
          payment_method?: string | null
          payment_date?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string | null
          settlement_date?: string
          period_start?: string
          period_end?: string
          status?: 'pending' | 'confirmed' | 'paid' | 'cancelled'
          total_amount?: number
          tax_amount?: number
          discount_amount?: number
          net_amount?: number
          payment_method?: string | null
          payment_date?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      settlement_items: {
        Row: {
          id: string
          settlement_id: string | null
          shipment_id: string | null
          product_id: string | null
          quantity: number
          unit_price: number
          subtotal: number
          tax_rate: number
          tax_amount: number
          discount_rate: number
          discount_amount: number
          total: number
          notes: string | null
        }
        Insert: {
          id?: string
          settlement_id?: string | null
          shipment_id?: string | null
          product_id?: string | null
          quantity: number
          unit_price: number
          subtotal?: number
          tax_rate?: number
          tax_amount?: number
          discount_rate?: number
          discount_amount?: number
          total?: number
          notes?: string | null
        }
        Update: {
          id?: string
          settlement_id?: string | null
          shipment_id?: string | null
          product_id?: string | null
          quantity?: number
          unit_price?: number
          subtotal?: number
          tax_rate?: number
          tax_amount?: number
          discount_rate?: number
          discount_amount?: number
          total?: number
          notes?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}