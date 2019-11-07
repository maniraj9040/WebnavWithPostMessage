// function chat_add_message(message, isUser) {
//     console.log(message);
//     var person = isUser ? 'user' : '';
//     console.log('person: ' + person)
//     var html = '';

//     if (person == 'user') {
//         html = '<div class="msg user-message" id="userMessage" style="flex-direction: column;">\
//             <div class="flexAligndiv1">\
//                 <div class="user-messagefull messageContent flex-design">\
//                     <span id="userMsg">' + message.split(';')[0] + '</span>\
//                 </div>\
//             </div>\
//         </div>';
//     } else {
//         html = '<div class="msg bot-message" id="botMessage">\
//           <div class="flex-design">\
//               <div class="bot-image-container">\
//               </div>\
//               <div class="bot-messagefull messageContent">\
//                   <span id="botMessage">' + message.split(';')[0] + '</span>\
//               </div>\
//           </div>\
//         </div>';
//     }

//     console.log('Response message =', JSON.stringify(message.split(';')));

//     var cat = message.split(';')[1];
//     var subcat = message.split(';')[2];
//     console.log('Intent/category name is: ' + cat);
//     console.log('sub category is: ' + subcat)
//     chat_add_html(html, cat, subcat);

// }

// // Add HTML to the chat
// function chat_add_html(html, category, subcategory) {
//     $("#messages").append(html);
//     $("#messages").animate({ scrollTop: $("#messages")[0].scrollHeight }, 50);

//     console.log('Category is: ' + category);
//     console.log('type of category' + typeof(category));
//     console.log('sub Category is: ' + subcategory);
//     console.log('type of subcategory' + typeof(subcategory));

//     var URL = 'https://osidev-osiusintranet.cs1.force.com/osiDigital/categorySearchPage?cat='

//     if ((category == undefined || category == '') && (subcategory == undefined || subcategory == '')) {
//         console.log('inside chat1.js if  block')

//     } else if ((category !== undefined && category !== '') && (subcategory !== undefined && subcategory !== '')) {
//         console.log('inside chat1.js elseif 1 block')

//         URL = URL + category + '&sub=' + subcategory;
//         console.log('Constructed url is: ' + URL);
//         setTimeout(myFunction, 2500, URL);

//     } else if ((category !== undefined && category !== '') && (subcategory == '' || subcategory === undefined)) {
//         console.log('inside chat1.js elseif 2 block')

//         URL = URL + category;
//         console.log('Constructed url is: ' + URL)
//         setTimeout(myFunction, 2500, URL);

//     }

// }


// $(function() {


//     console.log('session storage: ' + JSON.stringify(sessionStorage));
//     console.log('session storage length: ' + sessionStorage.length);
//     if (sessionStorage.length !== 0) {
//         console.log(JSON.stringify(sessionStorage));
//         var chat = sessionStorage.getItem("chatarr");
//         console.log('chat array: ' + chat);
//         console.log('type of chat array: ' + typeof(chat));
//         var chatlog = chat.slice(0, -1).split(':');
//         console.log('chatlog: ' + JSON.stringify(chatlog));
//         console.log('type of chat log: ' + typeof(chatlog));

//         for (var i = 0; i < chatlog.length; i++) {

//             console.log('message: ' + chatlog[i])
//             console.log('i value is: ' + i);

//             if (i % 2 == 0) {
//                 console.log('User msg: ' + chatlog[i]);
//                 chat_add_message(chatlog[i], true);
//             } else {
//                 console.log('Bot msg: ' + chatlog[i]);
//                 chat_add_message(chatlog[i], false);
//             }

//         }

//         // sessionStorage.clear();
//     }


//     $('#query').on('keypress', function(event) {
//         if (event.which === 13 && $(this).val() != "") {
//             var message = $(this).val();
//             $(this).val("");
//             console.log('session storage obj presented/not: ' + sessionStorage.getItem("chatarr"))

//             if (sessionStorage.getItem("chatarr") === null) {

//                 sessionStorage.setItem("chatarr", '');
//                 var msg = sessionStorage.getItem('chatarr');
//                 console.log('msg from session: ' + msg);
//                 var finalmsg = msg.concat(message) + ':';
//                 console.log('Final message: ' + finalmsg);
//                 sessionStorage.setItem("chatarr", finalmsg);
//                 console.log('session storage after on user msg is: ' + JSON.stringify(sessionStorage))

//             } else {

//                 var msg = sessionStorage.getItem('chatarr');
//                 console.log('msg from session: ' + msg);
//                 var finalmsg = msg.concat(message) + ':';
//                 console.log('Final message: ' + finalmsg);
//                 sessionStorage.setItem("chatarr", finalmsg);
//                 console.log('session storage after on user msg is: ' + JSON.stringify(sessionStorage))

//             }

//             chat_add_message(message, true);

//             $.ajax({
//                 url: 'https://webnavserver.herokuapp.com',
//                 type: 'GET',
//                 cache: false,
//                 contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
//                 data: { "msg": message },
//                 dataType: "json",
//                 context: this,
//                 success: function(event) {
//                     console.log(event);
//                     console.log(event.text);
//                     console.log(typeof(event.text));

//                     if (typeof(event.text) == "object") {
//                         event.text.forEach(element => {
//                             console.log(element.text.text);
//                             var message_received = element.text.text;
//                             console.log(message_received);
//                             var msg = sessionStorage.getItem('chatarr');
//                             console.log('msg from session: ' + msg);
//                             var finalmsg = msg.concat(message_received.split(';')[0]);
//                             console.log('Final message: ' + ',' + finalmsg);
//                             chatarr = finalmsg;
//                             sessionStorage.setItem("chatarr", finalmsg + ':'); // need to check : is needed or not
//                             console.log('session storage after bot response is: ' + JSON.stringify(sessionStorage));
//                             chat_add_message(message_received, false);
//                         });
//                     } else {
//                         var message_received = event.text;
//                         console.log(message_received);
//                         var msg = sessionStorage.getItem('chatarr');
//                         console.log('msg from session: ' + msg);
//                         var finalmsg = msg.concat(message_received.split(';')[0]);
//                         console.log('Final message: ' + ',' + finalmsg);
//                         chatarr = finalmsg;
//                         sessionStorage.setItem("chatarr", finalmsg + ':'); // need to check : is needed or not
//                         console.log('session storage after bot response is: ' + JSON.stringify(sessionStorage));
//                         chat_add_message(message_received, false);
//                     }
//                 }
//             });
//         } else {
//             console.log('Invalid Key!');
//         }

//     });
// });


// function handleSpeech() {
//     if (window.hasOwnProperty('webkitSpeechRecognition')) {

//         var recognition = new webkitSpeechRecognition();

//         recognition.continuous = false;
//         recognition.interimResults = false;

//         recognition.lang = "en-US";
//         recognition.start();
//         micimg = document.getElementById("micimg");
//         micimg.src = '../static/listen_mic.gif'
//         console.log('on start: ' + micimg.src);

//         recognition.onresult = function(e) {
//             document.getElementById('query').value = e.results[0][0].transcript;
//             recognition.stop();
//             console.log('stoped after result')
//             micimg = document.getElementById("micimg");
//             micimg.src = '../static/mic.png'
//             console.log('on result stop' + micimg.src);
//         };

//         recognition.onerror = function(e) {
//             recognition.stop();
//             console.log('stoped on error')
//             micimg = document.getElementById("micimg");
//             micimg.src = '../static/mic.png'
//             console.log('on error stop ' + micimg.src);
//         }

//         recognition.onspeechend = function() {
//             console.log('Speech has stopped being detected');
//             micimg = document.getElementById("micimg");
//             micimg.src = '../static/mic.png'
//             console.log('on error stop ' + micimg.src);
//         }

//         recognition.onsoundend = function() {
//             console.log('Sound has stopped being received');
//             micimg = document.getElementById("micimg");
//             micimg.src = '../static/mic.png'
//             console.log('on error stop ' + micimg.src);
//         }

//         recognition.onend = function() {
//             console.log('Speech recognition service disconnected');
//             micimg = document.getElementById("micimg");
//             micimg.src = '../static/mic.png'
//             console.log('on error stop ' + micimg.src);
//         }

//         recognition.onaudioend = function() {
//             console.log('Audio capturing ended');
//             micimg = document.getElementById("micimg");
//             micimg.src = '../static/mic.png'
//             console.log('on audio end stop ' + micimg.src);
//         }

//     }

// }