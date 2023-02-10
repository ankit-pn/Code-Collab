import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Provide UserId"],
        unique: [true, "UserId Must Be Unique"]
    },
    password: {
        type: String,
        required: [true, 'Please Provide Password'],
    },
    createdProjects: [{
        type: String,
        unique: [true,'Created Project has  to be unique']
    }],
    allowedProjects: [{
        type: String,
        unique: [true, 'Allowed Project has to be unique']
    }
    ]
});
var Users;
if ('Users' in mongoose.model) {
    Users = mongoose.model('Users');
}
else {
    Users = mongoose.model('Users', userSchema);
}
export { Users };