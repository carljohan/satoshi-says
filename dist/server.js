var express = require('express');
var contractABI = require('../client/components/utils/contractABI');
var secretRecaptcha = require('../secretReCaptcha.js')
var axios = require('axios')
var ip = require('ip')
const path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var Web3 = require('web3');
var admin = require('firebase-admin');
var serviceAccount = require('../privatekeyfirebase.json');
const email_adress = process.env.EMAIL_ADRESS
const email_password =  process.env.EMAIL_PASSWORD;
const requestIp = require('request-ip');
var Twitter = require('twitter');
var configTwitter = require('../twitterSecret.js');
var fs = require('fs');
var compression = require('compression')
var nodemailer = require('nodemailer');
var _ = require('lodash')
var bigInt = require("big-integer");



var thinking = fs.readFileSync('./client/images/satoshi/halfbody/jpg/thinking.jpg').toString('base64')
var angry = fs.readFileSync('./client/images/satoshi/halfbody/jpg/angry.jpg').toString('base64')
var sad = fs.readFileSync('./client/images/satoshi/halfbody/jpg/sad.jpg').toString('base64')
var happy = fs.readFileSync('./client/images/satoshi/halfbody/jpg/happy.jpg').toString('base64')
var stoked = fs.readFileSync('./client/images/satoshi/halfbody/jpg/stoked.jpg').toString('base64')





//var thinking = require('../client/images/satoshi/halfbody/jpg/halfthinking4-01.jpg')

var T = new Twitter(configTwitter);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://satoshisays-95495.firebaseio.com/'
});




var database = admin.database();
//


const port = process.env.PORT || 3000;
var app = express();
app.use(cors())
app.use(compression())
app.use(bodyParser.urlencoded({
  extended: false
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(requestIp.mw())
var contractAddress = require('../client/components/utils/contractAddress');


web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/QPcNbsqxeH84OJ7xe0Vs'));
var contract = new web3.eth.Contract(contractABI, contractAddress);


const addTimeOwned = (messageObject) => {
  database.ref(`/timeOwned/${messageObject.owner}`).once('value',(miliSecondsOwned) => {
    let milisecondsOwnedAfterPost;
    const addedTime = messageObject.removedDate - messageObject.addedDate
    if (!miliSecondsOwned.val()) {
      upvotes = messageObject.upvotes
      milisecondsOwnedAfterPost = addedTime

    } else {
      milisecondsOwnedAfterPost = miliSecondsOwned.val().time + addedTime
      upvotes = messageObject.upvotes + miliSecondsOwned.val().upvotes
    }
    const timeOwnedObject = {
      time: milisecondsOwnedAfterPost,
      name: messageObject.name,
      moodState: messageObject.moodState,
      upvotes
    }
    database.ref(`/timeOwned/${messageObject.owner}`).set(timeOwnedObject)
  })
}

//Calls contract and firebase and checks if database has current message. GLITCHES WITH NODEMON
setInterval(function() {
  contract.methods.fetchCurrentSatoshiState().call().then((dataFromContract) => {    
    var arrayFromContract = Object.values(dataFromContract);
    var messageFromContract = arrayFromContract[0];
    var nameFromContract = arrayFromContract[1];
    var moodStateFromContract = parseInt(arrayFromContract[2]);    
    var currentOwner = arrayFromContract[3];
    var currentPrice = arrayFromContract[4] // THIS IS THE NEXT PRICE    
    
    let currentDate = new Date()    
    
    
    database.ref('/satoshisays/').limitToLast(1).once('value').then((fireabaseData) => {
      var currentMessageObject = Object.values(fireabaseData.val())[0];                  
      if (currentOwner != '0x0000000000000000000000000000000000000000' && bigInt(currentPrice).greater(bigInt(currentMessageObject.price))) {      
        //if we havent saved the current value from contract in database, do it. 
        
        //Tweets
        T.post('statuses/update', {
          status: `${messageFromContract}`
        }, function(error, tweet, response) {
          
        });

        var avatarToSend;

        switch (parseInt(moodStateFromContract)) {
          case 0:
            avatarToSend = happy
            break;
          case 1:
            avatarToSend = sad                
            break;
          case 2:
            avatarToSend = angry               
            break;
          case 3:
            avatarToSend = thinking
            break;
          case 4:
            avatarToSend = stoked
            break;          
          default:
            break;
        }

        T.post('account/update_profile_image', {
          image: avatarToSend
        }, function(error, tweet, response) {
          

          if (!error) {
           
          }
        });
        //EMAIL 
        database.ref(`/emails/${currentMessageObject.owner}`).once('value').then((emailFirebase) => {

          if (emailFirebase.val()) {
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: email_adress,
                pass: email_password
              }
            });

            const ethPrice = _.round(currentMessageObject.price / Math.pow(10,18), 5)
            const profit = _.round(currentMessageObject.price*0.0494 / Math.pow(10,18), 6)

            const mailOptions = {
              from: email_adress, // sender address
              to: emailFirebase.val(), // list of receivers
              subject: 'Someone outbid you on Satoshi says!', // Subject line
              html: `<div>
              <p>Hey!</p>
              <p> Someone changed the speech bubble after you on Satoshi says! </p>
              <p> You have received ${ethPrice} ETH because of this! That's ${profit} ETH in profit. </p>
              <p>Check out their new message at <a href="http://satoshisays.co">satoshisays.co </a></p>              
              </div>` // plain text body
            };

            transporter.sendMail(mailOptions, function(err, info) {
                          
            });
          }
          
        })
         
        
        
        
        var satoshiMessageObject = {
          message: messageFromContract,
          name: nameFromContract,
          moodState: moodStateFromContract,
          owner: currentOwner,
          price: currentPrice,          
          addedDate: currentDate.getTime(),
          upvotes: 0 
        };


        
        
        
        var oldMessageObject = Object.values(fireabaseData.val())[0]
        oldMessageObject.removedDate = currentDate.getTime()
        let keyForOldMessageObject = Object.keys(fireabaseData.val())[0]

        
        addTimeOwned(oldMessageObject)
        database.ref('/satoshisays/').push().set(satoshiMessageObject)
        database.ref(`/satoshisays/${keyForOldMessageObject}`).set(oldMessageObject)

      }
    })    
  });
}, 5000);




