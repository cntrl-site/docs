---
sidebar_position: 10
slug: /connect-a-repository
---

# Connecting a repository

This guide explains how to connect your custom code with the project in Control.

# Few words about build process in Control

Control uses [Static Site Generation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation) technique provided by Next.js when publishing your site to production.
This means that every time a change in the Editor occurs, in order to see it on the live site, Control needs to re-build the static assets and push them to the CDN servers.
This happens when the user hits the "Publish" button from the Project Dashboard.

# How to connect

If  you're finished customizing the website using Next.js template, now it's time to link your Github repository with the project in Control.
In order to do this, you need to:
1. Make sure your latest changes are pushed to Github;
2. In Control, navigate to the Dashboard of the project that you want your code to be connected with;
3. From the Dashboard, go to the "Development" tab, and scroll down to the "Github" section;
4. Click "Authorize". You will be redirected to Github. Please select the account which owns the repository that you want to connect;
5. Select the desired repository from the list of proposed repositories or select "All repositories";
6. You should be redirected back to Control and see the list of repositories to the right (if not, please try reloading the page and authorizing once again);
7. Click on the repository to select.

From now on, the next time the project gets built, it will use your repository instead of the generic template.
Please make sure that your project builds locally without any errors. To test it, run `npm run export` from the project root folder.

# Build logs

In Beta, Control doesn't expose build logs if the build fails on our servers. Please contact us if your build is still failing in Control but succeeds locally.

# Configure CI

Sometimes it's very handy to re-build your project automatically when you push new commits to a specific branch. To configure this in Control, 
all you need to do is go to the "Development" tab in your Project Dashboard, scroll to the Github section and set the "Redeploy on push" to ON.
Please don't forget to also specify the name of the branch that you want to push from.  
Also note that this may increase the Build Minutes usage in your plan so make sure you don't over-use this feature to avoid hitting plan limits.
