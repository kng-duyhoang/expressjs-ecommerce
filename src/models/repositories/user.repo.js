'user strict'

const userModel = require("../user.model")

const createNewUSer = async ({
    user_id,
    user_name,
    user_email,
    user_pwd,
    user_slug,
    user_role
}) => {
    const user = await userModel.create({
        user_id,
        user_name,
        user_email,
        user_pwd,
        user_slug,
        user_role
    })

    return user;
}

module.exports = {
    createNewUSer
}