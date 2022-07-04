
/* 🍀 Server.js 상단 코드 */

// c18
const express = require('express')
const app = express()

// c24-5)
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 

// c30)
const MongoClient = require('mongodb').MongoClient;

// c32) 
app.set('view engine', 'ejs');






// 🦄🦄 terminal 명령어 정리 👉 codingapple-Node.js.MongoDB-2022-0629-classnote폴더...server.js





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


console.log('🦄🦄c30')
/* 
  1) mongoDB 사이트 
  clusters ->collection -> database는 하나의 폴더, collection은 하나의 엑셀파일이라고 생각하면 딱 맞습니다. 
*/

// // 🌊실습코드 시작 ------ 다음 수업에 중첩되서 일단 코멘트 처리

//👉상단배치 const MongoClient = require('mongodb').MongoClient;

// 😎uri : iikim2522:dRT2GRSjF5PoHsam : 비밀번호 랜덤생성했을때 접속성공함 ,
// https://cloud.mongodb.com/v2/62be0862fda87151be53eb94#setup/access
// 비밀파일에 숨겨야함. 해킹될수있음, 연습때는 연습끝날때마다 비밀번호 새로 생성
var uri = "mongodb+srv://iikim2522:wgx494SOBiyxpkFC@cluster0.qqllo.mongodb.net/?retryWrites=true&w=majority";

// var db
var db;   //c30-4)

