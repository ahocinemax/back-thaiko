import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor() {
        const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
        if (!stripeSecretKey) throw new Error('Missing STRIPE_SECRET_KEY in .env file');
        this.stripe = new Stripe(stripeSecretKey, {
            apiVersion: '2025-01-27.acacia',
        });
    }

    async createCheckoutSession(items: { name: string; price: number; quantity: number }[]) {
        const lineItems = items.map((item) => ({
            price_data: {
                currency: 'eur',
                product_data: { name: item.name },
                unit_amount: item.price * 100, // Stripe utilise des centimes
            },
            quantity: item.quantity,
        }));

        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        return session.url;
    }
    async getSession(sessionId: string) {
        return await this.stripe.checkout.sessions.retrieve(sessionId);
    }

}
