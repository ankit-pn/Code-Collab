import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: [true, "Provide ProjectId"],
        unique: [true, "ProjectId  Must Be Unique"]
    },
    projectName:{
        type:String,
        required:[true,"Please Provide Project Name"]
    },
    createdBy: {
        type: String,
        required: [true, "Provide email of person who created the project"]
    },
    allowedUsers: [{
        type: String,
        required: [true, "Please Provide at least one allowed User"],
    }],
    content:{
        type: String
    },
    language: {
        type: String,
        required: [true,"Please Provide In Which Languaue you are creating Project"]
    }
});
var Projects;
if('Projects' in mongoose.model){
    Projects = mongoose.model('Projects');
}
else{
    Projects = mongoose.model('Projects',projectSchema);
};
export {Projects};