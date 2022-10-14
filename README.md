# hostr - One-Command Hosting of R-models

Share R-models with the world. Easily wrap them into an API or shiny server to show your work or integrate your models into other applications.

## What's inside?

The hostr application consists of two bigger parts at the moment:

### Apps and Packages

- `server`: the server reponsible for saving the R model, configuring the deployment and hosting the API/shiny servers of the users
- `r-package`: the r-package that a user uses to locally in their project to start to deploy the model

### Technologies used:

#### server:

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io/)
- [Typescript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Docker](https://www.docker.com/)

#### r-package:

- [R](https://www.r-project.org/)

## How to setup the server

For more information about how to use the R-package, please check the [Readme]() in the package.

### How to run locally

To get the project running locally on your machine you need to have the following development tools installed:

- Node.JS (we recommend v16)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (to run PostgreSQL / MailHog)

1. Clone the project:

```
git clone https://github.com/stackOcean-official/hostr.git
```

and move into the directory

```
cd hostr
```

2. Install Node.JS packages via pnpm. Don't have pnpm? Get it [here](https://pnpm.io/installation)

```
pnpm install
```

3. To make the process of installing a dev dependencies easier, we offer a [`docker-compose.yml`](https://docs.docker.com/compose/) with the following servers:

- a `postgres` container and environment variables preset to reach it,
- a `mailhog` container that acts as a mock SMTP server and shows received mails in a web UI (forwarded to your host's `localhost:8025`)

```
docker-compose -f docker-compose.dev.yml up -d
```

4. Create a `.env` file based on `.env.example` and change it according to your setup. If you are using a cloud based database or another mail server, you will need to update the `DATABASE_URL` and SMTP settings in your `.env` accordingly.

```
cp .env.example .env
```

5. Make sure your PostgreSQL Database Server is running. Then let prisma set up the database for you:

```
pnpm dlx prisma migrate dev
```

6. Start the development server:

```
pnpm dev
```

**You can now access the app on [https://localhost:3000](https://localhost:3000)**. You will be automatically redirected to the login. To use your local installation of hostr, create a new account.

For viewing the confirmation email and other emails the system sends you, you can access mailhog at [https://localhost:8025](https://localhost:8025)

### Build

To build all apps and packages, run the following command:

```bash
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```bash
pnpm dev
```
