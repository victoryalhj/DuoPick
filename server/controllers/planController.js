'use strict'

//import group from models
const Groups = require('../models/Groups');

//extracts group invite code from the url route parameters
//Destructures the plan details sent by the client in the request body
exports.createPlan = async (ctx) => {
  try {
    const { code } = ctx.params;
    const {title, category, link, memo, budget, date} = ctx.request.body;
    if (!title || !title.trim()) {
      ctx.status = 400;
      ctx.body = {error: 'title required'};
      return;
    }
    //Queries MongoDB to find a single group document matching the given invite code
    const group = await Groups.findOne({code});
    if (!group) {
      ctx.status = 404;
      ctx.body = {error: 'Group not found'};
      return;
    }
    //Initialize an empty object to store member votes later {"vote":1,"comment":"lets go"}
    const newPlan = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
      title: title.trim(),
      category: category || 'Something else',
      link: (link || '').trim(),
      memo: (memo || '').trim(),
      budget: Number(budget) || 0,
      date: date || '',
      votes: {}

    }
    group.candidates.push(newPlan);
    await group.save();

    ctx.status = 201;
    ctx.body = newPlan;
  }
  catch (error) {
    ctx.status = 500;
    ctx.body = {error: error.message};
  }
};

exports.getPlan = async (ctx) => {
  try {
    const {code} = ctx.params;
    const group = await Groups.findOne({code});
    if (!group) {
      ctx.status = 404;
      ctx.body = {error: error.message};
      return;
    }
    ctx.status = 200;
    ctx.body = group.candidates;
  }
  catch (error) {
    ctx.status = 500;
    ctx.body = {error: error.message}
  }
}

exports.removePlan = async (ctx)=> {
  try {
    const {code, planId} = ctx.params;

    const group = await Groups.findOne({code});
    if (!group) {
      ctx.status = 404;
      ctx.body = {error: 'Group not found'};
      return;
    }
    //Save the array length before deletion, then create a new array excluding the matching planId
    const beforeDeleteLength = group.candidates.length;
    group.candidates = group.candidates.filter((item) => 
      item.id !== planId);

    //If the array length is still the same, no matching plan was found(return 404)
    if(group.candidates.length === beforeDeleteLength) {
      ctx.status = 404;
      ctx.body = {error: 'Plan not found'};
      return;
    }
    await group.save();
    ctx.status = 200;
    ctx.body = {message: 'Plan removed', candidates: group.candidates};
  }
  catch(error) {
    ctx.status = 500;
    ctx.body = {error: error.message};
  }
}