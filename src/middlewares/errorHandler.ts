import { NextFunction, Request, Response } from 'express'

const errorHandler = (
    error: TypeError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return res.status(500).json({ err: error.name, errMessage: error.message })
}

export { errorHandler }
