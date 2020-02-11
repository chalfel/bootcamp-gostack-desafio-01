const express = require('express');

const server = express();

server.use(express.json());

let projects = [];
let cont = 0;
server.use((req, res, next) => {
    cont++;
    next();
    console.log(cont);
})
const verifyProjectExists = (req, res, next) => {
    const { id } = req.params;
    if (!projects[id]) {
        return res.status(404).json({ error: ' Project Not Found' });
    }
    return next();
}

server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    projects.push({
        id,
        title,
        tasks: []
    })
    return res.json({ message: 'Cadastrado com sucesso' });
});

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    projects[id].title = title;

    return res.json(projects[id]);
})

server.delete('/projects/:id', verifyProjectExists, (req, res) => {
    const { id } = req.params;
    projects.slice(id, 1);

    return res.send();
});

server.post('/projects/:id/tasks', verifyProjectExists, (req, res) => {
    const { title } = req.body;
    const { id } = req.params;
    projects[id].tasks.push(title);

    return res.json(projects[id]);
});


server.listen(3000);