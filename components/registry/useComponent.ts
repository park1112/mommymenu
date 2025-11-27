import { ComponentType, useMemo } from 'react'
import { componentRegistry } from './ComponentRegistry'

/**
 * Hook to retrieve a component from the registry
 * @param name - The name of the component to retrieve
 * @returns The component or null if not found
 */
export function useComponent<T = any>(name: string): ComponentType<T> | null {
  return useMemo(() => {
    const component = componentRegistry.get<T>(name)
    
    if (!component && process.env.NODE_ENV === 'development') {
      console.warn(
        `Component "${name}" not found in registry. Available components:`,
        componentRegistry.getAllComponentNames()
      )
    }
    
    return component
  }, [name])
}

/**
 * Hook to retrieve multiple components from the registry
 * @param names - Array of component names to retrieve
 * @returns Object with component names as keys and components as values
 */
export function useComponents<T extends Record<string, any>>(
  names: string[]
): Partial<T> {
  return useMemo(() => {
    const components: any = {}
    
    names.forEach(name => {
      const component = componentRegistry.get(name)
      if (component) {
        components[name] = component
      }
    })
    
    return components
  }, [names.join(',')])
}

/**
 * Hook to retrieve all components in a category
 * @param category - The category to retrieve components from
 * @returns Array of components in the category
 */
export function useComponentsByCategory(category: string) {
  return useMemo(() => {
    return componentRegistry.getByCategory(category as any)
  }, [category])
}

/**
 * Hook to retrieve component with its metadata
 * @param name - The name of the component
 * @returns Component entry with metadata or null
 */
export function useComponentWithMetadata(name: string) {
  return useMemo(() => {
    return componentRegistry.getWithMetadata(name)
  }, [name])
}

/**
 * Hook to search components by tags
 * @param tags - Array of tags to search for
 * @returns Array of matching components
 */
export function useComponentsByTags(tags: string[]) {
  return useMemo(() => {
    return componentRegistry.searchByTags(tags)
  }, [tags.join(',')])
}

/**
 * Hook to get registry statistics
 * @returns Registry statistics object
 */
export function useRegistryStats() {
  return useMemo(() => {
    return componentRegistry.getStats()
  }, [])
}