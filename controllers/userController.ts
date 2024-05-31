import  User  from "../models/userModel"
import { generateJWT } from "../services/jwt/jwt"
import { Request, Response } from 'express'
import { compare, hashSync } from "bcryptjs"
const createUser = (req: Request, res: Response) => {
    const { nombre, apellido, email, password, } = req.body
    User.findOne({attributes:["id"], where: { email } }).then((user) => {
        if (user) {
            res.status(400).send({
                message: "User already exists"
            })
        }
        else {
            if (nombre && apellido && email && password) {
                const hash = hashSync(password, 10)
                console.log(req.body)
                User.create({
                    nombre:req.body.nombre,
                    apellido,
                    email,
                    password: hash
                }).then(() => {
                    res.send({
                        message: "User created",
                        body:req.body
                    })
                }).catch((err: Error) => {
                    res.status(500).send({
                        message: "Internal server error",
                        err
                    })
                })
            }
            else {
                res.status(400).send({
                    message: "Missing data",
                    data:req.body
                })
            }
        }
    })
}
const login = (req: Request, res: Response) => {
    const { email, password } = req.body
    console.log(req.body)
    User.findOne({ where: { email } }).then((user) => {
        // if user is found
        if (user) {
            compare(password, user.password, (err, result) => {
                if (result) {
                    const token = generateJWT(user.email)

                    res.send({
                        message: "User found",
                        token: token
                    })
                }
                else {
                    res.status(401).send({
                        message: "Invalid credentials"
                    })
                }
            })
            // create a token
        }
        else {
            res.send({
                status:400,
                message: "User not found"
            })
        }
    }).catch((err: Error) => {
        res.status(500).send({
            message: "Internal server error",
            err
        })
    })
}

export { login, createUser }