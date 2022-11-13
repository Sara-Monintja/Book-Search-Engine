const AuthenticationError = require('../exceptions/AuthenticationError');

const { User } = require('../models');

const { signToken } = require('../utils/auth');


function checkIfLoggedIn(context){
    if(!context.user){
        throw new AuthenticationError('Not logged in');
    }
}

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            checkIfLoggedIn(context);
            const userData = await User.findOne({ _id: context.user._id}).select('-__v -password');
            return userData;
        },
    },

    Mutation: {
        
    }
}

