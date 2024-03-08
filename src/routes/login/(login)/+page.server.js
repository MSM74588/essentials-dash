import { error, redirect } from '@sveltejs/kit'

export const actions = {
    login: async({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())

        try {
            await locals.pb.collection('users').authWithPassword(body.email, body.password)
        } catch (err) {
            console.log(err)
            console.log(err.status)

            if (err.status == 0) {
                console.log("STATUS ZERO, CHECK IF PB is running or configured correctly - Trigger sonner")
            }

            throw error(500, 'Something went wrong')
        }

        throw redirect(303, '/')
    }



    
}