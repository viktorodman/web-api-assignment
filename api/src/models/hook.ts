import * as mongoose from 'mongoose'
/* import * as validator from 'validator' */
import * as createError from 'http-errors'
import createHttpError = require('http-errors')

export interface IHook extends mongoose.Document {
    user: string
    url: string
    catch_event: boolean
    catch_event_lake_filter: string
    catch_event_species_filter: string
}

export interface IHookModel extends mongoose.Model<IHook> {
    getAllUserHooks(username: string): Promise<Array<IHook>>
    getAll(): Promise<Array<IHook>>
    /* getById(id: string): Promise<ICatch>
    updateById(id: string, newValues: ICatch): Promise<ICatch>
    deleteById(id: string): Promise<void> */
}

export const HookSchema = new mongoose.Schema({
    user: { type: String, required: true },
    url: { type: String, required: [true, "An URL needs to be specified"] },
    catch_event: {type: Boolean, required: true },
    catch_event_lake_filter: { type: String },
    catch_event_species_filter: { type: String },
}, {timestamps: true}
)

HookSchema.post('save', function(error, doc, next) {
    if (error.name === 'ValidationError') {
        next(new createError.BadRequest(error.message))
    } else {
        next()
    }
})

HookSchema.statics.getAll = async function() {
    return this.find({})
}

HookSchema.statics.getAllUserHooks = async function(username: string) {
    const hooks = await this.find({ user: username }) 

    console.log(hooks, username)

    return hooks
}



/* HookSchema.statics.getById = async function(id) {
    const fishCatch = await this.findOne({ _id: id })

    if (!fishCatch) {
        throw new createError.NotFound('Could not find catch')
    }

    return fishCatch
}

HookSchema.statics.updateById = async function(id: string, newValues: ICatch) {
    const updatedCatch = await this.updateOne({ _id: id }, {
        ...newValues
    })

    if (updatedCatch.nModified !== 1) {
        throw new createHttpError.Conflict('Failed to update catch')
    }

    return updatedCatch
}

HookSchema.statics.deleteById = async function(id: string) {
    const deletedCatch = await this.deleteOne({ _id: id })

    console.log(deletedCatch)

    return deletedCatch
} */

const Hook: IHookModel = mongoose.model<IHook, IHookModel>('Hook', HookSchema)

export default Hook