MongoClient.connect(uri, function(에러, p_client){ 
  
    if (에러) {
      return console.log(에러);
    }

    console.log('c30 데이터베이스 연결 success');

  // database설정 :  db() : .... 'ig_database' 에 연결
  db = p_client.db('ig_database');

  // collecton설정 : ....'ig_collection' 에 연결
  // .insertOne함수 : .insertOne(저장할 데이터, 그 이후 실행할 콜백함수)  👉 mongoDB에 가면 저장된 데이터 확인됨

  db.collection('ig_collection').insertOne({제목: "first", 날짜:1, 이름:'John2', _id:10}, function (에러, 결과) {
    console.log('c30 insertOne success')    
  });



  // 🦄🦄c32 HTML에 DB데이터 넣는 법 1, EJS 파일 만들기 
  //     /* 🦄 누군가 /add 경로로 POST 요청을 하면, 폼에 입력된 자료를 2개가 서버로 도착합니다.
  //         이 때 자료 2개를 ~~라는 이름의 collection에 저장하기 */


  // 🦄🦄c38 게시물마다 id넣기, auto increment문법, findOne(.), insertOne(.)
  /*    
    2) ex)그냥 단순하게 "id:총게시물갯수+1"하면 2번째 자료(id:2)를 지우고, 새로운 데이터를 넣었을때 id:2가 되는 상황이 발생함
    이렇게 되면 안됨, 
    지우고 새로운거 넣어도 id:2는 공백이 되어야 함
    
    4) find() : 모든 데이터 찾고싶을때
    findOne() : 원하는 데이터 1개만 찾고싶을때  

    findOne() : 그 데이터가 있는 오브젝트를 찾아줌. 그 오브젝트 안의 데이터들을 수정할 예정

    ~~collection(~)~~.findOne({~~{}~~},function(){
      ~~~~ 수정할 코드~~~
    })


    🍄6) /add로 post요청하면, 
    DB의 총게시물갯수 데이터 가져오셉
    
    🍄8) 새로운 collecton 만듬
    -> 여기에 자료갯수를 저장해서 꺼냈는 방식을 사용할 예정
    default로 데이터 만들어두고, 게시물 만들어질때마다 totalPost숫자 늘리는 방식을 사용할 예정
  */

     console.log('🦄🦄c32')
     console.log('🦄🦄c38')
    

    //  post()를 통한 insetOne()실행, send(), 요청.body.ig_title
    app.post('/add', function(req요청, res응답){   
      res응답.send('c32. post() 전송완료');
      console.log('req요청.body.ig_title:'+req요청.body.ig_title);
      console.log('req요청.body.ig_data:'+req요청.body.ig_data);

      // 32)
      db.collection('hello').insertOne( { 제목 : req요청.body.ig_title, 날짜 : req요청.body.ig_data } , function(){    
        console.log('저장완료 c32-2');
      });  

      // 38) 
      // .collection('ig_counter'), findOne
      db.collection('ig_counter').findOne({name: '게시물갯수'},function(p_err,p_db결과) {
        console.log(`p_db결과.totalPost:`+p_db결과.totalPost)
        console.log(`p_db결과.name:`+p_db결과.name)
        
        //  _id:총게시물갯수 +1 
        db.collection('ig_collection').insertOne({ _id: p_db결과.totalPost +1 ,제목 : req요청.body.ig_title, 날짜 : req요청.body.ig_data}, function(){
          console.log('저장완료 c38-2')          
          
          // 🦄🦄 선생님 40 게시물마다 id넣기2 - id에 +1하기, updateOne(.), mongodb operator: inc
          console.log('🦄🦄c40')  
          /*
            10) updateOne({},{},function(){}) : 하나의 데이터 수정
            updateMany() : 한번에 많은 데이터 수정

            20-10) post()할때, 
            findOne() :  collection('~~')에서 name:'게시물갯수'데이터를 가지고있는 오브젝트 전체를 가져옴 (ex: collection(counter)의 오브젝트)
            collection("~~")에 insertOne : collection("~~")에  그 db결과의 totalPost에 +1을 해서 _id만듬

            20-20) post()할 때 + collection('~~') 에 insertOne할때 : 
            updateOne() : collection('~~')에서 " name:게시물갯수"데이터를 가진 오브젝트 전체를 가져옴. 
            그안의 데이터 하나(ex: totalPost) 를 수정함 (ex: totalPost+1)
          */

        // updateOne
        db.collection('ig_counter').updateOne({name:'게시글갯수'},{$inc :{totalPost:1}},function(p_err,p_db) { 
          if (p_err) { return console.log('err')  }          

        })



        } )
      })
      

      



    });   


      // c30-4) 서버띄우는 코드 여기로 옮기기      
      app.listen(3000, function(){
        console.log('c30 listening on 3000')
      });




     // 🦄32-2. ejs문법 
     // 👉views/list.ejs 생성
     //    npm install ejs

     //👉상단배치 app.set('view engine', 'ejs');

     /* 4) list로 get요청...접속하면, 실제 DB에 저장된 데이터 적용된html보여줌 

      -2) http://localhost:8080/list 주소창 접속*/
        
      // 🌊코드 시작 ---------------- 다음 수업에 중첩되서 일단 코멘트 처리
      // 👉 c34 코드로 옮김

      // // list.ejs
      // app.get('/list',function (res,req) {
      //     req.render('list.ejs');        
      // })

      // 🌊코드 끝----------------------------------------------------------


      //🦄🦄c34 HTML에 DB데이터 넣는 법 2 (DB데이터 읽기), .find(.).toArray(에러,결과)=>{}), { ig_posts : 결과 }
      // 👉list.ejs

      /* list.ejs 파일안 코딩
            <!-- 🦄c34 반복문     <%  %>   
                for (let i = 0; i < array.length; i++) {
                  const element = array[i];              
                }        
            -->
            
            <%    for (let i = 0; i < ig_posts.length; i++) {   %>  
              <h4>할일 제목 : <%= ig_posts[i].제목 %></h4>
              <p>할일 마감날짜 : <%= ig_posts[i].날짜 %></p>          
            <%  }  %>        
      */  
      
      /*
          2).find().toArray() 라고 적으시면 collection(‘post’)에 있는 모든 데이터를 Array 자료형으로 가져옵니다. 

          4)list.ejs 파일을 렌더링함과 동시에 {ig_posts: 결과} 라는 데이터를 함께 보내줄 수 있습니다. 

          (정확히 말하면 결과라는 데이터를 ig_posts 라는 이름으로 ejs 파일에 보내주세요~ 입니다)
      */
    
      app.get('/list',function(res,req){      //34-4)

          // // .find().toArray() 
          db.collection('ig_collection').find().toArray(function(p_err, p_db결과){   //34-2)
      
          console.log(p_db결과)
      
          // render() , list.ejs , ig_posts : p_db결과
          req.render('list.ejs', { ig_posts : p_db결과 })     //34-4)  36-4)
          })
      });
})

// // 🌊 실습코드 끝------








