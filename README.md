# <b>Todo App</b>
This is a simple Todo app built using React, Material UI, and localForage for storage.

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

## <b>Running Tests</b>
In order to run the tests, you will need to have the necessary dependencies installed. To do this, run the following command in the root directory of the project:

```bash
npm install
```

Once the dependencies have been installed, you can run the tests by using the following command:

```bash
npm test
```