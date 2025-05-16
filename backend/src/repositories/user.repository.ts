import User from "../models/user.models.js"

class UserRepository {
    static async register( new_user_object ) {
        const new_user = new User(new_user_object)
        return await new_user.save()
    }

    static async getByMail (email: {email: string}){
        return User.findOne(email)
    }

    static async getByName (name: string){
        return await User.findOne({name: name})
    }

}

export default UserRepository