import { error, redirect, fail } from '@sveltejs/kit'


import { consola, createConsola } from "consola";


export const load = ({ locals }) => {
    if (locals?.user) {
        throw redirect(303, '/')
    }
}

export const actions = {
    login: async({ request, locals }) => {
        

        const body = Object.fromEntries(await request.formData())

        // console.log(body)

        consola.box(body);

        // const formData = 

        // const username_email = body.username_email
        
        const email = body.email
        const password = body.password

        consola.box(email)

        if (!email || !password) {
			return fail(400, { email, missing: "Missing username or password"});
		}
        // if (!password) {
        //     return fail(400, {})
        // }

        consola.box(`${email} + ${password}`)

        try {
            await locals.pb.collection('users').authWithPassword(email, password)
        } catch (err) {
            console.log(err)
            console.log(err.status)

            if (err.status == 0) {
                console.log("STATUS ZERO, CHECK IF PB is running or configured correctly - Trigger sonner")
            }

            if (err.status == 400) {
                return fail(400, {incorrect: err.data.message})
            }

            throw error(500, 'Something went wrong')
        }

        throw redirect(303, '/')
    }



    
}