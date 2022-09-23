import { NextFunction, Request, Response } from 'express'

const errorHandler = (
    error: TypeError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return res.status(500).json({
        errPath: `Error occurred on a call to ${req.url}`,
        errMessage: error.message
    })
}

export { errorHandler }
