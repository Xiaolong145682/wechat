var express = require('express');
var app = express();
var http = require("http");
var server = http.createServer(app);
var User = require('../collections/user.js');
var router = express.Router();
var io = require("socket.io")(server);

/* 登录页面. */

router.get('/', function(req, res, next) {
  res.render('index', { title: '' });
});

/*登录判断*/
var nicks = "";
router.post("/abc",function(req,res){
   nicks = req.body.nick;
  var passwd = req.body.password;
  console.log(passwd);
  User.findOne({nick:nicks},function(err,r){
  if(err){
    console.log(err);
  }else if(r != null ){
        if(r.password === passwd){
          return res.redirect('/abc');
        }else{
        return  res.render("index",{title:"昵称或密码错误！"});
        }
      }else{
        return res.render("index",{title:"昵称或密码错误！"});
      }
  });

});
router.get('/abc', function(req, res){
  console.log(req.query);
  // console.log('Cookies-user: ', req.cookies);
  console.log(123);
　res.render("users",{title:nicks });
  // res.redirect("/users");
});
router.get("/home",function(req,res){
  console.log(req.session);
   console.log('Cookies-nick: ', req.cookies)
  User.find({},function(err,info){
    // console.log(info);
    if(err){
      console.log(err);
    }else{
      return res.render("ok",{info:info,nic:nicks});
    }
  });
})
/* 注册页面*/
router.get("/zhuce",function(req,res){
  res.render("zhuce",{title:'' });
  // res.redirect('/abc');
});
router.post("/ok",function(req,res){

  console.log(req.body);
  var nick = req.body.nick;
  var phone = req.body.phone;
  var email = req.body.email;
  var password = req.body.password;
  var active = ""
  User.count({nick:nick},function(err,n){
    if(n==0){
      var user = new User({
        phone:phone,
        nick:nick,
        password:password,
        email:email,
        active:active
      });
      user.save(function(err,u){
        if(!err){
          return res.render('zhuceok');
        }else{
          return res.redirect('/zhuce');
        }
      });
    }else{
      return res.render('zhuce',{title:"该昵称已被注册请更换新的昵称！"});
    }
  });

});
// router.get("/zhuceok",function(req,res){
//   res.render("zhuceok");
// });

/*修改密码*/
router.get("/xiugai",function(req,res){
  res.render("xiugai",{title:'' });
  // res.redirect('/abc');
});

router.post("/gm",function(req,res){
  var nick = req.body.nick;
  var password = req.body.password;
  User.count({nick:nick},function(err,r){
    if(err) console.log(err);
    console.log(r);
    if(r != 0){
      User.update({nick:nick},{password:password},function(err){
        if(err){
          console.log(err);
        }else{
        return res.render("xiugaiok");
        }
      });
    }else{
      return res.render("xiugai",{title:"昵称不存在！"});
    }
  });
});


/*会报错*/
// io.on("connection",function(socket){
// var names = "name";
//
//   socket.broadcast.emit("broadcast");
//   socket.on("chat message",function(msg,name){
//     console.log(name);
//    //  names.id = socket.id;
//     console.log(socket.id);
//     // console.log(msg);
//     io.emit("return message",msg,name,socket.id);
//     // msg = "";
//
//     socket.on("ok",function(fn){
//
//
//         fn();
//
//     });
//
//   });
// });

module.exports = router;
