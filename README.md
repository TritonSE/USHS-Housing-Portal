# USHS-Housing-Portal <!-- omit from toc -->

A web application built for [Union Station Homeless Services (USHS)](https://unionstationhs.org/), a nonprofit organization committed to helping homeless individuals and families rebuild their lives in the San Gabriel Valley. This web app aims to centralize and streamline the everyday workflows of the USHS team: collecting landlord/unit information, browsing housing unit data, referring renter candidates, and tracking the status of the renter candidate process.

**Built with:** [MongoDB](https://www.mongodb.com/), [Express.js](https://expressjs.com/), [Vite](https://vitejs.dev/) + [React](https://react.dev/), [Bun](https://react.dev/), and [Firebase](https://firebase.google.com/).

## Table of Contents <!-- omit from toc -->

- [Getting Started](#getting-started)
  - [Tools](#tools)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Linting / Formatting](#linting--formatting)

## Getting Started

### Tools

Before you can start developing, you'll need to install these tools:

- [Bun](https://bun.sh/docs/installation) - this is our JavaScript runtime
- [Postman](https://www.postman.com/downloads/) or [Insomnium](https://github.com/ArchGPT/insomnium#download) (no account BS) - (optional) helpful tool for testing API routes
- [MongoDB Community](https://www.mongodb.com/docs/manual/administration/install-community/) - (optional) only needed if you wish to run the database locally

### Backend

To get the backend running, run these commands from the root directory of the project:

1. Copy the backend `.env` file (see Slack) into the `backend` directory
2. `cd backend`
3. `bun install` to install dependencies
4. If running the database locally, make sure to [start `mongod`](https://www.mongodb.com/docs/manual/tutorial/manage-mongodb-processes/#start-mongod-processes)
5. `bun run start` to start the backend

### Frontend

To get the Vite development server running, run these commands from the root directory of the project:

1. `cd frontend`
2. `bun install` to install dependencies
3. `bun run start` to run the development server

## Linting / Formatting

In both the `backend` and `frontend` directories, these commands are available for linting and formatting code:

- `bun run format` - reformats the code without any linting
- `bun run lint-fix` - fixes auto-fixable lint errors and reformats the code
- `bun run lint-check` - just check for lint errors or code style issues without modifying any files (e.g. for Git pre-commit hook and CI/CD check)
