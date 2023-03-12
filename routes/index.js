import express from "express";
import messages from "../models/messages.js"
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const Router = express.Router();
async function saveMessage(data) {
  var datetime = new Date();
  datetime = datetime.toLocaleString();
  const newMessage = new messages({
    message_sid: data.id,
    from: data.from,
    to: data.to,
    message: data.message,
    name: data.name,
    time: datetime
  });

  try {
    const responseSave =  await newMessage.save();
    console.log(responseSave);
    return { success: true, msg: "Message saved Scuccessfully" };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
}
Router.post("/sendsms/:number", async (req, res) => {
  const accountSid = "AC928ff975ea10616aa05af2ffeb5ad00d";
  const authToken = "7d06cb753421fde4cb46e7f6fc1594a4";
  const client = require("twilio")(accountSid, authToken);
  const data = {
    from: "+15676230708",
    to: "+91" + req.params.number,
    message: req.body.message,
    name: req.body.name
  };
  await client.messages
    .create({
      body: req.body.name + " " + req.body.message,
      from: data.from,
      to: data.to
    })
    .then(async (message) => {
      console.log(message.sid); 
      data.id = message.sid;
      const messageResponse = await saveMessage(data);
      if (messageResponse.success) {
        res.send({ success: true, msg: "Message sent successfully" });
      } else {
        console.log('hfgs');
        res.send({ success: false, error: messageResponse.error });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false, error: err });
    });
});
Router.get("/getMessages",async (req,res)=>{
  const messagesResponse = await messages.find().sort({created_at: -1})
  console.log(messagesResponse);
  res.send({success: true,data:messagesResponse});
})

Router.get("/", (request, response) => {
  response.send("Hi, from Node server");
});

export default Router;
