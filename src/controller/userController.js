import userService from "../service/userService"

const testApi = (req, res) => {
    let data = userService.testApi()
    return res.status(200).json({
        data
    })
}

module.exports = {
    testApi,
}