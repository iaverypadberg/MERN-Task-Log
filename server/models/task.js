const mongoose = require('mongoose');
const Schema = mongoose;

const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    day:{
        type:String,
        required:false
    },
    id:{
        type:String,
        required:false
    }
    
})
// If the task id is

taskSchema.post('findByIdAndDelete',async function(user,task){
    try{
        const {_id} = task;
    // Delete the task in user.tasks with the corresponding id
    const deletedTask = await user.findOneAndDelete(_id)
}
catch(err){
    console.trace({err})
}
  })

const Task = mongoose.model('Task', taskSchema);



module.exports = Task;