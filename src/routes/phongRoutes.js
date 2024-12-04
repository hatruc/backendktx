import express from "express"
import roomController from "../controller/roomController"

const router = express.Router()

router.get('/test', roomController.testApiPhong)
router.post('/create-room', roomController.createNewRoom)
router.get('/room-detail/:id', roomController.getRoomDetail)
router.get('/room-list', roomController.getListRoomWithPagination)


export default router
