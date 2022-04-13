const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            unique: true,
            required: true,
            max_length: 30
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (e) {
                    return /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(e);
                },
                message: props => `${props.value} isn't a valid email. Please enter a valid email.`
            }
        },
        password: {
            type: String,
            required: true 
        },
        workouts: [{
            type: Schema.Types.ObjectId,
            ref: 'Workout'
        }],
    },
    {
        toJSON: {
            virtuals: true 
        }
    }
);

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// custom method to compare and validate password for loggin in
userSchema.methods.isCorrectPAssword = async function (password) {
    return bcrypt.compare(password, this.password);
};

//  when we query a user, we'll also get another field called 'workouts' with the number of saved workouts
userSchema.virtual('workoutCount').get(function() {
    return this.workouts.length;
});

const User = model('User', userSchema);

module.exports = User;