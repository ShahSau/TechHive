import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorites: {
      type: Array,
      default: []
    },
    firstName: {
     type: String,
     required: true,
    },
    lastName: {
      type: String,
    //   required: true,
     },
    address: {
      type: String,
      //required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User