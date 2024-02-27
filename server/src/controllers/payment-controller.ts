import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Stripe from 'stripe';
import sendInvoice from "../services/sendInvoice";

const prisma = new PrismaClient();

const stripe_key = process.env.STRIPE_SECRET_KEY;

if(!stripe_key){
    throw new Error("Stripe key is not defined");
}

const stripe = new Stripe(stripe_key, {
    apiVersion: '2023-10-16',
});

const bookTrip = async (req: Request, res: Response) => {
    const { hotelId, roomId, userId, adults, children, fromDate, toDate } = req.body;
    console.log(req.body)
    try {
        if (!hotelId || !roomId || !userId || !adults || !fromDate || !toDate) {
            res.status(400).json({ error: "Missing required information" });
            return;
        }
        if(adults < 1){
            res.status(400).json({ error: "Invalid adults number" });
            return;
        }
        const startDate = new Date(fromDate);
        const endDate = new Date(toDate);
        if (startDate > endDate) {
            res.status(400).json({ error: "Invalid dates" });
            return;
        }
        let currentDate = new Date();
        let newDate = new Date(currentDate.getTime() - 60 * 60 * 1000);
        if(startDate < newDate){
            res.status(400).json({ error: "Invalid dates" });
            return;
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const hotel = await prisma.accomodation.findUnique({
            where: {
                id: hotelId
            },
            select: {
                carParkFee: true,
                Rooms: {
                    select: {
                        id: true
                    }
                }
            }
        });
        if (!hotel) {
            res.status(404).json({ error: "Hotel not found" });
            return;
        }
        const room = await prisma.rooms.findUnique({
            where: {
                id: roomId
            },
            select: {
                priceForPerson: true,
                childrenPrice: true,
                discount: true,
                peopleCapacity: true
            }
        });
        if (!room) {
            res.status(404).json({ error: "Room not found" });
            return;
        }
        const checkRoom = hotel.Rooms.find((r: any) => r.id === roomId);
        if (!checkRoom) {
            res.status(404).json({ error: "Room not found in this hotel" });
            return;
        }
        if(adults + children > room.peopleCapacity){
            res.status(400).json({ error: "Too many people for this room" });
            return;
        }
        let carParkFee = hotel.carParkFee;
        if(!carParkFee){
            carParkFee = 0;
        }
        const numberOfNights = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
        const parkingFee = carParkFee * numberOfNights;
        const notDiscountedPrice = ((adults * room.priceForPerson + children * room.childrenPrice) * numberOfNights) + parkingFee;
        const discount = room.discount;
        const fullPrice = discount ? (1-discount) * notDiscountedPrice : notDiscountedPrice;
        const newOrder = await prisma.orders.create({
        data: {
            hotelId: hotelId,
            roomId: roomId,
            userId: userId,
            adults: adults,
            children: children,
            fromDate: startDate,
            toDate: endDate,
            carParkFee: carParkFee,
            fullPrice: fullPrice,
            paid: false
        }
        });
        res.status(201).json(newOrder);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Something went wrong" });
    }
}

const checkout = async (req: Request, res: Response) => {
    const { orderId, email, userId } = req.body;
    console.log(req.body)
    try {
        if (!orderId) {
            res.status(400).json({ error: "Missing required information" });
            return;
        }
        const order = await prisma.orders.findUnique({
            where: {
                id: orderId
            }
        });
        if(!order){
            res.status(404).json({ error: "Order not found" });
            return;
        }
        if(order.paid){
            res.status(400).json({ error: "Order already paid" });
            return;
        }
        const hotel = await prisma.accomodation.findUnique({
            where: {
                id: order.hotelId
            },
            include: {
                images: {
                    select: {
                        image: true
                    }
                },
                Rooms: {
                    select: {
                        roomNumber: true
                    }
                }
            }
        });
        if(!hotel){
            res.status(404).json({ error: "Hotel not found" });
            return;
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if(!user){
            res.status(404).json({ error: "User not found" });
            return;
        }
        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            submit_type: 'book',
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['PL', 'US', 'DE', 'CZ', 'SL', 'UA'],
            },
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'pln',
                        product_data: {
                            name: hotel.name,
                            description: `Reservation of room number ${hotel.Rooms[0].roomNumber} from ${order.fromDate} to ${order.toDate} for ${order.adults} adults and ${order.children} children`,
                            images: [hotel.images[0].image],
                            metadata: {
                                hotelId: hotel.id.toString(),
                                roomId: order.roomId.toString(),
                                userId: userId.toString(),
                                orderId: orderId.toString(),
                                adults: order.adults.toString(),
                                children: order.children.toString(),
                                fromDate: order.fromDate.toISOString(),
                                toDate: order.toDate.toISOString(),
                                carParkFee: order.carParkFee.toString(),
                                fullPrice: order.fullPrice.toString()
                            }
                        },
                        unit_amount: order.fullPrice * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/dashboard/reservations/checkout/success?orderId=${orderId}`,
            cancel_url: `http://localhost:3000/dashboard/reservations/checkout/cancel?orderId=${orderId}`,
            automatic_tax: {
                enabled: true
            }
        })
        await prisma.orders.update({
            where: {
                id: orderId
            },
            data: {
                paymentId: session.id
            }
        });
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Something went wrong" });
    }
}

