'use strict'

const Group = require('../models/Groups');
const crypto = require('node:crypto');


function generateInviteCode() {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}

exports.createGroup = async (ctx) => {
  try {
    let group;

    for (let attempt = 0; attempt < 5; attempt++) {
      const code = generateInviteCode();

      try {
        group = await Group.create({
          ...ctx.request.body,
          code,
        });

        break;
      } catch (error) {
        if (error.code !== 11000) {
          throw error;
        }

        if (attempt === 4) {
          throw new Error('Could not generate a unique invitation code');
        }
      }
    }
    ctx.body = group;
    ctx.status = 201;
  }
  catch (error) {
    ctx.body = { error: error.message }
    ctx.status = 500;
  }
}

exports.getGroup = async (ctx) => {
  try {
    const group = await Group.findOne({ code: ctx.params.code })


    if (!group) {
      ctx.body = { error: 'Group not found' };
      ctx.status = 404;
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


exports.joinGroup = async (ctx) => {
  try {
    const { code, member } = ctx.request.body;

    // Validate input
    if (!code || !member || typeof code !== 'string' || typeof member !== 'string') {
      ctx.status = 400;
      ctx.body = { error: 'Invitation code and member name are required' };
      return;
    }

    const inviteCode = code.trim().toUpperCase();
    const memberName = member.trim();

    if (!/^[A-F0-9]{6}$/.test(inviteCode) || !memberName) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid invitation code or member name' };
      return;
    }

    // Find group
    const group = await Group.findOne({ code: inviteCode });

    if (!group) {
      ctx.status = 404;
      ctx.body = { error: 'Group not found' };
      return;
    }

    // Prevent duplicate members
    const alreadyMember = group.members.some(
      existingMember => existingMember.toLowerCase() === memberName.toLowerCase()
    );

    if (alreadyMember) {
      ctx.status = 409;
      ctx.body = { error: 'Member already belongs to this group' };
      return;
    }

    // Add member
    group.members.push(memberName);

    await group.save();

    ctx.body = group;
    ctx.status = 200;
  }
  catch (error) {
    ctx.body = { error: error.message };
    ctx.status = 500;
  }
};