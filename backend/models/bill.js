import mongoose from "mongoose";

const billSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  money: { 
    type: Number,
    required: true 
  },
  type: { 
    type: String,
    required: true 
  },
  note: { 
    type: String
  },
  ngayHienTai: { 
    type: Date, 
    default: Date.now,
    require: true
  }
}, {
  timestamps: true
});

const bill = mongoose.model('bill', billSchema);
export default bill;
