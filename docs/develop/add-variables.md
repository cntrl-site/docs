---
sidebar_position: 30
slug: /add-variables
---

# Adding custom env variables

Control allows to pass-through any environment variables that  
will be accessible in your code at build time.

To add custom environment variables, navigate to the "Development"  
tab from your Project Dashboard and click "Add new variable".  
The next time the project gets built, it will use them along with  
any built-in variables.

## Built-in variables

Control sets a couple of variables for you automatically:

- `CNTRL_API_URL` — the API endpoint used to fetch your project's  
content at build time. Always set.
- `SITE_URL` — optional override for the canonical site origin used  
in `sitemap.xml`, `robots.txt`, and `<link rel="canonical">` tags.  
See [SEO](/seo) for details.
- `SITEMAP_EXTRA_PATHS` — optional comma-separated path slugs to  
include in `sitemap.xml` alongside Control pages (e.g.  
`templates,tutorials`). Useful for custom-coded routes that aren't  
Control pages. See [SEO](/seo) for details.
