# The QCS Workshop

Welcome to the QCS Workshop. This repository will give a step-by-step
walkthrough of getting up and running with QCS and the QIX Engine API.

This workshop is run with Node.JS, however the QIX Engine API is a websocket API so any language
that supports websockets can talk to the QIX Engine.

## Prerequisites

In order to take full advantage of this workshop the following technologies should be installed and working on your system

- Node.js (the latest LTS version)
- npm/yarn

## Step 1 - Set up your QCS instance

1. If you haven't already, get a QCS instance.
2. Log in as a tenant admin and make sure you have a user with the `Developer` role and a `Professional` license.
3. In the Administration Management Console under `Integration > Web` create a Web Integration. Make sure to whitelist `http://localhost:3000`. Take not of the Integration ID.
4. In the Administration Management Console under `Configuration > Settings` make sure API Keys are enabled
5. Log into the Hub as the Developer user and under `Settings` create a new API Key. Take note of your API key.
6. Create a new empty app. Give it a relevant name like "Movie App". With the new app created, take note of the App ID which will be the unique ID at the end of the URL for the app.

## Step 2 - Loading data into the Engine

1. ensure step 1 has been completed
2. `cd data-load`
3. `npm install`
4. Create a .env file with the following information:
  ```
  TENANT=<TENANT DOMAIN ie. rey.us.qlikcloud.com>
  QLIK_APP=<APP ID>
  API_KEY=<API KEY>
  ```
5. `npm start`

## Step 3 - Running the project

1. ensure steps 1 and 2 have been completed, the engine is running and data exists in it.
2. From the root of the project: `cd app`
3. `npm install`
4. Create a .env file with the following information:
  ```
  REACT_APP_TENANT=<TENANT DOMAIN ie. rey.us.qlikcloud.com>
  REACT_APP_WEB_INTEGRATION_ID=<WEB INTEGRATION ID>
  REACT_APP_QLIK_APP=<APP ID>
  REACT_APP_API_KEY=<API KEY>
  ```
5. `npm start`