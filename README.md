# Fun Barber

[![Build Status][build-badge]][build]
[![GPL 3.0 License][license-badge]][license]

<!-- prettier-ignore-start -->
[build-badge]: https://img.shields.io/github/actions/workflow/status/hitusss/fun-barber/deploy.yml?branch=main&style=flat-square
[build]: https://github.com/hitusss/fun-barber/actions?query=workflow%3A"🚀%20Deploy"
[license-badge]: https://img.shields.io/badge/license-GPL%203.0%20License-blue.svg?style=flat-square
[license]: https://github.com/hitusss/fun-barber/blob/main/LICENSE
<!-- prettier-ignore-end -->

A barbershop web application featuring intuitive booking functionality and an 
engaging blog platform. Designed to streamline the scheduling process for clients, 
the app allows users to conveniently book appointments with their preferred barber 
online, selecting desired services and available time slots.

## Table of Contents

1. [Live Preview](#live-preview)
1. [Get Started](#get-started)
1. [Development](#development)
1. [Production](#production)
1. [Deployment](#deployment)

## Live Preview

You can check out a live preview of the App at https://fun-barber-5bdf.fly.dev

## Get Started

To get started with the App, follow these initial setup steps:

- Clone the repository to your local machine and navigate to the project
  directory:

```bash
git clone git@github.com:Hitusss/fun-barber.git
cd fun-barber
```

- Create a .env file in the project root and configure your environment
  variables. You can copy the .env.example file as a template.

- Install project dependencies using npm:

```bash
npm install
```

## Development

- Run the setup command to prepare the environment:

```bash
npm run setup
```

- Start the development server:

```bash
npm run dev
```

This will launch the development server, and you can access the application at
http://localhost:3000.

## Production

For production deployment, follow these steps:

- Build the application:

```bash
npm run build
```

- Start the production server:

```bash
npm run start
```

The production server will now be running, and you can access the live
application.

## Deployment

The deployment for this project is automated using GitHub Actions and hosted on
fly.io. Here are the deployment steps:

- Create a production app and volume for data storage on fly.io:

```bash
fly apps create fun-barber-5bdf
fly volumes create data --size 1 --app fun-barber-5bdf
```

- Create a staging app and volume for data storage on fly.io:

```bash
fly apps create fun-barber-5bdf-staging
fly volumes create data --size 1 --app fun-barber-5bdf-staging
```

Deployment to these apps is handled automatically by GitHub Actions. Any changes
pushed to the repository's main branch will trigger a deployment to the
production app, while changes to dev branch will deploy to the staging app.
