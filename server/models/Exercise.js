const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        description: {
            type: String
        },
        reps: {
            type: Number,
            required: true
        },
        sets: {
            type: Number,
            required: true
        },
        addedAt: {
            type: Date,
            default: Date.now,
            get: d => d.toLocaleString('en-us', { year: "numeric", month: "2-digit", day: "2-digit" })
        },
    },
    {
        toJSON: {
            getters: true
        },
    }
);

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;
