import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('teste123', 10);

  await prisma.user.create({
    data: {
      name: 'Usuário Seed',
      email: '123@email.com',
      password: password,
      level: 5,
      profile_img: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
    },
  });

  console.log('🌱 Usuário seed criado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });