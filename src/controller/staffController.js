import staffService from "../service/staffService"
import db from "../models";
import { Op } from "sequelize";

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword) // true or false
}

// validate phone
const checkPhoneValid = async (phone) => {
    const phoneNumberRegex = /^(?:\+84|0|\+1)?([1-9][0-9]{8,9})$/;
    return phoneNumberRegex.test(phone);
};

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

// kiem tra sdt ton tai
const checkPhoneExist = async (phone) => {

    let user = await db.Nhan_Vien.findOne({
        where: { sdt: phone }
    })

    if (user) {
        return true
    }

    return false
}

const testApiStaff = (req, res) => {
    try {
        const data = staffService.testApiStaff()
        return res.status(200).json({
            data
        })
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {

    try {

        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({
                EM: 'Vui lòng nhập đầy đủ username, password!', // error message
                EC: 1, // error code
                data: '', // data
            })
        }

        const data = await staffService.login(req.body)

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            data: data.data // data
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: `error from staffController server...`, // error message
            EC: 2, // error code
            data: '', // data
        })
    }

}

const createNewStaff = async (req, res) => {

    try {

        const { ho_ten, gioi_tinh, dan_toc, ngay_sinh, sdt, cccd, dia_chi, role, email, username, password, rePassword } = req.body

        if (ho_ten && gioi_tinh && dan_toc && ngay_sinh && sdt && cccd && dia_chi && role && email && username && password && rePassword) {

            // validate phone
            const isPhoneValid = await checkPhoneValid(sdt)
            const isPhoneExist = await checkPhoneExist(sdt)

            if (!isPhoneValid || isPhoneExist) {
                return res.status(400).json({
                    EC: 1,
                    EM: "Số điện thoại không hợp lệ hoặc đã được sử dụng !",
                    data: ""
                })
            }

            // validate email
            const isEmailValid = await checkEmailValid(email)
            const isEmailExist = await checkEmailExist(email)

            if (!isEmailValid || isEmailExist) {
                return res.status(400).json({
                    EC: 1,
                    EM: "Email không hợp lệ hoặc đã được sử dụng !",
                    data: ""
                })
            }

            // validate ngày sinh
            const date = new Date(ngay_sinh)
            const timestamp = date.getTime()
            const cutoffTimestamp = new Date('2006-01-01') // nhân viên phải lớn hơn 18 tuổi

            if (!timestamp) {
                return res.status(400).json({
                    EC: 1,
                    EM: "Ngày sinh không hợp lệ !",
                    data: ""
                })
            } else if (timestamp > cutoffTimestamp) {
                return res.status(400).json({
                    EC: 1,
                    EM: "Nhân viên phải lớn hơn 18 tuổi !",
                    data: ""
                })
            }

            // validate password && rePassword
            if (password !== rePassword) {
                return res.status(400).json({
                    EC: 1,
                    EM: "Nhập lại mật khẩu không chính xác !",
                    data: ""
                })
            }

            let data = await staffService.createNewStaff({ ...req.body, ngay_sinh: timestamp })

            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                data: data.data
            })

        } else {
            return res.status(400).json({
                EC: 1,
                EM: "Yêu cầu nhập đầy đủ các trường !",
                data: ""
            })
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: `error from staffController server...`, // error message
            EC: 2, // error code
            data: '', // data
        })
    }
}

const getStaffDetail = async (req, res) => {

    try {

        if (req.params.id) {
            let data = await staffService.getStaffDetail(req.params.id)
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

const getListStaffWithPagination = async (req, res) => {

    try {

        if (req.query.page && req.query.limit) {
            let page = req.query.page
            let limit = req.query.limit

            let data = await staffService.getListStaffWithPagination(+page, +limit)

            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                data: data.data, // data
            })

        } else {
            let data = await staffService.getAllStaff()

            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                data: data.data, // data
            })
        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from staffController server...', // error message
            EC: 2, // error code
            data: '', // data
        })
    }

}

const updateStaff = async (req, res) => {

    try {

        const id = req.params.id
        const { ho_ten, gioi_tinh, dan_toc, ngay_sinh, sdt, cccd, dia_chi, role, email } = req.body

        if (ho_ten && gioi_tinh && dan_toc && ngay_sinh && sdt && cccd && dia_chi && role && email) {

            // validate phone
            const isPhoneValid = await checkPhoneValid(sdt)
            const isPhoneExist = await db.Nhan_Vien.findOne({
                where: {
                    id: {
                        [Op.ne]: id
                    },
                    sdt: sdt
                }
            })

            if (!isPhoneValid || isPhoneExist) {
                return res.status(400).json({
                    EC: 1,
                    EM: "Số điện thoại không hợp lệ hoặc đã được sử dụng !",
                    data: ""
                })
            }

            // validate email
            const isEmailValid = await checkEmailValid(email)
            const isEmailExist = await db.Nhan_Vien.findOne({
                where: {
                    id: {
                        [Op.ne]: id
                    },
                    email: email
                }
            })

            if (!isEmailValid || isEmailExist) {
                return res.status(400).json({
                    EC: 1,
                    EM: "Email không hợp lệ hoặc đã được sử dụng !",
                    data: ""
                })
            }

            // validate ngày sinh
            const date = new Date(ngay_sinh)
            const timestamp = date.getTime()
            const cutoffTimestamp = new Date('2006-01-01') // nhân viên phải lớn hơn 18 tuổi

            if (!timestamp) {
                return res.status(400).json({
                    EC: 1,
                    EM: "Ngày sinh không hợp lệ !",
                    data: ""
                })
            } else if (timestamp > cutoffTimestamp) {
                return res.status(400).json({
                    EC: 1,
                    EM: "Nhân viên phải lớn hơn 18 tuổi !",
                    data: ""
                })
            }

            let data = await staffService.updateStaff(id, { ...req.body, ngay_sinh: timestamp })

            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                data: data.data
            })

        } else {
            return res.status(400).json({
                EC: 1,
                EM: "Yêu cầu nhập đầy đủ các trường !",
                data: ""
            })
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from staffController server...', // error message
            EC: 2, // error code
            data: '', // data
        })
    }
}

const deleteStaff = async (req, res) => {

    try {

        let data = await staffService.deleteStaff(req.query.id)

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            data: data.data, // data
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from staffController server...', // error message
            EC: 2, // error code
            data: '', // data
        })

    }

}

module.exports = {
    testApiStaff,
    login,
    createNewStaff,
    getStaffDetail,
    getListStaffWithPagination,
    updateStaff,
    deleteStaff,
}