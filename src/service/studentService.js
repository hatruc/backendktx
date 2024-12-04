const db = require("../models")

const testApiStudent = () => {
    return "test api student"
}

const createNewStudent = async (newStudent) => {

    try {

        const { mssv, ho_ten, gioi_tinh, dan_toc, ngay_sinh, cccd, uu_tien_id, ho_khau_tt, truong, khoa_vien, ma_nganh, khoa, lop, phong_id }
            = newStudent

        // create new student
        const studentData = await db.Sinh_Vien.create({
            mssv,
            ho_ten,
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
        })

        return {
            EC: 0,
            EM: "Tạo mới sinh viên thành công !",
            data: studentData
        }

    } catch (error) {
        console.log(e);
        return {
            EM: 'somethings wrong in studentService.createNewStudent...',
            EC: 2
        }
    }

}

const getStudentDetail = async (id) => {

    try {

        let student = {}

        student = await db.Sinh_Vien.findOne({
            where: { id: id },
            attributes: [
                "id",
                "mssv",
                "ho_ten",
                "gioi_tinh",
                "dan_toc",
                "ngay_sinh",
                "cccd",
                "uu_tien_id",
                "ho_khau_tt",
                "truong", "khoa_vien",
                "ma_nganh", "khoa",
                "lop",
                "phong_id"
            ],
        })

        if (student) {
            return {
                EM: `Lấy chi tiết sinh viên ${student.ho_ten} thành công !`,
                EC: 0,
                data: student
            }
        } else {
            return {
                EM: `Không tìm thấy sinh viên !`,
                EC: 1,
                data: []
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'somethings wrong in studetenService.getStudentDetail...',
            EC: 2,
            DT: []
        }
    }
}

const getAllStudent = async () => {

    try {

        let student = await db.Sinh_Vien.findAll({
            attributes: [
                "id",
                "mssv",
                "ho_ten",
                "gioi_tinh",
                "dan_toc",
                "ngay_sinh",
                "cccd",
                "uu_tien_id",
                "ho_khau_tt",
                "truong", "khoa_vien",
                "ma_nganh", "khoa",
                "lop",
                "phong_id"
            ],
        })
        if (student) {
            return {
                EM: 'Lấy danh sách sinh viên thành công !',
                EC: 0,
                data: student
            }
        } else {
            return {
                EM: 'Lấy danh sách sinh viên thất bại !',
                EC: 1,
                data: []
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'somethings wrong in studentService.getAllStudent...',
            EC: 2,
            data: []
        }
    }

}

const getListStudentWithPagination = async (page, limit) => {

    try {

        let offset = (page - 1) * limit

        let { count, rows } = await db.Sinh_Vien.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: [
                "id",
                "mssv",
                "ho_ten",
                "gioi_tinh",
                "dan_toc",
                "ngay_sinh",
                "cccd",
                "uu_tien_id",
                "ho_khau_tt",
                "truong",
                "khoa_vien",
                "ma_nganh",
                "khoa",
                "lop",
                "phong_id"
            ],
            order: [['id', 'asc']]
        })

        let totalPages = Math.ceil(count / limit)
        let data = {
            totalRows: count,
            totalPages: totalPages,
            student: rows
        }

        return {
            EM: `Lấy danh sách sinh viên trang ${page} thành công !`,
            EC: 0,
            data: data
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'somethings wrong in studentService.getListStudentWithPagination...',
            EC: 2,
            data: []
        }
    }
}

const updateStudent = async (id, data) => {

    try {

        let student = await db.Sinh_Vien.findOne({
            where: { id: id }
        })

        if (student) {

            // update
            await student.update({
                mssv: data.mssv,
                ho_ten: data.ho_ten,
                gioi_tinh: data.gioi_tinh,
                dan_toc: data.dan_toc,
                ngay_sinh: data.ngay_sinh,
                cccd: data.cccd,
                uu_tien_id: data.uu_tien_id,
                ho_khau_tt: data.ho_khau_tt,
                truong: data.truong,
                khoa_vien: data.khoa_vien,
                ma_nganh: data.ma_nganh,
                khoa: data.khoa,
                lop: data.lop,
                phong_id: data.phong_id
            })

            return {
                EM: 'Cập nhật sinh viên thành công !', // error message
                EC: 0, // error code
                data: student, // student before update
            }

        } else {
            // not found
            return {
                EM: 'Không tìm thấy sinh viên !', // error message
                EC: 1, // error code
                data: '', // data
            }

        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'somethings wrong in studentService.updateStudent...', // error message
            EC: 2, // error code
            data: [], // data
        }
    }

}

const deleteStudent = async (id) => {

    try {

        let student

        student = await db.Sinh_Vien.findOne(({
            where: { id: id }
        }))

        if (student) {

            await student.destroy()

            return {
                EM: 'Xóa sinh viên thành công !',
                EC: 0,
                data: student // student deleted
            }

        } else {
            return {
                EM: 'Sinh viên không tồn tại !',
                EC: 1,
                data: []
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'somethings wrong in studentService.deleteStudent...', // error message
            EC: 2, // error code
            data: [], // data
        }
    }
}


module.exports = {
    testApiStudent,
    createNewStudent,
    getStudentDetail,
    getAllStudent,
    getListStudentWithPagination,
    updateStudent,
    deleteStudent,
}