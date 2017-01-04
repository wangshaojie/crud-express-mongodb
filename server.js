const express = require('express');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const MongoClient = require('Mongodb').MongoClient;
const cheerio = require('cheerio'); //服务端的jquery

const app = express();



//中间件 bodyParser.urlencoded 模块用于解析req.body的数据
//解析成功后覆盖原来的req.body，如果解析失败则为 {} 。
//该模块有一个属性extended，
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json())
app.use(validator());

//定义静态文件默认路径
app.use(express.static('public'))


app.set('view engine', 'ejs');


var db;


MongoClient.connect('mongodb://wangshaojie:sjwang52..@ds115798.mlab.com:15798/star_login', (err, database) => {
  if (err) return console.log(err)
  db = database
  // app.listen(3000, () => {
    console.log(new Date() + "=============>" + "Database connection success")
  // })
})

//监听端口
app.listen(3009, () => {
   console.log('listening on 3009')
})



//发送请求
const rootPath = '/expressAndMongoCRUD/view/';
app.get("/", (req, res) => {
	// res.send('Hello Pa')
	//res.sendFile( rootPath + 'index.html');

	//用collection 跟 find方法查找数据可用的方法，当然 这没有意义
	var cursor = db.collection('login').find()
	//console.log(cursor)
	db.collection('login').find().toArray(function(err, results) {
	  if (err) 
	  	return console.log(err)

	  res.render('index.ejs', {
	  	uses : results
	  })
	  
	})

});

//提交
app.post("/login", (req, res) => {
	db.collection('login').save(req.body, (err, result) => {
		if (err) return console.log(err)

		console.log('saved to database')


		res.redirect('/');
	});

	//找到login里的所有数据转为Array
	// db.collection('login').find().toArray(function(err, results) {
	//   console.log(results)
	// })
});

//update
app.put('/login', (req, res) => {
  db.collection('login')
  .findOneAndUpdate({leader_name: 'w3'}, {
    $set: {
      leader_name: req.body.leader_name,
      leader_email: req.body.leader_email
    }
  }, {
    sort: {_id: -1},
    upsert: false    //如果查不到数据 为真的话就追加一条  为假的话就什么也不做
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/login', (req, res) => {
  db.collection('login').findOneAndDelete({
  	leader_name: req.body.leader_name
  }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('deleted succ')
  })
})