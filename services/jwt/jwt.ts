import * as jwt from 'jsonwebtoken'

export const generateJWT = (text : string) : string => {
    const token = jwt.sign({text}, process.env.JWT_SECRET || '')
    return token
}

export const verifyJWT = (token : string) : string | jwt.JwtPayload => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '')
    return decoded
}