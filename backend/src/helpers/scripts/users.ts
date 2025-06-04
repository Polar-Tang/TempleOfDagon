import mongoose from "mongoose";
import ENVIRONMENT from "../../config/environment"
import bcrypt from 'bcrypt'

export const getUsers = async () => {
  
  const hashedPasswordWard = await bcrypt.hash("josephC0rwell", 10)
  const hashedPasswordCarter = await bcrypt.hash("keyPl4t3", 10)
  const hashedPasswordHerber = await bcrypt.hash("herberTheBe$t", 10)
  
  const theUsers = [{
        _id: new mongoose.Types.ObjectId(),
        name: "Charles Dexter Ward",
        password: hashedPasswordWard,
        email: "charlesdexterward@dagon.com",
        active: true,
        products: [],
        role: "admin",
        emailVerified: true,
        avatar_url: `${process.env.FRONTENDURL}/images/avatar/2025-06-01_19-15.png`,
        verificationToken: "",
        bio: "I like to walk over the antique gardence of providence, Joseph Corwell, but i like most that no one knock the doors, even if someone needs it",
        location: "Providence, Massachusetts",
      },
      {
          _id: new mongoose.Types.ObjectId(),
          name: "Swami Chandraputra",
          password: hashedPasswordCarter,
          email: "randolphcarter@gmail.com",
          active: true,
          products: [],
          role: "user",
          emailVerified: true,
          avatar_url: `${process.env.FRONTENDURL}/images/avatar/124qwef.webp`,
          verificationToken: "",
          bio: "I used to be Randolph Carter, but now i'm an inmortal alien",
          location: "Boston, Massachusetts",
        },
        {
            _id: new mongoose.Types.ObjectId(),
            name: "Herbert West",
            password: hashedPasswordHerber,
            email: "herbertwest@dagon.com",
            active: true,
            products: [],
            role: "admin",
            emailVerified: true,
            verificationToken: "",
            location: "Arkham, Massachusetts",
          },
  ]
  return theUsers
}
