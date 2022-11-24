# Cargoship

> still in development

Easy deployment for those with strengths in other disciplines: Data scientists, ML engineers, managers, and no-coders.

### How to run locally (for development)

To get the project running locally on your machine you need to have the following development tools installed:

- Node.JS (we recommend v16)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (to run PostgreSQL / MailHog)

1. Clone the project:

```sh
git clone https://github.com/stackOcean-official/cargoship
```

and move into the directory

```sh
cd cargoship
```

2. Install Node.JS packages via pnpm. Don't have pnpm? Get it [here](https://pnpm.io/installation)

```sh
pnpm install
```

3. To make the process of installing a dev dependencies easier, we offer a [`docker-compose.yml`](https://docs.docker.com/compose/) with the following servers:

- a `postgres` container and environment variables preset to reach it,
- a `mailhog` container that acts as a mock SMTP server and shows received mails in a web UI (forwarded to your host's `localhost:8025`)

```sh
docker-compose -f docker-compose.dev.yml up -d
```

4. Create a `.env` file based on `.env.example` and change it according to your setup. If you are using a cloud based database or another mail server, you will need to update the `DATABASE_URL` and SMTP settings in your `.env` accordingly.

```sh
cp .env.example .env
```

5. Make sure your PostgreSQL Database Server is running. Then let prisma set up the database for you:

```sh
pnpm dlx prisma migrate dev
```

6. Start the development server:

```sh
pnpm dev
```

**You can now access the app on [https://localhost:3000](https://localhost:3000)**. You will be automatically redirected to the login. To use your local installation of cargoship, create a new account.

For viewing the confirmation email and other emails the system sends you, you can access mailhog at [https://localhost:8025](https://localhost:8025)

### Build

To build all apps and packages, run the following command:

```sh
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```sh
pnpm dev
```
