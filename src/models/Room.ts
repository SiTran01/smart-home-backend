import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IRoom extends Document {
  _id: Types.ObjectId;
  name: string;
  home: Types.ObjectId;
  devices: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema = new Schema(
  {
    name: { type: String, required: true, default: 'New Room' },
    home: { type: mongoose.Schema.Types.ObjectId, ref: 'Home', required: true },
    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }],
  },
  { timestamps: true },
);

export default mongoose.model<IRoom>('Room', RoomSchema);
