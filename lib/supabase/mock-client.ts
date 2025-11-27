// Mock Supabase client for development without real database
import type { Database } from './types'

type Settlement = Database['public']['Tables']['settlements']['Row']
type Client = Database['public']['Tables']['clients']['Row']
type Shipment = Database['public']['Tables']['shipments']['Row']

// Mock data
const mockSettlements: Settlement[] = [
  {
    id: '1',
    client_id: 'client-1',
    settlement_date: '2024-01-15',
    period_start: '2024-01-01',
    period_end: '2024-01-14',
    status: 'paid',
    total_amount: 1500000,
    tax_amount: 150000,
    discount_amount: 50000,
    net_amount: 1600000,
    payment_method: 'bank_transfer',
    payment_date: '2024-01-20',
    notes: '정기 정산',
    created_by: 'user-1',
    created_at: '2024-01-15T10:00:00',
    updated_at: '2024-01-20T14:00:00'
  },
  {
    id: '2',
    client_id: 'client-2',
    settlement_date: '2024-02-15',
    period_start: '2024-02-01',
    period_end: '2024-02-14',
    status: 'pending',
    total_amount: 2000000,
    tax_amount: 200000,
    discount_amount: 0,
    net_amount: 2200000,
    payment_method: 'cash',
    payment_date: null,
    notes: null,
    created_by: 'user-1',
    created_at: '2024-02-15T10:00:00',
    updated_at: '2024-02-15T10:00:00'
  }
]

const mockClients: Client[] = [
  {
    id: 'client-1',
    name: '삼성전자',
    code: 'C001',
    contact: '02-1234-5678',
    address: '서울시 강남구',
    is_active: true,
    created_at: '2024-01-01T00:00:00'
  },
  {
    id: 'client-2',
    name: 'LG전자',
    code: 'C002',
    contact: '02-2345-6789',
    address: '서울시 영등포구',
    is_active: true,
    created_at: '2024-01-01T00:00:00'
  }
]

const mockShipments: Shipment[] = [
  {
    id: 'ship-1',
    client_id: 'client-1',
    shipment_date: '2024-01-05',
    status: 'completed',
    notes: null,
    created_by: 'user-1',
    created_at: '2024-01-05T10:00:00',
    updated_at: '2024-01-05T10:00:00'
  },
  {
    id: 'ship-2',
    client_id: 'client-1',
    shipment_date: '2024-01-10',
    status: 'completed',
    notes: null,
    created_by: 'user-1',
    created_at: '2024-01-10T10:00:00',
    updated_at: '2024-01-10T10:00:00'
  }
]

// Create mock Supabase client
export const supabase = {
  from: (table: string) => {
    const data = {
      settlements: mockSettlements,
      clients: mockClients,
      shipments: mockShipments,
      settlement_items: [],
      shipment_items: []
    }

    return {
      select: (columns?: string) => ({
        eq: (column: string, value: any) => ({
          order: (column: string, options?: any) => ({
            data: data[table as keyof typeof data] || [],
            error: null
          }),
          single: () => ({
            data: (data[table as keyof typeof data] || [])[0],
            error: null
          }),
          gte: (column: string, value: any) => ({
            lte: (column: string, value: any) => ({
              order: (column: string, options?: any) => ({
                data: data[table as keyof typeof data] || [],
                error: null
              })
            })
          }),
          data: data[table as keyof typeof data] || [],
          error: null
        }),
        order: (column: string, options?: any) => ({
          data: data[table as keyof typeof data] || [],
          error: null
        }),
        single: () => ({
          data: (data[table as keyof typeof data] || [])[0],
          error: null
        }),
        gte: (column: string, value: any) => ({
          lte: (column: string, value: any) => ({
            order: (column: string, options?: any) => ({
              data: data[table as keyof typeof data] || [],
              error: null
            })
          })
        }),
        data: data[table as keyof typeof data] || [],
        error: null
      }),
      insert: (values: any) => ({
        select: () => ({
          single: () => ({
            data: { ...values, id: Math.random().toString() },
            error: null
          })
        })
      }),
      update: (values: any) => ({
        eq: (column: string, value: any) => ({
          data: values,
          error: null
        })
      })
    }
  }
}