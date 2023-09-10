const express = require('express')
const app = express()
const port = 8080
const ketnoi = require('./config/Database')
const test = require('./model/Round')







const WebSocket = require('ws');
const http = require('http');

// Tạo máy chủ HTTP (server riêng vì websocket cần có server riêng) . Dùng cách này để kết hợp server của Websocket và express thay vì phải dùng thư viện --> express-ws
const server = http.createServer(app);

// Kết nối WebSocket với máy chủ HTTP
const wss = new WebSocket.Server({ server });

ketnoi();





app.get('/',(req,res)=>{
    res.send("hello word");
})


wss.on('connection', (ws) => {

    const timeoutValue = 10000;

    function Newround(){
        const Round = new test({
            small_money:1000,
            small_player:0,
            big_money:50000,
            big_player:0,
            counter:1,
            result:-1,
            
            
            
        })
        Round.save().then(()=>{
            console.log("New Round: " + Round._id);
            CountRound(Round._id);
        }).catch(err=>{
            console.log("Không lưu vào được database",err);
        })
    
    }

    function CountRound(RoundNumber){
        test.findOne({_id:RoundNumber}).then(round=>{
            if(round.counter <= 10){
                round.small_money += Math.floor(Math.random() * 1000000);
                round.big_money += Math.floor(Math.random() * 1000000);
                const currentCounter = round.counter++
               
                console.log("ván thứ: " +RoundNumber +", thời gian:"+ currentCounter);
                round.save().then(()=>{
                
                    ws.send(JSON.stringify(round))

                    setTimeout(()=>{CountRound(RoundNumber)},1000)
                }).catch(()=>{})
            }else{
            round.result = Math.floor(Math.random() * 2);
            if(round.result == 0){
                round.dice = Math.floor(Math.random() * 3) + 1 ; // 1 -> 3
            }else{
                round.dice = Math.floor(Math.random() * 3) + 4 ; // 4 -> 6
            }
            
            round.save().then(()=>{
                    
                
                    for (let i = timeoutValue / 1000; i > 0; i--) {
                        setTimeout(() => {
                        console.log("Countdown: " + i);
                        // Gửi thông điệp countdown đến client Unity
                        ws.send(JSON.stringify({ countdown: i}));
                        }, (timeoutValue - i * 1000));
                    }
                     
                    
                    console.log("Winner of: " + round.result);
                    setTimeout(()=>{Newround(RoundNumber)},timeoutValue)
                    ws.send(JSON.stringify(round));
                  
            }).catch()
            }
        }).catch(()=>{})
    }

    Newround();

// Lắng nghe kết nối WebSocket
console.log('New WebSocket connection. CLIENT');
  
// Gửi dữ liệu tới máy khách khi kết nối thành công
//ws.send('Xin Chào Tôi Đến Từ SERVER Nodejs');
  
// Lắng nghe sự kiện khi máy khách gửi dữ liệu
ws.on('message', (message) => {
    console.log(`Received message-CLIENT: ${message}`);
});
  
// Lắng nghe sự kiện khi máy khách đóng kết nối
ws.on('close', () => {
    console.log('WebSocket connection closed. CLIENT');
});

});








//đem cái server đã kết hợp với express ở trên đem xuống gắn vào cho nó lắng nghe
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})








