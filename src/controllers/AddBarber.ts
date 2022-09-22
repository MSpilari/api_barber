import { Request, Response } from 'express'
import { prismaClient } from '../prismaClient'
import { v2 as cloudinary } from 'cloudinary'
import { bufferToDataURI } from '../utils/bufferToDataURI'

const AddBarber = async (req: Request, res: Response) => {
    const barberImage = bufferToDataURI(req)
    const { name, password } = req.body

    if (barberImage) {
        cloudinary.uploader
            .upload(barberImage, { folder: 'barbers avatar' })
            .then((result) => {
                const { url } = result
                return res.status(201).json({
                    name,
                    password,
                    avatarURL: url
                })
            })
            .catch((err) => res.status(400).json({ err }))
    }
}

export { AddBarber }
