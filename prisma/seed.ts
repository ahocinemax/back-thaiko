import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
    const dataFolder = '../sabaidi/src/data'; // Dossier contenant tes JSON
    const files = fs.readdirSync(dataFolder);

    for (const file of files) {
        if (file.endsWith('.json')) {
            const categoryName = file.replace('.json', '');
            const filePath = path.join(dataFolder, file);
            const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            // Insérer la catégorie principale
            const category = await prisma.category.upsert({
                where: { name: categoryName },
                update: {},
                create: { name: categoryName },
            });

            for (const [subCategoryName, products] of Object.entries(jsonData)) {
                // Insérer la sous-catégorie
                const subCategory = await prisma.subCategory.upsert({
                    where: { name: subCategoryName, categoryId: category.id },
                    update: {},
                    create: { name: subCategoryName, categoryId: category.id },
                });

                // Insérer les produits
                for (const product of products as any[]) {
                    await prisma.product.create({
                        data: {
                            title: product.title,
                            description: product.description,
                            price: parseFloat(product.price),
                            imageUrl: product.imageUrl,
                            subCategoryId: subCategory.id,
                        },
                    });
                }
            }
        }
    }
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
