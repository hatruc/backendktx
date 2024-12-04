import express from "express"
import staffController from "../controller/staffController"

const router = express.Router()

router.get('/test', staffController.testApiStaff)
router.post('/login', staffController.login)
router.get('/staff-detail/:id', staffController.getStaffDetail)
router.get('/staff-list', staffController.getListStaffWithPagination)
router.post('/create-staff', staffController.createNewStaff)
router.put('/update-staff/:id', staffController.updateStaff)
router.delete('/delete-staff', staffController.deleteStaff)

export default router