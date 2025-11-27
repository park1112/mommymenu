export { componentRegistry, default as ComponentRegistry } from './ComponentRegistry'
export type { ComponentMetadata, ComponentEntry, ComponentCategory } from './ComponentRegistry'

// Re-export auto-registration utilities
export { autoRegister } from './auto-register'
export { useComponent } from './useComponent'

// Re-export component manifest
export { default as componentManifest } from './components.json'