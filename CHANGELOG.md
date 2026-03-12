# Changelog

## [2.0.0] - 2026-03-12

### Changed
- Renamed package from `anchor-click` to `click-delegation`
- Renamed factory function from `anchorClick()` to `clickDelegation()`
- Renamed attributes: `data-anchor-target` → `data-delegate`, `data-anchor` → `data-delegate-to`, `data-anchor-ignore` → `data-delegate-ignore`
- Renamed `link` option to `target`
- Renamed TypeScript interfaces: `AnchorClickOptions` → `ClickDelegationOptions`, `AnchorClickInstance` → `ClickDelegationInstance`

### Added
- Support for buttons and custom elements as delegation targets — not just anchor links
- Ctrl/Meta+click and middle-click fall back to `click()` when target has no `href`

### Refactored
- Extracted `resolveTarget()`, `shouldIgnoreElement()` and `getClosest()` as named helper functions
- Replaced `down` timestamp with `activePress` object tracking time, pointerId and item — prevents drag-from-A-release-on-B triggers
- `getClosest()` guards against missing `.closest()` on non-element targets

## [1.0.1] - 2026-03-06

### Changed
- Modernised library source and build script to ES2015+ syntax (const/let, arrow functions, template literals)

### Added
- Demo: floating log panel (fixed bottom-right, shows navigation events and interactions)

### Docs
- Clarified that the `onClick` callback fires before navigation and cannot cancel it
- Documented that keyboard users navigate via the inner `<a>` directly

## [1.0.0] - 2026-03-05

### Added

- Make entire elements clickable by delegating pointer events to a clickable element within
- Configurable via options: `parent`, `target`, `ignore`, `clickableClass`, `downUpTime`, `onClick`
- Named target support — use matching attribute values to target a specific element in multi-target items
- `data-delegate-ignore` attribute to exclude child elements from triggering a click
- Buttons, inputs and anchor tags are always ignored as click sources automatically
- Ctrl/Meta+click and middle-click open anchor targets in a new tab (`noopener,noreferrer`)
- MutationObserver for dynamically added items and attribute changes
- `destroy()` method to remove all event listeners and clean up classes
- UMD build — works as AMD module, CommonJS module, or global script tag
- Safe to include in `<head>` — initialization is deferred to `DOMContentLoaded` if needed
- TypeScript types included
