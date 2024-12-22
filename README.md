Prerequisites:

- [node.js](https://nodejs.org/en) should be installed

======

Running tests locally:

- clone the project
- install Cypress:

```
npm install cypress --save-dev
```

! Before running tests change baseUrl to a preferred one in cypress.config.js !


run tests in command line (Electron is default browser)
```
npx cypress run
```

OR

run tests in chrome headless mode
```
npx cypress run --browser chrome --headless
```

OR

run tests in a browser
```
npx cypress open
```
