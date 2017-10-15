# NEO Explorer

NEO Explorer provides insight into the present and historical state of NEO blockchain.

## Getting Started

1. Run `yarn install`
2. Run `yarn run migrate:up`
3. Run `yarn run start` (or `yarn run start:web` to forego syncing blocks)
4. Navigate to http://localhost:3000

## Development

### GraphQL

In development mode, the GraphQL UI can be access at the /graphql route
(e.g.: http://localhost:300/graphql).

### Scripts

Scripts are organized under the `/scripts` folder and can be placed into logical subfolders.  They
can then be run via `yarn run script` along with the script path and any extra arguments.  For
example, the `migrate.js` script can be run via `yarn run script ./scripts/migrate.js up`.

## Deployment

1. Add remote origin via `heroku git:remote -a neoverse-explorer`
2. Push to production via `git push heroku master`

Migrations will automatically run when pushing to production.
