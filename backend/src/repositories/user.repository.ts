import User from "../models/user.models.js"

class UserRepository {
    static async register(new_user_object) {
        const new_user = new User(new_user_object)
        return await new_user.save()
    }

    static async getByMail(email: { email: string }) {
        return User.findOne(email)
    }

    static async getByName(name: string) {
        return await User.findOne({ name: name })
    }

    static async updateUser(email: string, newDetails) {
        const { bio, location, image_url } = newDetails
        await User.updateOne({ email: email }, {
            $set: {
                bio: bio,
                location: location,
                // image_url
            },
            $currentDate: { lastUpdated: true }
        })
        return

    }
}

export default UserRepository