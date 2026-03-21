// Скрипт создания администратора
// Запуск: npm run db:seed
//
// Переменные окружения:
//   ADMIN_EMAIL    — email администратора (по умолчанию admin@agentum-pro.ru)
//   ADMIN_PASSWORD — пароль (обязательный)

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@agentum-pro.ru";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.error("Ошибка: укажите ADMIN_PASSWORD в переменных окружения.");
    console.error("Пример: ADMIN_PASSWORD=MySecurePass123 npm run db:seed");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);

  const user = await db.user.upsert({
    where: { email },
    update: { password: hash },
    create: {
      email,
      password: hash,
      name: "Администратор",
      role: "ADMIN",
    },
  });

  console.log(`Администратор создан/обновлён:`);
  console.log(`  Email: ${user.email}`);
  console.log(`  ID: ${user.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
