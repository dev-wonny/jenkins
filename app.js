const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let todos = [];

// Health check
app.get('/health', (req, res) => res.send("OK"));

// 홈
app.get('/', (req, res) => {
    res.send("Todo API is running!");
});

// 조회
app.get('/todos', (req, res) => {
    res.json(todos);
});

// 생성
app.post('/todos', (req, res) => {
    const { text } = req.body;

    if (!text || text.trim() === "") {
        return res.status(400).json({ error: "text is required" });
    }

    const todo = { id: Date.now(), text };
    todos.push(todo);
    res.json(todo);
});

// 삭제
app.delete('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    todos = todos.filter(t => t.id !== id);
    res.json({ success: true });
});

app.listen(3000, () => console.log("🚀 Todo server running on port 3000"));
