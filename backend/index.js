let express= require('express');

let mongoose= require('mongoose');

let bodyParser= require('body-parser');

let cors= require('cors');

let bcrypt = require('bcrypt');

let app=express();

const User=require('./models/user.model');

let link="mongodb+srv://admin:admin@mini-project-sx4vj.mongodb.net/test?retryWrites=true&w=majority";

const port=process.env.PORT || 3000;

//const port=4200;

app.listen(port,function(){
    mongoose.connect(link, { useCreateIndex: true, useNewUrlParser: true , useFindAndModify: false }, function(error){
        if(error)
        {
            console.log(error);
        }
        else{
            console.log("connection successful");
            var db = mongoose.connection;
        }
    });
}
)

console.log("Server started");


app.get('/', (req, res) => res.send('Hello!'));

app.use(cors());    //to avoid proxy conflict

app.use(bodyParser.urlencoded({ extended: true }));     //to pass collective data
app.use(bodyParser.json());

// var HashedPassword = bcrypt.hashSync('Password',10);

app.post("/register",function(req,res)
{
    var HashedPassword = bcrypt.hashSync(req.body.Password,10);
    User.findOne({ Email: req.body.Email },function(err,users)
    {
        if(err)
        {
            res.send('Something went wrong');
        }
        if(!users)
        {
            let user = new User(
                {
                    Email: req.body.Email,
                    Password: HashedPassword,
                    Branch: req.body.Branch
                });

            console.log(user);
            console.log("Sending");
            user.save((err) => {

                if (!err) {
                    console.log('success');
                    res.status(200).send({ message: 'Valid' });
                    app.get('/register', (req, res) => res.send("Success"));

                }
                else {
                    console.log('failure');
                    res.status(401).send({ message: 'Invalid', error: err });
                    console.log(err);
                    app.get('/register', (req, res) => res.send("Try again"));
                }
            });
        }
        else
        {
            console.log('User already exists');
            res.send('User already exists');
        }
    });
    
});

app.post("/login",function(req,res)
{
    console.log(req.body.Email);
    console.log(req.body.Password);
    User.findOne({ Email: req.body.Email },function(err,users)
    {
        if(err)
        {
            res.send('Something went wrong');
        }
        // console.log(users);
        console.log(users.Password);
        bcrypt.compare(req.body.Password,users.Password,(er,ans) => 
        {
            if(er)
            {
                res.send('Something went wrong');
            }
            // console.log(ans);  
            // console.log(req.body.Password);
            if(ans)
            {
                console.log('Login Success');
                res.json({message : 'Login of '+users.Email+' is successful',value : 1, fvalue: '', Email : users.Email});
            }
            else
            {
                console.log('Login Failed');
                res.send({message : 'Login Failed', value : '' , fvalue : 1, Email : ''});
            }
        });
        console.log(users);

    });
});


