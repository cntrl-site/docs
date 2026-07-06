---
sidebar_position: 75
---

# Form integrations

Connect your forms to email notifications, email marketing platforms, and webhooks. Select an integration in the Form settings panel, enter your credentials, and you're ready to collect submissions.

After you've finished adding an integration, you can test your form by submitting a test email from your website, staging preview, or right in the editor.

---

## Webhook

Send raw form data to any URL.

**You will need:**
- A publicly accessible HTTPS endpoint

**Setup:**
1. Create or use an endpoint that accepts JSON `POST` requests (your own server, Zapier, Make, etc.).
2. In the integration panel, select Webhook and paste the URL.

**How data is sent:**
The form fields are sent as-is in a flat JSON body. Field names in the JSON body match the "Name" value you set for each field in the Form settings.

```json
{ "email": "jane@example.com", "name": "Jane" }
```

---

## Loops

Subscribe contacts to [Loops](https://loops.so).

**You will need:**
- API key

**Where to find it:**
1. Log in at [app.loops.so](https://app.loops.so).
2. Go to Settings > API, and generate a new API key or copy an existing one.

**How data is sent:**
All form fields are forwarded as contact properties. When a field name doesn't exist yet in Loops, a new property column is created automatically — so we recommend to keep your field names consistent.

**Reference:** [Loops API docs](https://loops.so/docs)

---

## Mailchimp

Add subscribers to a [Mailchimp](https://mailchimp.com) audience.

**You will need:**
- API key
- Server prefix
- Audience ID

**Where to find them:**
1. **API key** — Account > Extras > API keys. Generate one if you don't have it.
2. **Server prefix** — The part after the dash in your API key. For example, if the key ends with `-us6`, the prefix is `us6`.
3. **Audience ID** — Audience > Settings. The ID is displayed on that page.

**How data is sent:**

The `email` field is used as the subscriber email address. Every other field is sent as a **merge field**, where the field name must exactly match a merge tag in your Mailchimp audience (case-sensitive).

Every Mailchimp audience includes these merge tags by default:

| Form field name | Mailchimp merge tag | Saved as |
|---|---|---|
| `email` | — | Subscriber email address |
| `FNAME` | `FNAME` | First name |
| `LNAME` | `LNAME` | Last name |
| `PHONE` | `PHONE` | Phone number |
| `ADDRESS` | `ADDRESS` | Address |

You can add custom merge tags in Mailchimp under **Audience > Settings > Audience fields and \*\|MERGE\|\* tags**. Use the tag name (e.g. `COMPANY`, `PHONE`) as the form field name to send data to it.

If a form field name doesn't match any merge tag in the audience, the Mailchimp API will reject the submission.

**Reference:** [Add member to list — Mailchimp Marketing API](https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/)

---

## HubSpot

Create contacts in [HubSpot](https://hubspot.com) CRM.

**You will need:**
- Service key

**Where to find it:**
1. In your HubSpot account, go to **Settings > Integrations > Service Keys** (or **Development > Keys > Service Keys**).
2. Click **Create service key**, give it a name, and add the `crm.objects.contacts.write` scope.
3. Copy the generated key.

**How data is sent:**
Some common field names are mapped automatically:

| Your form field | HubSpot property |
|---|---|
| `name`, `first_name`, `firstName` | `firstname` |
| `last_name`, `lastName` | `lastname` |
| `phone` | `phone` |
| `company` | `company` |
| `website` | `website` |

Everything else is passed through using the field name as the HubSpot internal property name. Make sure the property exists in your HubSpot account.

If the contact already exists, the duplicate is silently ignored.

**Reference:** [HubSpot Contacts API](https://developers.hubspot.com/docs/api/crm/contacts)

---

## Beehiiv

Subscribe readers to a [Beehiiv](https://www.beehiiv.com) publication.

**You will need:**
- API key
- Publication ID

**Where to find them:**
1. **API key** — In your publication dashboard, go to Settings > API and create a key.
2. **Publication ID** — Shown in the same API settings section, or in the URL of your dashboard.

**How data is sent:**
Only the `email` field is sent. Other form fields are not forwarded to Beehiiv.

**Reference:** [Beehiiv Subscriptions API](https://developers.beehiiv.com/docs/v2/create-subscription)

---

## Send Email

Receive every form submission by email — no third-party account or credentials required.

**You will need:**
- One or more email addresses to be notified

**Setup:**
1. In the integration panel, select Send Email.
2. Enter the addresses that should receive submissions, separated by commas:

```
receiver1@gmail.com, receiver2@gmail.com
```

3. Optionally, enable **Notify Sender** to send a confirmation email to the person who submitted the form. The confirmation says "We have received your submission and will get back to you shortly." and includes a copy of their submission.

**How data is sent:**
Each submission is delivered as an email to every address on the list. The email includes:

- The site the form was submitted on and the sender's name (or email) in the subject line — useful when you run forms on more than one site.
- All submitted fields, listed as name–value pairs.

When the submission contains an email address, it is set as the **Reply-To** of the notification, so you can reply to the message to respond to the person directly.
