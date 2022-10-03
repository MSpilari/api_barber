import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

const authToken = (req: Request, res: Response, next: NextFunction) => {
    const fullToken = req.headers.token

    const token = fullToken && fullToken.split(' ')

    const isAValidToken =
        token &&
        process.env.JWT_SECRET &&
        verify(token[1], process.env.JWT_SECRET)

    if (!token || !isAValidToken)
        return res.status(403).json({ error: 'Token not found/invalid' })

    return next()
}

export { authToken }
