import type { ExtendedComponentMetadata, PropDefinition, ComponentExample } from './types'

/**
 * Create component metadata with defaults
 */
export function createMetadata(
  name: string,
  category: ExtendedComponentMetadata['category'],
  options: Partial<ExtendedComponentMetadata> = {}
): ExtendedComponentMetadata {
  return {
    name,
    displayName: name,
    category,
    version: '1.0.0',
    status: 'stable',
    ssr: true,
    responsive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...options
  }
}

/**
 * Create prop definition helper
 */
export function createProp(
  name: string,
  type: string,
  options: Partial<PropDefinition> = {}
): PropDefinition {
  return {
    name,
    type,
    required: false,
    ...options
  }
}

/**
 * Create required prop definition
 */
export function requiredProp(
  name: string,
  type: string,
  options: Partial<PropDefinition> = {}
): PropDefinition {
  return createProp(name, type, { ...options, required: true })
}

/**
 * Create enum prop definition
 */
export function enumProp(
  name: string,
  options: readonly any[],
  defaultValue?: any,
  description?: string
): PropDefinition {
  return {
    name,
    type: `enum`,
    options,
    default: defaultValue ?? options[0],
    description,
    required: false
  }
}

/**
 * Create component example
 */
export function createExample(
  code: string,
  title?: string,
  options: Partial<ComponentExample> = {}
): ComponentExample {
  return {
    title: title || 'Example',
    code,
    preview: true,
    language: 'tsx',
    ...options
  }
}

/**
 * Common prop definitions for reuse
 */
export const commonProps = {
  className: createProp('className', 'string', {
    description: 'Additional CSS classes'
  }),
  style: createProp('style', 'CSSProperties', {
    description: 'Inline styles'
  }),
  children: createProp('children', 'ReactNode', {
    description: 'Child elements'
  }),
  id: createProp('id', 'string', {
    description: 'Element ID'
  }),
  onClick: createProp('onClick', '() => void', {
    description: 'Click event handler'
  }),
  disabled: createProp('disabled', 'boolean', {
    default: false,
    description: 'Disabled state'
  }),
  variant: enumProp('variant', ['primary', 'secondary', 'outline', 'ghost'] as const, 'primary', 'Visual variant'),
  size: enumProp('size', ['sm', 'md', 'lg'] as const, 'md', 'Component size'),
  loading: createProp('loading', 'boolean', {
    default: false,
    description: 'Loading state'
  })
}

/**
 * Generate TypeScript interface from prop definitions
 */
export function generateInterface(
  componentName: string,
  props: PropDefinition[]
): string {
  const lines = [`export interface ${componentName}Props {`]
  
  props.forEach(prop => {
    const optional = prop.required ? '' : '?'
    const type = prop.options 
      ? prop.options.map(o => `'${o}'`).join(' | ')
      : prop.type
    
    if (prop.description) {
      lines.push(`  /** ${prop.description} */`)
    }
    lines.push(`  ${prop.name}${optional}: ${type}`)
  })
  
  lines.push('}')
  return lines.join('\n')
}

/**
 * Validate component metadata
 */
export function validateMetadata(metadata: ExtendedComponentMetadata): string[] {
  const errors: string[] = []
  
  if (!metadata.name) {
    errors.push('Component name is required')
  }
  
  if (!metadata.category) {
    errors.push('Component category is required')
  }
  
  if (!metadata.version) {
    errors.push('Component version is required')
  }
  
  if (metadata.version && !/^\d+\.\d+\.\d+/.test(metadata.version)) {
    errors.push('Version must follow semver format (x.y.z)')
  }
  
  const validCategories = ['ui', 'feature', 'layout', 'composite', 'chart', 'form']
  if (metadata.category && !validCategories.includes(metadata.category)) {
    errors.push(`Category must be one of: ${validCategories.join(', ')}`)
  }
  
  return errors
}

/**
 * Merge metadata with defaults
 */
export function mergeMetadata(
  base: Partial<ExtendedComponentMetadata>,
  override: Partial<ExtendedComponentMetadata>
): ExtendedComponentMetadata {
  return {
    ...base,
    ...override,
    props: [...(base.props || []), ...(override.props || [])],
    tags: [...new Set([...(base.tags || []), ...(override.tags || [])])],
    keywords: [...new Set([...(base.keywords || []), ...(override.keywords || [])])],
    dependencies: [...new Set([...(base.dependencies || []), ...(override.dependencies || [])])],
  } as ExtendedComponentMetadata
}