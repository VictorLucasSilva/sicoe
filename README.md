# SICOE polyrepo

- Backend: NestJS 11 + TypeORM 0.3 + PostgreSQL
- Frontend: Next.js 15 (app router) + proxy /api → backend
- Node: 22
- Orquestração: Docker Compose

git pull --rebase origin main
# resolva conflitos se aparecerem
git push -u origin main


----------------------------------

cd ~/app-sicoe/sicoe-local

# (opcional) remove a linha "version:" do compose se ainda existir
# sed -i '/^version:/d' docker-compose.yml

docker compose down -v
docker compose --env-file .env up -d --build db backend frontend
# smoke tests
curl -s http://localhost:3001/health        # -> {"status":"ok"}
curl -s http://localhost:3000/api/health    # -> {"status":"ok"}
# abra http://localhost:3000
