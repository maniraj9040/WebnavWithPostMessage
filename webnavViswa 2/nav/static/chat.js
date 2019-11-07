var chatarr = '';

function chat_add_message(message, isUser) {
    //console.log('Message: '+message.split(';')[0]);  
    var person = isUser ? 'user' : '';
    console.log('person: ' + person)
    var html = '';
    var html1 = '';
    if (person == 'user') {
        html = '\
        <div class="chat_line">\
            <div class="chat_bubble' + person + '">\
              <div class="chat_triangle' + person + '"></div>\
               ' + message.split(';')[0] + ' \
            </div>\
        </div>\
        ';

        html1 = '<img class="userimg" src="https://img.icons8.com/ultraviolet/15/000000/user.png" align="right">';

    } else {
        html = '\
        <div class="chat_line">\
            <div class="chat_bubble' + person + '">\
              <div class="chat_triangle' + person + '"></div>\
               ' + message.split(';')[0] + ' \
            </div>\
        </div>\
        ';

        html1 = '<img class="botimg" src="https://img.icons8.com/windows/20/000000/bot.png" >';
        // html1 = '<img class="botimg" src="https://img.icons8.com/windows/20/000000/bot.png" alt="" width="20" height="20" align="left">';
    }

    var intentname = message.split(';')[1];
    console.log(JSON.stringify(message.split(';')));
    console.log('Intent name is: ' + intentname);
    chat_add_html(html, html1, intentname);
}
// Add HTML to the chat
function chat_add_html(html, html1, intname) {
    $("#chat_log").append(html);
    $("#chat_log").append(html1);
    $("#chat_log").animate({ scrollTop: $("#chat_log")[0].scrollHeight }, 500);

    if (intname == 'Retail') {
        URL = 'https://osidigital.com/industries/retail/';
        myFunction(URL)
    } else if (intname == 'About') {
        URL = 'http://127.0.0.1:5005/nav/about';
        myFunction(URL)
    }

}

$(function() {
    // var chatarr = '';
    console.log('session storage: ' + JSON.stringify(sessionStorage));
    console.log('session storage length: ' + sessionStorage.length);
    if (sessionStorage.length != 0) {

        console.log(JSON.stringify(sessionStorage));

        var chat = sessionStorage.getItem("chatarr")
        console.log('chat array: ' + chat);
        console.log('type of chat array: ' + typeof(chat));

        var chatlog = chat.slice(0, -3).split(',');
        console.log('chatlog: ' + JSON.stringify(chatlog));
        console.log('type of chat log: ' + typeof(chatlog));

        for (var i = 0; i < chatlog.length; i++) {
            console.log('message: ' + chatlog[i])
            console.log('i value is: ' + i);

            if (i % 2 == 0) {
                console.log('msg: ' + chatlog[i]);
                chat_add_message(chatlog[i], true);
            } else {
                chat_add_message(chatlog[i], false)
            }
        }
        // sessionStorage.clear();
    }

    // if(sessionStorage.length == 0)
    // {
    $('#chat_input').on('keypress', function(event) {
            if (event.which === 13 && $(this).val() != "") {
                var message = $(this).val();
                $(this).val("");
                sessionStorage.setItem("chatarr", chatarr);
                var msg = sessionStorage.getItem('chatarr');
                console.log('msg from session: ' + msg);
                var finalmsg = msg.concat(message) + ',';
                console.log('Final message: ' + finalmsg);
                chatarr = finalmsg;
                sessionStorage.setItem("chatarr", finalmsg);
                console.log('session storage after on user msg is: ' + JSON.stringify(sessionStorage))
                chat_add_message(message, true);
                $.ajax({
                    url: 'http://127.0.0.1:7000/',
                    type: 'GET',
                    cache: false,
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    data: { "msg": message },
                    dataType: "json",
                    context: this,
                    success: function(event) {
                        console.log(event);
                        console.log(event.text);
                        console.log(typeof(event.text));

                        if (typeof(event.text) == "object") {
                            event.text.forEach(element => {
                                //console.log(element.text.text);
                                var message_received = element.text.text;
                                console.log(message_received);
                                var msg = sessionStorage.getItem('chatarr');
                                console.log('msg from session: ' + msg);
                                var finalmsg = msg.concat(message_received) + ',';
                                console.log('Final message: ' + ',' + finalmsg);
                                chatarr = finalmsg;
                                sessionStorage.setItem("chatarr", finalmsg + ',');
                                console.log('session storage after bot response is: ' + JSON.stringify(sessionStorage));
                                chat_add_message(message_received, false);
                            });
                        } else {
                            var message_received = event.text;
                            console.log(message_received);
                            var msg = sessionStorage.getItem('chatarr');
                            console.log('msg from session: ' + msg);
                            var finalmsg = msg.concat(message_received) + ',';
                            console.log('Final message: ' + ',' + finalmsg);
                            chatarr = finalmsg;
                            sessionStorage.setItem("chatarr", finalmsg + ',');
                            console.log('session storage after bot response is: ' + JSON.stringify(sessionStorage));
                            chat_add_message(message_received, false);
                        }

                    }
                })
            }
        })
        // }

});


$(document).ready(function() {
    $(".chat_image").click(function() {
        $("div").slideToggle();
    });
});