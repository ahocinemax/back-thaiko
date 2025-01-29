import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SubCategoriesService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.subCategory.findMany();
    }

    async findProductsBySubCategory(subCategoryId: string) {
        const ret = await this.prisma.product.findMany({
            where: { subCategoryId },
        });

        return ret;
    }
}
