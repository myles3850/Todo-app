# To-Do list firebase app

This is the completed takehome project for Firehawk funerals, utilising react, Typescript & Vite to build and package a simplistic but interactive web app.

### requirements
 - node =< V20.10
 - yarn classic
 - chrome based browser

This project is using yarn as its package manager, so running any yarn command should install the yarn package manager at the same time through corepack. if not through, you can follow the instructions at [yarn's](https://yarnpkg.com/) dev page to add it manually.

### running locally

To run the instance locally, you will need to install the packages through yarn install.
```
yarn install
```

A .env file will then need to be generated with the values specified in the .env.example file.

Once completed the dev server can then be spun up with the command `yarn dev`. Alternatively if you prefer to have the complete bundles app, you can run the command `yarn build` to create a deist bundle to run on any webserver.