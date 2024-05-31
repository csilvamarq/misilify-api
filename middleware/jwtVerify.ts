import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

const JWTMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    else {
        try {
            const decoded = jwtDecode<JwtPayload>(token)
            console.log(decoded)
            if (typeof decoded === "string") {
                return res.status(401).json({ message: "Unauthorized" });
            }
            // @ts-ignore
            req.user = decoded;
            next(

            )
        } catch (error) {
            res.send({ message: "Unauthorized", error: token})
        }
    }
}

export default JWTMiddleware