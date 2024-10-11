import mongoose from "mongoose";

const admin_Schema= new mongoose.Schema({
    admin_Id:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default: 'admin'
    }
});

const Admin = mongoose.model("Admin", admin_Schema);

export default Admin;