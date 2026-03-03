const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        requried:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"Password must be atleast 6 characters long!"]
    },

    role:{
        type:String,
        enum:["User","Manager","Admin"],
        default:"User"
    }
})

userSchema.pre("save", async function () {
      if (!this.isModified("password")) return next();
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      
})

userSchema.methods.comparePassword = async function (enterdPass) {
    return await bcrypt.compare(enterdPass,this.password)
}

module.exports = mongoose.model("User",userSchema);