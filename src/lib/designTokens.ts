// Design Tokens for Aegis Vision AI Manufacturing Platform
// Exported as a single TypeScript object for easy consumption

export const designTokens = {
  // Colors
  colors: {
    'surface-primary': '#ffffff',
    'surface-secondary': '#f9fafb',
    'on-surface': '#111827',
    'on-surface-secondary': '#6b7280',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    
    // Extended color palette for manufacturing context
    primary: '#3b82f6',
    'primary-light': '#dbeafe',
    'primary-dark': '#1e40af',
    
    // Status colors for manufacturing
    operational: '#22c55e',
    maintenance: '#f59e0b',
    critical: '#ef4444',
    offline: '#6b7280',
    
    // ROI colors
    'roi-defect': '#ef4444',
    'roi-quality': '#22c55e',
    'roi-measurement': '#3b82f6',
    'roi-inspection': '#0ea5e9',
    
    // Neutral grays
    'gray-50': '#f9fafb',
    'gray-100': '#f3f4f6',
    'gray-200': '#e5e7eb',
    'gray-300': '#d1d5db',
    'gray-400': '#9ca3af',
    'gray-500': '#6b7280',
    'gray-600': '#4b5563',
    'gray-700': '#374151',
    'gray-800': '#1f2937',
    'gray-900': '#111827',
  },

  // Typography
  typography: {
    'font-base': {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: '400',
    },
    'font-large': {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
      fontWeight: '500',
    },
    'font-xl': {
      fontSize: '1.875rem',
      lineHeight: '2.25rem',
      fontWeight: '600',
    },
    
    // Extended typography scale
    'font-sm': {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: '400',
    },
    'font-xs': {
      fontSize: '0.75rem',
      lineHeight: '1rem',
      fontWeight: '400',
    },
    'font-2xl': {
      fontSize: '2.25rem',
      lineHeight: '2.5rem',
      fontWeight: '700',
    },
    'font-3xl': {
      fontSize: '3rem',
      lineHeight: '1',
      fontWeight: '800',
    },
    
    // Font families
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
    },
  },

  // Spacing
  spacing: {
    'space-1': '4px',
    'space-2': '8px',
    'space-3': '16px',
    'space-4': '32px',
    
    // Extended spacing scale
    'space-0': '0px',
    'space-0.5': '2px',
    'space-1.5': '6px',
    'space-2.5': '10px',
    'space-5': '48px',
    'space-6': '64px',
    'space-8': '96px',
    'space-10': '128px',
    'space-12': '192px',
    'space-16': '256px',
    'space-20': '320px',
    'space-24': '384px',
  },

  // Border Radius
  radius: {
    'radius-sm': '8px',
    'radius-md': '12px',
    
    // Extended radius scale
    'radius-none': '0px',
    'radius-xs': '4px',
    'radius-lg': '16px',
    'radius-xl': '24px',
    'radius-2xl': '32px',
    'radius-full': '9999px',
  },

  // Elevation (Box Shadows)
  elevation: {
    'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    'elevation-2': '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
    'elevation-3': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    'elevation-4': '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
    'elevation-5': '0 25px 50px rgba(0, 0, 0, 0.25)',
    
    // Special elevations
    'elevation-inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
    'elevation-none': 'none',
  },

  // Animation & Transitions
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-Index Scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // Manufacturing-specific tokens
  manufacturing: {
    statusColors: {
      operational: '#22c55e',
      warning: '#f59e0b',
      critical: '#ef4444',
      offline: '#6b7280',
      maintenance: '#8b5cf6',
    },
    roiColors: {
      defect: '#ef4444',
      quality: '#22c55e',
      measurement: '#3b82f6',
      inspection: '#0ea5e9',
    },
    thresholdColors: {
      low: '#22c55e',
      medium: '#f59e0b',
      high: '#ef4444',
    },
    alertSeverity: {
      low: '#3b82f6',
      medium: '#f59e0b',
      high: '#f97316',
      critical: '#ef4444',
    },
  },
} as const

// Type definitions for design tokens
export type DesignTokens = typeof designTokens
export type ColorTokens = keyof typeof designTokens.colors
export type TypographyTokens = keyof typeof designTokens.typography
export type SpacingTokens = keyof typeof designTokens.spacing
export type RadiusTokens = keyof typeof designTokens.radius
export type ElevationTokens = keyof typeof designTokens.elevation

// Helper functions for accessing tokens
export const getColor = (token: ColorTokens): string => designTokens.colors[token]
export const getSpacing = (token: SpacingTokens): string => designTokens.spacing[token]
export const getRadius = (token: RadiusTokens): string => designTokens.radius[token]
export const getElevation = (token: ElevationTokens): string => designTokens.elevation[token]

// CSS Custom Properties generator
export const generateCSSCustomProperties = (): Record<string, string> => {
  const cssVars: Record<string, string> = {}
  
  // Colors
  Object.entries(designTokens.colors).forEach(([key, value]) => {
    cssVars[`--color-${key}`] = value
  })
  
  // Spacing
  Object.entries(designTokens.spacing).forEach(([key, value]) => {
    cssVars[`--${key}`] = value
  })
  
  // Radius
  Object.entries(designTokens.radius).forEach(([key, value]) => {
    cssVars[`--${key}`] = value
  })
  
  // Elevation
  Object.entries(designTokens.elevation).forEach(([key, value]) => {
    cssVars[`--${key}`] = value
  })
  
  return cssVars
}

// Default export for convenience
export default designTokens
