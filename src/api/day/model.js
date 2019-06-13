import mongoose, { Schema } from 'mongoose'

const daySchema = new Schema({
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program'
  },
  date: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

daySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      program: this.program,
      date: this.date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Day', daySchema)

export const schema = model.schema
export default model
