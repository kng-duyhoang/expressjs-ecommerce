'use strict'

const { Success } = require("../core/success.response");

const profiles = [
    {
        user_id: 1,
        user_name: 'Cr7',
        user_avt: ''
    },
    {
        user_id: 2,
        user_name: 'M10',
        user_avt: ''
    },
    {
        user_id: 3,
        user_name: 'Goldz',
        user_avt: ''
    },
]

class ProfileController {

    // admin
    profiles = async (req, res, next) => {
        new Success({
            message: 'view all profile',
            metadata: profiles
        }).send(res)
    }

    profile = async (req, res, next) => {
        new Success({
            message: 'success',
            metadata: {
                user_id: 3,
                user_name: 'Goldz',
                user_avt: ''
            }
        }).send(res)
    }
}

module.exports = new ProfileController();