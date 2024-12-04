
import { Op } from "sequelize"
import db from "../models/index"
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "./jwtService"

const salt = bcrypt.genSaltSync(10)

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt)
    return hashPassword
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword) // true or false
}

// validate phone
const checkPhoneValid = async (phone) => {
    const phoneNumberRegex = /^(?:\+84|0|\+1)?([1-9][0-9]{8,9})$/;
    return phoneNumberRegex.test(phone);
};

// kiem tra sdt ton tai
const checkPhoneExist = async (phone) => {

    let user = await db.Nhan_Vien.findOne({
        where: { phone: phone }
    })

    if (user) {
        return true
    }

    return false
}

// validate email
const checkEmailValid = async (email) => {
    // eslint-disable-next-line no-useless-escape
    const gmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return gmailRegex.test(email);
};

// kiem tra email ton tai
const checkEmailExist = async (email) => {

    let user = await db.Nhan_Vien.findOne({
        where: { email: email }
    })

    if (user) {
        return true
    }

    return false
}

const testApiStaff = () => {
    return "test api"
}

const login = async (userLogin) => {

    try {

        let staff = await db.Nhan_Vien.findOne({
            where: { username: userLogin.username }
        })

        if (staff) {

            const isCheckPassword = checkPassword(userLogin.password, staff.password)

            if (isCheckPassword) {

                const access_token = await generateAccessToken({
                    id: staff.id,
                    ho_ten: staff.ho_ten,
                    gioi_tinh: staff.gioi_tinh,
                    dan_toc: staff.dan_toc,
                    ngay_sinh: staff.ngay_sinh,
                    sdt: staff.sdt,
                    cccd: staff.cccd,
                    dia_chi: staff.dia_chi,
                    role: staff.role,
                    email: staff.email
                });

                const refresh_token = await generateRefreshToken({
                    id: staff.id,
                    role: staff.role,
                });

                return {
                    EM: 'Đăng nhập thành công!',
                    EC: 0,
                    data: {
                        access_token,
                        refresh_token,
                    }
                }
            }

        }

        return {
            EM: 'Tài khoản hoặc mật khẩu không chính xác!',
            EC: 1,
        }

    } catch (error) {

        console.log(error);

        return {
            EM: 'somethings wrong in staffService.login...',
            EC: 2
        }
    }

}

const createNewStaff = async (newStaff) => {

    try {

        const { ho_ten, gioi_tinh, dan_toc, ngay_sinh, sdt, cccd, dia_chi, role, email, username, password, rePassword } = newStaff

        // hash user password
        let hashPassword = hashUserPassword(password)

        // create new staff
        const staffData = await db.Nhan_Vien.create({
            ho_ten,
            gioi_tinh,
            dan_toc,
            ngay_sinh,
            sdt,
            cccd,
            dia_chi,
            role,
            email,
            username,
            password: hashPassword,
        })

        return {
            EC: 0,
            EM: "Tạo mới nhân viên thành công !",
            data: staffData
        }

    } catch (error) {
        console.log(e);
        return {
            EM: 'somethings wrong in staffService.createNewStaff...',
            EC: 2
        }
    }

}

const getStaffDetail = async (id) => {

    try {

        let staff = {}

        staff = await db.Nhan_Vien.findOne({
            where: { id: id },
            attributes: ["id", "ho_ten", "gioi_tinh", "dan_toc", "ngay_sinh", "sdt", "cccd", "dia_chi", "role", "email"],
        })

        if (staff) {
            return {
                EM: `Lấy chi tiết nhân viên ${staff.ho_ten} thành công !`,
                EC: 0,
                data: staff
            }
        } else {
            return {
                EM: `Không tìm thấy nhân viên !`,
                EC: 1,
                data: []
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'somethings wrong in staffService.getStaffDetail...',
            EC: 2,
            DT: []
        }
    }
}

const getAllStaff = async () => {

    try {

        let staff = await db.Nhan_Vien.findAll({
            where: {
                role: {
                    [Op.ne]: "manager"
                }
            },
            attributes: ["id", "ho_ten", "gioi_tinh", "dan_toc", "ngay_sinh", "sdt", "cccd", "dia_chi", "role", "email"],
        })
        if (staff) {
            return {
                EM: 'Lấy danh sách nhân viên thành công !',
                EC: 0,
                data: staff
            }
        } else {
            return {
                EM: 'Lấy danh sách nhân viên thất bại !',
                EC: 1,
                data: []
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'somethings wrong in staffService.getAllStaff...',
            EC: 2,
            data: []
        }
    }

}

const getListStaffWithPagination = async (page, limit) => {

    try {

        let offset = (page - 1) * limit

        let { count, rows } = await db.Nhan_Vien.findAndCountAll({
            offset: offset,
            limit: limit,
            where: {
                role: {
                    [Op.ne]: "manager"
                }
            },
            attributes: ["id", "ho_ten", "gioi_tinh", "dan_toc", "ngay_sinh", "sdt", "cccd", "dia_chi", "role", "email"],
            order: [['id', 'asc']]
        })

        let totalPages = Math.ceil(count / limit)
        let data = {
            totalRows: count,
            totalPages: totalPages,
            staff: rows
        }

        return {
            EM: `Lấy danh sách nhân viên trang ${page} thành công !`,
            EC: 0,
            data: data
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'somethings wrong in staffService.getListStaffWithPagination...',
            EC: 2,
            data: []
        }
    }
}

const updateStaff = async (id, data) => {

    try {

        let staff = await db.Nhan_Vien.findOne({
            where: { id: id }
        })

        if (staff) {

            // update
            await staff.update({
                ho_ten: data.ho_ten,
                gioi_tinh: data.gioi_tinh,
                dan_toc: data.dan_toc,
                ngay_sinh: data.ngay_sinh,
                sdt: data.sdt,
                cccd: data.cccd,
                dia_chi: data.dia_chi,
                role: data.role,
                email: data.email,
            })

            return {
                EM: 'Cập nhật nhân viên thành công !', // error message
                EC: 0, // error code
                data: staff, // staff before update
            }

        } else {
            // not found
            return {
                EM: 'Không tìm thấy nhân viên !', // error message
                EC: 1, // error code
                data: '', // data
            }

        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'somethings wrong in staffService.updateStaff...', // error message
            EC: 2, // error code
            data: [], // data
        }
    }

}

const deleteStaff = async (id) => {

    try {

        let staff

        staff = await db.Nhan_Vien.findOne(({
            where: { id: id }
        }))

        if (staff) {

            await staff.destroy()

            return {
                EM: 'Xóa nhân viên thành công !',
                EC: 0,
                data: staff // staff deleted
            }

        } else {
            return {
                EM: 'Nhân viên không tồn tại !',
                EC: 1,
                data: []
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'somethings wrong in staffService.deleteStaff...', // error message
            EC: 2, // error code
            data: [], // data
        }
    }
}

module.exports = {
    testApiStaff,
    login,
    createNewStaff,
    getStaffDetail,
    getAllStaff,
    getListStaffWithPagination,
    updateStaff,
    deleteStaff,
}