---
sidebar_position: 2
slug: /setting-up-locally
---

# Setting up locally
This is a step-by-step guide that will help you get  
up and running locally with your Control website.

### Environment Checklist
- If you don’t have Node.js installed, install it  
from [here](https://nodejs.org/en/download). You’ll need Node.js version 14 or later.
- Use any text editor to your liking.

### Run the CLI
In your console, run the following command:
```
npx create-cntrl-site@latest -p <name-of-your-project>
```
This command will ask you for one environment variable.
- Go to [Control CMS](https://app.cntrl.site), access the Project Dashboard.
- Go to the Development tab. Copy the value of the  
variable named `CNTRL_API_URL`.
- Paste it into the command prompt in your terminal.


### Start the dev server
Run `npm run dev` to start the dev server.  

  
Note, if you're trying to run the Control project that  
already has some custom code involved, you may want to  
also run this command: 
```
npm run generate-layouts
```
More on this in the [Styling section](/writing-styles).

