import type { ServerResponse, StatusCode } from "~/server/types"
import type { BranchementFields, NormalizationFields } from "~/types"

export async function fetchNormalizationDataById(id: string) {
    const resp: ServerResponse<StatusCode, NormalizationFields[]> = await $fetch(`/api/travail/normalizations/get-single/${id}`, {
        headers: useRequestHeaders(['cookie']),
        async onResponseError({ response }) {
            throw createError({ statusCode: response._data?.status, message: response._data?.message, fatal: true })
        }
    })
    if (resp.status === 200 && resp.data) {
        return resp.data

    }

    throw new Error(resp.message)
}