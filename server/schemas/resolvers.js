const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_51HfFq4BJJNpYEWGkbr51tCeGM5BPMEjVLatGmQFya2z40s4IVh9dxrJWObU9N804Nqi3fFUu7nyXICilfwMIC13r001gwstoU8');
const mongoose=require('mongoose');
const { default: Stripe } = require('stripe');
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
    // checkout: async (parent, args, context) => {
    //   const url =new URL (context.headers.referer).origin;
    //   const line_items= [
    //     {
    //       price_data: {
    //         currency: 'usd',
    //         product_data: {
    //           name: 'Donate',
    //         },
    //         unit_amount: parseInt(req.params.value)*100,
    //       },
    //       quantity: 1,
    //     }
    //   ];
    //   for (let i=0; i< donate.length; i++) {
    //     // const donate = await Stripe.donate.create({
    //     //   name: donate[i].name,

    //     // })
    //     const price = await stripe.prices.create({
    //       donate: donate.id,
    //       unit_amount: donate[i].price * 100,
    //       currency: 'usd',
    //     });
    //     line_items.push({
    //       price: price.id,
    //       quantity: 1
    //     });
    //   }

    //   const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     line_items,
    //     mode: 'payment',
    //     success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    //     cancel_url: `${url}/`
    //   });

    //   return { session: session.id };
    // }
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