import { SchemaDefinition } from 'mongoose';

export const UserStructure : SchemaDefinition = {
  _facebook: {
    type: {
      id: {
        type: Number,
        required: true
      },
      token: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        required: true
      }
    },
    select: false
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true
  },
  online: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    null: true,
    default: null
  },
  recovery: {
    type: String,
    select: false
  },
  apiKey: {
    type: String,
    null: true,
    default: null
  },
  profile: {
    fullName: { type: String },
    about: { type: String, max: 600 },
    title: { type: String },
    community: {
      type: [{
        platform: { type: String, required: true, max: 100 },
        url: { type: String, required: true, max: 100 },
      }],
      default: []
    }
  },
  notifications: [
    {
      code: {
        type: String,
        required: true
      },
      vars: [{ type: String }],
      date: {
        type: Date,
        default: () => Date.now()
      }
    }
  ],
  authentications: [
    {
      from: {
        type: String,
        required: true,
        max: 45
      },
      date: {
        type: Date,
        default: () => Date.now()
      }
    }
  ]
};