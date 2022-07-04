
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
var uri = "mongodb+srv://iikim2522:Fv7kJuN3OQ4no8uO@cluster0.qqllo.mongodb.net/?retryWrites=true&w=majority";

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
      console.log(req요청.body.ig_title);
      console.log(req요청.body.ig_data);

      // 32)
      // db.collection('ig_collection').insertOne( { 제목 : req요청.body.ig_title, 날짜 : req요청.body.ig_data } , function(){    
      //   console.log('저장완료 c32-2');
      // });  

      // 38) 
      // .collection('ig_counter'), findOne
      db.collection('ig_counter').findOne({name: '게시물갯수'},function(p_err,p_db결과) {
        console.log(`p_db결과.totalPost:`+p_db결과.totalPost)
        console.log(`p_db결과.name:`+p_db결과.name)

        //  _id:총게시물갯수 +1 
        db.collection('ig_collection').insertOne({ _id: p_db결과.totalPost +1 ,제목 : req요청.body.ig_title, 날짜 : req요청.body.ig_data}, function(){
          console.log('저장완료 c38-2')          
        } )
      })
      

      // ???? - 40강에서 코드 추가해야 완성됨....................🍚



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
          db.collection('ig_collection').find().toArray(function(에러, 결과){   //34-2)
      
          console.log(결과)
      
          // render() , list.ejs , ig_posts : 결과
          req.render('list.ejs', { ig_posts : 결과 })     //34-4)  36-4)
          })
      });
})

// // 🌊 실습코드 끝------













// 🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄
//🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄
// 여기서부터는 그냥 녹화하면서 대충 , 선생님이  정리한 내용 복붙함

/*
🦄🦄 선생님 38 게시물마다 번호를 달아 저장해야합니다. findOne(.),insertOne(.)
🦄🦄 선생님 40 게시물마다 번호 달기2, updateOne(.), inc 연산자
 */
console.log('🦄🦄🦄🦄c38')





/* 
🦄🦄 선생님 18 AJAX로 DELETE 요청하기 1, $.ajax(.), app.delete('delete',(.)={})
👉list.ejs

🦄🦄 선생님 19 AJAX로 DELETE 요청하기2, deleteOne(.), parseInt(.), data-id, .dataset.id 
👉list.ejs

🦄🦄 선생님 20 AJAX로 DELETE 요청하기3, jQuery기능 .send .status .sendFile .render .json(~)
👉list.ejs

2) jQuery기능

app.get('/~~', function(요청, 응답){
  응답.send('<p>some html</p>')
  응답.status(404).send('Sorry, we cannot find that!')
  응답.sendFile('/uploads/logo.png')
  응답.render('list.ejs', { ejs에 보낼 데이터 })
  응답.json(제이슨데이터)
});

 */

app.delete('/delete', function(요청, 응답){   //18)

  요청.body._id = parseInt(요청.body._id)   // 19) parseInt()


  // DB에서 글 삭제해주쇼
  db.collection('post').deleteOne(요청.body, function(에러, 결과){    // 19) deleteOne()
    console.log('삭제완료')
  })

  응답.send('삭제완료')
});

//🦄🦄 선생님 21 상세페이지를 만들어보자 (URL parameter) .get('/detail/:id작명', .findOne(~), .params.id작명, .parseInt(~)
console.log('🦄🦄🦄🦄c21')
// 👉detail.ejs

/* Q) http://localhost:8080/detail/3 ,  /detail/4....등으로 접속하면 

-> 서버에서 데이터 보냄 

-> 그에 맞는 데이터 적용된 게시물 보여주기

2) 하드코딩
app.get('/detail/3', function(요청, 응답){
  응답.render('detail.ejs', {3번게시물데이터} )
});

app.get('/detail/4', function(요청, 응답){
  응답.render('detail.ejs', {4번게시물데이터} )
}); */

/* 4) 소프트코딩 
콜론 (:) 기호를 붙여주면 누군가 /detail/ 뒤에 아무 문자열이나 입력하면~ 이라는 소리입니다.
땡땡 기호 뒤엔 여러분이 자유롭게 작명

6)
{ _id : URL에입력한id값 }

8)요청.params.id
코드에 사용자가 URL에 입력한 :id값을 그대로 넣어주기

10) { _id : parseInt(요청.params.id) }
parseInt()
요청.params.id를 출력해보면 ‘2’ 이런 식으로 문자자료형으로 출력됩니다.
이걸 숫자로 변환하기 위해 parseInt를 쓴 것입니다.
*/

