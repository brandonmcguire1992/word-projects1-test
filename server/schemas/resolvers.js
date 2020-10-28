const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const mongoose=require('mongoose')
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('projects')

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
      .select('-__v -password')
        .populate('projects')
    },
    user: async (parent, { firstName }) => {
      return User.findOne({ firstName })
        .select('-__v -password')
        .populate('projects')
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
 
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    //add a proyect to the array for a user
    addProject: async (parent, { project }, context) => {
      if (context.user) {
        console.log("el project",project)
        const saveproject = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { projects: project } },
          { new: true }
        )
        return saveproject;
      }
    },
    //Delete a proyect receive a id 
    deleteProject: async (parent, {_id}, context) => {
      if (context.user) {
        console.log("projectId",_id)
        const deletepro = await User.findByIdAndUpdate(
          { _id: context.user._id },
          {$pull: {projects: {_id}}},  
          { new: true }
        )
        return deletepro;
      }
    },

  //Edit project have the argument array project
    editProject: async (parent, {project}, context) => {
      if (context.user) {
        console.log("projectId",project)
        const editproject = await User.update(
          { _id: context.user._id, "projects._id":project._id },
          {$set: {"projects.$.title": project.title,"projects.$.ideasText": project.ideasText}},        
          { new: true }
        )
        return editproject;
      }
  },

  //Insert many projects for work in offline way
  addBulkProject: async (parent, { project,token }, context) => {
   console.log("Token user".token)
    if (context.user) {
      console.log("el project",project)
      const manyProjects = await User.findByIdAndUpdate(
        { _id: token },        
        { $push: { projects:{$each:project}}},
        { new: true }
      )
      return manyProjects;
    }
  }
  }
 
};

module.exports = resolvers;
