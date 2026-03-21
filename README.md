# Agentum Pro

Партнёрская сеть для юридической компании. Next.js + PostgreSQL + Prisma.

## Структура проекта

```
agentumpro/
├── prisma/
│   └── schema.prisma         # Схема базы данных
├── scripts/
│   ├── seed-admin.ts          # Создание администратора
│   ├── backup.sh              # Резервное копирование БД
│   └── deploy.sh              # Деплой на сервере
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Корневой layout
│   │   ├── page.tsx           # Главная страница
│   │   ├── globals.css        # Глобальные стили
│   │   ├── admin/
│   │   │   ├── login/page.tsx # Вход в админку
│   │   │   ├── page.tsx       # Список заявок
│   │   │   └── settings/page.tsx
│   │   └── api/
│   │       ├── leads/route.ts # Публичное API заявок
│   │       ├── auth/          # Аутентификация
│   │       └── admin/         # Защищённое admin API
│   ├── components/
│   │   ├── TensionLine.tsx    # Декоративная линия
│   │   ├── sections/          # Секции главной страницы
│   │   └── admin/             # Компоненты админки
│   ├── lib/
│   │   ├── db.ts              # Prisma client
│   │   ├── auth.ts            # JWT + sessions
│   │   └── rate-limit.ts      # Rate limiter
│   └── middleware.ts          # Защита admin-роутов
├── Dockerfile
├── docker-compose.yml
├── Caddyfile
├── .env.example
└── next.config.mjs
```

---

## Локальная разработка

### Требования
- Node.js 20+
- Docker (для PostgreSQL)
- npm

### Шаги

```bash
# 1. Установить зависимости
npm install

# 2. Создать .env
cp .env.example .env
# Отредактируйте .env — укажите пароли и JWT_SECRET

# 3. Запустить PostgreSQL через Docker
docker compose up db -d

# 4. Применить миграции
npx prisma migrate dev --name init

# 5. Создать администратора
ADMIN_PASSWORD=YourPassword123 npm run db:seed

# 6. Запустить dev-сервер
npm run dev
```

Сайт: http://localhost:3000
Админка: http://localhost:3000/admin/login
Prisma Studio: `npm run db:studio`

---

## Деплой на сервер

### 1. Подготовка сервера

```bash
# Подключитесь к серверу
ssh root@ВАШ_IP

# Установите Docker
curl -fsSL https://get.docker.com | sh

# Установите Docker Compose
apt install -y docker-compose-plugin

# Установите Git
apt install -y git
```

### 2. Клонирование проекта

```bash
cd /opt
git clone ВАШ_РЕПОЗИТОРИЙ agentumpro
cd agentumpro
```

### 3. Настройка .env

```bash
cp .env.example .env
nano .env
```

Обязательно измените:
- `POSTGRES_PASSWORD` — сильный пароль для БД
- `JWT_SECRET` — `openssl rand -base64 48`
- `DATABASE_URL` — с правильным паролем
- `ADMIN_PASSWORD` — пароль администратора

### 4. Запуск

```bash
# Запустить всё одной командой
docker compose up -d --build

# Создать администратора
docker compose exec app npx tsx scripts/seed-admin.ts
```

### 5. Настройка HTTPS (когда будет домен)

Отредактируйте `Caddyfile`:
```
agentum-pro.ru {
    reverse_proxy app:3000
    ...
}
```

Перезапустите Caddy:
```bash
docker compose restart caddy
```

---

## Обновление проекта

```bash
cd /opt/agentumpro
./scripts/deploy.sh
```

Или вручную:
```bash
git pull
docker compose build app
docker compose up -d
```

---

## Резервное копирование

```bash
# Разовый бэкап
./scripts/backup.sh

# Автоматический бэкап каждый день в 3:00
crontab -e
# Добавить строку:
0 3 * * * /opt/agentumpro/scripts/backup.sh >> /var/log/agentum-backup.log 2>&1
```

---

## Полезные команды

```bash
# Логи приложения
docker compose logs -f app

# Логи всех сервисов
docker compose logs -f

# Остановить
docker compose down

# Зайти в контейнер БД
docker compose exec db psql -U agentum agentum

# Применить новые миграции
docker compose exec app npx prisma migrate deploy

# Сменить пароль админа
docker compose exec -e ADMIN_PASSWORD=NewPassword app npx tsx scripts/seed-admin.ts
```

---

## Безопасность

- Пароли хешируются через bcrypt (12 раундов)
- Сессии в httpOnly cookies, secure в production
- JWT подписан секретным ключом из .env
- Rate limiting на логин (10 попыток / 15 мин) и заявки (5 / мин)
- Admin-роуты защищены middleware
- Uploads проверяются по MIME-типу и размеру
- Файлы хранятся с UUID-именами (невозможно угадать)
- X-Powered-By отключён
- Caddy добавляет security headers
- Служебные папки (/uploads, /backups) недоступны извне
