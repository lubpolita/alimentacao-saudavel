
function send(){
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 587,
    auth: {
        user: "testeemail1239@gmail.com",
        pass: "teste#email#0000"
    }
});


transporter.sendMail({
    from: "Teste <testeemail1239@gmail.com>",
    to: "luizapolitab@gmail.com",
    subject: "teste teste hiahishiahs",
    text: "texto adsjalfjlakjsdfkjlad"
}).then(message => {
    console.log(message);
}).catch(err => {
    console.log(err);
})
}