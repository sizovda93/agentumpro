#!/bin/bash
# Деплой: пересборка и перезапуск на сервере
# Запуск: ./scripts/deploy.sh

set -euo pipefail

echo "=== Agentum Pro — Deploy ==="

# Подтягиваем последние изменения
echo "[1/4] Обновляю код из Git..."
git pull --ff-only

# Пересобираем образ
echo "[2/4] Собираю Docker-образ..."
docker compose build app

# Применяем миграции и перезапускаем
echo "[3/4] Перезапускаю сервисы..."
docker compose up -d

# Чистим неиспользуемые образы
echo "[4/4] Очищаю старые образы..."
docker image prune -f

echo ""
echo "=== Деплой завершён ==="
echo "Проверьте: docker compose logs -f app"
