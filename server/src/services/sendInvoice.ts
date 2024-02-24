import PDFDocument, { text } from 'pdfkit';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const sendInvoice = async (email: string, orderId: number) => {
    try{
        const order = await prisma.orders.findUnique({
            where: {
                id: orderId
            }
        });
        if(!order){
            return;
        }
        const user = await prisma.user.findUnique({
            where: {
                id: order.userId
            }
        });
        if(!user){
            return;
        }
        const hotel = await prisma.accomodation.findUnique({
            where: {
                id: order.hotelId
            },
            include: {
                images: true
            }
        });
        if(!hotel){
            return;
        }
        const room = await prisma.rooms.findUnique({
            where: {
                id: order.roomId
            }
        });
        if(!room){
            return;
        }
        const invoice = await prisma.invoice.findFirst({
            where: {
                orderId: orderId
            }
        });
        if(!invoice){
            return;
        }
        const nights = Math.floor((new Date(order.toDate).getTime() - new Date(order.fromDate).getTime()) / (1000 * 60 * 60 * 24));
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD
            }
          });
          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Cheetah Booking - Invoice',
            html: `<h1>Invoice</h1>
                <div style="display: flex; justify-content: space-between;">
                    <img src="../client/public/cheetahbooking-high-resolution-logo.png" alt="Cheetah Logo" />
                    <p>Mr./Mrs. ${invoice.name}</p>
                    <p>${invoice.email}</p>
                    <p>${invoice.address}</p>
                    <p>${invoice.city}, ${invoice.postalCode}</p>
                    <p>${invoice.country}</p>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>Reckoning</th>
                        </tr>
                        <tr>
                            <td>Order Id:</td>
                            <td>${invoice.orderId}</td>
                        </tr>
                    </tbody>
                </table>
            <table>
                <tbody>
                    <tr>
                        <th>Hotel</th>
                    </tr>
                    <tr>
                        <td>Name:</td>
                        <td>${hotel.name}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>${hotel.address}, ${hotel.city}, ${hotel.country}</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <th>Room</th>
                    </tr>
                    <tr>
                        <td>Name:</td>
                        <td>${room.roomNumber}</td>
                    </tr>
                    <tr>
                        <td>Adult price: </td>
                        <td>${order.adults}*${room.priceForPerson} | ${order.adults * room.priceForPerson}</td>
                    </tr>
                    <tr>
                        <td>Children price: </td>
                        <td>${order.children}*${room.childrenPrice} | ${order.children * room.childrenPrice}</td>
                    </tr>
                    <tr>
                        <td>Discount: </td>
                        <td>${room.discount ? room.discount * 100 : `0`}%</td>
                    </tr>
                    <tr>
                        <td>Parking fee: </td>
                        <td>${order.carParkFee}*${nights} | ${order.carParkFee * nights}</td>
                    </tr>
                    <tr>
                        <td>Total price: </td>
                        <td>${order.fullPrice}</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <th>Dates</th>
                    </tr>
                    <tr>
                        <td>Check-in:</td>
                        <td>${order.fromDate}, 12:00</td>
                    </tr>
                    <tr>
                        <td>Check-out:</td>
                        <td>${order.toDate} 10:00</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <th>Payment</th>
                    </tr>
                    <tr>
                        <td>Status:</td>
                        <td>Paid</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <th>People count</th>
                    </tr>
                    <tr>
                        <td>Adults:</td>
                        <td>${order.adults}</td>
                    </tr>
                    <tr>
                        <td>Children:</td>
                        <td>${order.children}</td>
                    </tr>
                </tbody>
            </table>
            <p>Thank you for choosing Cheetah Booking</p>`
        };    
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(`../client/public/invoice/invoice_${orderId}.pdf`));

        // Funkcja sprawdzająca i ewentualnie przenosząca do nowej strony
        function checkAndAdvancePage(textHeight: number) {
            if (textY + textHeight > doc.page.height - 50) {
                doc.addPage();
                textY = 50;
            }
        }

        // Ustawienia zdjęcia
        const imageWidth = 300;
        const imageHeight = 250;
        const imageX = (doc.page.width - imageWidth) / 2;
        const imageY = 50;
        doc.image('../client/public/cheetahbooking-high-resolution-logo.png', imageX, imageY, { width: imageWidth, height: imageHeight });

        // Początkowa pozycja tekstu
        let textY = imageY + imageHeight + 50;

        // Nagłówek
        doc.fontSize(25).text('Invoice', 100, textY);
        textY += 50;

        doc.moveTo(100, textY).lineTo(500, textY).stroke();
        textY += 20;

        // Dane osobowe
        doc.fontSize(15).text(`Mr./Mrs. ${invoice.name}`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);
        doc.fontSize(15).text(`${invoice.email}`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);
        doc.fontSize(15).text(`${invoice.address}`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);
        doc.fontSize(15).text(`${invoice.city}, ${invoice.postalCode}`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);
        doc.fontSize(15).text(`${invoice.country}`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);

        doc.moveTo(100, textY).lineTo(500, textY).stroke();
        textY += 20;

        // Rozliczenie
        doc.fontSize(15).text('Reckoning', 100, textY);
        textY += 30;
        checkAndAdvancePage(30);
        doc.fontSize(15).text(`Order id: ${invoice.orderId}`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);

        // Hotel
        doc.fontSize(15).text('Hotel', 100, textY);
        textY += 30;
        checkAndAdvancePage(30);
        doc.fontSize(15).text(`Name: ${hotel.name}`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);
        doc.fontSize(15).text(`Address: ${hotel.address}, ${hotel.city}, ${hotel.country}`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);

        // Pokój
        doc.fontSize(15).text('Room', 100, textY);
        textY += 30;
        checkAndAdvancePage(30);
        doc.fontSize(15).text(`Name: ${room.roomNumber}`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);
        const adultPrice = order.adults * room.priceForPerson;
        doc.fontSize(15).text(`Adult price: ${order.adults}*${room.priceForPerson} | ${adultPrice}PLN`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);
        const childrenPrice = order.children * room.childrenPrice;
        doc.fontSize(15).text(`Children price: ${order.children}*${room.childrenPrice} | ${childrenPrice}PLN`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);
        doc.fontSize(15).text(`All nights: (${adultPrice + childrenPrice})*${nights} | ${(adultPrice+childrenPrice)*nights}PLN`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);
        room.discount ? doc.fontSize(15).text(`Discount: ${room.discount * 100}%`, 100, textY) : doc.fontSize(15).text(`Discount: 0%`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);
        doc.fontSize(15).text(`Parking fee: ${order.carParkFee}*${nights} | ${order.carParkFee * nights}PLN`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);

        doc.moveTo(100, textY).lineTo(300, textY).stroke();
        doc.fontSize(15).text(`Total price: ${order.fullPrice}PLN`, 100, textY + 10);
        textY += 30;
        checkAndAdvancePage(30);

        doc.moveTo(100, textY).lineTo(500, textY).stroke();
        textY += 20;

        // Daty
        doc.fontSize(15).text('Dates', 100, textY);
        textY += 30;
        checkAndAdvancePage(30);
        doc.fontSize(15).text(`Check-in: ${order.fromDate.toISOString().split('T')[0]}, 12:00`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);
        doc.fontSize(15).text(`Check-out: ${order.toDate.toISOString().split('T')[0]}, 10:00`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);

        doc.moveTo(100, textY).lineTo(500, textY).stroke();
        textY += 20;

        // Płatność
        doc.fontSize(15).text('Payment', 100, textY);
        textY += 30;
        checkAndAdvancePage(30);
        doc.fontSize(15).text(`Status: Paid`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);

        doc.moveTo(100, textY).lineTo(500, textY).stroke();
        textY += 20;

        // Osoby
        doc.fontSize(15).text('People', 100, textY);
        textY += 30;
        checkAndAdvancePage(30);
        doc.fontSize(15).text(`Adults: ${order.adults}`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);
        doc.fontSize(15).text(`Children: ${order.children}`, 100, textY);
        textY += 30;
        checkAndAdvancePage(30);

        doc.moveTo(100, textY).lineTo(500, textY).stroke();
        textY += 20;

        doc.fontSize(15).text('Thank you for choosing Cheetah Booking!', 100, textY);

        doc.end();


        console.log('invoice sent')
        return "Invoice sent";
    }catch(error){
        console.log(error);
        return error;
    }
}

export default sendInvoice;