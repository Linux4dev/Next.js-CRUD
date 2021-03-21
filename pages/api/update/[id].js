import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateBook(req, res) {
    if (req.method !== 'POST')
        return res.status(405).json({ message: 'Method not allowed' })

    try {
        const updateBook = await prisma.book.update({
            where: { 
                id: req.query.id 
            },
            data: JSON.parse(req.body)
        })
        await prisma.$disconnect()
        res.status(200).json(updateBook)
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong' })
    }
}

export default updateBook