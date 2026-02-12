# Component Parameters Reference

All components now support positioning and customization parameters. The models remain unchanged and use CDN loading to prevent dullness.

## Common Positioning Parameters (All Components)

```jsx
top=""           // CSS top position (e.g., "0", "10px", "50%")
bottom=""        // CSS bottom position
left=""          // CSS left position
right=""         // CSS right position
className=""     // Additional CSS classes
style={{}}       // Inline styles object
```

---

## EarthAndMoon

**Custom Parameters:**
```jsx
<EarthAndMoon
  // Positioning
  top="0"
  left="0"

  // Customization
  earthSize={0.6}                 // Earth radius
  moonSize={0.09}                 // Moon radius
  moonDistance={1.0}              // Moon orbit distance
  moonOrbitSpeed={0.02}           // Moon rotation speed
  earthRotationSpeed={0.001}      // Earth auto-rotation speed
  cloudOpacity={0.4}              // Cloud layer opacity
  atmosphereOpacity={0.15}        // Atmosphere glow opacity
  star Count={8000}                // Number of stars
  autoRotate={true}               // Enable auto-rotation
/>
```

---

## SolarSystem

**Custom Parameters:**
```jsx
<SolarSystem
  // Positioning
  top="0"

  // Customization
  sunSize={5.0}                   // Sun radius
  planetSpeedMultiplier={1.0}    // Speed multiplier for all planets
  starCount={9000}                // Background stars count
  asteroidCount={1900}            // Asteroid belt particle count
  kuiperCount={9000}              // Kuiper belt particle count
  showOrbits={true}               // Show orbital paths
  showTrails={true}               // Show planet trails
  initialDistance={280}           // Initial camera distance
  autoRotate={true}               // Enable scene rotation
/>
```

---

## EarthMoonSatellite

**Custom Parameters:**
```jsx
<EarthMoonSatellite
  // Positioning
  bottom="0"
  right="0"

  // Customization
  earthSize={0.6}                 // Earth radius
  moonSize={0.09}                 // Moon radius
  moonDistance={0.9}              // Moon orbit distance
  moonOrbitSpeed={0.02}           // Moon rotation speed
  satelliteCount={60}             // Number of satellites
  satelliteSpeed={0.0015}         // Satellite orbit speed
  satelliteOrbitRadius={0.72}     // Satellite orbit radius
  starCount={8000}                // Background stars
  earthRotationSpeed={0.0005}     // Earth rotation speed
  autoRotate={true}               // Enable auto-rotation
/>
```

---

## EarthWithTower

**Custom Parameters:**
```jsx
<EarthWithTower
  // Positioning
  left="50%"
  top="50%"

  // Customization
  earthSize={0.6}                 // Earth radius
  towerCount={41}                 // Number of communication towers
  starCount={3000}                // Background stars
  signalSpeed={0.012}             // Signal beam animation speed
  signalTrailLength={30}          // Signal trail segments
  beamColors={[0x00ffcc, 0xff9900]}  // Signal beam colors (hex array)
  earthRotationSpeed={0.001}      // Earth rotation speed
  showTowers={true}               // Show/hide towers
  showSignals={true}              // Show/hide signal beams
  autoRotate={true}               // Enable auto-rotation
/>
```

---

## EarthAndSatellite

**Custom Parameters:**
```jsx
<EarthAndSatellite
  // Positioning
  className="custom-globe"

  // Customization
  earthSize={0.6}                 // Earth radius
  satelliteCount={30}             // Number of satellites
  satelliteSpeed={0.0015}         // Satellite orbit speed
  satelliteOrbitRadius={0.72}     // Satellite orbit radius
  beamFrequency={0.03}            // Data beam spawn frequency (0-1)
  beamColor={0x10b981}            // Data beam color (hex)
  beamFadeSpeed={0.02}            // Beam fade out speed
  starCount={3000}                // Background stars
  earthRotationSpeed={0.001}      // Earth rotation speed
  autoRotate={true}               // Enable auto-rotation
/>
```

---

## Usage Examples

### Example 1: Overlay Globe in Corner
```jsx
<EarthAndMoon
  top="20px"
  right="20px"
  className="w-96 h-96"
  earthSize={0.4}
  starCount={5000}
/>
```

### Example 2: Slow Motion Solar System
```jsx
<SolarSystem
  planetSpeedMultiplier={0.5}
  showTrails={true}
  asteroidCount={3000}
  style={{ opacity: 0.9 }}
/>
```

### Example 3: High Activity Satellite Network
```jsx
<EarthMoonSatellite
  satelliteCount={100}
  satelliteSpeed={0.003}
  starCount={10000}
  earthRotationSpeed={0.002}
/>
```

### Example 4: Minimal Tower View
```jsx
<EarthWithTower
  towerCount={20}
  starCount={1000}
  signalSpeed={0.02}
  beamColors={[0x00ffff]}
  autoRotate={false}
/>
```

---

## Notes

- All color values use hexadecimal format (e.g., `0xff0000` for red)
- Speed values are incremental per frame (typically 0.001 - 0.02 range)
- Counts affect performance - lower for mobile devices
- CDN loading ensures consistent rendering quality
- Models and styling remain unchanged from original
