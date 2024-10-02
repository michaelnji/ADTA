import type { StatusCode } from "~/server/types";


const errorDefaults = {
    messages: {
        default: 'an error occurred',
        server: {
            loginFailed: 'login failed; invalid email or password',
            noConnection: 'You are offline, check internet connection',
            internalError: 'we have encountered an internal error. Please reload the page',
            noAuthorization: "non autorisé, veuillez vous connecter pour continuer",
            forbidden: "Vous n'êtes pas autorisé à effectuer cette action"
        }
    }
    , codes: {

        noAuthorization: 401,
        serverError: 500,
        notFound: 404,
        forbidden: 403
    }

}

export function genErrorMessage(error: unknown, status: StatusCode): string {
    const stringRep = `${error}`;
    if (stringRep.includes('fetch failed') || stringRep.includes('Failed to fetch')) return errorDefaults.messages.server.noConnection
    // if (status === 500) {
    // }
    if (status === 401) {
        return errorDefaults.messages.server.noAuthorization
    }
    if (status === errorDefaults.codes.forbidden) return errorDefaults.messages.server.forbidden

    return `${error}`.split("Error:")[1] ?? stringRep
}