app.get('/detail/:id작명', function(요청, 응답){       // 2) 4)
  db.collection('post').findOne( { _id : parseInt(요청.params.id) }, function(에러, 결과){   //6) 8) 10)
    응답.render('detail.ejs', {data : 결과} )     //2) 
  })
});

// 🦄🦄 선생님 22 css폴더-server.js에 지정하기, nav.html공유하기- include ejs문법
// 👉nav.html
// 👉list.ejs
// 👉.ejs

console.log('🦄🦄🦄🦄c22')

/* 
4) 👆css폴더-server.js에 지정하기

6) <nav>태그 UI가 필요한 파일에 가서 이런 문법을 사용합니다
<%- include('nav.html') %>
*/

// 🦄🦄 선생님 23 글 수정 기능1, PUT요청하기, method="PUT", method-override
// 👉 edit.ejs
console.log('🦄🦄🦄🦄c23')

/* 
4) .get('/edit/:id',~~)

6) DB에 있던 (URL에 적힌 :id)번 게시물의 제목과 날짜를 꺼내오려면 어떤 코드를 작성해야할까여?

findOne함수
요청.params.id

8)이제 어떤 사람이 /edit/4로 접속하면 {_id : 4}인 게시물을 찾고, 그 결과를 edit.ejs에 보내주게됩니다.

*/

app.get('/edit/:id', function(요청, 응답){      //4)

  db.collection('post').findOne({ _id : parseInt(요청.params.id) }, function(에러, 결과){   //6)

    응답.render('edit.ejs', { post : 결과 })      //8)

  })
  
});

/* 10)  html form 태그에 PUT요청을 사용하기

1. 터미널에 npm install method-override 를 입력해서 설치하시면 됩니다.
2. 👆 설치를 완료하기 위해 server.js 상단에 다음 코드를 추가합니다. 
3. 이제 form 태그에 PUT요청을 사용할 수 있습니다. 
👉edit.ejs
*/


// 🦄 선생님 24 글 수정 기능 2 : DB 데이터를 수정해보자
console.log('🦄🦄🦄🦄c24')

/*2) 👉edit.ejs
 4)updateOne
 6)<form>태그에 몰래 안보이는 <input>을 추가해보도록 합시다. 

 “사용자가 /edit으로 PUT요청을 하면”

“post라는 콜렉션에 있는 {_id : 요청.body.id } 데이터를 찾아서 { 제목 : 요청.body.title , 날짜 : 요청.body.date } 로 바꿔주세요”

8) parseInt()를 추가

10) 응답.redirect()를 추가해줍니다.
왜냐면 응답을 안해주면 브라우저가 멈출 수 있으니까요.
*/

app.put('/edit', function(요청, 결과){

  // 4) 6) 8)
  db.collection('post').updateOne( {_id : parseInt(요청.body.id) }, {$set : { 제목 : 요청.body.title , 날짜 : 요청.body.date }},  
  
  function(){
    console.log('수정완료')
    응답.redirect('/list')    //10)
  });
});


// 🦄🦄 선생님 25 세션, JWT, OAuth 등 회원인증 방법 이해하기
console.log('🦄🦄🦄🦄c25')

// 🦄🦄 선생님 26 (회원인증기능 1) 로그인 페이지 만들기 & 아이디 비번 검사
console.log('🦄🦄🦄🦄c26')

// 🦄🦄 선생님 27 (회원인증기능 2) 아이디 비번을 DB와 비교하고 세션 만들어주기
console.log('🦄🦄🦄🦄c27')

// 🦄🦄 선생님 28 (회원인증기능 3) 로그인 유저만 접속할 수 있는 페이지 만들기
console.log('🦄🦄🦄🦄c28')

// 🦄🦄 선생님 29 .env 파일에서 가변적인 변수 데이터들 환경변수(environment variable) 관리하기
console.log('🦄🦄🦄🦄c29')