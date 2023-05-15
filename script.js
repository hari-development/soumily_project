
var timing=700;
 const botMessages = [
   {
     question: "output",
     answer: ["You have a block connection error.", "Have You connected seven segment with IoT bridge?"]
   },
   {
      question: "hi",
      answer: ["Hi Hari how can i help you?"]
    },
    {
      question: "hello",
      answer: ["Hello Hari how can i help you?"]
    },
    {
      question: "are you",
      answer: ["I'm good, thank you for asking. How can I help you today?"]
    },
   {
      question: "yes",
      answer: ["Recheck the connection as shown below and run the program","Seven Segment to IoT bridge \nC01-C06(Blue Wire)\nC02-C05(Blue Wire)\nC03-C04(Blue Wire)\nC04-C03(Blue Wire)\nPC1-PC(Red Wire)"]
    },
   {
     question: "ok",
     answer: ["Your program got successfully executed and are you getting the output?"]
   },
   {
     question: "about you",
     answer: ["Sure. I'm WizBuddy your class assistant.I ll be available throughout your learning whenever you have doubts.You can click on me to start a conversation"]
   },
   {
      question: "class",
      answer: ["Certainly! In this session You ll learn about LED and how does it work when you give commands to it."]
    },
    {
      question: "led",
      answer: ["LED stands for Light Emitting Diode.It is an electronics device that emits light of many frequencies such as red green and yellow and many more.You can also program it to work according to your commands."]
    },
    {
      question: "frequency",
      answer: ["Imagine You are sitting near a pond,and you see ripples forming on the water's surface when a stone is thrown into it.Have you ever noticed that the ripples spread out and slowly disappear? Well frequency is a bit like that.\n\nFrequency is a way to measure how often something happens or how many times it repeats in a certain amount of time. It is like counting how many ripples in the you see in the pond in one minute."]
    },
    {
      question: "thank",
      answer: ["Happy to help You, Happy Coding."]
    },
   {
     question: "",
     answer: ["I'm sorry, I didn't understand your question. Please try again."]
   }
 ];

// Get the elements from the DOM
const chatContainer = document.querySelector(".msger-chat");
const form = document.querySelector(".msger-inputarea");
const input = document.querySelector(".msger-input");
var messageHistory=[];

// Add an event listener to the form to handle messages
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the user's message from the input
  const userMessage = input.value.trim();
  if(userMessage=="ok"){
    timing=10000;
  }else{
    timing=700;
  }

  messageHistory.push("Hari : "+userMessage+",")
  console.log(userMessage);
  // Append the user's message to the chat container
  appendMessage({
    message: userMessage,
    name: "You",
    img: "education.png",
    time: getCurrentTime(),
    position: "right"
  });

  // Check if the user's message matches any of the bot's messages
  const botMessage = botMessages.find(message => userMessage.toLowerCase().includes(message.question));
  console.log(botMessage.answer[0]);

  messageHistory.push("Bot : "+botMessage.answer+",")
  console.log(messageHistory);


  // If a matching message was found, respond with the bot's answer
  if (botMessage) {
    setTimeout(() => {
      // If the bot's answer is an array, loop through it and append each message
      if (Array.isArray(botMessage.answer)) {
        botMessage.answer.forEach(message => {
          const messageElement = appendMessage({
            message: message,
            name: "WizBuddy",
            img: "robot.png",
            time: getCurrentTime(),
            position: "left"
          });

          // Add delay animation to the message
          if (messageElement) {
            messageElement.style.opacity = "0";
            messageElement.style.animation = "fade-in 0.5s ease forwards";
          }
        });
      } else {
        // If the bot's answer is not an array, append it as a single message
        const messageElement = appendMessage({
          message: botMessage.answer,
          name: "WizBuddy",
          img: "robot.png",
          time: getCurrentTime(),
          position: "left"
        });

        // Add delay animation to the message
        if (messageElement) {
          messageElement.style.opacity = "0";
          messageElement.style.animation = "fade-in 0.5s ease forwards";
        }
      }

      // Scroll to the bottom of the chat window
      scrollToBottom();
    }, timing);
  } else {
    // If no matching message was found, respond with a default message
    appendMessage({
      message: "I'm sorry, I didn't understand your question. Please try again.",
      name: "WizBuddy",
      img: "robot.png",
      time: getCurrentTime(),
      position: "left"
    });

    // Scroll to the bottom of the chat window
    scrollToBottom();
  }

  input.value = "";
  scrollToBottom();

  });
  // Clear the input field and scroll to the bottom of the chat container

function appendMessage(msgs) {
   if (!Array.isArray(msgs)) {
     msgs = [msgs];
   }

   msgs.forEach(msg => {
     const msgHTML = `
       <div class="msg ${msg.position}-msg">
         <div
           class="msg-img"
           style="background-image: url(${msg.img})"
         ></div>

         <div class="msg-bubble">
           <div class="msg-info">
             <div class="msg-info-name">${msg.name}</div>
             <div class="msg-info-time">${msg.time}</div>
           </div>

           <div class="msg-text">${msg.message}</div>
         </div>
       </div>
     `;
     chatContainer.insertAdjacentHTML("beforeend", msgHTML);
   });
 }

 if (botMessage) {
   if (Array.isArray(botMessage.answer)) {
     appendMessage(botMessage.answer.map(answer => ({
       message: answer,
       name: "WizBuddy",
       img: "robot.png",
       time: getCurrentTime(),
       position: "left"
     })));
   } else {
     appendMessage({
       message: botMessage.answer,
       name: "WizBuddy",
       img: "robot.png",
       time: getCurrentTime(),
       position: "left"
     });
   }
 } else {
   // If no matching message was found, respond with a default message
   appendMessage({
     message: "I'm sorry, I didn't understand your question. Please try again.",
     name: "WizBuddy",
     img: "robot.png",
     time: getCurrentTime(),
     position: "left"
   });
 }
// Scroll to the bottom of the chat container
function scrollToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Get the current time in 24-hour format
function getCurrentTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Scroll to the bottom of the chat container when the page loads
window.onload = () => {
  scrollToBottom();
};
