import { componentRegistry } from './ComponentRegistry'
import type { ComponentMetadata, ComponentEntry } from './ComponentRegistry'

/**
 * Auto-register all components with .meta.ts files
 * This function scans the components directory and automatically registers
 * all components that have a corresponding metadata file
 */
export async function autoRegister() {
  if (typeof window === 'undefined') {
    // Server-side: Skip auto-registration
    return
  }

  try {
    // Use dynamic imports for client-side only
    // This pattern works with Next.js and Webpack
    const componentModules = await loadComponentModules()
    
    for (const [path, module] of Object.entries(componentModules)) {
      await registerComponentFromModule(path, module)
    }

    console.log('✅ Auto-registration complete:', componentRegistry.getStats())
  } catch (error) {
    console.error('❌ Auto-registration failed:', error)
  }
}

/**
 * Load all component modules dynamically
 * This function should be customized based on your build tool
 */
async function loadComponentModules(): Promise<Record<string, any>> {
  const modules: Record<string, any> = {}
  
  // This is a placeholder - in a real implementation, you would use:
  // - Webpack: require.context
  // - Vite: import.meta.glob
  // - Next.js: Dynamic imports with a known list
  
  // Example with dynamic imports (you'll need to maintain a list):
  const componentPaths: string[] = [
    // UI Components will be added here
    // '/components/ui/button/Button',
    // '/components/ui/input/Input',
    // Feature Components will be added here
    // '/components/feature/product-selector/ProductSelector',
  ]

  for (const path of componentPaths) {
    try {
      const module = await import(path)
      const metaModule = await import(`${path}.meta`)
      modules[path] = { component: module, metadata: metaModule }
    } catch (error) {
      console.warn(`Failed to load component at ${path}:`, error)
    }
  }

  return modules
}

/**
 * Register a single component from its module
 */
async function registerComponentFromModule(path: string, module: any) {
  try {
    const { component, metadata } = module
    
    if (!component?.default) {
      console.warn(`No default export found for component at ${path}`)
      return
    }
    
    if (!metadata?.default) {
      console.warn(`No metadata found for component at ${path}`)
      return
    }

    const componentMetadata: ComponentMetadata = metadata.default
    const entry: ComponentEntry = {
      metadata: componentMetadata,
      component: component.default,
      path
    }

    componentRegistry.register(entry)
  } catch (error) {
    console.error(`Failed to register component from ${path}:`, error)
  }
}

/**
 * Helper function to create component metadata
 */
export function createComponentMetadata(
  name: string,
  category: ComponentMetadata['category'],
  options: Partial<ComponentMetadata> = {}
): ComponentMetadata {
  return {
    name,
    category,
    version: '1.0.0',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...options
  }
}

/**
 * Decorator for auto-registering components (experimental)
 * Usage: @AutoRegister(metadata)
 */
export function AutoRegister(metadata: ComponentMetadata) {
  return function (target: any) {
    // Register immediately if in browser
    if (typeof window !== 'undefined') {
      componentRegistry.register({
        metadata,
        component: target,
        path: `decorator-registered/${metadata.name}`
      })
    }
    return target
  }
}

/**
 * Batch register components from a manifest
 */
export async function registerFromManifest(manifest: any[]) {
  const entries: ComponentEntry[] = []
  
  for (const item of manifest) {
    try {
      const module = await import(item.path)
      entries.push({
        metadata: item.metadata,
        component: module.default,
        path: item.path
      })
    } catch (error) {
      console.error(`Failed to load component from manifest: ${item.path}`, error)
    }
  }
  
  componentRegistry.registerBatch(entries)
}

// Auto-execute registration on module load (browser only)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Delay auto-registration to ensure all modules are loaded
  setTimeout(() => {
    autoRegister().catch(console.error)
  }, 0)
}