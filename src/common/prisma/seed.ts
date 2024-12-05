import { PrismaClient } from '@prisma/client';
import { categories, products } from './data-seed';

const prisma = new PrismaClient();

async function main() {
  await prisma.category.deleteMany();
  await prisma.product.deleteMany();

  for (const [index, category] of categories.entries()) {
    const categoryInDb = await prisma.category.create({
      data: category,
    });

    const productsBycategory = products.filter(
      (product) => product.categoryId == index + 1,
    );

    for (const product of productsBycategory) {
      await prisma.product.create({
        data: { ...product, categoryId: categoryInDb.id },
      });
    }
  }

  console.log('База данных заполнена');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
