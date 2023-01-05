# Guaranteed Rate Homework

The goal of this project is to identify missing, corrupted, and new records within a migrated database.

---
## Requirements

* Node.js & npm
* [Docker](https://docs.docker.com/get-docker/)


## Installation

1. `$ git clone https://github.com/mylesmmurphy/gr-homework.git`
2. `$ cd gr-homework`
3. `$ npm i`

## Getting Started

1. Launch Docker
2. Run `npm run db:up`. This will pull and start both databases locally on Docker.
3. Copy `sample.env` into a `.env` and enter the proper credentials.
4. Run `npm run start` to generate a report.

## Adding to the Project

Development Workflow:
1. Check out the development branch
2. Create a feature branch off of development, please name this branch after the feature being added using snake case, i.e. `new-feature-branch`
3. Once ready, open a PR to merge into development. Follow the naming convention: `Branch-name: Feature Summary`
4. Once approved, squash and merge changes into development (Note: Due to this being a free tier account, branch protection rules are not actually enforced.)