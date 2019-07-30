# Twitter Client

## Running the demo

1) make a demo directory: `mkdir twitter-client`
2) Clone twitter-client-react into twitter-client directory: `git clone git@github.com:ostehost/twitter-client-react.git`
3) Clone twitter-client-php into twitter-client directory: `git clone git@github.com:ostehost/twitter-client-react.git`
4) install twitter-client-react dependencies: `yarn install` or `npm install`
5) install twitter-client-php dependencies: `composer install`
6) Add .env to both cloned repo created in steps 2 and 3
7) Start twitter-client-php server: `php artisan serve`
8) Start twitter-client-react node server: `yarn server` or `npm run server`
9) Run the twitter-client-react application: `yarn dev` or `npm run dev`
10) Visit http://localhost:3000 and search for tweets!

## Build

Run `yarn build` or `npm run build` to build the production project.

## Running tests

Run `yarn test` or `npm run test` to execute the test via [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/).