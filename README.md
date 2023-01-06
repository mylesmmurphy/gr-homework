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
4. Run `npm start` to generate reports.
5. Reports are saved in the `reports` folder. Reports are saved as a CSV with the IDs of the impacted records.

## Testing
1. Run `npm test`

## Adding to the Project

Development Workflow:
1. Check out the development branch
2. Create a feature branch off of development, please name this branch after the feature being added using snake case, i.e. `new-feature-branch`
3. Once ready, open a PR to merge into development. Follow the naming convention: `Branch-name: Feature Summary`
4. Once approved, squash and merge changes into development (Note: Due to this being a free tier account, branch protection rules are not actually enforced.)

## Notes

1. After getting a count for each database, I found we have less than 100k records in each database. Because the size and number of records is not huge, we are able to load them all at once into the program and store / analyze them in-memory. If there was a lot more records, we would most likely have needed to do our comparisons in batches. This would have likely looked like a limit and offset used to query the old DB, and then used `where in` to find the records from that batch in the new DB, and then append those to some report, file, DB, etc. where we are keeping track.
2. Assumption made that we are only checking for shared columns, since the new DB has a new column named `favorite_flavor`.
3. Assumption made that reports with only the impacted record IDs would be sufficient. Missed and corrupted record IDs could be re-ran with an upsert into the new DB. If needed, I could add more details into the reports (for instance, what field is corrupted and the difference between them).
4. Program execution time is about ~1 second, and uses around 125mb of memory.
