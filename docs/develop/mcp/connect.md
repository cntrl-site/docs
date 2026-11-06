---
sidebar_position: 2
slug: /mcp/connect
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Connect your assistant

Control's MCP server is a remote server: there's nothing to install. Every assistant connects to the same address and signs in with your Control account.

- **Server URL:** `https://app.cntrl.site/mcp`
- **Transport:** Streamable HTTP
- **Sign-in:** OAuth, on the Control sign-in page. No API key needed.
- **You need:** a Control account that can edit the project, and an assistant that supports remote MCP servers.

The first time your assistant uses Control, it opens the Control sign-in page. Sign in and approve access. From then on, the assistant acts as you.

<Tabs groupId="mcp-client">
<TabItem value="claude" label="Claude" default>

In Claude on the web or in the desktop app:

1. Open **Connectors** in Claude's settings and choose **Add custom connector**.
2. Name it `Control` and paste `https://app.cntrl.site/mcp` as the URL. If Claude asks how to sign in, choose **Register automatically**.
3. Choose **Connect** and sign in with your Control account.
4. In a chat, check that Control is turned on in the tools menu.

Custom connectors are available on every Claude plan; the free plan allows one. On Team and Enterprise plans, an owner adds the connector in the organization's settings first, then each member connects with their own Control account. See Anthropic's guide to [custom connectors](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp).

</TabItem>
<TabItem value="claude-code" label="Claude Code">

Run:

```bash
claude mcp add --transport http cntrl https://app.cntrl.site/mcp
```

Then run `/mcp` inside Claude Code, choose `cntrl` and sign in.

The server is added for the current folder. Add `--scope user` to use it in every folder, or `--scope project` to share it with your team through the project's `.mcp.json`.

</TabItem>
<TabItem value="chatgpt" label="ChatGPT">

1. Open **Plugins**, choose **+**, then **Add custom MCP server**.
2. Name it `Control`, paste `https://app.cntrl.site/mcp` as the URL, and choose **OAuth** for authentication.
3. Accept the risk acknowledgement and create it, then sign in with your Control account.
4. In a chat, add Control from the tools menu.

ChatGPT allows tools that change content, which most of Control's are, on Business, Enterprise and Edu plans, on the web. On those plans an admin or owner creates and publishes the server for the workspace. See OpenAI's guide to [custom MCP servers in ChatGPT](https://help.openai.com/en/articles/12584461).

</TabItem>
<TabItem value="cursor" label="Cursor">

Add Control to `~/.cursor/mcp.json` to use it everywhere, or to `.cursor/mcp.json` in a project:

```json
{
  "mcpServers": {
    "cntrl": {
      "url": "https://app.cntrl.site/mcp"
    }
  }
}
```

Then open **Cursor Settings → MCP**, choose **Connect** next to `cntrl`, and sign in.

</TabItem>
<TabItem value="vscode" label="VS Code">

Run **MCP: Add Server** from the Command Palette, choose **HTTP**, and enter `https://app.cntrl.site/mcp`. Or add it to an `mcp.json` file yourself:

```json
{
  "servers": {
    "cntrl": {
      "type": "http",
      "url": "https://app.cntrl.site/mcp"
    }
  }
}
```

Start the server and sign in when VS Code asks. Control's tools are then available to Copilot in agent mode. In Copilot Business and Enterprise organizations, an admin must allow MCP servers first.

</TabItem>
</Tabs>

## Other clients

Most assistants that support remote MCP servers take the server URL directly. Look for "custom connector", "remote MCP server" or "add MCP server" in their settings. For example, in the OpenAI Codex CLI:

```bash
codex mcp add cntrl --url https://app.cntrl.site/mcp
```

If your client only runs local servers, connect through [`mcp-remote`](https://github.com/geelen/mcp-remote), which runs on your computer and handles the sign-in. It needs Node.js 18 or later.

```json
{
  "mcpServers": {
    "cntrl": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://app.cntrl.site/mcp", "--transport", "http-only"]
    }
  }
}
```

`mcp-remote` keeps your sign-in in `~/.mcp-auth`. Delete that folder to sign in again from scratch.

## Check that it works

Ask your assistant: *"List my Control projects."* It should answer with your projects and their site addresses. If it doesn't, see [Troubleshooting](./troubleshooting.md#connecting).

## For developers

Building your own client, or testing the server with the [MCP Inspector](https://github.com/modelcontextprotocol/inspector):

- **Endpoint:** `POST https://app.cntrl.site/mcp`. The server is stateless: there are no sessions and no event stream, so `GET` and `DELETE` answer `405`. Responses are JSON.
- **Authorization:** a request without a token gets `401` with a `WWW-Authenticate` header that points to the protected-resource metadata at `https://app.cntrl.site/.well-known/oauth-protected-resource/mcp` ([RFC 9728](https://datatracker.ietf.org/doc/html/rfc9728)). That names the authorization server, `https://auth.cntrl.site/`, which supports dynamic client registration and the authorization code flow with PKCE.
- **Requests:** send the access token as `Authorization: Bearer <token>`. Request bodies are limited to 4 MB.
- **Tools:** 18, listed in the [tools reference](./tools.md). Each declares `readOnlyHint` or `destructiveHint` annotations. A refused call returns a tool result with `isError: true` and a message saying what to do instead.
- **Rate limits:** 120 requests a minute per user. Past that, the server answers `429` with `Retry-After: 60`.

```bash
npx @modelcontextprotocol/inspector
```

In the Inspector, choose **Streamable HTTP**, enter the server URL and connect. It runs the sign-in for you.
