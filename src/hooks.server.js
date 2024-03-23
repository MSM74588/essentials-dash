import PocketBase from 'pocketbase' 

import { serializeNonPOJOs } from '$lib/helpers/utils'
import { error } from '@sveltejs/kit'

export const handle = async ({ event, resolve }) => {

    let pb_route = 'http://localhost:8090'

    const isServerAvailable = await checkServerAvailability(pb_route);
    
    if (!isServerAvailable) {
        throw error(500, "PocketBase server is not available");
    }


    // event.locals.pb = new PocketBase(pb_route)

    // try {
    //     event.locals.pb = new PocketBase(pb_route)
    // } catch (err) {
    //     console.log(err)
    //     throw error(500, "Something bad happened")
    // }

    try {
        event.locals.pb = new PocketBase(pb_route);
        console.log('PocketBase initialized successfully');
    } catch (err) {
        console.error('Error initializing PocketBase:', err);
        throw error(500, "Failed to establish connection with PocketBase");
    }

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

/**
 * @param {RequestInfo | URL} url
 */
async function checkServerAvailability(url) {
    let pb_url = `${url}/api/health`
    try {
        const response = await fetch(pb_url);
        return response.ok;
    } catch (err) {
        console.error('Error checking server availability:', err);
        return false;
    }
}