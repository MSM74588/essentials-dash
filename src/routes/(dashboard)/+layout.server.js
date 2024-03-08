import { redirect } from '@sveltejs/kit'

export const load = ({ locals }) => {
    if (locals.user) {

        // FIXME: remove console.log later 
        console.log(locals)

        return {
            user: locals.user
        }
    }

    return {
        user: undefined

    }
}

