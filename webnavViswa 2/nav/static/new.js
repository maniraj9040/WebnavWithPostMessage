function logOutChat(event) {
    console.log(event);
    var chatbotIframe = top.document.getElementById("chatbot");
    chatbotIframe.style.display = 'none';

    var chatbotIframe = top.document.getElementsByClassName("chatImgWrapper");
    top.$('.chatImgWrapper').show();
    console.log(chatbotIframe);
}