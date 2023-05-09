const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Mocked data
const todos = [
  { id: 1, title: 'Todo 1', content: 'user story 1', completed: false },
  { id: 2, title: 'Todo 2', content: 'user story 2', completed: true },
  { id: 3, title: 'Todo 3', content: 'user story 3', completed: false },
  { id: 4, title: 'Todo 4', content: 'user story 4', completed: true },
];

// Routes
// GET /todos - Get all todos
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

// GET /todos/:id - Get a specific todo
app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === Number(id));
  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// PUT /todos/:id - Update a todo
app.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, completed } = req.body;
  const todo = todos.find((todo) => todo.id === Number(id));
  if (todo) {
/*     todo.title = title;
    todo.content = content; */
    todo.completed = completed;
    res.status(200).json({ message: 'Todo updated successfully' });
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// POST /todos - Create a new todo
app.post('/todos', (req, res) => {
  const { title, content, details } = req.body;
  const newTodo = { id: todos.length + 1, title, content, details };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Mock server started on port ${PORT}`);
});
