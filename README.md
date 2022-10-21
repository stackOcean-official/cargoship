# 🚢 Cargoship - One-Command Hosting

Easy deployment for those with strengths in other disciplines: Data scientists, ML engineers, managers, and no-coders.

> :warning: This repository is still in an early stage of development. We love the open source community and want to show what we are working on early. We will update this readme with more information once it is safe to use. Until then, feel free to share your thoughts, contact us, and contribute if you'd like.

## What's inside?

Cargoship can be easily installed on any server without dev ops knowledge. It uses Docker in the background and provides an easy to use webinterface as well as packages for programming languages to deploy directly from code. The cargoship application consists of two bigger parts at the moment:

### Apps and Packages

- `server`: the server reponsible for saving the R model, configuring the deployment and hosting the API/shiny servers of the users
- `r-package`: the r-package that a user can use in their project to deploy a shiny server or plumber api directly from R-Studio

Because of our background and the challenges we face on a regular basis, we start with the support for R, but we are also planning to support other languages like Python as well as Static Websites & Web-Frameworks like Next.js, Svelte and others in the future.

### Technologies used:

#### server:

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io/)
- [Typescript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Docker](https://www.docker.com/)

#### r-package:

- [R](https://www.r-project.org/)

## How to use the packages

For more information about how to use the R-package, please check the [Readme]() in the package.

## How to setup the server

### Deployment on Server

The easiest way to provision your server to use with 🚢 cargoship is to run our install script:

```
wget -q https://raw.githubusercontent.com/stackOcean-official/cargoship/main/packages/scripts/install.sh -O install.sh; sudo bash ./install.sh
```

**Minimum Server Requirements:**

- Linux Operating System (we recommend Ubuntu 20.04)
- 1 vCPU
- 2 GB Ram
- 20 GB Storage

### How to run locally (for development)

To get the project running locally on your machine you need to have the following development tools installed:

- Node.JS (we recommend v16)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (to run PostgreSQL / MailHog)

1. Clone the project:

```
git clone https://github.com/stackOcean-official/cargoship.git
```

and move into the directory

```
cd cargoship
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

**You can now access the app on [https://localhost:3000](https://localhost:3000)**. You will be automatically redirected to the login. To use your local installation of cargoship, create a new account.

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
