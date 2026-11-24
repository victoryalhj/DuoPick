'use strict'

const Group = require('../models/Groups');

exports.createGroup = async (ctx) => {
  try {
    const group = await Group.create(ctx.request.body);
    ctx.body = group;
    ctx.status = 201;
  }
  catch (error) {
    ctx.body = { error: error.message }
    ctx.status = 500;
  }
}

exports.getGroup = async (ctx) => {
  const group = await Group.findOne({code: ctx.params.code})
  try {
    if(!group) {
       ctx.body = {error: 'Group not found'};
       ctx.status = 400;
       return;
    }
    ctx.body = group;
    ctx.status = 200;
  }
  catch (error) {
    ctx.body = { error: error.message }
    ctx.status = 500;
  }
}