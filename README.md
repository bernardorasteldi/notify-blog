
---

# Notify Blog

Sistema de blog simples com notificações em tempo real, utilizando **Vue 3**, **Node.js / Express**, **MongoDB** e **RabbitMQ**.
Todo o projeto é configurado para rodar com **Docker**, garantindo que backend, frontend, banco de dados e fila de mensagens funcionem de forma isolada e persistente.

---

## Tecnologias utilizadas

* **Frontend:** Vue 3 + Vite
* **Backend:** Node.js + Express
* **Banco de dados:** MongoDB
* **Fila de mensagens:** RabbitMQ
* **Docker & Docker Compose** para orquestração de containers

---

## Como rodar

1. Certifique-se de ter **Docker** e **Docker Compose** instalados.
2. Na raiz do projeto (`notify-blog`), execute:

```bash
docker compose up --build
```

3. Acesse os serviços:

* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Backend:** [http://localhost:3000](http://localhost:3000)
* **MongoDB:** porta 27017
* **RabbitMQ:** porta 5672 (fila) e 15672 (painel de administração)

4. Para parar todos os containers:

```bash
docker compose down
```

5. Para rebuildar e reiniciar os containers:

```bash
docker compose up --build
```
