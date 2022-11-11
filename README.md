# Fun Barber

[![Build Status][build-badge]][build]
[![GPL 3.0 License][license-badge]][license]

<!-- prettier-ignore-start -->
[build-badge]: https://img.shields.io/github/workflow/status/hitusss/fun-barber/🚀%20Deploy?logo=github&style=flat-square
[build]: https://github.com/hitusss/fun-barber/actions?query=workflow%3A"🚀%20Deploy"
[license-badge]: https://img.shields.io/badge/license-GPL%203.0%20License-blue.svg?style=flat-square
[license]: https://github.com/hitusss/fun-barber/blob/main/LICENSE
<!-- prettier-ignore-end -->

## Development

- Initial setup: _If you just generated this project, this step has been done for you._

  ```sh
  npm run setup
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

## Deployment

This app comes with two GitHub Actions that handle automatically deploying your
app to production and staging environments.

Prior to your first deployment, you'll need to do a few things:

- [Install Fly](https://fly.io/docs/getting-started/installing-flyctl/)

- Sign up and log in to Fly

  ```sh
  fly auth signup
  ```

  > **Note:** If you have more than one Fly account, ensure that you are signed into the same account in the Fly CLI as you are in the browser. In your terminal, run `fly auth whoami` and ensure the email matches the Fly account signed into the browser.

- Create two apps on Fly, one for staging and one for production:

  ```sh
  fly apps create fun-barber-5bdf
  fly apps create fun-barber-5bdf-staging
  ```

  > **Note:** Make sure this name matches the `app` set in your `fly.toml` file. Otherwise, you will not be able to deploy.

- Add a `FLY_API_TOKEN` to your GitHub repo. To do this, go to your user settings
  on Fly and create a new [token](https://web.fly.io/user/personal_access_tokens/new),
  then add it to [your repo secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
  with the name `FLY_API_TOKEN`.

- Create a persistent volume for the sqlite database for both your staging and
  production environments. Run the following:

  ```sh
  fly volumes create data --size 1 --app fun-barber-5bdf
  fly volumes create data --size 1 --app fun-barber-5bdf-staging
  ```

Now that everything is set up you can commit and push your changes to your repo.
Every commit to your `main` branch will trigger a deployment to your production
environment, and every commit to your `dev` branch will trigger a deployment to
your staging environment.

## Connecting to your database

The sqlite database lives at `/data/sqlite.db` in the deployed application. You
can connect to the live database by running `fly ssh console -C database-cli`.

## GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that
gets into the `main` branch will be deployed to production after running
tests/build/etc. Anything in the `dev` branch will be deployed to staging.

## Testing

### Cypress

We use Cypress for our End-to-End tests in this project. You'll find those in
the `cypress` directory. As you make changes, add to an existing file or create
a new file in the `cypress/e2e` directory to test your changes.

We use [`@testing-library/cypress`](https://testing-library.com/cypress) for
selecting elements on the page semantically.

To run these tests in development, run `npm run test:e2e:dev` which will start
the dev server for the app as well as the Cypress client. Make sure the database
is running in docker as described above.

### Vitest

For lower level tests of utilities and individual components, we use `vitest`.
We have DOM-specific assertion helpers via
[`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your
editor to get a really great in-editor experience with type checking and
auto-complete. To run type checking across the whole project, run
`npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project.
It's recommended to install an editor plugin (like the
[VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode))
to get auto-formatting on save. There's also a `npm run format` script you can
run to format all files in the project.
