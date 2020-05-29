# The Qlik Movie Workshop

Welcome to the Qlik Movie Workshop. This repository will give a step-by-step
walkthrough of getting up and running with the QIX Engine API.

This repository is sorted by branches. The `master` branch is the base branch in the tutorial
and each branch is numbered to indicate where to go next. There are also pull requests in
this repo to indicate the changes that have occurred between each branch to give an easy view
of what has been implemented.

This workshop is run with Node.JS, however the QIX Engine API is a websocket API so any language
that supports websockets can talk to the QIX Engine.

## Prerequisites

In order to take full advantage of this workshop the following technologies should be installed and working on your system

- Node.js (the latest LTS version)
- npm/yarn

## Step 1 - Loading data into the Engine

1. ensure you have a running local engine
2. `cd data-load`
3. `npm install`
4. `npm start`

# Step 2 - Running the project

1. ensure step 1 has been completed.
2. From the root of the project: `cd app`
3. `npm install`
4. `npm start`

If you're running the project and moving between branches 3-9 the project should automatically update as the branch changes.
