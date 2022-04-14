const { AuthenticationError } = require('apollo-server-express');
const { User, Workout, Exercise } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate('workouts');
                return user;
            }
            throw new AuthenticationError('You are not logged in');
        },
        exercise: async (parent, { name }) => {
            return await Exercise.findOne({ name });
        },
        allExercises: async () => {
            return await Exercise.find();
        },
        workout: async (parent, { _id }) => {
            return await Workout.findOne({ _id }).populate('exercises');
        },
        allWorkouts: async () => {
            return await Workout.find(); 
        },
    },
    Mutation: {
        addUser: async (parent, { firstName, lastName, username, email, password }) => {
            const user = await User.create({ firstName, lastName, username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError('No user found with this username');
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Password is incorrect');
            }

            const token = signToken(user);

            return { token, user };
        },
        addExercise: async (parent, {}, context) => {
            
        },
        addWorkout: async (parent, {}, context) => {

        },
        removeExercise: async (parent, {}, context) => {

        },
        removeWorkout: async (parent, {}, context) => {

        },
    },
};

module.exports = resolvers;