# ALKEMY MOVIE DATABASE

AMDB (Alkemy Movie Database) is an online database of information related to films, that provide detailed information, such as rating, description, and much more.

## Live demo

[Link to the site!](https://amdb-the-clone.netlify.app/)

## Use cases

1. Login Form

The form should be rendered on any route if the user is not authenticated
Form fields:

- E-mail.
- Password.
- "Log in" button.

When submitting, there will be a non empty validation in both fields. If succeeded, a POST request must be made with the email and password fields in the BODY.
The valid data to get a token are:

- Email: challenge@alkemy.org
- Password: react

In the case of getting an API error, an alert should be displayed (using sweet alert).
If succeeded, it should redirect to Home and store the obtained token in localStorage.

2. Movie list

Will bring the most recent movies in theaters with all their information and details.

3. Movie details

Will show the particular information of each movie shown in the list, here you can expand deeply into movie information.

4. Search Engine

Will allow you to search for movies by a keyword and display the
matching results

5. Favorites Section

Each movie will have the option to be added to this section. Only
movies chosen by the user as "Favorite" may be here.
Also movies can be removed / deleted from the Favorites section.

6. Navigation bar

There should be an indicator of the number of movies in favourites. And in the detail, it will be specified if that movie is already in Favorites.

## Required to run the app

- Node.js v16.14.0
- NPM v8.3.1
- Axios v0.26.1
- React v18.0.0
- React-icons v4.3.1
- React-router-dom v5.3.1
- Sweetalert v2.1.2

## How to run the App manually

Go to the project root directory, and in the terminal run...

### `npm install`

### `npm start` - runs the server on http://localhost:3000
