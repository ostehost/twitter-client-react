# Twitter Client

## Running the demo

1) make a demo directory: `mkdir twitter-client`
2) Clone twitter-client-react into twitter-client directory: `git clone git@github.com:ostehost/twitter-client-react.git`
3) Clone twitter-client-php into twitter-client directory: `git clone git@github.com:ostehost/twitter-client-php.git`
4) install twitter-client-react dependencies: `yarn install` or `npm install` from within twitter-client-react created in step 2
5) install twitter-client-php dependencies: `composer install` from within twitter-client-php created in step 3
6) Add .env file to twitter-client-react created in steps 2 and twitter-client-php created in step 3
7) Add provided credentials to .env files
8) Start twitter-client-php server: `php artisan serve` from within twitter-client-php created in step 3
9) Start twitter-client-react node server: `yarn server` or `npm run server` from within twitter-client-react created in step 2
10) Run the twitter-client-react application: `yarn dev` or `npm run dev` from within twitter-client-react created in step 2
11) Visit http://localhost:3000 and search for tweets!

## Build

Run `yarn build` or `npm run build` to build the production project.

## Running tests

Run `yarn test` or `npm run test` to execute the test via [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/).
