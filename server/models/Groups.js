'use strict'

const mongoose = require('mongoose');

//code - Invite code
//name - Group name
//pickedId - Selected Id
const groupSchema = new mongoose.Schema(
  {
    code: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    budget: {type: Number},
    pickedId: {type: String},
    members: {type: Array, default: []},
    candidates: {type: Array, default: []},
    archive: {type: Array, default:[]},
    spends: {type: Array, default:[]}
  },
  {timestamps: true}
);

module.exports = mongoose.model('Group', groupSchema);