---
sidebar_position: 3
slug: /mcp/tools
toc_max_heading_level: 3
---

# Tools reference

The Control MCP server has 18 tools. Your assistant chooses which to call from your request, so you don't normally name them. This page is for checking what an assistant can do, reading what it did, or building your own client.

Every tool runs as the signed-in user, inside the projects that user can edit. Each one tells your client what kind of action it is, so the client can let reads through and ask you before changes:

| Kind | Meaning |
|---|---|
| **Read** | Only reads. Changes nothing. |
| **Adds** | Creates something new and leaves existing content alone. |
| **Changes** | Overwrites or removes something that already exists. |

## All tools

| Tool | What it does | Kind |
|---|---|---|
| [`list_projects`](#list_projects) | Lists the projects you can edit, with their site address and collections. | Read |
| [`list_collections`](#list_collections) | Lists a project's collections. | Read |
| [`get_collection_content_types`](#get_collection_content_types) | Describes what a post of a collection can hold. | Read |
| [`list_posts`](#list_posts) | Lists a collection's posts, newest first. | Read |
| [`get_post_content`](#get_post_content) | Reads one post: header, body blocks and status. | Read |
| [`create_post`](#create_post) | Creates a post in a collection, in one call. | Adds |
| [`create_collection`](#create_collection) | Creates a collection and its template, optionally with a first post. | Adds |
| [`add_post_blocks`](#add_post_blocks) | Adds blocks to a post's body at a chosen position. | Adds |
| [`update_text_block`](#update_text_block) | Rewords a text or quote block. | Changes |
| [`update_image_block`](#update_image_block) | Changes the images, alt text or caption of an image block or gallery. | Changes |
| [`delete_post_blocks`](#delete_post_blocks) | Deletes blocks from a post's body. | Changes |
| [`update_post`](#update_post) | Changes a post's title, subtitle, date or key image. | Changes |
| [`update_post_settings`](#update_post_settings) | Changes a post's slug, or whether the website includes it. | Changes |
| [`delete_post`](#delete_post) | Deletes a whole post. | Changes |
| [`request_asset_upload`](#request_asset_upload) | Creates a short-lived link for uploading your own images. | Adds |
| [`check_asset_upload`](#check_asset_upload) | Lists the images that reached an upload link. | Read |
| [`publish_website`](#publish_website) | Publishes the project's website. | Changes |
| [`get_publish_status`](#get_publish_status) | Tells whether the latest publish has reached the site. | Read |

:::info Everything works on the editor's version
Creating, editing and deleting change what you see in the Control editor, exactly as if you'd done it there. None of it reaches your live site until the website is published, either from the editor or with [`publish_website`](#publish_website) when you ask for it.
:::

Every tool answers with JSON. When a tool refuses a request (a slug that's taken, a block that's locked, a project you can't access), the answer says why and what to do instead, so your assistant can correct itself or tell you.

---

## Projects and collections

### list_projects

**Read.** Lists the projects you can edit. Many projects have no title, so each one also comes with its site address and domains. "My portfolio at example.com" is enough for your assistant to find the right one.

**Parameters:** none.

**Returns** a list of projects:

| Field | Description |
|---|---|
| `id` | The project's id, which every other tool takes as `projectId`. |
| `title` | The project's title. Often empty. |
| `description` | The project's description. |
| `url` | The site's main address, e.g. `https://example.com`. |
| `domains` | The site's active domains, or its `*.cntrl.site` address if it has none. |
| `pagesCount` | How many pages the project has. |
| `collections` | The project's collections, as `{ id, name }`. |

### list_collections

**Read.** Lists a project's collections. A collection is a family of posts that share one template, such as a blog, a set of case studies or a changelog.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectId` | string | Yes | The project, from `list_projects`. |

**Returns** a list of `{ id, name }`.

### get_collection_content_types

**Read.** Describes what a post of the collection can hold. Assistants call it before creating a post.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectId` | string | Yes | The project. |
| `collectionId` | string | Yes | The collection, from `list_collections`. |

**Returns:**

| Field | Description |
|---|---|
| `header` | Which header elements the collection's posts show: `title` (always), `subtitle`, `keyImage`, and `date` with its format when posts show one. Missing when the template has no header. |
| `presets` | The text preset ids the body can use, such as `heading`, `body` or `caption`. |
| `body` | The blocks in the template, in order. Each is `text` (with its `preset`), `quote`, `image`, `date` (with its `format`) or `other` (design blocks such as dividers, components and videos). Content blocks carry a `key`, the name a page component (for example a grid of posts) uses to show that field. |

The body is a list of what's available, not an outline to follow. See [Templates aren't forms](./posts-and-images.md#templates-arent-forms).

---

## Reading posts

### list_posts

**Read.** Lists a collection's posts, newest first.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectId` | string | Yes | The project. |
| `collectionId` | string | Yes | The collection. |

**Returns** a list of `{ id, title, slug }`. `title` is the name the dashboard lists the post by. Pass `id` as `postId` to the other post tools.

### get_post_content

**Read.** Reads one post in the same shape [`create_post`](#create_post) takes, with an id on every body block so the post can be edited. It reads the editor's version, so it can include changes that aren't live yet. It reads the post as a visitor on your largest layout would see it: hidden and empty content is left out.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectId` | string | Yes | The project. |
| `postId` | string | Yes | The post's id from `list_posts`. |

**Returns:**

| Field | Description |
|---|---|
| `id`, `slug` | The post's id and address. |
| `title` | The title its header shows. |
| `pageTitle` | The title the dashboard lists it by, which can differ. |
| `status` | `live` if the website includes the post, `draft` if it leaves it out. |
| `subtitle`, `date`, `keyImage` | The header elements it shows. `date` is `{ date, format }`. `keyImage` is `{ url, altText, caption }`. |
| `body` | The body blocks, top to bottom, each with an `id`: `text` (`preset`, `text`), `quote`, `image` (`urls`, `altText`, `caption`), `date`, `video`, `code` (`code`, `language`) and `table` (`header`, `rows`). Design blocks come as `other` with their `blockType`. |
| `elements` | Text, images and videos placed freely on the post rather than in its body, top to bottom. |

Text comes as plain text, without formatting or links.

---

## Creating

### create_post

**Adds.** Creates one post in a collection, header and body, in a single call. The post reads in the order you give its blocks. Each block takes the styling of a matching block in the template where there's one free, and is added new where there isn't.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectId` | string | Yes | The project. |
| `collectionId` | string | Yes | The collection. |
| `title` | string | Yes | The post's title, up to 200 characters. Shown in its header and used as its page title. |
| `subtitle` | string | No | Shown under the title. Leave it out and the header hides it. |
| `date` | object | No | `{ date?, format? }`. `{}` shows the day the post is created; `date` is `YYYY-MM-DD`. See [Dates](./posts-and-images.md#dates). |
| `keyImage` | object | No | `{ sourceUrl, altText?, caption? }`, the header's picture. Leave it out and the header uses its text-only layout. |
| `body` | Block[] | Yes | The blocks under the header, top to bottom. Pass `[]` for a post that's only its header. See [Blocks](./posts-and-images.md#blocks). |
| `slug` | string | No | The post's address, lowercase words joined by hyphens. Leave it out to generate one; you can rename it in the editor. |

The template's text, quote and image blocks that the post doesn't use are removed. Its design blocks (dividers, components, videos, a date in the body) stay, and [`delete_post_blocks`](#delete_post_blocks) can remove them.

**Returns** `{ pageId, articleId, slug }`. `pageId` is the post's id for the other post tools.

### create_collection

**Adds.** Creates a collection, with a template written in the same shape as a post. Every future post of the collection starts from this template, so assistants are told to add posts to an existing collection whenever one fits.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectId` | string | Yes | The project. |
| `name` | string | Yes | The collection's name, up to 120 characters. |
| `template` | object | Yes | The header elements and body every post starts from, shaped like `create_post`'s fields (`title` optional). A `subtitle` or `keyImage` given here is shown with placeholder content; one left out is hidden. A `date` here gives every post a date. Text blocks use the default presets: `title`, `subtitle`, `heading`, `subheading`, `lead`, `body`, `caption`, `footnote`. |
| `firstPost` | object | No | A first post to create in the same call, shaped like `create_post`'s fields, `slug` included. |

**Returns** `{ collectionId, templateArticleId }`, plus `firstPost` when one was created. If the first post's slug is taken, or it uses a preset outside the defaults, nothing is created.

### add_post_blocks

**Adds.** Adds blocks to an existing post's body and leaves the rest as it is. It takes text, quote, image and date blocks, but not code, table or video blocks.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectId` | string | Yes | The project. |
| `postId` | string | Yes | The post. |
| `blocks` | Block[] | Yes | The blocks to add, in reading order, as in `create_post`'s `body`. |
| `index` | integer | No | The position in the body, counted as `get_post_content` shows it. The new blocks go before the block now at that position; `0` is the top. Leave it out to add them at the bottom. |

To add images to a gallery that's already in the post, use [`update_image_block`](#update_image_block).

**Returns** the post as it now stands, in the shape of [`get_post_content`](#get_post_content).

---

## Editing

### update_text_block

**Changes.** Rewords a text or quote block. The block keeps its place, preset and block styling.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectId` | string | Yes | The project. |
| `postId` | string | Yes | The post. |
| `blockId` | string | Yes | The block's id from `get_post_content`. |
| `text` | string | Yes | The block's whole new text, plain. Separate paragraphs with a blank line. |

:::caution
Links and formatting set on individual words (bold, a color, a different font) are lost when a block is reworded. Assistants are told to warn you. Make the change in the editor if you need to keep them.
:::

**Returns** the post as it now stands.

### update_image_block

**Changes.** Changes the images, alt text or caption of an image block or gallery. Only what you name changes; the block keeps its place and styling.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectId` | string | Yes | The project. |
| `postId` | string | Yes | The post. |
| `blockId` | string | Yes | The image block's id from `get_post_content`. |
| `sourceUrls` | string[] | No | The images the block should hold, in order, up to 10: existing URLs from `get_post_content`, URLs from an upload link, or public `https` images. To add one image, pass the current list with the new one where it belongs. An image left out is removed. |
| `altText` | string | No | The alt text the block's images share. |
| `caption` | string | No | The caption they share. An empty string clears it. |

More images than fit one row continue in new image blocks right under this one, as they would in a new post.

**Returns** the post as it now stands.

### delete_post_blocks

**Changes.** Deletes blocks from a post's body, design blocks included. It's all or nothing: if one id isn't in the body, or a block is locked in the editor, nothing is deleted.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectId` | string | Yes | The project. |
| `postId` | string | Yes | The post. |
| `blockIds` | string[] | Yes | The ids of the blocks to delete, from `get_post_content`. |

The header (title, subtitle, date, key image) can't be deleted this way; use [`update_post`](#update_post). Code, table, video and design blocks can't be added back by any tool, so assistants delete them only when you ask.

**Returns** the post as it now stands.

### update_post

**Changes.** Changes a post's header. Only what you name changes; the body isn't touched.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectId` | string | Yes | The project. |
| `postId` | string | Yes | The post. |
| `title` | string | No | The title in the header, also used as the page title. |
| `subtitle` | string or `null` | No | Sets the subtitle and shows it. `null` clears and hides it. |
| `date` | object | No | `{ date?, format? }`. A date the collection hides stays hidden. |
| `keyImage` | object or `null` | No | `{ sourceUrl, altText?, caption? }` sets the key image and shows it. `null` clears and hides it. |

A subtitle or key image you hid on some layouts in the editor stays hidden there.

**Returns** the post as it now stands.

### update_post_settings

**Changes.** Changes a post's address, or whether the website includes it.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectId` | string | Yes | The project. |
| `postId` | string | Yes | The post. |
| `slug` | string | No | The post's new address. Once published, links to the old address stop working. Refused if another page of the project already uses it. |
| `status` | `live` or `draft` | No | `draft` leaves the post off the website and `live` includes it, like **Draft** and **Set Live** in the editor. New posts are `live`. |

Both take effect on the site the next time it's published.

**Returns** `{ id, title, slug, status }`.

### delete_post

**Changes.** Deletes a whole post. Assistants are told to delete a post only when you ask, and to name it back to you first unless you named it exactly.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectId` | string | Yes | The project. |
| `postId` | string | Yes | The post. |

A post that was published stays on the live site until the next publish. Until then, **Revert** in the dashboard can bring it back, but it also undoes every other unpublished change. A post that was never published can't be brought back.

**Returns** `{ id, title, slug }` of the deleted post.

---

## Images

See [Adding images](./posts-and-images.md#images) for how the two ways of adding images work.

### request_asset_upload

**Adds.** Creates a short-lived upload link for images on your device or attached in the chat. It returns two addresses for the same link:

- `uploadUrl`, a page you open in any browser (your phone works too) and drop images onto.
- `fileUploadUrl`, for assistants that can run commands and read files. They send one file per request as a multipart `POST` with the file in a field named `file`.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectId` | string | Yes | The project the images are for. |

Links expire after 15 minutes and take up to 10 images of up to 20 MB each, as JPEG, PNG, WebP, AVIF or GIF.

**Returns** `{ ticketId, uploadUrl, fileUploadUrl, expiresAt, maxFiles }`.

### check_asset_upload

**Read.** Lists the images that have reached an upload link so far, by either route. Assistants call it after you say you're done.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ticketId` | string | Yes | The `ticketId` from `request_asset_upload`. |

**Returns** `{ status, assets, expiresAt }`. `status` is `pending` until at least one image arrives, then `uploaded`, or `expired` if the link expired empty. `assets` is a list of `{ url, name }`, and each `url` can go anywhere an image goes. Results stay readable for about a day after the link expires.

---

## Publishing

### publish_website

**Changes.** Publishes the project's website, like the **Publish** button. Every unpublished change in the project goes live, including changes you or your team made in the editor. Assistants are told to call it only when you ask or accept their offer to publish.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectId` | string | Yes | The project. |

**Returns** `{ status }`, and `webhookFailed: true` when the project's webhook couldn't be reached:

- `building`: Control is building the site, which still shows the old version until it finishes. Follow with [`get_publish_status`](#get_publish_status).
- `published`: the site runs on your own hosting, which picks the changes up itself. There's nothing to wait for.

Each call cancels a build that's still running and starts a new one. A project can be published at most 5 times a minute.

### get_publish_status

**Read.** Tells whether the latest publish has reached the site. While a build runs, it waits up to 20 seconds for it to finish before answering, so assistants can call it again straight away.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectId` | string | Yes | The project. |

**Returns** `{ status }`:

- `building`: still running. The site shows the old version.
- `published`: done. The changes are live.
- `failed`: the changes didn't reach the site, or that couldn't be confirmed. Check the build logs and rebuild from the dashboard.
- `none`: no recent publish to report.

A publish usually takes a few minutes, and longer the first time a site is published.
