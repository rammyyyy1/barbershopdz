import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing barbers just in case (optional)
  await prisma.barber.deleteMany({});

  console.log('Seeding barbers...');

  const barbers = [
    {
      name: 'YACINE',
      specialization: 'Coupe Professionnelle',
    },
    {
      name: 'KHALED ZENDA',
      specialization: 'Dreads Specialist',
    },
    {
      name: 'ABDOU',
      specialization: 'Coupe Classique & Moderne',
    },
  ];

  for (const barber of barbers) {
    const created = await prisma.barber.create({
      data: barber,
    });
    console.log(`Created barber: ${created.name}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
