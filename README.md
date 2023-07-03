# Cleanough

A code-sharing social app where developers collaborate, receive feedback, and improve their code together.

## Getting Started 

First, Clone the repository from GitHub:

```bash
git clone https://github.com/cleanough/cleanough
```
Install dependencies via npm:
```bash
cd cleanough
npm install
```
Copy the .env.example file to .env and update the database connection settings to match your environment:
```bash
cp .env.example .env
```
Here are the default admin email and password that will be seeded into the database, but these can be changed in the .env file.
```env
SUPER_ADMIN_EMAIL=admin@cleanough.com
SUPER_ADMIN_PASSWORD=admin
```
Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

