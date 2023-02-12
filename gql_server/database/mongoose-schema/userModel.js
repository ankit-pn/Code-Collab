import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Provide UserId"],
        unique: [true, "UserId Must Be Unique"]
    },
    userName:{
        type: String,
        required: [true,"Provide UserName"]
    },
    password: {
        type: String,
        required: [true, 'Please Provide Password'],
    },
    createdProjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
    }],
    allowedProjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
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