# <b>Todo App</b>
This is a simple Todo app built using React, Material UI, and localForage for storage and a Node.js REST API for handling data operations.

## <b>Tests</b>
In order to ensure the functionality and reliability of the app, it is important to write tests for the various components and functions.

Here are some guidelines on how to write tests for the components and functions used in this app:

### React Components
For the React components, we recommend using the react-testing-library framework. This framework provides simple and effective ways to test React components, ensuring that they behave as expected.

Here are some examples of tests that can be written for this app:

- Test that the TodoForm component correctly updates the state with the input value when the form is submitted
- Test that the TodoList component correctly renders the todos from the state
- Test that the TodoItem component correctly renders the text and done status of each todo

### localForage
For localForage, we recommend using the @testing-library/localforage library. This library provides a simple and effective way to test the behavior of localForage in a controlled environment.

Here are some examples of tests that can be written for this app:

- Test that the setItem function correctly stores the todos in local storage
- Test that the getItem function correctly retrieves the todos from local storage
Please note that when writing tests, it's important to keep in mind the desired behavior and edge cases, and to test accordingly.

### Testing the Node.js API
We recommend using the Mocha framework for writing tests for the Node.js API. This framework provides a simple and flexible interface for writing and running tests.

Here are some examples of tests that can be written for the API:

- Test that the GET `/todo` endpoint returns the list of todos
- Test that the POST `/todo` endpoint correctly adds a new todo to the list
- Test that the DELETE `/todo` endpoint correctly removes a todo from the list
- Test the authentication routes, such as POST `/login`
- Test the handling of incorrect routes
- Test the handling of CORS (Cross-Origin Resource Sharing)

## <b>Running Tests</b>
In order to run the tests, you will need to have the necessary dependencies installed. To do this, run the following command in the root directory of the project:

```bash
npm install
```

Once the dependencies have been installed, you can run the tests by using the following command:

```bash
npm test
```
## <b>Steps to Run e2e Tests in Frontend with Playwright Test Suite</b>
Frontend e2e tests are carried out in Playwright testing suite.

- Navigate to the Frontend Directory and run 'npm init playwright@latest'
- execute 'npx playwright test' (By default tests will be run on all 3 browsers, chromium, firefox and webkit using 3 workers)
- to execute in a chromium execute 'npx playwright test --project=chromium'
- to debug what actions are executed run 'npx playwright test --project=chromium --debug'
- execute 'npx playwright show-report' to get a detailed analysis of what tests are passing/failing

## <b>Contributing</b>
If you find any bugs or have suggestions for improvements, feel free to open an issue or make a pull request.