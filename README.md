# SPA Starter Pack

This is a skeletal Single Page App with some sensible defaults with the goal of
enabling a fast prototyping process or standing up new services.

In particular, this skeletal app consists of the following:

- [TypeScript](https://www.typescriptlang.org/) instead of JavaScript
- [React](https://reactjs.org/) for the view layer
- [Material UI](https://material-ui.com/) for the component (e.g., Buttons, Menus) library. Form handling helpers like [formik](https://formik.org/) and [yup](https://github.com/jquense/yup).
- [Redux](https://redux.js.org/) and redux toolkit for state management and view model
- [JWT](https://jwt.io/) integration for Auth
- [Axios](https://github.com/axios/axios) library to make HTTP rest calls
- [Webpack](https://webpack.js.org/) setup to bundle and build with sensible defaults

Based on the above, there are basic infrastructure put in place to solve common
problems. For example, there is a basic Redux store with Actions and Reducers
written to solve for the User, Workspace workflows. The Sign Up and Sign In pages
have built in validation.

In other words, this is like [Create React App](https://create-react-app.dev/)
but with a bit more meat and some other opinions.

## Installation

You should have `yarn` or `npm` installed. In the project directory:

```
yarn install
```

Once installed, you should be able to start developing in the project.

## Development

Run `yarn run` to see all available commands. You should check `package.json` to
see what's available.

At the very basic, you would want a server that conforms to the rest API shape
and provide JWT-based authentication, or modify the project to talk to the
service.

Once you have a service put in place, for the development environment, modify
`webpack.dev.js` to put in the correct URL and, in the project folder, run

```
yarn run start
```

If you do not want to develop with a back end, you can develop the front end
standalone using mock requests by doing a few things:

- Modifying `src/request/mock.ts` to provide expected request data shapes
- Instead of `yarn run start`, use `yarn run local` instead.

## License

MIT
