import db from "../models/index"

const testApiPhong = () => {
    return "test api phong"
}

const createNewRoom = async (newRoom) => {

    try {

        const { toa, ten_phong, toi_da, loai_phong, gia, ghi_chu } = newRoom

        console.log('>>> check toi_da: ', toi_da);

        // create new room
        const roomData = await db.Phong.create({
            toa,
            ten_phong,
            toi_da,
            da_thue: 0,
            loai_phong,
            gia,
            ghi_chu,
        })

        return {
            EC: 0,
            EM: "Tạo mới phòng thành công !",
            data: roomData
        }

    } catch (error) {
        console.log(e);
        return {
            EM: 'somethings wrong in roomService.createNewRoom...',
            EC: 2
        }
    }

}

const getRoomDetail = async (id) => {

    try {

        let room = {}

        room = await db.Phong.findOne({
            where: { id: id },
            attributes: ["id", "toa", "ten_phong", "toi_da", "da_thue", "loai_phong", "gia", "ghi_chu"],
        })

        if (room) {
            return {
                EM: `Lấy chi tiết phÒng ${room.ten_phong} tòa ${room.toa} thành công !`,
                EC: 0,
                data: room
            }
        } else {
            return {
                EM: `Không tìm thấy phòng !`,
                EC: 1,
                data: []
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'somethings wrong in roomService.getRoomDetail...',
            EC: 2,
            DT: []
        }
    }

}

const getAllRoom = async () => {

    try {

        let room = await db.Phong.findAll({
            attributes: ["id", "toa", "ten_phong", "toi_da", "da_thue", "loai_phong", "gia", "ghi_chu"],
        })
        if (room) {
            return {
                EM: 'Lấy danh sách phòng thành công !',
                EC: 0,
                data: room
            }
        } else {
            return {
                EM: 'Lấy danh sách phòng thất bại !',
                EC: 1,
                data: []
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'somethings wrong in roomService.getAllroom...',
            EC: 2,
            data: []
        }
    }

}

const getListRoomWithPagination = async (page, limit) => {

    try {

        let offset = (page - 1) * limit

        let { count, rows } = await db.Phong.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "toa", "ten_phong", "toi_da", "da_thue", "loai_phong", "gia", "ghi_chu"],
            order: [['id', 'asc']]
        })

        let totalPages = Math.ceil(count / limit)
        let data = {
            totalRows: count,
            totalPages: totalPages,
            room: rows
        }

        return {
            EM: `Lấy danh sách phòng trang ${page} thành công !`,
            EC: 0,
            data: data
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'somethings wrong in roomService.getListRoomWithPagination...',
            EC: 2,
            data: []
        }
    }
}

module.exports = {
    testApiPhong,
    createNewRoom,
    getRoomDetail,
    getAllRoom,
    getListRoomWithPagination,
}