const checkPaymentStatus = async (req: Request, res: Response) => {
    const { orderId } = req.body;
    try {
        const sessionId = await prisma.orders.findUnique({
            where: {
                id: orderId
            },
            select: {
                paymentId: true
            }
        });
        if (!sessionId) {
            res.status(400).json({ error: "Missing required information" });
            return;
        }
        if (!sessionId.paymentId) {
            res.status(400).json({ error: "Missing payment ID" });
            return;
        }
        const session = await stripe.checkout.sessions.retrieve(sessionId.paymentId);
        if (!session) {
            res.status(404).json({ error: "Session not found" });
            return;
        }
        if(session.payment_status === "paid"){
            if(!orderId){
                res.status(404).json({ error: "Order not found" });
                return;
            }
            const ordId = parseInt(orderId);
            await prisma.orders.update({
                where: {
                    id: ordId
                },
                data: {
                    paid: true
                }
            });
            const invoice = await prisma.invoice.findFirst({
                where: {
                    orderId: ordId
                }
            });
            if(invoice){
                res.status(200).json({ status: session.payment_status, invoice });
                return;
            }
            await prisma.invoice.create({
                data: {
                    orderId: ordId,
                    name: session.customer_details?.name,
                    surname: session.customer_details?.name,
                    email: session.customer_email,
                    address: session.customer_details?.address?.line1,
                    city: session.customer_details?.address?.city,
                    country: session.customer_details?.address?.country,
                    postalCode: session.customer_details?.address?.postal_code,
                    price: session.amount_total ? session.amount_total / 100 : null,
                    createdAt: new Date(),
                    status: session.payment_status,
                    currency: session.currency
                }
            });
            if(session.customer_email){
                sendInvoice(session.customer_email, ordId);
            }
        }
        res.status(200).json({ status: session.payment_status, sendInvoice });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}

const cancelReservation = async (req: Request, res: Response) => {
    const { orderId } = req.body;
    try {
        if (!orderId) {
            res.status(400).json({ error: "Missing required information" });
            return;
        }
        const order = await prisma.orders.findUnique({
            where: {
                id: orderId
            }
        });
        if(!order){
            res.status(404).json({ error: "Order not found" });
            return;
        }
        if(order.paid){
            res.status(400).json({ error: "Order already paid" });
            return;
        }
        await prisma.orders.delete({
            where: {
                id: orderId
            }
        });
        res.status(200).json({ message: "Reservation canceled" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}

export { bookTrip, checkout, checkPaymentStatus, cancelReservation };