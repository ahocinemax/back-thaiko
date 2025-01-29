import { Controller, Get, Param } from '@nestjs/common';
import { SubCategoriesService } from './subcategories.service';

@Controller('subcategories')
export class SubCategoriesController {
    constructor(private readonly subCategoriesService: SubCategoriesService) { }

    @Get()
    async getAllSubCategories() {
        return this.subCategoriesService.findAll();
    }

    @Get(':id/products')
    async getProductsBySubCategory(@Param('id') id: string) {
        return this.subCategoriesService.findProductsBySubCategory(id);
    }
}
