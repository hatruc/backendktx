const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateAccessToken = async (payload) => {
    const access_token = jwt.sign(
        {
            ...payload,
        },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
    );

    return access_token;
};

const generateRefreshToken = async (payload) => {
    const refresh_token = jwt.sign(
        {
            ...payload,
        },
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );

    return refresh_token;
};

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        EC: 1,
                        EM: "The authorization",
                    });
                }
                const access_token = await generateAccessToken({
                    id: user?.id,
                    role: user?.role,
                });
                resolve({
                    EC: 0,
                    EM: "SUCCESS",
                    access_token,
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};

const verifyToken = (token) => {

    let key = process.env.JWT_ACCESS_TOKEN
    let decoded = null

    try {
        decoded = jwt.verify(token, key)
    } catch (error) {
        console.log(error);
    }

    return decoded

}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    refreshTokenJwtService,
    verifyToken,
};
