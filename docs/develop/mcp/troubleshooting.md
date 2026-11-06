---
sidebar_position: 6
slug: /mcp/troubleshooting
---

# Troubleshooting and FAQ

## Connecting

**My assistant can't connect, or says it couldn't register with the sign-in service.**
Check that the address is exactly `https://app.cntrl.site/mcp`, then remove the connector and add it again. Your assistant needs to support remote MCP servers that sign in with OAuth. If yours only runs local servers, see [Other clients](./connect.md#other-clients).

**I'm connected, but my projects aren't there.**
You may have signed in with another Control account. Disconnect, then connect again and sign in with the account that owns or edits the project.

**A new tool, or a change to one, isn't showing up.**
Most assistants load the tool list when they connect. Start a new conversation, or disconnect and reconnect. ChatGPT keeps its own copy of the tool list, which a workspace admin refreshes in the server's settings.

**I want to sign in again, or with another account, through `mcp-remote`.**
Delete the `~/.mcp-auth` folder and reconnect.

**The answer is "No access to project".**
Your account can't edit that project, perhaps because you were removed from it. Ask your assistant to list your projects and pick one from there.

**The answer is "Too many requests".**
You've reached 120 requests in a minute. Wait a minute and try again.

## Content

**The assistant added dividers or other blocks I didn't ask for.**
Design blocks in a collection's template are copied into every post. Ask the assistant to remove them, or see [Templates aren't forms](./posts-and-images.md#templates-arent-forms).

**It refused a text style ("Unknown text preset").**
A text block can only use the collection's own styles. Ask the assistant to check the collection's content types and use one of those.

**Links and bold text disappeared from a paragraph.**
When an assistant rewords a text block, formatting and links on individual words are lost. Add them back in the editor, or make wording changes there when you need to keep them.

**It can't add a code block, a table or a video.**
Tools can't create these. Add them in the editor. Tools can read them and delete them, though they can't put them back once deleted.

**"Block is locked in the editor."**
Unlock the block in the editor, then try again.

**"The slug is already taken."**
Another page in the project uses that address. Choose a different one.

## Images

**An image didn't come through ("couldn't fetch", "unsupported image").**
Images from links must be at a public `https` address that works without signing in, and be JPEG, PNG, WebP, AVIF or GIF, up to 20 MB. SVG isn't accepted. For images that aren't online, ask for an [upload link](./posts-and-images.md#your-own-files).

**The assistant couldn't use the photo I attached in the chat.**
Many assistants see attachments but can't pass the file on. Ask for an upload link and drop the photo there, or share a public link to it.

**"This upload link is invalid or has expired."**
Links work for 15 minutes. Ask the assistant for a new one.

**"This upload link already holds its maximum of 10 files."**
Ask for another link for the rest of your images.

## Publishing

**My changes aren't on my site.**
Changes stay in the editor until the website is published. Ask the assistant to publish, or use **Publish** in the editor.

**The assistant says it's still building.**
A publish usually takes a few minutes, and longer the first time. The assistant can keep checking, or you can follow it in the dashboard.

**The publish failed.**
Open the build logs in the dashboard, then rebuild from there.

**"The site is locked (trial expired or subscription cancelled)."**
Publishing needs an active subscription. Check your plan in Control.

**"Another publish of it is starting", or "published too many times in the last minute".**
A project publishes one at a time, at most 5 times a minute. Wait a minute and check whether the last publish finished.

**"Its website is still being set up."**
A new site's first setup hasn't finished yet. Try again in a few minutes.

**The answer mentions `webhookFailed`.**
Your project's webhook couldn't be reached. If your site runs on your own hosting and relies on that webhook to rebuild, it won't pick up the changes until the webhook works.

## Errors

**"Something went wrong on Control's side and this may not have finished."**
Ask the assistant to read the post back to see what changed before trying again. If it keeps happening, tell us on [Discord](https://discord.gg/zHQMWUh68X).

## FAQ

**Which assistants work with Control?**
Any that can connect to a remote MCP server with OAuth sign-in, such as Claude, Claude Code, Cursor and VS Code. In ChatGPT, tools that change content need a Business, Enterprise or Edu plan. See [Connect your assistant](./connect.md).

**Does the assistant see changes I haven't published?**
Yes. It reads and writes the editor's version of your project, the same one you see when editing.

**Will my team see what the assistant does?**
Yes. Its changes appear in the editor like anyone else's, including for people who have it open.

**Can I keep editing while the assistant works?**
Yes. Its changes reach your open editor the way a teammate's do. Avoid editing the same block at the same moment, as with a teammate.

**Can it change my site's design?**
No. It writes content in the styles your collections already have. Design changes are made in the editor.

**Can I stop it from publishing?**
Assistants are told to publish only when you ask. To be sure, set your assistant to ask before it runs tools that change content. See [Approving actions](./security.md#approving-actions).

**What's the difference between a draft post and an unpublished change?**
A post's status, `live` or `draft`, decides whether the website includes the post at all. Publishing decides when any change, including a status change, reaches the live site. New posts are `live`, so they appear on your site at the next publish.
