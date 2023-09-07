const mongoose = require('mongoose');



async function connect(){
    try {
       await mongoose.connect('mongodb+srv://rikfan:Trung27031996.@cluster0.7td5sro.mongodb.net/Game?retryWrites=true&w=majority')
       
       console.log('kết nối thành công') 
    } catch (error) {
        console.log('Thất bại');
    }
}
module.exports =  connect ;