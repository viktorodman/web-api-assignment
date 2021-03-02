import * as mongoose from 'mongoose'
/* import * as validator from 'validator' */
import * as createError from 'http-errors'
import createHttpError = require('http-errors')

export interface ICatch extends mongoose.Document {
    fisher: string
    fishSpecies: string
    measurement: {
        length: number
        weight: number
    }
    location: {
        city: string
        lake: string
        latitude: string
        longitude: string
    }
    
}

export interface ICatchModel extends mongoose.Model<ICatch> {
    getAll(): Promise<Array<ICatch>>
    getById(id: string): Promise<ICatch>
    updateById(id: string, newValues: ICatch): Promise<ICatch>
    deleteById(id: string): Promise<void>
}

export const CatchSchema = new mongoose.Schema({
    fisher: { 
        type: String,
        required: [true, 'Username is missing'],
        minlength: [3, 'Username needs to be at least 3 characters']
    },
    fishSpecies: { type: String, required: true },
    measurement: {
        length: { 
            type: Number, 
            minlength: [10, 'Length must be at least 10mm'],
            required: [true, 'Length is required']
        },
        weight: { 
            type: Number, 
            minlength: [10, 'weight needs to be at least 10 grams'],
            required: [true, 'Weight is required']
        },
    },
    location: {
        city: { type: String, required: [true, 'City is required']},
        lake: { type: String, required: [true, 'Lake is required'] },
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
    }
}, {timestamps: true}
)

CatchSchema.post('save', function(error, doc, next) {
    if (error.name === 'ValidationError') {
        next(new createError.BadRequest(error.message))
    } else {
        next()
    }
})

CatchSchema.statics.getAll = async function() {
    return this.find({})
}



CatchSchema.statics.getById = async function(id) {
    const fishCatch = await this.findOne({ _id: id })

    if (!fishCatch) {
        throw new createError.NotFound('Could not find catch')
    }

    return fishCatch
}

CatchSchema.statics.updateById = async function(id: string, newValues: ICatch) {
    const updatedCatch = await this.updateOne({ _id: id }, {
        ...newValues
    })

    if (updatedCatch.nModified !== 1) {
        throw new createHttpError.Conflict('Failed to update catch')
    }

    return updatedCatch
}

CatchSchema.statics.deleteById = async function(id: string) {
    const deletedCatch = await this.deleteOne({ _id: id })

    console.log(deletedCatch)

    return deletedCatch
}

const Catch: ICatchModel = mongoose.model<ICatch, ICatchModel>('Catch', CatchSchema)

export default Catch