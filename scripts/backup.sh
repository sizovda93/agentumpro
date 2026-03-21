#!/bin/bash
# Резервное копирование PostgreSQL
# Запуск: ./scripts/backup.sh
# Или через cron: 0 3 * * * /path/to/agentumpro/scripts/backup.sh

set -euo pipefail

# Настройки
BACKUP_DIR="/data/backups"
CONTAINER_NAME="agentumpro-db-1"  # Имя контейнера PostgreSQL
KEEP_DAYS=30                       # Хранить бэкапы за последние N дней

# Имя файла с датой
DATE=$(date +%Y-%m-%d_%H-%M)
FILENAME="agentum_backup_${DATE}.sql.gz"

echo "[$(date)] Начинаю бэкап..."

# Создаём директорию если нет
mkdir -p "${BACKUP_DIR}"

# Выполняем pg_dump внутри контейнера и сжимаем
docker exec "${CONTAINER_NAME}" pg_dump -U agentum agentum | gzip > "${BACKUP_DIR}/${FILENAME}"

# Размер файла
SIZE=$(du -h "${BACKUP_DIR}/${FILENAME}" | cut -f1)
echo "[$(date)] Бэкап создан: ${FILENAME} (${SIZE})"

# Удаляем старые бэкапы
find "${BACKUP_DIR}" -name "agentum_backup_*.sql.gz" -mtime +${KEEP_DAYS} -delete
echo "[$(date)] Старые бэкапы (>${KEEP_DAYS} дней) удалены."

echo "[$(date)] Готово."
