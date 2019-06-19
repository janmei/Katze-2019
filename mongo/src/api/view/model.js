import mongoose, { Schema } from 'mongoose'

const viewSchema = new Schema(
  {
    content: {
      head: {
        type: String,
        default: 'Hello World'
      },
      sub: {
        type: String,
        default: 'Welcome to if 2019'
      }
    },
    countdown: {
      type: String
    },
    countdown_active: {
      type: Boolean,
      default: false
    },
    team_layer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    },
    animation: {
      type: String,
      default: 'text'
    },
    name: {
      type: String
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

viewSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      content: this.content,
      team_layer: this.team_layer,
      animation: this.animation,
      name: this.name,
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

const model = mongoose.model('View', viewSchema)

export const schema = model.schema
export default model
