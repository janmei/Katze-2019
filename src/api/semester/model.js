import mongoose, { Schema } from 'mongoose'

const semesterSchema = new Schema({
  year: {
    type: Number,
    required: true
  },
  title: {
    type: String
  },
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }],
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

semesterSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      year: this.year,
      title: this.title,
      teams: this.teams,
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

const model = mongoose.model('Semester', semesterSchema)

export const schema = model.schema
export default model
