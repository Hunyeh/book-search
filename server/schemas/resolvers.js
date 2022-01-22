const {AuthenticationError} = require('apollo-server-express');
const {User, Book} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                  .select('-__v -password')
                  .populate('savedBooks')
                return userData;
            }
            throw new AuthenticationError('Not logged in')
        }
    },
    Mutation: {
        login: async (parent, {username, email, password}) => {
            const user = await User.findOne({$or: [{username}, {email}]})
            if (!user) {
                throw new AuthenticationError('Incorrect credentials')
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return {token, user};
        },
        addUser: async (parent, args) => {
            const user = User.create(args);
            const token = signToken(user);
            return {token, user};
        },
        saveBook: (parent, {authors, description, title, bookId, link}, context) => {

        },
        removeBook: (parent, bookId, context) => {
            
        }
    }
};

module.exports = resolvers;