
/* 🍀 Server.js 상단 코드 */

// c18
const express = require('express')
const app = express()

// c24-5)
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 

// c30)
const { MongoClient, ServerApiVersion } = require('mongodb');



// app.listen(3000, function(){
//     console.log('c30 listening on 3000')
//   });

app.get('/', function(req요청, res응답) {               //2)
    res응답.sendFile(__dirname + '/index.html')       //4)
})   

app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "style.css");
});

app.get('/write',(req요청,res응답)=>{       //2, 2-1)
    res응답.sendFile(__dirname + '/write.html')       //2-2)
  });



// 🦄🦄c30 Database에 자료 저장하기, client.db('작명').collection('작명').insertOne(자료오브젝트, 콜백함수)
// (인증코드 에러남. 자료추가도 안됨)


// console.log('🦄🦄🦄🦄c30')
// /* 
//   1) mongoDB 사이트 
//   clusters ->collection -> database는 하나의 폴더, collection은 하나의 엑셀파일이라고 생각하면 딱 맞습니다. 

//   4) var db변수화 사용해서 코딩  

//   6)  _id 부여하기   
// */

// // 🌊실습코드 시작 ------ 다음 수업에 중첩되서 일단 코멘트 처리

//👉상단배치 const MongoClient = require('mongodb').MongoClient;

// var uri = "mongodb+srv://iikim2511:ingyum123@cluster0.o0asn.mongodb.net/todoapp?retryWrites=true&w=majority";

// // var uri = "mongodb+srv://iikim2511:ingyum123@cluster0.qqllo.mongodb.net/?retryWrites=true&w=majority";

// var db;   //c30-4)

// MongoClient.connect(uri, function(에러,  p_client){ //8-2)
  
//     if (에러) {
//       return console.log(에러);
//     }

//   // c30-2)
//   // database.... 'todoapp' 에 연결
//   db = p_client.db('todoapp');

//   // collecton....'post' 에 연결
//   // .insertOne함수 : .insertOne(저장할 데이터, 그 이후 실행할 콜백함수)  👉 mongoDB에 가면 저장된 데이터 확인됨

//   db.collection('post').insertOne({이름:'John', _id:100} , function (에러, 결과) {
//     console.log('c30 finished')    
//   });


//   // // c30-4) 서버띄우는 코드 여기로 옮기기        , 8-4)
//   app.listen(3000, function(){
//     console.log('c30 listening on 3000')
//   });
// })

// // // 🌊 실습코드 끝------



// 🦄🦄c30-2. mongo db 예제문 복붙 - 에러는 안나는데, post에 데이터 추가 안됨
// https://www.w3schools.com/nodejs/nodejs_mongodb_createcollection.asp

// 🌊실습코드 시작 ------ 다음 수업에 중첩되서 일단 코멘트 처리

//👉상단배치 const { MongoClient, ServerApiVersion } = require('mongodb');

var uri = "mongodb+srv://iikim2511:ingyum123@cluster0.qqllo.mongodb.net/?retryWrites=true&w=majority";

// var client
var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// connect
client.connect(err => {

  // client.db("todo").collection("post");
  var collection = client.db("todo").collection("post");

  // insertOne
  collection.insertOne({ name: "Company Inc", address: "Highway 37" }, function (에러, 결과) {
    console.log('c30 finished')    
  });



  // 🦄c32. app.post('/add',

    app.post('/add', function(요청, 응답){    //2-2)
      응답.send('전송완료 c32.');
      console.log(요청.body.ig_title);
      console.log(요청.body.ig_data);
      
      //2-4)insertOne
      collection.insertOne( { 제목 : 요청.body.ig_title, 날짜 : 요청.body.ig_data } , function(){    
        console.log('저장완료 c32-2');
      });
    });


  // perform actions on the collection object
  client.close();

  app.listen(3000, function(){
    console.log('c30 listening on 3000')
  });
});

// 🌊 실습코드 끝------
