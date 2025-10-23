# SICOE polyrepo

- Backend: NestJS 11 + TypeORM 0.3 + PostgreSQL
- Frontend: Next.js 15 (app router) + proxy /api → backend
- Node: 22
- Orquestração: Docker Compose

git pull --rebase origin main
# resolva conflitos se aparecerem
git push -u origin main


----------------------------------

# subir db + backend
cd ~/app-sicoe/sicoe-local
docker compose down -v
docker compose --env-file .env up -d --build db backend

# gerar e aplicar migrations NO HOST (usa porta 5432 publicada)
cd ~/app-sicoe/sicoe-backend
DB_HOST=localhost DB_PORT=5432 DB_USER=sicoe DB_PASS=sicoe DB_NAME=sicoe npm run migration:generate
DB_HOST=localhost DB_PORT=5432 DB_USER=sicoe DB_PASS=sicoe DB_NAME=sicoe npm run migration:run

# subir frontend
cd ~/app-sicoe/sicoe-local
docker compose --env-file .env up -d --build frontend

# smoke tests
curl -s http://localhost:3001/health        # -> {"status":"ok"}
curl -s http://localhost:3000/api/health    # -> {"status":"ok"}
# abra http://localhost:3000
