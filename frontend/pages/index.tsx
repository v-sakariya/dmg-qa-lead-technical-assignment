import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Typography,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled';
import localforage from 'localforage';

const initialTodos: Todo[] = [
  { id: 1, text: 'Learn NextJS', done: true },
  { id: 2, text: 'Build a todo app', done: false },
];

const LOCAL_STORAGE_KEY = 'todos';

const TodoList = styled(List)`
  width: 80%;
  margin: 1rem auto;
`;

const TodoItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodoForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const TodoInput = styled(OutlinedInput)`
  width: 70%;
  margin-right: 1rem;
`;

const lfInstance = localforage.createInstance({
  name: 'TODO',
});

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    lfInstance.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    lfInstance.getItem(LOCAL_STORAGE_KEY).then((items: any) => {
      if (items !== null) {
        setTodos(JSON.parse(items))
      } else {
        setTodos(initialTodos);
      }
    }).catch((e) => {
      console.log(e);
    })
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTodos([
      ...todos,
      { id: todos.length + 1, text: newTodoText, done: false },
    ]);
    setNewTodoText('');
    await lfInstance.setItem(LOCAL_STORAGE_KEY, todos);
  };

  const handleTodoDelete = async (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    await lfInstance.setItem(LOCAL_STORAGE_KEY, todos);
  };

  const handleTodoToggle = async (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      })
    );
    await lfInstance.setItem(LOCAL_STORAGE_KEY, todos);
  };

  return (
    <Box m={2} display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h4" component="h1">
        Todos
      </Typography>
      <TodoForm onSubmit={handleSubmit}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="new-todo">New Todo</InputLabel>
          <TodoInput
            label="new-todo"
            id="new-todo"
            value={newTodoText}
            onChange={(event) => setNewTodoText(event.target.value)}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Todo
        </Button>
      </TodoForm>
      <TodoList>
        {todos.map((todo) => (
          <TodoItem key={todo.id}>
            <ListItemIcon>
              <Checkbox edge="start" checked={todo.done} onClick={() => handleTodoToggle(todo.id)} />
            </ListItemIcon>
            <ListItemText primary={todo.text} />
            <Button
              onClick={() => handleTodoDelete(todo.id)}
              startIcon={<DeleteIcon />}
              color="secondary"
            >
              Delete
            </Button>
          </TodoItem>
        ))}
      </ TodoList>
    </Box>
  );
};

export default Home;