import { ComponentType, LazyExoticComponent, lazy } from 'react'

export type ComponentCategory = 'ui' | 'feature' | 'layout' | 'composite' | 'chart' | 'form'

export interface ComponentMetadata {
  name: string
  category: ComponentCategory
  version: string
  description?: string
  dependencies?: string[]
  props?: Record<string, any>
  example?: string
  tags?: string[]
  author?: string
  createdAt?: string
  updatedAt?: string
}

export interface ComponentEntry {
  metadata: ComponentMetadata
  component: ComponentType<any> | LazyExoticComponent<ComponentType<any>>
  path: string
  isLazy?: boolean
}

class ComponentRegistry {
  private static instance: ComponentRegistry
  private components: Map<string, ComponentEntry> = new Map()
  private categories: Map<ComponentCategory, Set<string>> = new Map()
  private metadata: Map<string, ComponentMetadata> = new Map()
  private loadedComponents: Set<string> = new Set()

  private constructor() {
    this.initializeCategories()
  }

  public static getInstance(): ComponentRegistry {
    if (!ComponentRegistry.instance) {
      ComponentRegistry.instance = new ComponentRegistry()
    }
    return ComponentRegistry.instance
  }

  private initializeCategories() {
    const categories: ComponentCategory[] = ['ui', 'feature', 'layout', 'composite', 'chart', 'form']
    categories.forEach(category => {
      this.categories.set(category, new Set())
    })
  }

  /**
   * Register a component with the registry
   */
  public register(entry: ComponentEntry): void {
    const { name, category } = entry.metadata
    
    // Validate component doesn't already exist
    if (this.components.has(name)) {
      console.warn(`Component "${name}" is already registered. Overwriting...`)
    }

    // Register component
    this.components.set(name, entry)
    this.metadata.set(name, entry.metadata)
    
    // Add to category index
    const categorySet = this.categories.get(category)
    if (categorySet) {
      categorySet.add(name)
    }

    // Log registration
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Registered component: ${name} (${category})`)
    }
  }

  /**
   * Register multiple components at once
   */
  public registerBatch(entries: ComponentEntry[]): void {
    entries.forEach(entry => this.register(entry))
  }

  /**
   * Get a component by name
   */
  public get<T = any>(name: string): ComponentType<T> | null {
    const entry = this.components.get(name)
    if (!entry) {
      console.error(`Component "${name}" not found in registry`)
      return null
    }

    // Mark as loaded for tracking
    this.loadedComponents.add(name)
    
    return entry.component as ComponentType<T>
  }

  /**
   * Get component with metadata
   */
  public getWithMetadata(name: string): ComponentEntry | null {
    const entry = this.components.get(name)
    if (!entry) {
      console.error(`Component "${name}" not found in registry`)
      return null
    }
    return entry
  }

  /**
   * Get all components in a category
   */
  public getByCategory(category: ComponentCategory): ComponentEntry[] {
    const componentNames = this.categories.get(category)
    if (!componentNames) {
      return []
    }

    return Array.from(componentNames)
      .map(name => this.components.get(name))
      .filter((entry): entry is ComponentEntry => entry !== undefined)
  }

  /**
   * Get all component names
   */
  public getAllComponentNames(): string[] {
    return Array.from(this.components.keys())
  }

  /**
   * Get all components
   */
  public getAllComponents(): Map<string, ComponentEntry> {
    return new Map(this.components)
  }

  /**
   * Search components by tags
   */
  public searchByTags(tags: string[]): ComponentEntry[] {
    const results: ComponentEntry[] = []
    
    this.components.forEach(entry => {
      const componentTags = entry.metadata.tags || []
      const hasMatchingTag = tags.some(tag => 
        componentTags.includes(tag)
      )
      
      if (hasMatchingTag) {
        results.push(entry)
      }
    })
    
    return results
  }

  /**
   * Check if component exists
   */
  public has(name: string): boolean {
    return this.components.has(name)
  }

  /**
   * Remove a component from registry
   */
  public unregister(name: string): boolean {
    const entry = this.components.get(name)
    if (!entry) {
      return false
    }

    // Remove from category index
    const categorySet = this.categories.get(entry.metadata.category)
    if (categorySet) {
      categorySet.delete(name)
    }

    // Remove from registry
    this.components.delete(name)
    this.metadata.delete(name)
    this.loadedComponents.delete(name)
    
    return true
  }

  /**
   * Get registry statistics
   */
  public getStats() {
    const stats = {
      totalComponents: this.components.size,
      loadedComponents: this.loadedComponents.size,
      categories: {} as Record<string, number>
    }

    this.categories.forEach((components, category) => {
      stats.categories[category] = components.size
    })

    return stats
  }

  /**
   * Clear the registry (useful for testing)
   */
  public clear(): void {
    this.components.clear()
    this.metadata.clear()
    this.loadedComponents.clear()
    this.initializeCategories()
  }

  /**
   * Export registry as JSON (for debugging/documentation)
   */
  public exportAsJSON(): string {
    const data = {
      components: Array.from(this.components.entries()).map(([componentName, entry]) => ({
        ...entry.metadata,
        name: componentName, // Override metadata.name with the registry key
        path: entry.path
      })),
      stats: this.getStats()
    }
    
    return JSON.stringify(data, null, 2)
  }

  /**
   * Create a lazy-loaded component entry
   */
  public createLazyEntry(
    metadata: ComponentMetadata,
    importFn: () => Promise<{ default: ComponentType<any> }>,
    path: string
  ): ComponentEntry {
    return {
      metadata,
      component: lazy(importFn),
      path,
      isLazy: true
    }
  }

  /**
   * Auto-register components from a module context
   * This is useful for webpack's require.context or Vite's import.meta.glob
   */
  public autoRegisterFromContext(
    context: Record<string, any>,
    extractMetadata: (path: string, module: any) => ComponentMetadata | null
  ): void {
    Object.entries(context).forEach(([path, module]) => {
      const metadata = extractMetadata(path, module)
      if (metadata && module.default) {
        this.register({
          metadata,
          component: module.default,
          path
        })
      }
    })
  }
}

// Export singleton instance
export const componentRegistry = ComponentRegistry.getInstance()

// Export type for TypeScript
export type { ComponentRegistry }

// Export default
export default ComponentRegistry