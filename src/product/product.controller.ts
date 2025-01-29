import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './product.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    async getAllProducts() {
        return this.productsService.findAll();
    }
}