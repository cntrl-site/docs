---
sidebar_position: 1
slug: /
---

# Setting up locally
This is a step-by-step guide that will help you get up and running locally with your Control website.

### Environment Checklist
- If you don’t have Node.js installed, install it from [here](https://nodejs.org/en/download). You’ll need Node.js version 14 or later.
- Use any text editor to your liking.

### Clone the template
Go to [this GitHub repository](https://github.com/cntrl-site/nextjs-template) and choose `Use this template -> Create a new repository`.
Then clone the repository to your computer. We're working on a CLI generator to make it more convenient.

### Add Control API URL in your local environment variables
- Go to https://app.cntrl.site and access the Project Dashboard.
- Go to the Development tab.
- Click "COPY ENV VARS" button. This will copy all necessary variables to the buffer.
- In the NextJS root folder, create a file called `.env.local`
- Paste the copied variables into this file

### Start the dev server
To start the server locally, running this command in your terminal from the project root folder:
```
npm run dev
```
You should see your website up and running at [https://localhost:3005](https://localhost:3005).
Note, if you're trying to run the Control project that already has some custom code involved, you may want to also run this command: 
```
npm run generate-layouts
```
More on this in the [Styling section](/writing-styles).

