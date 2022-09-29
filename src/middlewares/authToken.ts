import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

const authToken = (req: Request, res: Response, next: NextFunction) => {}

export { authToken }
