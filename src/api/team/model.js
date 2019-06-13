import mongoose, { Schema } from 'mongoose'

const teamSchema = new Schema(
  {
    persons: [
      {
        type: String
      }
    ],
    abstract: {
      type: String
    },
    longform: {
      type: String
    },
    hashtags: {
      type: String
    },
    contact: {
      type: String
    },
    name: {
      type: String
    },
    image: {
      type: String
    },
    semester: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id
      }
    }
  }
)

teamSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      semester: this.semester,
      longform: this.longform,
      hashtags: this.hashtags,
      contact: this.contact,
      abstract: this.abstract,
      persons: this.persons,
      image: this.image,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full
      ? {
        ...view
        // add properties for a full view
      }
      : view
  }
}

const model = mongoose.model('Team', teamSchema)

export const schema = model.schema
export default model
