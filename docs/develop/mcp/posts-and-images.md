---
sidebar_position: 4
slug: /mcp/posts-and-images
---

# Writing posts and adding images

Your assistant writes posts in a simple shape: a header, then a body of blocks. This page describes that shape, so you know what an assistant can and can't put in a post. You don't need it to use the server.

## How a post is built

A post in a collection is a **header** and a **body**:

- **Header:** the title, and optionally a subtitle, a date and a key image.
- **Body:** the ordered blocks under the header, such as text in the collection's styles, quotes, images and galleries, and dates.

Here's a complete [`create_post`](./tools.md#create_post) call:

```json
{
  "projectId": "01H6NM3V8BNG64VPVG9TR14MET",
  "collectionId": "01J2Q9X3RZ8K4M6N7P1S2T3V4W",
  "title": "Spring lookbook",
  "subtitle": "Twelve pieces, shot in Lisbon",
  "date": { "date": "2026-03-21" },
  "keyImage": {
    "sourceUrl": "https://images.example.com/lookbook/cover.jpg",
    "altText": "A model on a tiled staircase"
  },
  "body": [
    { "type": "text", "preset": "lead", "text": "We spent three days in Lisbon with the new collection." },
    { "type": "text", "preset": "heading", "text": "The light" },
    { "type": "text", "preset": "body", "text": "Most of it was shot before nine.\n\nThe rest at dusk." },
    {
      "type": "image",
      "sourceUrls": [
        "https://images.example.com/lookbook/01.jpg",
        "https://images.example.com/lookbook/02.jpg",
        "https://images.example.com/lookbook/03.jpg"
      ],
      "caption": "Alfama, 7 a.m."
    },
    { "type": "quote", "text": "Clothes for walking up hills." }
  ]
}
```

## The header

| Field | Description |
|---|---|
| `title` | Required, up to 200 characters. Shown in the header and used as the page title. |
| `subtitle` | Shown under the title. |
| `date` | The date the header shows. See [Dates](#dates). |
| `keyImage` | `{ sourceUrl, altText?, caption? }`, the header's picture. |

A subtitle or key image you leave out is hidden rather than shown empty. A post without a key image uses the text-only version of the header. So an assistant passes only what it really has.

## Blocks

The body is a list of up to 100 blocks, top to bottom. There are four kinds:

| Block | Shape | Notes |
|---|---|---|
| Text | `{ "type": "text", "preset": "body", "text": "…" }` | `preset` is one of the collection's text styles. A blank line in `text` starts a new paragraph. |
| Quote | `{ "type": "quote", "text": "…" }` | Set apart in the collection's quote style. |
| Image | `{ "type": "image", "sourceUrls": ["https://…"], "altText": "…", "caption": "…" }` | One image, or a gallery of up to 10. See [Galleries](#galleries). |
| Date | `{ "type": "date", "date": "2026-03-21", "format": "D MMMM YYYY" }` | Both fields optional. See [Dates](#dates). |

Tools can't create code, table or video blocks. They can read them in existing posts, and you add or edit them in the editor.

### Text presets

A text block's `preset` is one of the collection's text styles. [`get_collection_content_types`](./tools.md#get_collection_content_types) lists the ones a collection offers. A new collection starts with the defaults: `title`, `subtitle`, `heading`, `subheading`, `lead`, `body`, `caption` and `footnote`.

Each block takes the styling of the matching block in the collection's template, so a post written by an assistant looks like one made in the editor.

### Galleries

One image block is one gallery. Its images sit side by side under one caption and one alt text, in the order given. Control lays them out the way the editor does when you drop the same files in, starting a new row when one is full.

Several images that belong together therefore go in one block. Give an image a block of its own only when it stands alone or has its own caption. Separate blocks stack full width down the page.

### Dates

A date appears in the header (`date`) or in the body (a date block), as `{ date?, format? }`:

- `date` is a calendar date, `YYYY-MM-DD`. Leave it out to show the day the post is created.
- `format` is one of `D MMM YYYY` (the default), `MMMM D, YYYY`, `D MMMM YYYY`, `DD.MM.YYYY`, `YYYY-MM-DD` and `MM/DD/YYYY`.

When a collection shows a date in its header, every post of it shows one, whether or not the assistant passes it. Assistants are told to use the date in your content when it has one, such as an article's publication date or an event's day.

## Templates aren't forms

A collection's template sets the styles its posts are written in, but its posts don't have to copy its structure. Some templates are a layout every post follows. Others are just one of every element, kept together so you can restyle them in one place.

So an assistant writes the post your content calls for: any of the blocks and styles the collection offers, any number of each, in the order the content reads. The template's text, quote and image blocks that the post doesn't use are dropped.

Design blocks in the template, such as dividers, components, videos and a date in the body, are copied into every post. When a template is a sheet of elements rather than a layout, an assistant can read the new post back and remove the ones that don't belong, asking you when it isn't sure.

## Images

Images reach Control in one of two ways.

### Public links

Any image at a public `https` address can go straight into a post. Control downloads it and stores its own copy, so the post doesn't depend on the original link staying up.

- **Formats:** JPEG, PNG, WebP, AVIF or GIF, up to 20 MB.
- **Not accepted:** SVG, and addresses that need a login or only work on a private network.

Assistants are told never to make up an image address. If no real one exists, the image is left out.

### Your own files

For images on your computer or phone, the assistant creates an upload link with [`request_asset_upload`](./tools.md#request_asset_upload):

1. Ask your assistant to add your images. It gives you a link.
2. Open the link in any browser, on any device, and drop your images on the page.
3. Tell the assistant you're done. It checks what arrived and uses the images in the post.

An assistant that can run commands and read files, such as one in a code editor or terminal, can send the files to the link itself.

Each link works for 15 minutes and takes up to 10 images of up to 20 MB each, as JPEG, PNG, WebP, AVIF or GIF. Images uploaded this way are stored the same way as images you upload in the editor.

### Images attached in the chat

Many assistants can see an image you attach in a chat but have no file they can send on. When that's the case, the assistant tells you and offers a public link or an upload link instead. It can still describe the image and use what it sees for text, alt text and captions.

Where an assistant does have the attachment as a file, that file may be a resized or compressed copy of your original. The assistant says so when it uses one. Use the upload link if image quality matters.
