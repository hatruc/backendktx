import express from "express"
import studentController from "../controller/studentController"

const router = express.Router()

router.get('/test', studentController.testApiStudent)
router.get('/student-detail/:id', studentController.getStudentDetail)
router.get('/student-list', studentController.getListStudentWithPagination)
router.post('/create-new-student', studentController.createNewStudent)
router.put('/update-student/:id', studentController.updateStudent)
router.delete('/delete-student', studentController.deleteStudent)

export default router

