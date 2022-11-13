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
        addUser: async (parent, { username, email, pasword }, context) => {
            const user = await User.create({
                username, email, password
            });

            if(!user) {
                throw new Error('Something is wrong');
            }
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.gindOne({ email: email });
            if (!user) {
                throw new Error('Unable to find user);
            }
        }
    }
}

