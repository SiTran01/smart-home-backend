import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IDevice extends Document {
  _id: Types.ObjectId;
  name: string;
  type: string;
  status: any; // hoặc define riêng theo type
  home: Types.ObjectId;
  room: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const DeviceSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: Schema.Types.Mixed, default: null },
    home: { type: mongoose.Schema.Types.ObjectId, ref: 'Home', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  },
  { timestamps: true },
);

export default mongoose.model<IDevice>('Device', DeviceSchema);
