import { Op } from "sequelize"
import db from "../models"
import studentService from "../service/studentService"

const testApiStudent = (req, res) => {
    const response = studentService.testApiStudent()
    return res.status(200).json(response)
}

const createNewStudent = async (req, res) => {

    try {

        const {
            mssv, ho_ten,
            gioi_tinh,
            dan_toc,
            ngay_sinh,
            cccd,
            uu_tien_id,
            ho_khau_tt,
            truong,
            khoa_vien,
            ma_nganh,
            khoa,
            lop,
            phong_id
        } = req.body

        // check mssv ton tai
        const studentMssv = await db.Sinh_Vien.findOne({
            where: {
                mssv: mssv
            }
        })

        // đổi ngày sinh sang string timestamp 
        const date = new Date(ngay_sinh)
        const timestamp = date.getTime()

        if (!studentMssv) {
            let data = await studentService.createNewStudent({ ...req.body, ngay_sinh: timestamp })

            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                data: data.data
            })
        } else {
            return res.status(400).json({
                EC: 1,
                EM: "Sinh viên đã có trong danh sách thuê ký túc xá !",
                data: studentMssv
            })
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: `error from studentController server...`, // error message
            EC: 2, // error code
            data: '', // data
        })
    }

}

const getStudentDetail = async (req, res) => {

    try {

        if (req.params.id) {
            let data = await studentService.getStudentDetail(req.params.id)
            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                data: data.data, // data
            })
        } else {
            return res.status(404).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                data: data.data, // data
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            data: data.data, // data
        })
    }
}

const getListStudentWithPagination = async (req, res) => {

    try {

        if (req.query.page && req.query.limit) {
            let page = req.query.page
            let limit = req.query.limit

            let data = await studentService.getListStudentWithPagination(+page, +limit)

            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                data: data.data, // data
            })

        } else {
            let data = await studentService.getAllStudent()

            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                data: data.data, // data
            })
        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from studentController server...', // error message
            EC: 2, // error code
            data: '', // data
        })
    }

}

const updateStudent = async (req, res) => {

    try {

        const id = req.params.id
        const {
            mssv, ho_ten,
            gioi_tinh,
            dan_toc,
            ngay_sinh,
            cccd,
            uu_tien_id,
            ho_khau_tt,
            truong,
            khoa_vien,
            ma_nganh,
            khoa,
            lop,
            phong_id
        } = req.body

        // validate mssv
        const studentMssv = await db.Sinh_Vien.findOne({
            where: {
                id: {
                    [Op.ne]: id
                },
                mssv: mssv
            }
        })

        if (studentMssv) {
            return res.status(400).json({
                EC: 1,
                EM: "Mã số sinh viên đã tồn tại !",
                data: studentMssv
            })
        }

        // validate ngày sinh
        const date = new Date(ngay_sinh)
        const timestamp = date.getTime()
        const cutoffTimestamp = new Date('2006-01-01') // sinh viên phải lớn hơn 18 tuổi

        if (!timestamp) {
            return res.status(400).json({
                EC: 1,
                EM: "Ngày sinh không hợp lệ !",
                data: ""
            })
        } else if (timestamp > cutoffTimestamp) {
            return res.status(400).json({
                EC: 1,
                EM: "Sinh viên phải lớn hơn 18 tuổi !",
                data: ""
            })
        }

        let data = await studentService.updateStudent(id, { ...req.body, ngay_sinh: timestamp })

        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            data: data.data
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from studentController server...', // error message
            EC: 2, // error code
            data: '', // data
        })
    }

}

const deleteStudent = async (req, res) => {

    try {

        let data = await studentService.deleteStudent(req.query.id)

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            data: data.data, // data
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from studentController server...', // error message
            EC: 2, // error code
            data: '', // data
        })

    }

}

module.exports = {
    testApiStudent,
    createNewStudent,
    getStudentDetail,
    getListStudentWithPagination,
    updateStudent,
    deleteStudent
}