const { Schema, model } = require('mongoose');

const workoutSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        addedAt: {
            type: Date,
            default: Date.now,
            get: d => d.toLocaleString('en-us', { year: "numeric", month: "2-digit", day: "2-digit" })
        },
        excercises: [{
            type: Schema.Types.ObjectId,
            ref: 'Exercise'
        }],
    },
    {
        toJSON: {
            getters: true
        },
    }
);

const Workout = model('Workout', workoutSchema);

module.exports = Workout;