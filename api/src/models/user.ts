import * as mongoose from 'mongoose'
/* import * as validator from 'validator' */
import * as bcrypt from 'bcrypt'
import * as createError from 'http-errors'

export interface IUser extends mongoose.Document {
    username: string
    password: string
}

export interface IUserModel extends mongoose.Model<IUser> {
    authenticate(username: string, password: string): Promise<IUser>
}

export const UserSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: [true, 'Username is missing'],
        minlength: [3, 'Username needs to be at least 3 characters'], 
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

UserSchema.post('save', function(error, doc, next) {
    if (error.name === 'ValidationError') {
        next(new createError.BadRequest(error.message))
    } else if (error.name === 'MongoError' && error.code === 11000) {
        next(new createError.Conflict('User already exist'))
    } else {
        next()
    }
})


UserSchema.statics.authenticate = async function(username, password) {
    const user = await this.findOne({ username })

    if (!user || !(await bcrypt.compare(password, user.get('password')))) {
        /* throw new Error('Invalid username or password.') */
        throw new createError.Unauthorized('Invalid username or password.')
    }

    return user
}


const User: IUserModel = mongoose.model<IUser, IUserModel>('User', UserSchema)

export default User