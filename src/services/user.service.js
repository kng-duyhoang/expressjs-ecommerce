const { ForbiddenError } = require("../core/error.response");
const { Success } = require("../core/success.response");
const userModel = require("../models/user.model");
const emailService = require("./email.service");

class UserService {
    newUser = async ({
        email = null,
        captcha = null
    }) => {
        const findUser = await userModel.findOne({ email }).lean();
        if (findUser) {
            throw new ForbiddenError('User existed!!!!')
        }
        const result = await emailService.sendEmailToken({ email });
        return {
            token: result
        }
    }
}

module.exports = new UserService()