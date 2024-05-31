import { Router } from "express";
import { createUser, login } from "../controllers/userController";
import { deleteSong, getSongs, insertSong, updateSong } from "../controllers/songController";
import JWTMiddleware from "../middleware/jwtVerify";

const router = Router()

router.post("/login", login)
router.post("/register", createUser)

router.get("/songs/", JWTMiddleware, getSongs)
router.post("/addSong", JWTMiddleware, insertSong)
router.put("/updateSong/:id", JWTMiddleware, updateSong)
router.delete("/deleteSong/:id", JWTMiddleware, deleteSong)
export default router