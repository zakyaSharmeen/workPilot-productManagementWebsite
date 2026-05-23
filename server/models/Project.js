// import mongoose from 'mongoose';

// const projectSchema = new mongoose.Schema(
//   {
//     title:       { type: String, required: true, trim: true },
//     description: { type: String, default: '' },
//     status:      { type: String, enum: ['active', 'archived'], default: 'active' },
//     owner:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     members:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   },
//   { timestamps: true }
// );

// const Project = mongoose.model('Project', projectSchema);
// export default Project;

import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    status: { type: String, enum: ["active", "completed"], default: "active" },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
