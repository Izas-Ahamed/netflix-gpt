# <div style="display:flex;align-items:center"><img style="margi" src="https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2023.ico" alt="REDUX-TOOLKIT" height="35">etflixGPT</div>

A movie suggesting Web App, interface like Netflix using OpenAI's API (GPT 3.5), where GPT Ai will recommend movies based on user's search.

> [Deployed Link 😀](https://netflix-gpt-ai.netlify.app/)

### Packages Used:

- [Redux](https://redux.js.org/introduction/getting-started#redux-core) - A predictable state container for JavaScript apps.
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework packed with classes.
- [React Router](https://reactrouter.com/) - Declarative routing for React web applications.
- [OpenAi](https://github.com/openai/openai-node) - This library provides convenient access to the OpenAI REST API from TypeScript or JavaScript.
- [Firebase](https://www.npmjs.com/package/firebase) - Firebase JavaScript library for web and Node.js

## What's in here?

#### Here I demonstrated:

- Using `TailwindCSS` for styling the components.

- User can sign in and sign up where behind the scenes, it's using `Firebase authentication` and `database` for storing user data and authentication.
- Using `onAuthStateChange` from firebase I'm managing auth info and secured routing.
- Using `Redux Toolkit`, I have separated data into slices for separate use cases.
- Using `TMDB API`, I have fetched latest lists of Popular, Top Rated, Upcoming and Now Playing movies and then shown on browse page.
- Wrote `CustomHooks` for fetching movies data from `TMDB API`.
- Implementation of `Multi-lanugage` functionality on GPT Search Page.
- On GPT Search Page I have used `OpenAI GPT 3.5 Turbo API` for fetching movie results from GPT Ai.
- User can have only GPT search limit of 3.
- When the user's search limit is over, A modal is opened where users can provide their own `OpenAI API key` to use search.

### Note:

Before you run the app, please make sure you have created required environment variables by creating `.env` file in root directory of the project and add the below required keys:

`REACT_APP_OPENAI_API_KEY=YOUR_KEY`

`REACT_APP_TMDB_TOKEN=YOUR_KEY`

`REACT_APP_FIREBASE_API_KEY=YOUR_KEY`

`REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_KEY`

`REACT_APP_FIREBASE_PROJECT_ID=YOUR_KEY`

`REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_KEY`

`REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_KEY`

`REACT_APP_FIREBASE_APP_ID=YOUR_KEY`

`REACT_APP_FIREBASE_MEASUREMENT_ID=YOUR_KEY`

## Demo

To run this on your machine, simply go to terminal and to this project directory then do the following commands:

```sh
npm install
```

then type

```sh
npm start
```

##

That's it 😀!
