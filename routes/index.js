const router = require('express').Router();
const passport = require('passport');

const genPassword = require('../src/passwordUtils').genPassword;
const connection = require('../src/mongodb.js').connection
const User = require('../src/mongodb.js').User

var generator = require('generate-password');



router.post('/login', passport.authenticate('local', {successRedirect: 'home'}));



router.post("/signup", (req, res, next) => {
    const saltHash = genPassword(req.body.pw);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.uname,
        hash: hash,
        salt: salt,
        
    });

    newUser.save()
        .then((user) => {
            console.log(user);
        });

    res.redirect('/login');
})

router.post("/generate", async (req, res) => {
    const password2 = await generator.generate({ 
        length: 8, 
        numbers: true, 
        symbols: true, 
        uppercase: false, 
        excludeSimilarCharacters: true, 
        strict: true, 
      
    }); 
    
    res.render('signup', {password2})
   
})

router.get("/",  (req, res) => {
    res.render("login")
})

router.get("/login",  (req, res) => {
    res.render("login")
})

router.get("/signup",  (req, res) => {
    res.render("signup")
})

router.get("/home",  (req, res) => {
    const { user: {username} = {}} = req;
    res.render("home", {
        username
    })
})

// Home

module.exports = router





