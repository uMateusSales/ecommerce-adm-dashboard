import Stripe from 'stripe'
import {headers} from "next/headers"
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/prismadb'

export const POST = async (req: Request) => {
    const body = await req.text()
    const signature = headers().get('Stripe-Signature') as string;
    let event: Stripe.Event;

    try {
        event= stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET_KEY!
        )
    } catch (error: any) {
        return new NextResponse(`Webhook deu erro de novo:${error.message}`, {status: 400})
    }

const session = event.data.object as Stripe.Checkout.Session;
const adress = session?.customer_details?.address;


const adressFormat = [
    adress?.line1,
    adress?.line2,
    adress?.city,
    adress?.state,
    adress?.postal_code,
    adress?.country,
]

const adressString = adressFormat.filter((i) => (i !== null)).join(', ')

if(!event.type === "checkout_session_completed") {
    const order = await prisma.order.update({where: {id: session?.metadata?.orderId}, data: {isPaid: true, address: adressString, phone: session?.customer_details?.phone || ''}, include: {orderItems: true}})

}


return new NextResponse(null, {status: 200})

}