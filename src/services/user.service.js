const { ForbiddenError, BadRequestError } = require("../core/error.response");

const bcrypt = require('bcrypt');
const userModel = require("../models/user.model");
const emailService = require("./email.service");
const { checkEmailToken } = require("./otp.service");
const { createNewUSer } = require("../models/repositories/user.repo");
const KeyTokenService = require("./keyToken.service");
const { generateToken } = require("../utils/token");

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

    checkLoginTokenService = async ({
        token
    }) => {
        try {
            // Check token
            const { otp_email: email,  otp_token} = await checkEmailToken({ token });
            if (!email) throw new BadRequestError('Not found Email')
            // Check email exist in user model
            const userFound = await finUserByEmailWithLogin({ email });
            if (!userFound) throw new BadRequestError('Email alrdy existed!! ')
            // Create user
            const passwordHash = await bcrypt.hash(email, 10)// độ phức tạp pasword = 10
            const newUSer = createNewUSer({
                user_email: email,
                user_id: 1,
                user_name: email,
                user_pwd: passwordHash,
                user_role: '',
                user_slug: 'xxcc'
            })
    
            if (newUSer) {
                // create private key, publickey
    
                const { privateKey, publicKey } = generateToken()
    
                const keyStore = await KeyTokenService.createKeyToken({
                    userID: newUSer._id,
                    publicKey,
                    privateKey
                })
    
                if (!keyStore) {
                    return {
                        code: 'xxx',
                        message: 'keyStore error'
                    }
                }
    
                const tokens = await createTokenPair({ userID: newUSer._id, email }, publicKey, privateKey)
    
                return {
                    shop: getInforData({ fields: ['_id', 'name', 'email'], object: newUSer }),
                    tokens
                }
            }

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async finUserByEmailWithLogin ({
        email
    }) {
        const user = await userModel.findOne({ user_email: email }).lean();
        return user
    }
}

module.exports = new UserService()