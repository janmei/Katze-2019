import mongoose, { Schema } from 'mongoose'

const teamSchema = new Schema({
  persons: [{
    type: String
  }],
  abstract: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

teamSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      persons: this.persons,
      abstract: this.abstract,
      name: this.name,
      image: this.image,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Team', teamSchema)

export const schema = model.schema
export default model
