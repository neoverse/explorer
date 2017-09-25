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
can then be run via `yarn run script`.  For example, the `migrate.js` script would be run via
`yarn run script migrate`, while the `assets/rename.js` script would be run via
`yarn run script assets:rename`.  Any additional arguments can be passed in normally.

**TODO:** the above is no longer accurate.  Instead, scripts need to be run via file path, e.g.:

    yarn run script ./scripts/assets/rename.js

## Deployment

1. Add remote origin via `heroku git:remote -a neoverse-explorer`
2. Push to production via `git push heroku master`

Migrations will automatically run when pushing to production.
