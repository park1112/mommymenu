import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Database } from '@/lib/supabase/types'

type Product = Database['public']['Tables']['products']['Row']
type Client = Database['public']['Tables']['clients']['Row']
type Shipment = Database['public']['Tables']['shipments']['Row']

interface InventoryState {
  // Products
  products: Product[]
  selectedProducts: string[]
  isLoadingProducts: boolean
  
  // Clients
  clients: Client[]
  selectedClient: string | null
  
  // Shipments
  shipments: Shipment[]
  currentShipment: Partial<Shipment> | null
  
  // Actions
  setProducts: (products: Product[]) => void
  addProduct: (product: Product) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  toggleProductSelection: (id: string) => void
  clearProductSelection: () => void
  
  setClients: (clients: Client[]) => void
  selectClient: (id: string | null) => void
  
  setShipments: (shipments: Shipment[]) => void
  setCurrentShipment: (shipment: Partial<Shipment> | null) => void
  
  setLoadingProducts: (loading: boolean) => void
}

export const useInventoryStore = create<InventoryState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        products: [],
        selectedProducts: [],
        isLoadingProducts: false,
        clients: [],
        selectedClient: null,
        shipments: [],
        currentShipment: null,
        
        // Product actions
        setProducts: (products) => set({ products }),
        
        addProduct: (product) => 
          set((state) => ({ products: [...state.products, product] })),
        
        updateProduct: (id, updatedProduct) =>
          set((state) => ({
            products: state.products.map((p) =>
              p.id === id ? { ...p, ...updatedProduct } : p
            ),
          })),
        
        deleteProduct: (id) =>
          set((state) => ({
            products: state.products.filter((p) => p.id !== id),
            selectedProducts: state.selectedProducts.filter((pid) => pid !== id),
          })),
        
        toggleProductSelection: (id) =>
          set((state) => ({
            selectedProducts: state.selectedProducts.includes(id)
              ? state.selectedProducts.filter((pid) => pid !== id)
              : [...state.selectedProducts, id],
          })),
        
        clearProductSelection: () => set({ selectedProducts: [] }),
        
        // Client actions
        setClients: (clients) => set({ clients }),
        selectClient: (id) => set({ selectedClient: id }),
        
        // Shipment actions
        setShipments: (shipments) => set({ shipments }),
        setCurrentShipment: (shipment) => set({ currentShipment: shipment }),
        
        // Loading state
        setLoadingProducts: (loading) => set({ isLoadingProducts: loading }),
      }),
      {
        name: 'inventory-storage',
        partialize: (state) => ({
          selectedProducts: state.selectedProducts,
          selectedClient: state.selectedClient,
        }),
      }
    )
  )
)