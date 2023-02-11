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
            return user;
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
            console.log('reg mutation called')
            const user = args.input;
            console.log(user);
            // user['allowedProjects'] = [];
            // user['createdProjects'] = [];
            const newUser = new Users(user);
            // newUser.allowedProjects = ['p7t6i7ytg3']
            // newUser.createdProjects = ['p73']
            console.log(newUser)
            await newUser.save().catch((err) => {
                console.log("Data Not Saved and New User Not Created");
                console.log(err);
            });
            
            return await Users.findOne({userId:args.input.userId});
        },
        add_allowed_user: async(parent, args)=>{
            const userId = args.input.userId;
            const projectId = args.input.projectId;   

            const project = await Projects.findOne({projectId: projectId});
            if (!project) {
                throw new Error(`Project with id ${projectId} not found`);
            }
            const user = await Users.findOne({userId:userId});
            if (!user) {
                throw new Error(`User with id ${userId} not found`);
            }
            console.log(user);
            console.log(project);


            if(project.allowedUsers.indexOf(userId)===-1){
                project['allowedUsers'].push(userId);
            }
          
            if(user.allowedProjects.indexOf(projectId)===-1){
                // user['allowedProjects'] = [];
                user.allowedProjects.push(project);
            }
            await user.save().catch((err) => {
                console.log("Not able to push to user");
                console.log(err);
            });
            console.log(user);
            console.log(project);

            await project.save().catch((err) => {
                console.log("Data Not Saved and Project List has No access of userId ");
                console.log(err);
            });
          
            return await Projects.findOne({projectId:projectId});
           
        },
        create_project: async(parent, args)=>{
            const userId = args.input.userId;
            const project = args.input.project;


            const user = await Users.findOne({userId:userId});

            if (!user) {
                throw new Error(`User with id ${userId} not found`);
            }
            const newProject = new Projects(project);

            await newProject.save().catch((err) => {
                console.log("Data Not Saved and New Post Not Created");
                console.log(err);
            });

            // if(user.createdProjects.indexOf(newProject)===-1){
                user.createdProjects.push(newProject);
            // }
            // if(user.allowedProjects.indexOf(newProject)===-1){
                user.allowedProjects.push(newProject);
            // }
            await user.save();
          

            return await Users.findOne({userId:userId}).populate('createdProjects').populate('allowedProjects');
        },
        add_new_version: async(parent,args)=>{
            const projectId = args.input.projectId;
            const code = args.input.code;
            const project = await Projects.findOne({projectId:projectId});
            if(!project){
                throw new Error(`Project with id ${projectId} not found`);
            }
            const newCode = new Codes(code);

            await newCode.save().catch((err)=>{
                console.log("Code Not Saved ");
                console.log(err);
            })
            // if(project.code.indexOf(code)===-1){
                project.code.push(newCode);
            // };
            await project.save().catch((err) => {
                console.log("Data Not Saved and New Post Not Created");
                console.log(err);
            });;
           
           
            return await Projects.findOne({projectId:projectId}).populate('code');

        }
       
    },
};
export { resolvers };