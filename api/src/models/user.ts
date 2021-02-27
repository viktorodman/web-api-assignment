import * as mongoose from 'mongoose'
/* import * as validator from 'validator' */
import * as bcrypt from 'bcrypt'

export interface IUser extends mongoose.Document {
    username: string
    password: string
}

export const UserSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: [true, 'Username is missing'], 
        unique: true
    },
    password: { 
        type: String, 
        minlength: [10, 'Password must be at least 10 characters'],
        required: [true, 'Password is required']
    }
}, {timestamps: true}
)

UserSchema.pre<IUser>('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
})


const User = mongoose.model<IUser>('User', UserSchema)

export default User