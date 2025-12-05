const express = require('express');
const app = express();
app.use(express.json());

let todos = [];

app.get('/', (req, res) => {
    res.send("Todo API is running!");
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const { text } = req.body;
    todos.push({ id: Date.now(), text });
    res.json({ success: true });
});

app.listen(3000, () => console.log("🚀 Todo server running on port 3000"));
