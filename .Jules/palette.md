## 2025-04-10 - Add aria-labels to Social Links and Voice Input Button
**Learning:** Found several icon-only links and buttons lacking accessible names, which made them difficult to use for screen readers. Added `aria-label` and `title` attributes for improved accessibility, ensuring the interactive components state changes are accurately announced.
**Action:** Always include aria-label or accessible text for icon-only buttons and links. Make sure dynamic states update their aria-label values accordingly.
