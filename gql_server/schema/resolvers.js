import { dbConnect } from "../database/dbConnect.js";
import {Users} from "../database/mongoose-schema/userModel.js"
import {Projects} from "../database/mongoose-schema/projectModel.js";
import {Codes} from "../database/mongoose-schema/codeModel.js";
import { v4 as uuidv4 } from "uuid";
import { userInfo } from "os";
dbConnect();
const resolvers = {
    Query: {
        users: async () => {
            const user = await Users.find();
            return users;
        },
        login: async (parent, args) => {
            // console.log(args.input);
            const user = await Users.findOne({ userId: args.input.userId });
            // console.log(args.userId);
            if (!user) {
                throw new Error('User not found');
              }
            if(user.password === args.input.password){
                return 1;
            }
            else{
                return 0;
            }
        },
        user: async(parent, args)=>{
            const user = await Users.findOne({ userId: args.input.userId });
            if (!user) {
                throw new Error('User not found');
              }
           return user;
        },
        view_latest_code: async(parent,args)=>{
            const projects = await Projects.findOne({projectId: args.input.projectId});
            if(!projects){
                throw new Error('Project Not Found');
            }
            return await Codes.findOne({CodeId: projects.currCode});
        }
        ,
        view_version_code: async(parent,args)=>{
            const projects = await Projects.findOne({projectId: args.input.projectId});
            if(!projects){
                throw new Error('Project Not Found');
            }
            return projects;
        }
    },
    Mutation: {
        register: async (parent, args) => {
            const user = args.input;
            const newUser = new Users(user);
            await newUser.save().catch((err) => {
                console.log("Data Not Saved and New User Not Created");
                console.log(err);
            });
            return await Users.find();
        },
        add_allowed_user: async(parent, args)=>{
            const userId = args.input.userId;
            const projectId = args.input.projectId;

            const project = await Projects.findOne({projectId: projectId});
            if (!project) {
                throw new Error(`Project with id ${projectId} not found`);
            }
            const user = await Projects.findOne({userId:userId});
            if (!user) {
                throw new Error(`User with id ${userId} not found`);
            }

            if(project.allowedUsers.indexOf(userId)===-1){
                project.allowedUsers.push(userId);
            }

            if(user.allowedProjects.indexOf(projectId)===-1){
                user.allowedProjects.push(projectId);
            }

            await project.save();
            await user.save();
            return await Projects.findOne({projectId:projectId});
           
        },
        create_project: async(parent, args)=>{
            const userId = args.input.userId;
            const project = args.input.project;

            const projectId = project.projectId;

            const user = await Users.findOne({userId:userId});

            if (!user) {
                throw new Error(`User with id ${userId} not found`);
            }

            if(user.createdProjects.indexOf(projectId)===-1){
                user.createdProjects.push(projectId);
            }
            if(user.allowedProjects.indexOf(projectId)===-1){
                user.allowedProjects.push(projectId);
            }
            await user.save();
            const newProject = new Projects(project);

            await newProject.save().catch((err) => {
                console.log("Data Not Saved and New Post Not Created");
                console.log(err);
            });

            return await Users.find({userId:userId});
        },
        add_new_version: async(parent,args)=>{
            const projectId = args.input.projectId;
            const code = args.input.code;
            const project = Projects.findOne({projectId:projectId});
            if(!project){
                throw new Error(`Project with id ${projectId} not found`);
            }
            if(project.code.indexOf(code)===-1){
                project.code.push(code);
            };
            await project.save();
            const newCode = new Codes(code);

            await newCode.save().catch((err)=>{
                console.log("Code Not Saved ");
                console.log(err);
            })
           
            return await project.find({projectId:projectId});

        }
       
    },
};
export { resolvers };