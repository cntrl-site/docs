---
sidebar_position: 10
slug: /connect-a-repository
---

# Connecting a repository

This guide explains how to connect your  
custom code with the project in Control.

# Few words about build process in Control

Control uses [Static Site Generation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation) provided by Next.js  
when publishing your site to production. This means  
every time a change in the Editor occurs, to see it on  
the live site Control needs to re-build the static assets  
and push them to the CDN servers. This is exactly what  
happens when the user hits the "Publish" button from the  
Project Dashboard.

# How to connect

If you're done customizing the website using Next.js template,  
now it's time to push your code live! To do this, you need to:


1. Make sure your latest changes are pushed to Github;
2. In Control, navigate to the Project Dashboard;
3. Go to the "Development" tab, scroll to "Github" section;
4. Click "Authorize". You will be redirected to Github.  
Select an account which has the repository you want to connect;
5. Select the desired repository from the list of  
proposed repositories or select "All repositories";
6. You should be redirected back to Control and be presented  
with the list of repositories on the right (if not, try  
reloading the page and authorizing once again);
7. Click on the repository to select.

From now on, the next time the project gets built,  
it will use your repository instead of the generic template.

Please make sure that your project builds locally  
without any errors. To test it, run `npm run export`  
from the project root folder.

# Build logs

In Beta, Control doesn't expose build logs if the build  
fails on our servers. Please contact us if your build is  
still failing in Control but succeeds locally.

# Configure CI

Sometimes it's very handy to re-build your project  
on every push to a certain branch. To configure this, go  
to `Development => Github`, set the "Redeploy on push" to ON.


Please don't forget to also specify the name of the branch you  
want to push from. Also note that this may increase the Build  
Minutes usage in your plan so make sure you don't over-use this  
feature to avoid hitting plan limits.
