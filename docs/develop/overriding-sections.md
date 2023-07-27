---
sidebar_position: 60
slug: /overriding-sections
---

# Overriding sections

###
```tsx title=pages/_app.tsx
import { customSections } from '@cntrl-site/sdk-nextjs';

customSections.define('custom-section', {
  component: MyCustomSection,
  dataResolver: async () => ({ your: 'CMS data here' })
});
```
