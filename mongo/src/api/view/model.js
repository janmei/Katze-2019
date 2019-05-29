import mongoose, { Schema } from 'mongoose'

const viewSchema = new Schema({
  content: {
    head: {
      type: String,
    },
    sub: {
      type: String,
    },
    countdown: {
      type: String,
    }
  },
  animation: {
    type: String
  },
  name: {
    type: String
  }
}, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => { delete ret._id }
    }
  })

viewSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      content: this.content,
      animation: this.animation,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('View', viewSchema)

export const schema = model.schema
export default model
