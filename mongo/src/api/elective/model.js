import mongoose, { Schema } from 'mongoose'

const electiveSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  prof: {
    type: String
  },
  description: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

electiveSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      prof: this.prof,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Elective', electiveSchema)

export const schema = model.schema
export default model
