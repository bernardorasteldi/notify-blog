const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Post = require('./models/Post');
const Notification = require('./models/Notification');
const { sendNotification } = require('./notifications');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://admin:admin123@mongodb:27017/notify-blog?authSource=admin';

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB conectado!'))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

// Funções auxiliares
const savePost = async (postData) => {
  const newPost = new Post({
    title: postData.title,
    author: postData.author,
    content: postData.content
  });
  await newPost.save();
  return newPost;
};

const saveNotification = async (title) => {
  const notification = {
    message: `Novo post criado: "${title}"`,
    date: new Date().toISOString()
  };
  await sendNotification(notification);
  return notification;
};

// Rotas
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar posts', details: error.message });
  }
});

app.post('/api/posts', async (req, res) => {
  const { title, author, content } = req.body;
  if (!title || !author || !content) {
    return res.status(400).json({ error: "Todos os campos (title, author, content) são obrigatórios." });
  }

  try {
    const newPost = await savePost(req.body);
    await saveNotification(newPost.title);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Erro interno ao salvar o post.", details: error.message });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const result = await Post.findByIdAndDelete(postId);
    if (result) {
      res.status(200).json({ message: `Post com ID ${postId} excluído com sucesso.` });
    } else {
      res.status(404).json({ error: `Post com ID ${postId} não encontrado.` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar post', details: error.message });
  }
});

app.get('/api/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ date: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar notificações', details: error.message });
  }
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});
