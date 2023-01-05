# Guaranteed Rate Homework

The goal of this project is to identify missing, corrupted, and new records within a migrated database.

---
## Requirements

* Node.js & npm
* [Docker](https://docs.docker.com/get-docker/)


## Installation

1. `$ git clone https://github.com/username/project`
2. `$ cd project`
3. `$ npm i`

## Getting Started

1. Launch Docker
2. Run `npm run db:up`. This will pull and start both databases locally on Docker.
3. Copy `sample.env` into a `.env` and enter the proper credentials.
4. Run `npm run start` to generate a report.