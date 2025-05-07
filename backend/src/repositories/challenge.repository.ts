import Challenge from "../models/challenge.models"

class ChallengeRepository {
    static async markComplete( challenge ) {
        const new_user = new Challenge(challenge)
        return await new_user.save()
    }

    // static async getByMail (email){
    //     return User.findOne(email)
    // }

}

export default ChallengeRepository