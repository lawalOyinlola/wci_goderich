# FadeOverlay Component Guide

A reusable React component that creates beautiful blur/fade effects around any content, similar to the testimonial section on the [Cursor website](https://cursor.com/).

## 🎯 **What It Does**

The `FadeOverlay` component creates a fade effect that gradually transitions content into the background, creating a seamless blend with the page. It's perfect for:

- Testimonial cards
- Content containers
- Hero sections
- Modal overlays
- Any component that needs to fade into the background

## 🚀 **Basic Usage**

```tsx
import { FadeOverlay } from "@/components/ui/fade-overlay";

function MyComponent() {
  return (
    <FadeOverlay>
      <div className="bg-white p-6 rounded-lg">Your content here</div>
    </FadeOverlay>
  );
}
```

## ⚙️ **Props & Options**

### **Core Props**

| Prop        | Type      | Default   | Description                      |
| ----------- | --------- | --------- | -------------------------------- |
| `children`  | ReactNode | -         | Content to wrap with fade effect |
| `className` | string    | -         | Additional CSS classes           |
| `variant`   | string    | "default" | Fade intensity style             |
| `position`  | string    | "all"     | Which sides to apply fade        |
| `size`      | string    | "md"      | Size of the fade effect          |
| `blur`      | boolean   | true      | Enable/disable blur effect       |
| `fade`      | boolean   | true      | Enable/disable fade effect       |

### **Variant Options**

```tsx
// Subtle fade (transparent → background/80)
<FadeOverlay variant="subtle">
  Content
</FadeOverlay>

// Default fade (transparent → background)
<FadeOverlay variant="default">
  Content
</FadeOverlay>

// Intense fade (transparent → background/50 → background)
<FadeOverlay variant="intense">
  Content
</FadeOverlay>

// Gradient fade (transparent → background/30 → background)
<FadeOverlay variant="gradient">
  Content
</FadeOverlay>
```

### **Position Options**

```tsx
// All sides (default)
<FadeOverlay position="all">
  Content
</FadeOverlay>

// Top only
<FadeOverlay position="top">
  Content
</FadeOverlay>

// Bottom only
<FadeOverlay position="bottom">
  Content
</FadeOverlay>

// Left only
<FadeOverlay position="left">
  Content
</FadeOverlay>

// Right only
<FadeOverlay position="right">
  Content
</FadeOverlay>
```

### **Size Options**

```tsx
// Small fade
<FadeOverlay size="sm">
  Content
</FadeOverlay>

// Medium fade (default)
<FadeOverlay size="md">
  Content
</FadeOverlay>

// Large fade
<FadeOverlay size="lg">
  Content
</FadeOverlay>

// Extra large fade
<FadeOverlay size="xl">
  Content
</FadeOverlay>
```

## 🎨 **Real-World Examples**

### **1. Testimonial Cards (Like Cursor Website)**

```tsx
<FadeOverlay
  variant="default"
  position="all"
  size="lg"
  className="bg-white rounded-2xl p-6 shadow-lg"
>
  <div className="text-center">
    <blockquote className="text-gray-700 mb-4">
      "This is an amazing product!"
    </blockquote>
    <div className="font-semibold">John Doe</div>
    <div className="text-sm text-gray-600">CEO, Company</div>
  </div>
</FadeOverlay>
```

### **2. Content Container with Top Fade**

```tsx
<FadeOverlay
  variant="subtle"
  position="top"
  size="md"
  className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl"
>
  <h2 className="text-3xl font-bold mb-4">Section Title</h2>
  <p className="text-gray-700">
    Your content here that fades into the background at the top.
  </p>
</FadeOverlay>
```

### **3. Hero Section with All-Side Fade**

```tsx
<FadeOverlay
  variant="intense"
  position="all"
  size="xl"
  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-3xl"
>
  <div className="text-center">
    <h1 className="text-5xl font-bold mb-6">Welcome</h1>
    <p className="text-xl opacity-90">
      This creates a beautiful fade effect on all sides.
    </p>
  </div>
</FadeOverlay>
```

### **4. Sidebar with Left Fade**

```tsx
<FadeOverlay
  variant="default"
  position="left"
  size="lg"
  className="bg-white h-full p-6 shadow-lg"
>
  <nav className="space-y-4">
    <a href="#" className="block py-2">
      Home
    </a>
    <a href="#" className="block py-2">
      About
    </a>
    <a href="#" className="block py-2">
      Contact
    </a>
  </nav>
</FadeOverlay>
```

## 🔧 **Customization Tips**

### **1. Combine with Hover Effects**

```tsx
<FadeOverlay className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
  Content with hover effects
</FadeOverlay>
```

### **2. Use with Different Backgrounds**

```tsx
<FadeOverlay
  variant="subtle"
  className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl p-8"
>
  Content on gradient background
</FadeOverlay>
```

### **3. Responsive Sizing**

```tsx
<FadeOverlay
  size="md"
  className="h-32 md:h-48 lg:h-64 bg-blue-50 rounded-lg p-4 md:p-6 lg:p-8"
>
  Responsive content
</FadeOverlay>
```

## 🎭 **Animation & Performance**

- **Smooth Transitions**: All fade effects use CSS transitions for smooth animations
- **Performance Optimized**: Uses CSS transforms and opacity for hardware acceleration
- **No JavaScript Animations**: Pure CSS for better performance
- **Responsive**: Automatically adjusts to different screen sizes

## 🚫 **Common Pitfalls**

### **1. Don't Nest FadeOverlays**

```tsx
// ❌ Wrong - Don't nest them
<FadeOverlay>
  <FadeOverlay>
    Content
  </FadeOverlay>
</FadeOverlay>

// ✅ Correct - Use one with larger size
<FadeOverlay size="xl">
  Content
</FadeOverlay>
```

### **2. Don't Forget Relative Positioning**

```tsx
// ❌ Wrong - Parent needs relative positioning
<div>
  <FadeOverlay>Content</FadeOverlay>
</div>

// ✅ Correct - FadeOverlay handles positioning automatically
<FadeOverlay>Content</FadeOverlay>
```

### **3. Don't Overuse Blur**

```tsx
// ❌ Wrong - Too much blur can be distracting
<FadeOverlay size="xl" blur={true}>
  Content
</FadeOverlay>

// ✅ Correct - Use appropriate blur levels
<FadeOverlay size="md" blur={true}>
  Content
</FadeOverlay>
```

## 🌟 **Pro Tips**

1. **Start with `variant="default"`** and adjust from there
2. **Use `size="md"`** for most use cases - it's the sweet spot
3. **Combine with shadows** for depth and visual hierarchy
4. **Test on different backgrounds** to ensure good contrast
5. **Use `position="top"` or `position="bottom"`** for subtle effects

## 📱 **Mobile Considerations**

- Fade effects work great on mobile
- Consider using smaller sizes (`sm` or `md`) on mobile
- Touch interactions work seamlessly with the component
- Responsive design is built-in

## 🎨 **Design Inspiration**

This component was inspired by modern design patterns seen on:

- [Cursor website](https://cursor.com/) testimonials
- Apple product pages
- Modern SaaS landing pages
- Material Design components

The fade effect creates a sense of depth and helps content blend naturally with the page background, creating a more polished and professional appearance.
