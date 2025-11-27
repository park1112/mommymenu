import { ComponentType, ReactNode } from 'react'

/**
 * Component property types for documentation
 */
export interface PropDefinition {
  name: string
  type: string
  required?: boolean
  default?: any
  description?: string
  options?: readonly any[]
}

/**
 * Extended metadata for comprehensive component documentation
 */
export interface ExtendedComponentMetadata {
  // Basic Information
  name: string
  displayName?: string
  category: 'ui' | 'feature' | 'layout' | 'composite' | 'chart' | 'form'
  version: string
  
  // Documentation
  description?: string
  usage?: string
  example?: string | string[]
  notes?: string[]
  
  // Technical Details
  props?: PropDefinition[]
  dependencies?: string[]
  peerDependencies?: string[]
  
  // Categorization
  tags?: string[]
  keywords?: string[]
  
  // Status
  status?: 'stable' | 'beta' | 'alpha' | 'deprecated'
  experimental?: boolean
  
  // Meta
  author?: string
  license?: string
  createdAt?: string
  updatedAt?: string
  
  // Performance
  lazyLoad?: boolean
  preload?: boolean
  ssr?: boolean
  
  // Styling
  hasStyles?: boolean
  themeable?: boolean
  responsive?: boolean
  
  // Accessibility
  a11y?: {
    wcag?: string
    ariaLabel?: boolean
    keyboard?: boolean
    screenReader?: boolean
  }
}

/**
 * Component configuration for registry
 */
export interface ComponentConfig<T = any> {
  component: ComponentType<T>
  metadata: ExtendedComponentMetadata
}

/**
 * Component manifest entry
 */
export interface ComponentManifestEntry {
  path: string
  metadata: ExtendedComponentMetadata
}

/**
 * Complete component manifest
 */
export interface ComponentManifest {
  version: string
  lastUpdated: string
  components: ComponentManifestEntry[]
  categories: Record<string, {
    name: string
    description: string
    components: string[]
  }>
}

/**
 * Component example configuration
 */
export interface ComponentExample {
  title: string
  description?: string
  code: string
  preview?: boolean
  language?: 'tsx' | 'jsx' | 'typescript' | 'javascript'
}

/**
 * Component variant definition
 */
export interface ComponentVariant {
  name: string
  props: Record<string, any>
  description?: string
}

/**
 * Component theme configuration
 */
export interface ComponentTheme {
  colors?: Record<string, string>
  spacing?: Record<string, string | number>
  typography?: Record<string, any>
  borderRadius?: Record<string, string>
  shadows?: Record<string, string>
}