import { Request, Response } from 'express'
import { prismaClient } from '../prismaClient'
import { v2 as cloudinary } from 'cloudinary'
import { bufferToDataURI } from '../utils/bufferToDataURI'
import { hash } from 'bcrypt'

const AddBarber = async (req: Request, res: Response) => {
    const barberImage = bufferToDataURI(req)
    const { email, password, appointments } = req.body
    const hashPassword = await hash(password, 10)

    const emailAlreadyExists = await prismaClient.barber.findFirst({
        where: { email }
    })

    if (emailAlreadyExists)
        throw new Error('Sorry, this email is already in use.')

    if (barberImage && !emailAlreadyExists) {
        const avatarPic = await cloudinary.uploader.upload(barberImage, {
            folder: 'barbers avatar',
            public_id: email
        })

        const avatarPicURL = avatarPic.url

        await prismaClient.barber.create({
            data: {
                email,
                password: hashPassword,
                avatarUrl: avatarPicURL,
                appointments
            }
        })

        return res
            .status(201)
            .json({ message: 'Barber created successfully !' })
    }
}

export { AddBarber }
