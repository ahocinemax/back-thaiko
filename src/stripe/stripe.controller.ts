import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
    constructor(private readonly stripeService: StripeService) { }

    @Post('checkout')
    async checkout(@Body('items') items: { name: string; price: number; quantity: number }[]) {
        const sessionUrl = await this.stripeService.createCheckoutSession(items);
        return { url: sessionUrl };
    }

    @Get('session')
    async getSession(@Query('session_id') sessionId: string) {
        return this.stripeService.getSession(sessionId);
    }
}
