const { Success } = require("../core/success.response");
const userService = require("../services/user.service");

class UserController {
    newUser = async (req, res, next) => {
        return new Success({
            message: "create success",
            metadata: await userService.newUser(req.body)
        }).send(res)
    }

    checkLoginEmailToken = async (req, res, next) => {
        return new Success({
            message: "craete success",
            metadata: await userService.checkLoginTokenService(req.query)
        }).send(res)
    }
}

module.exports = new UserController();