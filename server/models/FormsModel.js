import mongoose, { Schema, mongo } from "mongoose";
import { v4 as uuidv4 } from 'uuid';


const data = new Schema({
    uuid: { type: String, default: () => uuidv4(), required: true, unique: true },
    id: { type: Number, default: null },
    nama: { type: String, default: null },
    email:  { type: String, default: null },
    telepon: { type: Number, default: null },
    alamat: { type: String, default: null },
    waktu: { type: Date, default: Date.now },

});
export const DataModel = mongoose.model('DataCSV', data, 'DataCSV');