const addUpvotes = (upvotesToAdd) => {
  database.ref('/satoshisays/').limitToLast(1).once('value').then((messageObject) => { 
    var currentMessage = Object.values(messageObject.val())[0]
    var currentMessageKey = Object.keys(messageObject.val())[0]        
    currentMessage.upvotes = currentMessage.upvotes + upvotesToAdd
  
    database.ref(`/satoshisays/${currentMessageKey}`).set(currentMessage)
  })  
}

const upVoteCaptcha = (captchaResponse, upvotesToAdd) => {
  axios({
    method: 'post',
    url: 'https://www.google.com/recaptcha/api/siteverify',
    params: {
      secret: secretRecaptcha,
      response: captchaResponse,      
    }
  }).then((recaptchaResponse) => {

    if(recaptchaResponse.data.success) {
      addUpvotes(upvotesToAdd)
      //check ipaddress on firebase and stuff.


      //MIGHT ADD THE IP ADDRESS PART LATER
      //const ip = req.clientIp;
      // database.ref(`/votedIps/${ip}`).once('value', (snapshotIpHasVoted) => {
      //   console.log('check ip address');
      //   console.log(ip);

      //   if (!snapshotIpHasVoted.val()) {
      //     console.log('set ip address');
      //     database.ref('/upvotes').once('value', (numberOfUpvotes) => {
      //       if (numberOfUpvotes.val()) {
      //         database.ref('/upvotes').set(numberOfUpvotes.val() + 1)
      //       } else {
      //           database.ref('/upvotes').set(1)
      //       }

      //     })
      //     database.ref(`/votedIps/${ip}`).set(true)
      //   } 
      // })

    }

  })

} 

app.use(express.static(__dirname));


app.post('/upvote', function(req, res) {  
  upVoteCaptcha(req.body.captcha, 1)
  res.send('Got a POST request')    
})

app.post('/upvote2', function(req, res) {
  upVoteCaptcha(req.body.captcha, 2)
  res.send('Got a POST request')
})

app.post('/downvote', function(req, res) {  
  upVoteCaptcha(req.body.captcha, -1)    
  res.send('Got a POST request')
})

app.post('/downvote2', function(req, res) {
  upVoteCaptcha(req.body.captcha, -2)
  res.send('Got a POST request')
})

app.post('/addemail', function(req, res) {
  database.ref(`/emails/${req.body.address}`).set(req.body.email)  
  res.send('Got a POST request')
  
})





app.get('*', (req,res) => {
  
  res.sendFile(path.resolve(__dirname, 'index.html')) 
})



app.listen(port)

