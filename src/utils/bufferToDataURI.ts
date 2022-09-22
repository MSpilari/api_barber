import DataURIParser from 'datauri/parser'
import { Request } from 'express'

const parser = new DataURIParser()

const bufferToDataURI = (expressRequest: Request) => {
    if (expressRequest.file) {
        const { originalname, buffer } = expressRequest.file

        const [_, fileType] = originalname.split('.')

        return parser.format(`.${fileType}`, buffer).content
    }
}

export { bufferToDataURI }
