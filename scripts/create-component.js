#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Parse command line arguments
const args = process.argv.slice(2)
const flags = {}
let componentName = ''

args.forEach(arg => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.slice(2).split('=')
    flags[key] = value || true
  } else if (!componentName) {
    componentName = arg
  }
})

// Extract flags
const category = flags.category || 'ui'
const author = flags.author || 'System'
const description = flags.description || ''

// Validate input
if (!componentName) {
  console.error('❌ Component name is required')
  console.log('Usage: npm run create:component ComponentName [--category=ui|feature|layout|composite]')
  process.exit(1)
}

// Validate category
const validCategories = ['ui', 'feature', 'layout', 'composite', 'chart', 'form']
if (!validCategories.includes(category)) {
  console.error(`❌ Invalid category: ${category}`)
  console.log(`Valid categories: ${validCategories.join(', ')}`)
  process.exit(1)
}

// Convert component name to different cases
const kebabCase = componentName
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .toLowerCase()

const pascalCase = componentName.charAt(0).toUpperCase() + componentName.slice(1)

// Define paths
const componentDir = path.join(__dirname, '..', 'components', category, kebabCase)
const componentPath = path.join(componentDir, `${pascalCase}.tsx`)
const metaPath = path.join(componentDir, `${pascalCase}.meta.ts`)
const indexPath = path.join(componentDir, 'index.ts')
const testPath = path.join(componentDir, `${pascalCase}.test.tsx`)

// Check if component already exists
if (fs.existsSync(componentDir)) {
  console.error(`❌ Component ${componentName} already exists at ${componentDir}`)
  process.exit(1)
}

// Create component directory
fs.mkdirSync(componentDir, { recursive: true })

// Component template
const componentTemplate = `import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ${pascalCase}Props extends React.HTMLAttributes<HTMLDivElement> {
  // Add your props here
}

const ${pascalCase} = React.forwardRef<HTMLDivElement, ${pascalCase}Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Add your default styles here
          '',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

${pascalCase}.displayName = '${pascalCase}'

export default ${pascalCase}`

// Metadata template
const metaTemplate = `import { createMetadata, createProp, commonProps } from '@/components/registry/metadata-helpers'
import type { ExtendedComponentMetadata } from '@/components/registry/types'

const metadata: ExtendedComponentMetadata = createMetadata('${pascalCase}', '${category}', {
  displayName: '${pascalCase}',
  description: '${description || `${pascalCase} component`}',
  version: '1.0.0',
  status: 'stable',
  author: '${author}',
  
  props: [
    // Add your prop definitions here
    commonProps.className,
    commonProps.children,
  ],
  
  tags: ['${category}'],
  keywords: ['${kebabCase}'],
  
  example: \`
import { ${pascalCase} } from '@/components/${category}/${kebabCase}'

// Basic usage
<${pascalCase}>
  Content goes here
</${pascalCase}>
  \`.trim(),
  
  dependencies: [],
  
  hasStyles: true,
  themeable: true,
  responsive: true,
  ssr: true,
})

export default metadata`

// Index template
const indexTemplate = `export { default as ${pascalCase} } from './${pascalCase}'
export type { ${pascalCase}Props } from './${pascalCase}'
export { default as ${kebabCase}Metadata } from './${pascalCase}.meta'`

// Test template
const testTemplate = `import React from 'react'
import { render, screen } from '@testing-library/react'
import { ${pascalCase} } from './'

describe('${pascalCase}', () => {
  it('renders without crashing', () => {
    render(<${pascalCase}>Test Content</${pascalCase}>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
  
  it('applies custom className', () => {
    const { container } = render(
      <${pascalCase} className="custom-class">Test</${pascalCase}>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })
})`

// Write files
fs.writeFileSync(componentPath, componentTemplate)
fs.writeFileSync(metaPath, metaTemplate)
fs.writeFileSync(indexPath, indexTemplate)
fs.writeFileSync(testPath, testTemplate)

console.log(`✅ Component ${pascalCase} created successfully!`)
console.log(`📁 Location: ${componentDir}`)
console.log(`📝 Files created:`)
console.log(`   - ${pascalCase}.tsx`)
console.log(`   - ${pascalCase}.meta.ts`)
console.log(`   - index.ts`)
console.log(`   - ${pascalCase}.test.tsx`)

// Update components.json
const componentsJsonPath = path.join(__dirname, '..', 'components', 'registry', 'components.json')
try {
  const componentsJson = JSON.parse(fs.readFileSync(componentsJsonPath, 'utf8'))
  
  // Add component to manifest
  componentsJson.components.push({
    name: pascalCase,
    category,
    path: `@/components/${category}/${kebabCase}`,
    version: '1.0.0',
    createdAt: new Date().toISOString()
  })
  
  // Add to category list
  if (componentsJson.categories[category]) {
    componentsJson.categories[category].components.push(pascalCase)
  }
  
  // Update last modified
  componentsJson.lastUpdated = new Date().toISOString()
  
  // Write back
  fs.writeFileSync(componentsJsonPath, JSON.stringify(componentsJson, null, 2))
  console.log(`✅ Updated components.json`)
} catch (error) {
  console.warn('⚠️ Could not update components.json:', error.message)
}

console.log(`\n🎉 Component ${pascalCase} is ready to use!`)
console.log(`\nNext steps:`)
console.log(`1. Import and use your component:`)
console.log(`   import { ${pascalCase} } from '@/components/${category}/${kebabCase}'`)
console.log(`2. Customize the component implementation`)
console.log(`3. Update the metadata and props`)
console.log(`4. Add tests and documentation`)