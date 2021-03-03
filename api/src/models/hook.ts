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
    getById(id: string): Promise<IHook>
    updateById(id: string, newValues: IHook): Promise<IHook>
    deleteById(id: string): Promise<void>
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



HookSchema.statics.getById = async function(id) {
    const hook = await this.findOne({ _id: id })

    if (!hook) {
        throw new createError.NotFound('Could not find hook')
    }

    return hook
}

HookSchema.statics.updateById = async function(id: string, newValues: IHook) {
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

    return deletedCatch
}

const Hook: IHookModel = mongoose.model<IHook, IHookModel>('Hook', HookSchema)

export default Hook