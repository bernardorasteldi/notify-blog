const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let posts = [
    { 
        id: 1700000000000, 
        title: "Projeto", 
        author: "Bernardo", 
        content: "Projeto Feito em Vue/Node.", 
        date: new Date(1700000000000).toISOString() 
    }
];

let notifications = [
    { 
        message: "Teste de notificação.", 
        date: new Date().toISOString() 
    }
];

// Funções para manipular Posts
const savePost = (postData) => {
    const newPost = {
        id: Date.now(), // Gerando um ID único (timestamp)
        title: postData.title,
        author: postData.author,
        content: postData.content,
        date: new Date().toISOString()
    };
    posts.push(newPost);
    return newPost;
};

const deletePost = (postId) => {
    const initialLength = posts.length;
    posts = posts.filter(post => post.id !== postId);
    return posts.length < initialLength;
};

// Funções para manipular Notificações
const saveNotification = (title) => {
    const newNotification = {
        message: `Novo post criado: "${title}"`,
        date: new Date().toISOString()
    };
    notifications.push(newNotification);
    return newNotification;
};



// 1. Rota: listar post (GET /api/posts)
app.get('/api/posts', (req, res) => {
    res.status(200).json(posts);
});

// 2. Rota: salvar post (POST /api/posts)
app.post('/api/posts', (req, res) => {
    const { title, author, content } = req.body;

    if (!title || !author || !content) {
        return res.status(400).json({ error: "Todos os campos (title, author, content) são obrigatórios." });
    }

    try {
        const newPost = savePost(req.body);

        // Rota: salvar notificacao - Criada automaticamente ao postar
        saveNotification(newPost.title);

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Erro interno ao salvar o post.", details: error.message });
    }
});

// 3. Rota: excluir post (DELETE /api/posts/:id)
app.delete('/api/posts/:id', (req, res) => {
    // O ID recebido no parâmetro da URL é uma string, convertemos para número.
    const postId = parseInt(req.params.id); 

    if (isNaN(postId)) {
        return res.status(400).json({ error: "ID de post inválido. Deve ser um número." });
    }

    const wasDeleted = deletePost(postId);

    if (wasDeleted) {
        res.status(200).json({ message: `Post com ID ${postId} excluído com sucesso.` });
    } else {
        res.status(404).json({ error: `Post com ID ${postId} não encontrado.` });
    }
});


// 4. Rota: listar notificacao (GET /api/notifications)
app.get('/api/notifications', (req, res) => {
    // Retorna a lista de notificações, tipicamente as mais recentes primeiro.
    res.status(200).json(notifications.reverse());
});

// Inicialização do Servidor
app.listen(port, () => {
    console.log(`Backend rodando em http://localhost:${port}`);
});