import { v2 as cloudinary } from 'cloudinary'
import { Request, Response } from 'express'
import { decode } from 'jsonwebtoken'
import { prismaClient } from '../configs/prismaClient'

const DeleteBarber = async (req: Request, res: Response) => {
    const { token } = req.headers

    if (token) {
        const [_, code] = token.split(' ')

        const barberId = decode(code, { json: true })

        const deletedBarber =
            barberId &&
            (await prismaClient.barber.findFirst({
                where: { id: barberId._id }
            }))

        deletedBarber &&
            (await cloudinary.uploader.destroy(deletedBarber.email)) &&
            (await prismaClient.barber.delete({
                where: { id: deletedBarber.id }
            }))

        return res.status(200).json({ message: 'Barber deleted successfully.' })
    }

    return res.status(403).json({ error: 'Token not found' })
}

export { DeleteBarber }
