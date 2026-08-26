// src/utils/xapi.ts

import { ACTIVITY_NAME } from '../globalConfig'

interface UserData {
    email: string
    name: string
    photoUrl?: string
}

interface StatementPayload {
    verb: string
    name: string
    actor_mbox: string
    statement: Record<string, any>
}

interface StatementResponse {
    success: boolean
    message: string
    data: {
        id: number
        created_at: string
    }
}

interface FetchStatementsResponse {
    success: boolean
    data: Array<{
        id: number
        statement: any
        actor_mbox: string
        verb_id: number
        scorm_object_id: number
        created_at: string
        updated_at: string
    }>
}

const getUserData = (): UserData | null => {
    try {
        const stored = localStorage.getItem('user_data')
        if (!stored) return null
        return JSON.parse(stored) as UserData
    } catch {
        return null
    }
}

export const sendXAPIStatement = async (
    verb: string,
    additionalStatement: Partial<Record<string, any>> = {},
): Promise<StatementResponse | null> => {
    const userData = getUserData()
    if (!userData?.email) {
        console.warn('xAPI: user data tidak ditemukan')
        return null
    }

    const defaultStatement = {
        actor: {
            objectType: 'Peserta',
            mbox: userData.email,
            name: userData.name,
            photo: userData.photoUrl || '',
        },
    }

    const finalStatement = {
        ...defaultStatement,
        ...additionalStatement,
        context: {
            ...(additionalStatement.context || {}),
            extensions: {
                ...(additionalStatement.context?.extensions || {}),
            },
        },
    }

    const payload: StatementPayload = {
        verb,
        name: ACTIVITY_NAME,
        actor_mbox: userData.email,
        statement: finalStatement,
    }

    try {
        const response = await fetch(
            'https://ptp.hafidhi.com/api/xapi/statements',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            },
        )
        const data: StatementResponse = await response.json()
        if (!data.success) {
            console.error('xAPI gagal:', data)
        }
        return data
    } catch (error) {
        console.error('xAPI error:', error)
        return null
    }
}

export const fetchXAPIStatements = async (
    verb: string,
    name: string = ACTIVITY_NAME,
    direction: 'latest' | 'all' = 'latest',
): Promise<FetchStatementsResponse['data'] | null> => {
    const url = new URL('https://ptp.hafidhi.com/api/xapi/statements')
    url.searchParams.append('verb', verb)
    url.searchParams.append('name', name)
    url.searchParams.append('direction', direction)

    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        const data: FetchStatementsResponse = await response.json()
        if (data.success) {
            return data.data
        } else {
            console.error('xAPI fetch gagal:', data)
            return null
        }
    } catch (error) {
        console.error('xAPI fetch error:', error)
        return null
    }
}
