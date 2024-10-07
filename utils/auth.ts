import jwt from 'jsonwebtoken'

export function signJWT(id: string): string

export function signJWT(id: string) {
    const runtimeConfig = useRuntimeConfig()
    const token = jwt.sign({ role: 'bot', sub: id }, runtimeConfig.supabaseJwt, {
        expiresIn: '5m',
    })
    return token
}