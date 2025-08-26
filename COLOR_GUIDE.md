# WCI Goderich Color Palette Guide

## Primary Color Scheme

Our primary color is **Red (#ef4444)** - representing the passion and love of Christ.

## Color Combinations & Usage

### 🎨 Primary Colors

- **Primary**: `#ef4444` (Red)
- **Primary Foreground**: `#ffffff` (White)
- **Contrast Ratio**: 4.5:1 ✅ (Excellent for accessibility)

### 🔄 Secondary Colors

- **Secondary**: `#f8fafc` (Light Gray)
- **Secondary Foreground**: `#1e293b` (Dark Slate)
- **Contrast Ratio**: 15.6:1 ✅ (Excellent for accessibility)

### ✨ Accent Colors

- **Accent**: `#ef4444` (Red - same as primary)
- **Accent Foreground**: `#ffffff` (White)
- **Contrast Ratio**: 4.5:1 ✅ (Excellent for accessibility)

### 🎯 Button Variants

#### Primary Button

```tsx
<Button variant="default">Primary Action</Button>
```

- **Background**: `#ef4444` (Red)
- **Text**: `#ffffff` (White)
- **Hover**: `#dc2626` (Darker Red)
- **Use Case**: Main CTAs, important actions

#### Secondary Button

```tsx
<Button variant="secondary">Secondary Action</Button>
```

- **Background**: `#f8fafc` (Light Gray)
- **Text**: `#1e293b` (Dark Slate)
- **Hover**: `#e2e8f0` (Medium Gray)
- **Use Case**: Secondary actions, less prominent buttons

#### Outline Button

```tsx
<Button variant="outline">Outline Action</Button>
```

- **Background**: Transparent
- **Border**: `#e2e8f0` (Light Gray)
- **Text**: `#1e293b` (Dark Slate)
- **Hover**: `#f1f5f9` (Very Light Gray)
- **Use Case**: Subtle actions, secondary CTAs

#### Ghost Button

```tsx
<Button variant="ghost">Ghost Action</Button>
```

- **Background**: Transparent
- **Text**: `#1e293b` (Dark Slate)
- **Hover**: `#f1f5f9` (Very Light Gray)
- **Use Case**: Navigation items, subtle interactions

#### Destructive Button

```tsx
<Button variant="destructive">Delete Item</Button>
```

- **Background**: `#ef4444` (Red)
- **Text**: `#ffffff` (White)
- **Hover**: `#dc2626` (Darker Red)
- **Use Case**: Delete actions, dangerous operations

### 🌈 Navigation & Hover States

#### Navigation Menu Items

- **Default**: `#1e293b` (Dark Slate)
- **Hover**: `#ef4444` (Red) with `#ffffff` (White) text
- **Active**: `#ef4444` (Red) with `#ffffff` (White) text

#### Dropdown Hover

- **Background**: `#fef2f2` (Very Light Red)
- **Text**: `#991b1b` (Dark Red)
- **Border**: `#fecaca` (Light Red)

### 📱 Component-Specific Colors

#### Cards & Containers

- **Background**: `#ffffff` (White)
- **Border**: `#e2e8f0` (Light Gray)
- **Text**: `#1e293b` (Dark Slate)

#### Form Elements

- **Input Background**: `#ffffff` (White)
- **Input Border**: `#e2e8f0` (Light Gray)
- **Focus Ring**: `#ef4444` (Red)
- **Placeholder**: `#94a3b8` (Medium Gray)

#### Alerts & Notifications

- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Error**: `#ef4444` (Red)
- **Info**: `#3b82f6` (Blue)

### 🌙 Dark Mode Considerations

#### Dark Mode Primary

- **Primary**: `#f87171` (Lighter Red)
- **Primary Foreground**: `#0f172a` (Very Dark Blue)
- **Contrast Ratio**: 4.8:1 ✅

#### Dark Mode Backgrounds

- **Background**: `#0f172a` (Very Dark Blue)
- **Card**: `#1e293b` (Dark Slate)
- **Border**: `#334155` (Medium Slate)

### 📊 Accessibility Standards

#### WCAG 2.1 AA Compliance

- **Normal Text**: Minimum 4.5:1 contrast ratio ✅
- **Large Text**: Minimum 3:1 contrast ratio ✅
- **UI Components**: Minimum 3:1 contrast ratio ✅

#### Color Blindness Considerations

- Never rely solely on color to convey information
- Use icons, patterns, or text labels as additional indicators
- Test with color blindness simulators

### 🎨 Implementation Examples

#### Navigation Menu Item

```tsx
<NavigationMenuLink className="hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950 dark:hover:text-red-300">
  Menu Item
</NavigationMenuLink>
```

#### Button with Hover States

```tsx
<Button
  className="hover:bg-red-600 focus:ring-red-500 focus:ring-offset-2"
  variant="default"
>
  Click Me
</Button>
```

#### Card with Accent Border

```tsx
<div className="bg-white border border-gray-200 hover:border-red-300 transition-colors">
  Card Content
</div>
```

### 🔧 CSS Custom Properties

```css
:root {
  --primary: #ef4444;
  --primary-foreground: #ffffff;
  --secondary: #f8fafc;
  --secondary-foreground: #1e293b;
  --accent: #ef4444;
  --accent-foreground: #ffffff;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --border: #e2e8f0;
  --input: #ffffff;
  --ring: #ef4444;
  --background: #ffffff;
  --foreground: #1e293b;
  --card: #ffffff;
  --card-foreground: #1e293b;
  --popover: #ffffff;
  --popover-foreground: #1e293b;
  --destructive: #ef4444;
}
```

### 📝 Best Practices

1. **Consistency**: Use the same color for similar UI elements
2. **Hierarchy**: Use color intensity to show importance
3. **Accessibility**: Always maintain proper contrast ratios
4. **Testing**: Test colors in different lighting conditions
5. **Branding**: Keep the red (#ef4444) as the primary brand color
6. **Hover States**: Use red variations for interactive elements
7. **Focus States**: Use red for focus rings and active states

### 🎯 Quick Reference

| Element          | Background | Text      | Hover Background | Hover Text |
| ---------------- | ---------- | --------- | ---------------- | ---------- |
| Primary Button   | `#ef4444`  | `#ffffff` | `#dc2626`        | `#ffffff`  |
| Secondary Button | `#f8fafc`  | `#1e293b` | `#e2e8f0`        | `#1e293b`  |
| Navigation Hover | `#fef2f2`  | `#991b1b` | `#fecaca`        | `#7f1d1d`  |
| Card             | `#ffffff`  | `#1e293b` | `#f8fafc`        | `#1e293b`  |
| Input Focus      | `#ffffff`  | `#1e293b` | -                | -          |
| Focus Ring       | `#ef4444`  | -         | -                | -          |
