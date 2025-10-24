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


cd ~/app-sicoe/sicoe-backend

# 1) Remova lock antigo
rm -f package-lock.json

# 2) Troque/alinhe o @nestjs/testing para a mesma major do resto (10.x)
npm pkg set devDependencies.@nestjs/testing="^10.3.0"
# (se você nem usa testes agora, pode só remover:)
# npm pkg delete devDependencies.@nestjs/testing

# 3) Garanta que TODOS os pacotes Nest estão na linha 10.x
npm pkg set \
  dependencies.@nestjs/common="^10.3.0" \
  dependencies.@nestjs/core="^10.3.0" \
  dependencies.@nestjs/platform-express="^10.3.0" \
  dependencies.@nestjs/config="^3.2.0" \
  dependencies.@nestjs/typeorm="^10.0.0"

# (as outras deps que você já definiu podem ficar iguais)

# 4) Gere apenas o package-lock.json (sem instalar node_modules no host)
npm install --package-lock-only --no-audit --no-fund

cd ~/app-sicoe/sicoe-local
docker compose --env-file .env up -d --build backend
docker compose logs -f backend