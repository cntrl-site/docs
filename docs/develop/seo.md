---
sidebar_position: 150
slug: /seo
---

# SEO

Every published Control site ships with the basics search  
engines need to discover and rank your pages: a `sitemap.xml`,  
a `robots.txt`, and a `<link rel="canonical">` tag on every page.  
There's nothing to wire up — it all happens at build time using  
data already in your project.

## What you get out of the box

- `https://your-domain.com/sitemap.xml` — lists every published  
page in your project with the latest `lastmod` timestamp.
- `https://your-domain.com/robots.txt` — declares the sitemap  
location and allows all crawlers by default.
- `<link rel="canonical">` and `<meta property="og:url">` on  
every rendered page, pointing at the canonical URL.

The sitemap and robots files are regenerated on every `npm run build`  
via a `prebuild` step. The canonical tags are emitted by the SDK  
during static export.

## How the canonical URL is resolved

Control resolves the canonical site origin in this order:

1. The `SITE_URL` environment variable, if set.
2. The primary domain configured for your project in the CMS  
(`Project Dashboard -> Domains`). This is the domain marked  
as primary in your website settings.
3. If neither is available (e.g. the site has not been published  
yet), the canonical tag and sitemap generation are skipped  
silently and the build continues.

In most cases you don't need to do anything — once your site has a  
primary domain, the right URL is used automatically.

## Overriding with `SITE_URL`

Add a `SITE_URL` environment variable to override the API-discovered domain:

```
SITE_URL=https://example.com
```

`SITE_URL` controls both the sitemap entries and the canonical tags,  
so they stay in sync. Set it when you want to:

- Test SEO output against a staging domain before pointing DNS.
- Use a domain that isn't (yet) registered as primary in the CMS.
- Override the primary domain for any other reason.

When unset, the API-discovered primary domain is used.

You can add this variable from your Project Dashboard. See  
[Adding custom env variables](/add-variables) for details.

## What gets included in the sitemap

The generated sitemap contains every page in your project, except:

- Pages that were set as drafts.
- Pages with password protection enabled.

## Adding custom-coded pages

If your repo has routes that aren't Control pages (for example a  
custom Next.js page at `/templates`), they won't appear in the  
sitemap automatically. Include them with the `--extra` flag on  
the `generate-sitemap` script in `package.json`:

```
"generate-sitemap": "cntrl-sdk generate-sitemap -o public --extra templates,tutorials"
```

You can also set a `SITEMAP_EXTRA_PATHS` environment variable  
instead of (or in addition to) the flag:

```
SITEMAP_EXTRA_PATHS=templates,tutorials
```

Paths are comma-separated slugs without a leading slash. They are  
merged with Control pages and deduplicated. Unlike Control pages,  
extra paths are always included — they aren't filtered by draft  
or password-protection status.

You can add `SITEMAP_EXTRA_PATHS` from your Project Dashboard. See  
[Adding custom env variables](/add-variables) for details.

## Verifying it works

Once deployed, you can verify:

- Open `https://your-domain.com/sitemap.xml` — you should see  
your pages listed.
- Open `https://your-domain.com/robots.txt` — should declare your  
sitemap URL.
- View the page source on any published page — look for  
`<link rel="canonical">` in the `<head>`.

## Submitting to search engines

Once the sitemap is live, submit it to:

- [Google Search Console](https://search.google.com/search-console)  
— add your property, then submit `https://your-domain.com/sitemap.xml`.
- [Bing Webmaster Tools](https://www.bing.com/webmasters)  
— same flow.

Both tools will start crawling and indexing your pages within a few  
days, and surface useful diagnostics about which pages were indexed,  
which were skipped, and why.
