# ita-web-app

- yarn v1.22.19
- node v18.14.1

## Project structure

```
├── public          # Static files
└── src
    ├── assets      # Store icons, fonts
    ├── components  # Store components in multiple widgets
    ├── widgets     # Store widgets in multiple pages
    ├── pages       # Store pages
    ├── store       # React-Redux state management
    │   ├── actions
    │   └── reducers
    ├── services    # Store service from server or third party
    ├── stories     # Storybook
    ├── constants   # Store global constants
    ├── types       # Store custom types
    └── utils       # Store utilities
```

## Setup the environment variables

    Copy from .env-example to .env and update the variables.

## Development

### Running with NodeJs

Check the version above for NodeJS and Yarn

To install latest dependencies, please run the following command.

    yarn install

To run the application, please follows the command below.

    yarn start

To run Storybook, please follows the command below.

    yarn storybook

To run lint code checking, please follows the command below.

    yarn lint

To run fix lint errors, please follows the command below.

    yarn lint:fix

To format code, please follows the command below.

    yarn format

### Docker container

To run the app in development mode with Docker, please run the following command.

    bash ./scripts/run_dev

## Production

To run the app in development mode, please run the following command.

    bash ./scripts/run_prod
