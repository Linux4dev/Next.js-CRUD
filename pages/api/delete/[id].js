import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function deleteBook(req, res) {
    if (req.method !== 'DELETE')
        return res.status(405).json({ message: 'Method not allowed' })

    try {
        const deleteBook = await prisma.book.delete({
            where: { 
                id: req.query.id 
            }
        })
        await prisma.$disconnect()
        res.status(200).json(deleteBook)
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong' })
    }
}

export default deleteBook