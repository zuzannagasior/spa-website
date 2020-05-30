# SPA IT website with shoping cart

Single page application SPA IT website is one of my final projects of studies in Kozminski University.

See live demo --> https://spa-demo-zg.herokuapp.com/

## Technologies
- HTML
- SCSS
- jQuery
- Node.js
- Express.js
- MongoDB, mongoose
- Bootstrap
- Parcel bundler
- Moment.js

## Features

- Browsing treatments and rooms
- Adding treatments and rooms to the shopping cart
- Choosing duration of stay in hotel
- User registration and login with validation
- Booking confirmation

## Installation

1. Clone this repo.
```shell
$ git clone https://github.com/zuzannagasior/spa-website.git
```

2. Go into the repo.
```shell
$ cd spa-website
```

3. Install all dependencies.
```shell
$ npm install
```

4. Create .env file in main folder and add LOCAL_URI to add local MongoDB database. Add two collections: rooms and treatment. Complete them with documents that you can find in db.json file.

5. Build project.
```shell
$ npm run build:app
```

6. Run server
```shell
$ npm start:prod
```
7. Run this app in browser.
