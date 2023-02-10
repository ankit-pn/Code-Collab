import mongoose from "mongoose";


const codeSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: [true, "Provide Project Id"]
    },
    codeId:{
        type: String,
        required: [true, "Please Provide CodeId"]
    },
    version: {
        type: String,
        required: [true, "Provide Code Version"],
        unique: [true, "That Version Of Code Already Exist"]
    },
    date:{
        type: String,
        required: [true,"Please Provide Date"]
    },
    content: {
        type: String,
        required: [true, "Provide Code Content"]
    }
});
var Codes;
if('Codes' in mongoose.model){
    Codes = mongoose.model('Codes');
}
else{
    Codes = mongoose.model('Codes',codeSchema);
}
export {Codes};