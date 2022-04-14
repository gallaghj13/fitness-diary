const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    workouts: [Workout]
}

type Workout {
    _id: ID 
    name: String!
    description: String 
    addedAt: String
    exercises: [Exercise]
}

type Exercise {
    _id: ID
    name: String!
    image: String
    description: String
    reps: Number!
    sets: Number!
    addedAt: String
}

type Auth {
    token: ID
    user: User
}

type Query {
    user: User
    exercise(name: String!): Exercise
    allExercises: [Exercise]
    workout(_id: ID!): Workout
    allWorkouts: [Workout]
}

type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, username: String!, password: String!): Auth
    addWorkout(_id: ID, name: String!, description: String, exercises: [ID]!): Workout
    addExercise(name: String!, image: String, description: String, reps: Number!, sets: Number!): Exercise
    login(username: String!, password:String!): Auth
    removeWorkout(_id: ID): User
    removeExercise(_id: ID): User
}

`;

module.exports = typeDefs;