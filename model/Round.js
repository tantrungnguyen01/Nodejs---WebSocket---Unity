const mongoose = require('mongoose')




const RoundSchema = new mongoose.Schema({
    
    _id:Number, //muốn đè id thì báo nó ra như này 
    small_money:Number,
    small_player:Number,
    big_money:Number,
    big_player:Number,
    counter:Number,
    result:Number,
    dice:Number,
    
  
   
},{_id:false,timestamps:true}) //trong này thì vô hiệu hóa nó trên mongodb _id


// phương thức duy nhất viết đè cái id trong mongo ra ngoài 
RoundSchema.pre('save', async function (next) {
    const Model = this.constructor;
    if (this.isNew) {
        try {
            const count = await Model.countDocuments();
            this._id = count + 1;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});
// end override id




module.exports = mongoose.model('Vanchoi',RoundSchema);


