import PocketBase from 'pocketbase'
import { serializeNonPOJOs } from '$lib/helpers/utils'

export const handle = async ({ event, resolve }) => {

    let pb_route = 'http://localhost:8090'

    event.locals.pb = new PocketBase(pb_route)


    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

    if (event.locals.pb.authStore.isValid) {
        event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model)
    } else {
        event.locals.user = undefined
    }

    

    const response = await resolve(event)

    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }))

    return response
}