import { useForm } from 'react-hook-form';
import Router from 'next/router'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getServerSideProps(context) {
    const id = context.query.id
    const book = await prisma.book.findUnique({
        where: {
            id: id
        }
    })
    await prisma.$disconnect()

    return {
        props: {
            book,
            id
        }
    }
}

function view(props) {
    const { handleSubmit, register, errors } = useForm();

    async function onSubmit(data, element) {
        await fetch(`/api/update/${props.id}`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        element.target.reset()
        Router.push(`/${props.id}`)        
    }

    return (
        <div>
            <hr />
            <h3>Name: {props.book.Name}</h3>
            <h3>Author: {props.book.Author}</h3>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="Name" placeholder="Name" ref={register({ required: true })} />
                <input name="Author" placeholder="Author" ref={register({ required: true })} />

                <button type="submit">Update</button>

                {errors.Name && <span>  *Name is required  </span>}
                {errors.Author && <span>  *Author is required  </span>}
            </form>
            <hr />
            <button onClick={() => {Router.push('/')}}>Return</button>
            <hr />
        </div>
    )
}

export default view