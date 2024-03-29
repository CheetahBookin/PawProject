import nodemailer from 'nodemailer'
import jsPDf from 'jspdf'
import path from 'path'
import fs from 'fs'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const sendInvoice = async (email: string, orderId: string) => {
  try {
    const order = await prisma.orders.findUnique({
      where: {
        id: orderId,
      },
    })
    if (!order) {
      return
    }
    const user = await prisma.user.findUnique({
      where: {
        id: order.userId,
      },
    })
    if (!user) {
      return
    }
    const hotel = await prisma.accomodation.findUnique({
      where: {
        id: order.hotelId,
      },
      include: {
        images: true,
      },
    })
    if (!hotel) {
      return
    }
    const room = await prisma.rooms.findUnique({
      where: {
        id: order.roomId,
      },
    })
    if (!room) {
      return
    }
    const invoice = await prisma.invoice.findFirst({
      where: {
        orderId: orderId,
      },
    })
    if (!invoice) {
      return
    }
    const nights = Math.floor(
      (new Date(order.toDate).getTime() - new Date(order.fromDate).getTime()) /
        (1000 * 60 * 60 * 24),
    )
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    if(!invoice.name || !invoice.email || !invoice.address || !invoice.city || !invoice.postalCode || !invoice.country){
      return 'Invoice not found'
    }
    const templatePath = path.join(__dirname, 'emailTemplate.html')
    let emailTemplate = fs.readFileSync(templatePath, 'utf8')
    const logoPath = path.join(__dirname, '..', '..', '..', 'client', 'public', 'cheetahbooking-high-resolution-logo.png')
    emailTemplate = emailTemplate.replace('{{logo}}', logoPath)
    emailTemplate = emailTemplate.replace('{{name}}', invoice.name)
    emailTemplate = emailTemplate.replace('{{email}}', invoice.email)
    emailTemplate = emailTemplate.replace('{{address}}', invoice.address)
    emailTemplate = emailTemplate.replace('{{city}}', invoice.city)
    emailTemplate = emailTemplate.replace('{{postalCode}}', invoice.postalCode)
    emailTemplate = emailTemplate.replace('{{country}}', invoice.country)
    emailTemplate = emailTemplate.replace('{{orderId}}', orderId)
    emailTemplate = emailTemplate.replace('{{hotelName}}', hotel.name)
    emailTemplate = emailTemplate.replace('{{hotelAddress}}', hotel.address)
    emailTemplate = emailTemplate.replace('{{hotelCity}}', hotel.city)
    emailTemplate = emailTemplate.replace('{{hotelCountry}}', hotel.country)
    emailTemplate = emailTemplate.replace('{{roomNumber}}', room.roomNumber)
    emailTemplate = emailTemplate.replace('{{adults}}', order.adults.toString())
    emailTemplate = emailTemplate.replace('{{priceForPerson}}', room.priceForPerson.toString())
    emailTemplate = emailTemplate.replace('{{adultPrice}}', (order.adults * room.priceForPerson).toString())
    emailTemplate = emailTemplate.replace('{{children}}', order.children.toString())
    emailTemplate = emailTemplate.replace('{{childrenPrice}}', room.childrenPrice.toString())
    emailTemplate = emailTemplate.replace('{{finalChildrenPrice}}', (order.children * room.childrenPrice).toString())
    emailTemplate = emailTemplate.replace('{{nights}}', nights.toString())
    emailTemplate = emailTemplate.replace('{{carParkFee}}', order.carParkFee.toString())
    emailTemplate = emailTemplate.replace('{{carParkFeeFull}}', (order.carParkFee * nights).toString())
    emailTemplate = emailTemplate.replace('{{discount}}', room.discount ? (room.discount * 100).toString() : '0')
    emailTemplate = emailTemplate.replace('{{fullPrice}}', order.fullPrice.toString())
    emailTemplate = emailTemplate.replace('{{fromDate}}', order.fromDate.toISOString().split('T')[0])
    emailTemplate = emailTemplate.replace('{{toDate}}', order.toDate.toISOString().split('T')[0])
    emailTemplate = emailTemplate.replace('{{adults}}', order.adults.toString())
    emailTemplate = emailTemplate.replace('{{children}}', order.children.toString())
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Cheetah Booking - Invoice',
      html: emailTemplate,
      attachments: [
        {
          filename: "cheetahbooking-high-resolution-logo.png",
          path: logoPath,
          cid: 'logoID'
        },
      ],
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
    const pdf = new jsPDf()
    pdf.text(`Invoice for order ${orderId}`, 10, 10)
    pdf.text(`Name: ${invoice.name}`, 10, 20)
    pdf.text(`Email: ${invoice.email}`, 10, 30)
    pdf.text(`Address: ${invoice.address}`, 10, 40)
    pdf.text(`City: ${invoice.city}`, 10, 50)
    pdf.text(`Postal code: ${invoice.postalCode}`, 10, 60)
    pdf.text(`Country: ${invoice.country}`, 10, 70)
    pdf.text(`Order ID: ${orderId}`, 10, 80)
    pdf.text(`Hotel name: ${hotel.name}`, 10, 90)
    pdf.text(`Hotel address: ${hotel.address}`, 10, 100)
    pdf.text(`Hotel city: ${hotel.city}`, 10, 110)
    pdf.text(`Hotel country: ${hotel.country}`, 10, 120)
    pdf.text(`Room: ${room.roomNumber}`, 10, 130)
    pdf.text(`Adults: ${order.adults}`, 10, 140)
    pdf.text(`Price for adult: ${room.priceForPerson}PLN`, 10, 150)
    pdf.text(`Adult price: ${order.adults * room.priceForPerson}PLN`, 10, 160)
    pdf.text(`Children: ${order.children}`, 10, 170)
    pdf.text(`Price for children: ${room.childrenPrice}PLN`, 10, 180)
    pdf.text(`Children price: ${order.children * room.childrenPrice}PLN`, 10, 190)
    pdf.text(`Nights: ${nights}`, 10, 200)
    pdf.text(`Car park fee: ${order.carParkFee}`, 10, 210)
    pdf.text(`Full parking fee: ${order.carParkFee * nights}PLN`, 10, 220)
    pdf.text(`Discount: ${room.discount ? `${room.discount*100}%` : '0'}`, 10, 230)
    pdf.text(`Full price: ${order.fullPrice}PLN`, 10, 240)
    pdf.text(`From: ${order.fromDate.toISOString().split('T')[0]}`, 10, 250)
    pdf.text(`To: ${order.toDate.toISOString().split('T')[0]}`, 10, 260)
    pdf.text(`Adults: ${order.adults}`, 10, 270)
    pdf.text(`Children: ${order.children}`, 10, 280)
    const pdfPath = path.join(__dirname, '..', '..', '..', 'client', 'public', 'invoice', `invoice_${orderId}.pdf`)
    pdf.save(pdfPath)
    return 'Invoice sent'
  } catch (error) {
    console.log(error)
    return error
  }
}

export default sendInvoice
