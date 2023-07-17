import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email aleady exists!'],
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        match: [/^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 2-20 alphanumeric letters and be unique!"],
        required: [true, 'username required!']
    },
    image: {
        type: String,

    },
    savedPosts: {
        type: Array,
        required: [true, "list is reqired"]
    }
})

const User = models.User || model("User", UserSchema)

export default User