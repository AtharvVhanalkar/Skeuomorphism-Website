# Skeuomorphic UI Design System & Component Library

A pure CSS design system and component toolkit dedicated to authentic, tactile **Skeuomorphism** on the modern web. Built with realistic physics, top-down directional lighting, multi-layered depth, and micro-interactions.

---

## 📖 Overview

Skeuomorphism bridges digital interfaces with the physical world by replicating textures, light physics, and tactile feedback. Unlike Neumorphism (which relies on soft, monochromatic surfaces), true skeuomorphic design incorporates:

- **Material Contrast:** Brushed metal, textured chassis, glassy screens, and tactile plastic.
- **Directional Lighting:** Consistent 90° overhead illumination across all components.
- **Physical States:** Real push-button travel (`translateY`), contact shadows, and concave wells.

---

## 📂 Project Structure

```text
├── index.html       # Visual reference guide & interactive playground
├── style.css        # Core skeuomorphic CSS library & variables
└── README.md        # Documentation and implementation reference
```

---

## 💡 Core Physics & Lighting Rules

When adding new components, adhere to these fundamental principles:

1. **The Overhead Light Law:**
   Light always strikes from above. 
   - **Top edge:** High-contrast specular highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.35)`).
   - **Bottom edge:** Dark chamfer shadow (`inset 0 -1px 0 rgba(0, 0, 0, 0.5)`).

2. **Raised Surfaces (Convex):**
   - Linear gradient transitioning from light (top) to dark (bottom).
   - Multi-layered drop shadows (a tight contact shadow + a soft ambient blur).

3. **Sunken Surfaces (Concave / Inset Wells):**
   - Deep `inset` shadows focused toward the upper half to mimic a recessed cavity.
   - Micro light-catch reflection on the bottom outer lip (`0 1px 0 rgba(255, 255, 255, 0.08)`).

4. **Depression Action (`:active`):**
   - Buttons physically depress down by `1px` or `2px`.
   - The drop shadow collapses while the inner inset shadow deepens.

---

## 🎨 CSS Class Reference

### 1. Containers & Panels
| Class | Purpose | Description |
| :--- | :--- | :--- |
| `.skeuo-panel` | Standard Panel | Raised surface with beveled edges and ambient shadow. |
| `.skeuo-chassis` | Heavy Base Enclosure | Dark, high-depth metallic chassis for master containers. |
| `.skeuo-screw` | Industrial Detail | Cast metal screw head accent. |

### 2. Interactive Controls
| Class | Purpose | Description |
| :--- | :--- | :--- |
| `.skeuo-btn` | Push Button | Tactile raised button with realistic click travel. |
| `.skeuo-btn-primary` | Blue Accent Button | High-saturation tactile trigger. |
| `.skeuo-btn-gold` | Amber Accent Button | Metallic amber action button. |
| `.skeuo-toggle` | Rocker Switch Track | Recessed enclosure for toggle interactions. |
| `.skeuo-knob` | Rotary Dial | Conic-gradient brushed metallic hardware dial. |

### 3. Displays & Wells
| Class | Purpose | Description |
| :--- | :--- | :--- |
| `.skeuo-well` | Sunken Cavity | Deep inset container for data blocks or input wells. |
| `.skeuo-display-screen` | Terminal / LCD Screen | Recessed glass terminal with CRT scanline effect. |
| `.skeuo-input` | Text Input Field | Recessed form input with subtle glow on focus. |

### 4. Indicators & Typography
| Class | Purpose | Description |
| :--- | :--- | :--- |
| `.skeuo-led` | Status Light | Inset unlit LED housing. |
| `.skeuo-led.is-active-green` | Active Green LED | Illuminated diode with green radial glow. |
| `.skeuo-led.is-active-amber` | Active Amber LED | Illuminated diode with amber radial glow. |
| `.skeuo-text-engraved` | Debossed Text | Text visually stamped or carved into the surface. |
| `.skeuo-text-embossed` | Raised Text | Text visually molded out from the surface. |

---

## 🚀 Quick Start Examples

### Linking Styles
```html
<link rel="stylesheet" href="style.css">
```

### Tactile Button with Status LED
```html
<div class="skeuo-panel" style="display: flex; align-items: center; gap: 16px;">
  <button class="skeuo-btn skeuo-btn-primary">Execute</button>
  <span class="skeuo-led is-active-green"></span>
</div>
```

### Sunken Data Display Screen
```html
<div class="skeuo-display-screen">
  SYS_STATUS: ONLINE<br>
  FREQ: 432.00 MHz
</div>
```

### Physical Toggle Switch
```html
<label class="skeuo-toggle">
  <input type="checkbox" checked>
  <span class="skeuo-toggle-track">
    <span class="skeuo-toggle-knob"></span>
  </span>
</label>
```

---

## ⚙️ Customization

All dimensions, gradient stops, and shadow depths are controlled via CSS custom properties in `:root` inside `style.css`. Adjust `--panel-top`, `--panel-bottom`, and the `--shadow-*` tokens to tweak the intensity of depth and material finishes.