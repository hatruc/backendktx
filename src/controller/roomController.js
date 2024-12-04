import { Op } from "sequelize";
import db from "../models";
import roomService from "../service/roomService"

const testApiPhong = (req, res) => {
    try {
        const data = roomService.testApiPhong()
        return res.status(200).json({ data })
    } catch (error) {
        console.log(error);
    }
}

const createNewRoom = async (req, res) => {

    try {

        const { toa, ten_phong, toi_da, loai_phong, gia, ghi_chu } = req.body

        if (toa && ten_phong && toi_da && loai_phong && gia && ghi_chu) {

            // validate phòng đã tồn tại
            const roomExist = await db.Phong.findOne({
                where: {
                    [Op.and]: [
                        { toa: toa },
                        { ten_phong: ten_phong }
                    ]
                }
            })

            if (roomExist) {
                return res.status(400).json({
                    EC: 1,
                    EM: "Phòng đã tồn tại !",
                    data: roomExist
                })
            }

            // validate só lượng đã thuê không vượt quá số lượng tối đa
            // if (toi_da < da_thue) {
            //     return res.status(400).json({
            //         EC: 1,
            //         EM: "Số lượng đã thuê không được vượt quá số lượng tối đa !",
            //         data: ""
            //     })
            // }

            let data = await roomService.createNewRoom({ ...req.body })

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
            EM: `error from roomController server...`, // error message
            EC: 2, // error code
            data: '', // data
        })
    }
}

const getRoomDetail = async (req, res) => {

    try {

        if (req.params.id) {
            let data = await roomService.getRoomDetail(req.params.id)
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

const getListRoomWithPagination = async (req, res) => {

    try {

        if (req.query.page && req.query.limit) {
            let page = req.query.page
            let limit = req.query.limit

            let data = await roomService.getListRoomWithPagination(+page, +limit)

            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                data: data.data, // data
            })

        } else {
            let data = await roomService.getAllRoom()

            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                data: data.data, // data
            })
        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from roomController server...', // error message
            EC: 2, // error code
            data: '', // data
        })
    }

}

module.exports = {
    testApiPhong,
    createNewRoom,
    getRoomDetail,
    getListRoomWithPagination,
}