
const express = require ("express");
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();


//user, pass and docId
const user = process.env.user;
const pass = process.env.pass;
const docId = process.env.docId;
const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./credentials.json');

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get("/", function(req, res){
    res.render("index.html");
      
})

function nota(one, two, tree, four, five, six, seven, eight, nine, ten){
    var total = 0;

    if(one == 'b'){
        total = total + 1;
    }
    else if(one == 'c'){
        total = total + 3;
    }
    if(two == 'b'){
        total = total + 1;
    }
    else if(two == 'c'){
        total = total + 3;
    }
    if(tree == 'b'){
        total = total + 2;
    }
    else if(tree == 'c'){
        total = total + 3;
    }

    if(four == 'b'){
        total = total + 3;
    }
    else if (four == 'c'){
        total = total + 1;
    }
    if(five == 'b'){
        total = total + 1;
    }
    else if(five == 'c'){
        total = total + 3;
    }
    if(six == 'b'){
        total = total + 2;
    }
    else if(six == 'c'){
        total = total + 3;
    }
    if(seven == 'a'){
        total = total + 1;
    }
    else if(seven == 'c'){
        total = total + 3;
    }
    if(eight == 'a'){
        total = total + 3;
    }
    else if(eight == 'b'){
        total = total + 2;
    }
    if(nine == 'b'){
        total = total + 3;
    }
    else if(nine == 'c'){
        total = total + 1;
    }
    if(ten == 'a'){
        total = total + 3;
    }
    else if (ten == 'b'){
        total = total + 1;
    }
    return total; 
}



app.post("/",(req, res) =>{
    const data = {
        name: req.body.name,
        email: req.body.email,
        one: req.body.first,
        two: req.body.two,
        tree: req.body.tree,
        four: req.body.four,
        five: req.body.five,
        six: req.body.six,
        seven: req.body.seven,
        eight: req.body.eight,
        nine: req.body.nine,
        ten: req.body.ten,
    }

 var total = nota(`${data.one}`,`${data.two}`, `${data.tree}`, `${data.four}`, `${data.five}`, `${data.six}`, `${data.seven}`, `${data.eight}`, `${data.nine}`, `${data.ten}` )
// var total = nota('a','a','a','a','a','a','a','a','a','a');   
const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port: 587,
        auth: {
            user: user,
            pass: pass
        }
    });
    transporter.sendMail({
        from: "Formulário Automático <testeemail1239@gmail.com>",
        to: "larissaamaral1973@gmail.com",
        subject: "Formulário de Respostas Automático",
        text: `Dados da criança: \n\nNome: ${data.name}\nEmail: ${data.email}\nNota: ${total}`
    }).then(message => {
        console.log(message);
        if(total < 10){
        res.redirect("ok1.html")
        } 
        else if (total > 10 && total < 20){
        res.redirect("ok2.html")
        }
        else{
            res.redirect("ok3.html")
        }
    }).catch(err => {
        console.log(err);
    })

    //func async for google sheets
    const accessSheet = async() => {
        const doc = new GoogleSpreadsheet(docId)
        await doc.useServiceAccountAuth(credentials)
        await doc.loadInfo()
        console.log(doc.title)
        const sheet = doc.sheetsByIndex[0] 
        await sheet.addRow({nome: `${data.name}`, email: `${data.email}`, nota: `${total}`})
     
    }
    accessSheet()
    
}
)


const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log("servidor rodando"));