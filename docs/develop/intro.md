---
sidebar_position: 1
slug: /
---

# Intro
From the developer's view, Control ecosystem can be split into several components:

### 1. CMS module
CMS module is a public service that can be accessed at [https://app.cntrl.site](https://app.cntrl.site).
This service allows designers and managers to create pages, change overall design, and also publish the website.

### 2. Public API
All the edits made in the CMS are served using API making it a Headless CMS.
There are two types of APIs:
- Draft API - `https://preview.cntrl.site`
- Published API - `https://api.cntrl.site`

Using Draft API allows you to run the unpublished version of your website on your local machine, 
so you don't need to hit Publish every time you make a change and want it to propagate locally. 

### 3. SDK
SDK is the code that transforms the raw data from the Public API into React components.
In Control this happens at build time, when users hit the "Publish" button from the Project Dashboard.
