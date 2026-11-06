---
sidebar_position: 1
slug: /mcp
sidebar_label: Overview
pagination_next: develop/mcp/connect
---

# AI assistants (MCP)

Connect Claude, ChatGPT, Cursor or another AI assistant to Control, and it can work on your site's content for you. Hand it a document, a few links or a folder of photos and it writes posts in your collections, edits the ones you have, and publishes your site when you say so.

It works through the [Model Context Protocol](https://modelcontextprotocol.io) (MCP), an open standard for connecting AI assistants to apps. Add this address to your assistant as a custom connector, or remote MCP server:

```
https://app.cntrl.site/mcp
```

Then sign in with your Control account. There's no API key to create. See [Connect your assistant](./connect.md) for step-by-step instructions for each app.

## What you can do

- **Write posts from anything:** a draft, notes, a transcript, a press release. The assistant writes the post in your collection's styles, with a title, subtitle, date and key image where the collection shows them.
- **Add images:** from public links, or from your own device through a [secure upload link](./posts-and-images.md#your-own-files). Images that belong together become one gallery, laid out the way the editor would.
- **Edit what's there:** reword a paragraph, add or remove blocks, swap a key image, change a gallery's caption, set a post to draft, change its address.
- **Start a collection:** describe what you publish, such as a journal, case studies or a changelog, and the assistant creates the collection and its first post.
- **Review your content:** ask for a summary of a collection, posts without alt text, or titles that need fixing.
- **Publish:** when you ask, the assistant publishes your site and tells you when it's live.

## How it works

- **It acts as you.** The assistant signs in with your Control account and can only see and change the projects you can edit.
- **It works in the editor.** Everything it does appears in the Control editor, as if you'd done it there, and you can keep editing as usual. Your live site doesn't change until the website is published.
- **Publishing is your call.** Assistants are told to offer to publish when they finish, and to publish only when you ask. Publishing takes every unpublished change in the project live, including yours.

## Try it

Once connected, ask in plain language. Mention the site by its address if the project has no name.

- *"Add a post to the Journal collection on studio-example.com from this text, with today's date."*
- *"Here are links to six photos from the shoot. Make a post called 'Lisbon, March' with them as one gallery."*
- *"I want to add some photos from my phone to the 'Lisbon, March' post."* (The assistant gives you an upload link.)
- *"List the posts in Case studies and tell me which have no key image."*
- *"In the 'Spring lookbook' post, rewrite the second paragraph to be shorter."*
- *"Set the 'Summer sale' post to draft."*
- *"Create a Changelog collection where every post shows a date, and add the first entry from these release notes."*
- *"Publish my site and tell me when it's live."*

## What it can't do

The server works with posts in collections. It can't change project settings, domains, plans or team members. It can't edit pages outside collections, a collection's template once it's created, or code, table and video blocks. Make those changes in the editor.

## Next steps

- [Connect your assistant](./connect.md)
- [Tools reference](./tools.md): all 18 tools, their parameters and what they return
- [Writing posts and adding images](./posts-and-images.md)
- [Security and limits](./security.md)
- [Troubleshooting and FAQ](./troubleshooting.md)
