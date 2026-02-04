---
name: ui-components
description: Standards and patterns for creating and using UI components in shared/components
triggers:
  - "component"
  - "shared/components"
  - "ui component"
  - "Button"
  - "Input"
  - "Dialog"
  - "props interface"
  - "styling"
  - "PascalCase"
---

# UI Components Guidelines

Universal standards and patterns for creating and using UI components.

## ⚠️ CRITICAL: Component Usage Priority

### ALWAYS Use Existing UI Kit Components

**Before creating any new component or using native HTML elements, ALWAYS:**

1. **Check if a UI kit component exists** in `src/shared/components/`
2. **Use the existing component** instead of native HTML elements
   - ❌ DON'T use `<button>` - use `<Button>` from UI kit
   - ❌ DON'T use `<input>` - use `<Input>` from UI kit
   - ❌ DON'T create custom dropdowns - use `<Dropdown>` from UI kit
   - ✅ DO use `<Button theme="ghost" size="s" Icon={IconName} />`

### Creating New UI Components: Use shadcn as Foundation

**When creating NEW components for the UI kit:**

1. **ALWAYS use shadcn as the base** (https://ui.shadcn.com)
2. **Install the shadcn component** first using `pnpm dlx shadcn@latest add <component-name>`
3. **Build on top of Radix UI primitives** (already used by shadcn)
4. **Adapt styling** to match the project's design system
5. **Never reinvent the wheel** - shadcn provides production-ready, accessible components

**Example: Creating a Dropdown**
```tsx
// ✅ CORRECT: Use @radix-ui/react-dropdown-menu (shadcn base)
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

// ❌ WRONG: Custom implementation with useState and click handlers
const [isOpen, setIsOpen] = useState(false);
```

### Why This Matters

- **Accessibility**: shadcn/Radix UI components are fully accessible by default
- **Consistency**: Using UI kit ensures consistent look and feel
- **Maintainability**: Less custom code = easier to maintain
- **Best Practices**: shadcn follows React best practices and patterns
- **Time Savings**: Don't reinvent solved problems

## Core Principles

### 1. Component Naming

- All UI components MUST be named with PascalCase (e.g., `Button`, `Input`, `Textarea`)
- Component files should use PascalCase naming (e.g., `Button.tsx`, `Input.tsx`)
- Export components with their PascalCase names

### 2. Built-in Styling

- Components should include all necessary base styling internally
- External styling should be minimal and only for layout/positioning
- Use `rounded-xl` for consistent border radius across components
- Components should handle their own responsive behavior

### 3. Props Interface Standards

- Each component MUST have explicitly defined props interface
- NO `extends React.HTMLAttributes` - all props must be explicitly defined
- Use TypeScript interfaces for all component props
- Add new props only as needed - start minimal and expand
- Group props logically with comments (Custom Props, Styling, Events, Accessibility, etc.)

## Universal Component Patterns

### Props Interface Structure

```tsx
interface ComponentProps {
  size?: "s" | "m" | "l";
  // Custom Props (component-specific functionality)
  label?: string;
  error?: string;
  isLoading?: boolean;
  isDisabled?: boolean;

  // Standard Event Props (only those actually used)
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
}
```

### Component Implementation Standards

- Use `React.forwardRef` for components that need DOM refs
- Handle internal state when necessary (forms, toggles, etc.)
- Implement proper accessibility attributes
- Use consistent error handling patterns
- Include loading states for interactive components

## Styling Guidelines

### Internal Styling Rules

- ✅ **DO**: Include base styling in components (`rounded-xl`, `resize-none`, etc.)
- ✅ **DO**: Handle state-based styling internally (error states, disabled, loading)
- ✅ **DO**: Use consistent spacing and sizing patterns
- ✅ **DO**: Implement proper focus and hover states

### External Styling Rules

- ❌ **DON'T**: Add component-internal styling externally (`rounded-xl`, `resize-none`)
- ❌ **DON'T**: Implement loading states manually when component has built-in support
- ❌ **DON'T**: Create manual label elements when component has built-in label prop

- ✅ **DO**: Use layout and positioning classes (`w-full`, `mb-4`, `flex`, etc.)
- ✅ **DO**: Use component variants and sizes (`variant="outline"`, `size="lg"`)
- ✅ **DO**: Use built-in props for functionality (`label`, `error`, `isLoading`)

## Development Workflow

### Adding New Props

1. Identify the need for a new prop
2. Add it to the interface with proper TypeScript typing
3. Implement the functionality in the component
4. Update component usage across the codebase
5. Test accessibility and responsive behavior

### Component Creation Checklist

- [ ] PascalCase naming
- [ ] Explicit props interface (no extends)
- [ ] Built-in styling with `rounded-xl`
- [ ] Error handling support
- [ ] Loading states (for interactive components)
- [ ] Accessibility attributes
- [ ] Proper TypeScript typing
- [ ] forwardRef implementation (if needed)
- [ ] Consistent label patterns (for form components)

## Interactive Component Patterns

### Variants and Sizes

- Implement variant system for different visual styles
- Include size variations (s, m, l)
- Use consistent naming patterns across components
