const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

require('dotenv').config();
process.on("unhandledRejection", (error) => {
  console.error("unhandledRejection", error);
});

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


 connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
  } else {
    console.log('Connected to the database');
    // Initialize hard-coded todos
/*     const todos = [
      { title: 'Todo 1', content: 'user story 1', completed: false },
      { title: 'Todo 2', content: 'user story 1', completed: false },
      { title: 'Todo 3', content: 'user story 1', completed: false },
    ];

    todos.forEach((todo) => {
      connection.query(
        'INSERT INTO todos (title, content, completed) VALUES (?, ?, ?)',
        [todo.title, todo.content, todo.completed],
        (err, results) => {
          if (err) {
            console.error('Error creating todo in the database: ', err);
          } else {
            console.log('Todo created successfully');
          }
        }
      );
    }); */
  }
});

// Routes
// GET /todos - Get all todos
app.get('/todos', (req, res) => {
    connection.query('SELECT * FROM todos', (err, results) => {
      if (err) {
        console.error('Error getting todos from the database: ', err);
        res.status(500).json({ error: 'Failed to get todos' });
      } else {
        res.status(200).json(results);
      }
    });
  });




// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});