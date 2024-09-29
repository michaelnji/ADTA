import { serverSupabaseClient } from "#supabase/server"
import { compareDesc } from "date-fns"
import add from "date-fns/add"
import type { ServerResponse, StatusCode } from "~/server/types"
import type { PrivilegesFields } from "~/types"
import type { Database } from "~/types/database.types"

export const deletePrivilege = async (id: (string | undefined)) => {
    const response: ServerResponse<StatusCode, null> = await $fetch("/api/auth/privileges/delete", {
        method: "POST",
        body: { id },
        headers: useRequestHeaders(['cookie']),
        async onResponseError({ response }) {
            throw createError({ statusCode: response._data?.status, message: response._data?.message, fatal: true })
        },
    })
    return response
}

export async function fetchCurrentUserPrivileges(pid: string) {
    const resp: ServerResponse<StatusCode, PrivilegesFields[]> = await $fetch('/api/auth/privileges/fetch', {
        headers: useRequestHeaders(['cookie']),
        async onResponseError({ response }) {
            throw createError({ statusCode: response._data?.status, message: response._data?.message, fatal: true })
        }

    })
    if (resp.status === 200 && resp.data) return resp.data.filter((e) => e.requested_by === pid)[0]
}

export function checkPrivilegeValidity(privileges: PrivilegesFields) {
    const now = new Date()
    if (compareDesc(now, new Date(privileges.expires_at)) === 0 || compareDesc(now, new Date(privileges.expires_at)) === -1) return false

    return true
}

export const requestPrivilege = async (target: "branchements" | "normalization", actions: ("delete" | "modify" | "unlock" | "add")[], pid: string) => {
    const now = new Date()
    const currentUserPrivileges = await fetchCurrentUserPrivileges(pid)
    if (currentUserPrivileges) {
        console.log("exisiting privilege found")
        const authRequest = {
            ...currentUserPrivileges
        }
        authRequest.status = 'pending'
        authRequest.created_at = now.toISOString()
        authRequest.expires_at = add(now, {
            minutes: 60,
            seconds: 50
        }).toISOString()

        const targetPrivilege = authRequest.privileges.find((x) => x.target === target)
        if (!targetPrivilege) {
            authRequest.privileges.push({
                target,
                actions
            })
        }

        for (const action of actions) {
            if (!targetPrivilege?.actions.find((x: ("delete" | "modify" | "unlock" | "add")) => x === action)) {
                targetPrivilege?.actions.push(action)
            }
        }

        const response: ServerResponse<StatusCode, PrivilegesFields[]> = await $fetch("/api/auth/privileges/update", {
            method: "POST",
            body: { ...authRequest },
            headers: useRequestHeaders(['cookie']),
            async onResponseError({ response }) {
                throw new Error(response._data?.message)
            },
        })

        return response.data

    }
    const authRequest = {
        requested_by: pid,
        privileges: [{
            target,
            actions
        }],
        created_at: now,
        expires_at: add(now, {
            minutes: 60 * 24 * 7,
            seconds: 50
        }),
        status: 'pending',
    }
   

    const response: ServerResponse<StatusCode, PrivilegesFields[]> = await $fetch("/api/auth/privileges/request", {
        method: "POST",
        body: { ...authRequest },
        headers: useRequestHeaders(['cookie']),
        async onResponseError({ response }) {
            throw createError({ statusCode: response._data?.status, message: response._data?.message, fatal: true })
        },
    })
    if (response.data) {
        return response.data
    }

}