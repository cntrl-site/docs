---
sidebar_position: 70
slug: /overriding-sections
---

# Overriding sections

It often happens that the hand-coded content has dynamic height.  
In these cases a custom component wouldn't solve the problem -  
it is absolutely positioned and does not push the below content  
further down. In these cases, overrided sections come into play.

# How to override a section
###
```tsx title=pages/_app.tsx
import { customSections } from '@cntrl-site/sdk-nextjs';

customSections.define('custom-section', {
  component: MyCustomSection,
  dataResolver: async () => ({ your: 'CMS data here' })
});
```
