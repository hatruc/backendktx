import express from "express"
import userController from "../controller/userController"

const router = express.Router()

router.get('/test', userController.testApi)

export default router