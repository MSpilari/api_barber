import { IncomingHttpHeaders } from 'http'

declare module 'http' {
    export interface IncomingHttpHeaders {
        token?: string
    }
}
