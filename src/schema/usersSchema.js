
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const usersSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"firstname is required"],
        minlength:[5,"first name must have atleast 5 character"],
        maxlength:[20,"first name must have less than or equals to  20 character"],
        lowercase:true,
        trim:true
    },
    lastName:{
        type :String,
        required:[true,"lastname is required"],
        minlength:[5, "last name must have atleast 5 character"],
        maxlength:[20,"last name must have less than or equals to  20 character"],
        lowercase:true,
        trim:true,

    },
    mobileNumber:{
    type:String,
    required:[true,"mobile number must be provided"],
    unique:[true,"mobilenumber is already in use"],
    minlength:[10,"mobile number must have minimum 10 numbers"],
    maxlength:[10,"mobile number must have maximum 10 numbers"]
    },
    email:{
        type:String,
        required:[true,"email must be provided"],
        unique:[true,"email is already in use"],
        lowercase:true,
        trim:true,
         match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"please fill the valid email"]
    },
    password:{
        type:String,
        required:[true,"password must be provided"],
        minlength:[8,"password must have atleast 8 or more character"],
         
    },
    refreshToken:{
        type:String,
        default:null,
        required:false
    }
},{timestamps:true});
usersSchema.pre('save',async function(){
    const hashedPassword= await bcrypt.hash(this.password,10);
    console.log(hashedPassword);
    
    this.password=hashedPassword;
});
const User= mongoose.model("User",usersSchema);
module.exports=User;
