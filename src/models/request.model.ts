import mongoose, { Schema, Document } from 'mongoose';

export interface IRequest extends Document {
  method: string;
  path: string;
  timestamp: Date;
}

const requestSchema: Schema = new Schema({
  method: String,
  path: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IRequest>('Request', requestSchema);
