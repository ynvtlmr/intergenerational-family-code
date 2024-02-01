import React from 'react'
import {User,columns} from "./columns"
import{DataTable} from "../../components/ui/data-table"

async function getUsers(): Promise<[User]> {
        const res = await fetch ("https://65bb17dfb4d53c066553ffdf.mockapi.io/api/users")
        const data = await res.json()
        return data
}

export default async function Page() {
        const data = await getUsers ()
return (
        <section className="py-24">
                <div className='container'>
                        <h1 className='text-center text-3xl font-bold mb-8'>Policy tree</h1>
                        <DataTable columns={columns} data={data} />
                </div>
</section>
)
}