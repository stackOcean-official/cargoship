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

### First steps

Clone the repository and move into the directory:

```bash
git clone https://github.com/stackOcean-official/hostr
cd hostr
```

### Database

We use [Prisma](https://prisma.io/) to manage & access our database. As such you will need a database for this project, either locally or hosted in the cloud.

To make this process easier, we offer a [`docker-compose.yml`](https://docs.docker.com/compose/) file to deploy a MySQL server locally with a new database named `hostr` (To change this update the `MYSQL_DATABASE` environment variable in the `docker-compose.yml` file):

```bash
docker-compose up -d
```

Once deployed you will need to copy the `.env.example` file to `.env` in order for Prisma to have a `DATABASE_URL` environment variable to access.

```bash
cp .env.example .env
```

If you added a custom database name, or use a cloud based database, you will need to update the `DATABASE_URL` in your `.env` accordingly.

Once deployed & up & running, you will need to create & deploy migrations to your database to add the necessary tables. This can be done using [Prisma Migrate](https://www.prisma.io/migrate):

```bash
npx prisma migrate dev
```

If you need to push any existing migrations to the database, you can use either the Prisma db push or the Prisma migrate deploy command(s):

```bash
pnpm db:push

# OR

pnpm db:migrate:deploy
```

There is slight difference between the two commands & [Prisma offers a breakdown on which command is best to use](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push#choosing-db-push-or-prisma-migrate).

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
