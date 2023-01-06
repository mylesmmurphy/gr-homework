# Guaranteed Rate Homework

The goal of this project is to identify missing, corrupted, and new records within a migrated database.

---
## Requirements

* Node.js & npm
* [Docker](https://docs.docker.com/get-docker/)
* [Nvm](https://github.com/nvm-sh/nvm) (optional) Uses `.nvmrc` to set Node version


## Installation

1. `$ git clone https://github.com/mylesmmurphy/gr-homework.git`
2. `$ cd gr-homework`
3. `$ npm i`

## Getting Started

1. Launch Docker.
2. Run `npm run db:up`. This will pull and start both databases locally on Docker.
3. Copy `sample.env` into a `.env` and enter the proper credentials.
4. Run `npm run start` to generate a report.

## Testing
1. Run `npm test`

## Adding to the Project

Development Workflow:
1. Check out the development branch
2. Create a feature branch off of development, please name this branch after the feature being added using snake case, i.e. `new-feature-branch`
3. Once ready, open a PR to merge into development. Follow the naming convention: `Branch-name: Feature Summary`
4. Once approved, squash and merge changes into development (Note: Due to this being a free tier account, branch protection rules are not actually enforced.)

## Notes

1. After getting a count for each database, we have less than 100k records in each database that need to be analyzed. Because the records are not huge, and there are not too many, we are able to load them all at once into the program and store / analyze them in-memory. If there were a lot more records, we most likely would have needed to batch our comparisons. This would have likely looked like a limit and offset used to query the old DB, and then used `where in` to find the records from that batch in the new DB.
2. Assumption made that we are only checking for shared columns, since the new DB has a new column named `favorite_flavor`.