const socket = io();

socket.on('countUpdated',(count)=>{
  console.log('the count has been updated', count);
    
})


socket.on('message',(message)=>{
  console.log(message);
})
socket.on('success_connection',(str)=>{
  console.log(str)
})

const buttonclickHandler = ()=>{
    console.log('button clicked');
    socket.emit('increment')
}
const onSubmitHandler = (event)=>{
  console.log(event);
  // console.log(event.target.message.value)
  socket.emit('sendMessage',event.target.message.value)
  return false;
}
// document.querySelector("#myform").addEventListener("submit", function(e){
//   e.preventDefault();
//   console.log(e.target);
// });

const sendLocationHandler  = (event)=>{ 
  
  console.log('sendlocation clicked')
  if(navigator.geolocation){
    return alert('Geolocation is not supported by your browser');
  }
  navigator.geolocation.geoCurrentPosition((position)=>{
    console.log(position)
  })

  socket.emit('sendMessage','My location is Dhubri')
  return false;
}

