$(function () {
    //осуществление соединения с сервером
    var socket = io.connect("http://localhost:3000")

    //переменные кнопок и полей ввода
    var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var feedback = $("#feedback")

    //фуникция отправки сообщения
    send_message.click(function(){
		socket.emit('new_message', {message : message.val()})
	})

    //Обработчик поступивших сообщений
    socket.on("new_chat_message", data => {
        feedback.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    //функция отправки нового имени пользователя
    send_username.click(function () {
        socket.emit('change_username', { username: username.val() })
    })
});