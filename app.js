const express = require('express');
const tasksRouter = require('./routes/tasks')

const app = express();

app.use(express.json);

app.use('/api/v1/tasks', tasksRouter);

app.listen(5000, console.log('server is up and running on port 5000'));