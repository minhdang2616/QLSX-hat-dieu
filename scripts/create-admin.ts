import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("123", 10);

  const admin = await prisma.user.upsert({
    where: {
      username: "admin",
    },
    update: {
      password,
      role: "ADMIN",
    },
    create: {
      username: "admin",
      password,
      name: "Quản trị viên",
      role: "ADMIN",
    },
  });

  console.log("Admin created:", admin.username);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
