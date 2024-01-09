const { Book, User } = require('../models');
const { signToken } = require ('../utils/auth.js');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user){
        console.log(context.user)
        const user = await User.findOne({_id:context.user._id});
        return user
      }
      throw new Error("User isn't logged in")
    },
 
  },
  Mutation: {
    addUser: async (parent, args, context) => {
      const user = User.create(args)
      const token = signToken(user)
      return {user, token}
    },
    login: async (parent, args, context) => {
      const user = await User.findOne ({email:args.email})
      if (!user){
        throw new Error("Invalid credentials")
      }
      const password = await user.isCorrectPassword (args.password)
      if (!password){
        throw new Error("Invalid password")
      }
      const token = signToken(user)
      return {user, token}
    },
    saveBook: async (parent, args, context) => {

    }
  
    

  },
};

module.exports = resolvers;