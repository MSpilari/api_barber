import { prismaClient } from '../configs/prismaClient'
import { Request, Response } from 'express'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password)
        return res.status(400).json({ error: 'Email/Password missing !' })

    const userExists = await prismaClient.barber.findFirst({
        where: { email }
    })

    if (!userExists)
        return res.status(400).json({ error: "Email don't exists." })

    const passwordIsValid = await compare(password, userExists?.password || '')

    if (!passwordIsValid)
        return res.status(400).json({ error: 'Wrong email/password' })

    const token =
        process.env.JWT_SECRET &&
        sign({ _id: userExists.id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

    if (!token)
        return res
            .status(500)
            .json({ error: 'Internal server error - Token Error' })

    return res
        .header('token', `Bearer ${token}`)
        .json({ message: 'User logged in successfully !' })
        .status(200)
}

export { Login }
