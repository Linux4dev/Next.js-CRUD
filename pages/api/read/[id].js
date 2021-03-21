import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function readBook(req, res) {
    if (req.method !== 'GET')
        return res.status(405).json({ message: 'Method not allowed' })

    try {
        const book = await prisma.book.findUnique({
            where: {
                id: req.query.id
            }
        })
        await prisma.$disconnect()
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong' })
    }
}

export default readBook