import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createBook(req, res) {
    if (req.method !== 'POST')
        return res.status(405).json({ message: 'Method not allowed' })

    try {
        const savedBook = await prisma.book.create({
             data: JSON.parse(req.body) 
            })
        await prisma.$disconnect()
        res.status(200).json(savedBook)
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong' })
    }
}

export default createBook