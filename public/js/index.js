var socket=io();

socket.on('connect',function(){
console.log('connected to server');
// socket.emit('createEmail',{
// to:'jen@example.com',
// text:'hey this is pooja'
// });
// socket.emit('createMessage',{
// from:'pooja',
// text:'hey this is pooja'
// });
});


socket.on('disconnect',()=>{
console.log('disconnected from server');
});

// socket.on('newEmail',function(email){
// console.log('New Email',email);
// });

socket.on('newMessage',function(message){
  var formattedTime = moment(message.createAt).format('h:mm a');
//console.log('newMessage',message);
var li = jQuery('<li></li>');
li.text(`${message.from}: ${formattedTime} ${message.text}`);

jQuery('#message').append(li);
});

socket.on('newLocationMessage', function(message){
    let formattedTime1 = moment(message.createAt).format('h:mm a');
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${formattedTime1} ${message.text}`);

  jQuery('#message').append(li);
});

socket.on('newLocationMessage', function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target = "_blank">My current location</a>');

  li.text(`${message.from}`);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#message').append(li);
});

// socket.emit('createMessage',{
//
// from:'teju',
// text:'hhiiiiiiii helllooo'
// },function(data){
//   console.log('got it',data);
// });
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text:  messageTextbox.val()
  }, function (){
messageTextbox.val('')
  });
});
var locationButton=jQuery('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('not supported');
  }
  locationButton.attr('disabled','disabled').text('sending location........');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('send location');
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
        longitude:position.coords.longitude
    });
  },function(){
    locationButton.removeAttr('disabled').text('send location');
    alert('unable  to fetch location')
  });
});
