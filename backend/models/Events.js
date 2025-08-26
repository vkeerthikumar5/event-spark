import mongoose from "mongoose";

const EventSchema=new mongoose.Schema({
    title:{type:String,required:true},
    desc:{type:String,required:true},
    date:{type:String,required:true},
    location:{type:String,required:true},
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    registrations: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" }  // link to User
      ]
})

export default mongoose.model("Events",EventSchema)