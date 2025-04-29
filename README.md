Kanban Board



Full‑stack TypeScript Kanban application that lets teams visualise and manage their work on a classic To‑Do → In‑Progress → Done board. Users can sign up, log in, create tickets, assign them to team‑mates, and drag‑and‑drop tickets across columns. 
The project is split into a React + Vite client and a Node/Express REST API backed by PostgreSQL + Sequelize.

Live Demo: https://kanban-board-1reb.onrender.com/



Table of Contents

Features

Tech Stack


License

Features

JWT‑based authentication (register / login / protected routes)

CRUD tickets: create, read, update, delete

Assign tickets to users

Drag‑and‑drop ticket movement between columns

Responsive UI built with React hooks & Context API

Persisted state via PostgreSQL

Seed script for demo data

Tech Stack

Layer

Technology

Front end

React 18 + Vite, TypeScript, CSS

Back end

Node.js, Express.js, JWT, Bcrypt

Database

PostgreSQL, Sequelize ORM

Dev tools

Nodemon, TypeScript, ESLint

Deployment

Render (web service & PostgreSQL)

License

Distributed under the MIT License. See LICENSE for more information.

Author

Pedro Quintero – @PedroQuinthero
