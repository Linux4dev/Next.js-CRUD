import { useForm } from 'react-hook-form';
import Router from 'next/router'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getServerSideProps() {
    const books = await prisma.book.findMany()
    await prisma.$disconnect()

    return {
        props: {
            books
        },
    }
}

async function deleteBook(id) {
    await fetch(`/api/delete/${id}`, {
        method: 'DELETE'
    })
    Router.push('/')
}

async function saveBook(book, element) {
    await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify(book)
    })
    element.target.reset()
    Router.push('/')
}

function CreateBook() {
    const { handleSubmit, register, errors } = useForm();

    return (
        <div>
            <hr />
            <form onSubmit={handleSubmit(saveBook)}>
                <input name="Name" placeholder="Name" ref={register({ required: true })} />
                <input name="Author" placeholder="Author" ref={register({ required: true })} />

                <button type="submit">Create</button>

                {errors.Name && <span>  *Name is required  </span>}
                {errors.Author && <span>  *Author is required  </span>}
            </form>
            <hr />
        </div>
    )
}

function index(props) {
    return (
        <div>
            <h1>A simple 'CRUD' with Next.js and Prisma</h1>
            <h2>My book list</h2>
            <CreateBook />
            {props.books.map((book, index) =>
                <div key={index}>
                    <hr />
                    {book.Name}
                    <button onClick={() => { deleteBook(book.id) }}>Delete</button>
                    <a href={`/${book.id}`}><button>Read</button></a>
                    <hr />
                </div>
            )}

        </div>
    )
}

export default index