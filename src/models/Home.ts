import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IHome extends Document {
  _id: Types.ObjectId; // 👈 thêm dòng này
  name: string;
  owner: mongoose.Types.ObjectId;
  rooms: string[];
  devices: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const HomeSchema: Schema = new Schema(
  {
    name: { type: String, required: true, default: 'My Home' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rooms: { type: [String], default: [] },
    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }],
  },
  { timestamps: true },
);

export default mongoose.model<IHome>('Home', HomeSchema);
