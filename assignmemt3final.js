//data.txt

----------------------------------------------------------------------------------------------

//data.txt
----------------------------------------------------------------------------------------------
//source.txt
ahmed 


//text.txt
kqjwrbhfjkrwbfhjkbrwqebfjkwrefkbkqjwrbhfjkrwbfhjkbrwqebfjkwrefkbkqjwrbhfjkrwbfhjkbrwqebfjkwrefkbkqjwrbhfjkrwbfhjkbrwqebfjkwrefkbkqjwrbhfjkrwbfhjkbrwqebfjkwrefkbkqjwrbhfjkrwbfhjkbrwqebfjkwrefkbkqjwrbhfjkrwbfhjkbrwqebfjkwrefkbkqjwrbhfjkrwbfhjkbrwqebfjkwrefkbkqjwrbhfjkrwbfhjkbrwqebfjkwrefkbkqjwrbhfjkrwbfhjkbrwqebfjkwrefkbkqjwrbhfjkrwbfhjkbrwqebfjkwrefkbkqjwrbhfjkrwbfhjkbrwqebfjkwrefkbkqjwrbhfjkrwbfhjkbrwqebfjkwrefkb




----------------------------------------------------------------------------------------------

//dest.txt
ahmed 

//first.js
const fs = require('fs');

const readableStream = fs.createReadStream('./text.txt', { encoding: 'utf-8',highWaterMark: 1024 });

readableStream.on('data', (chunk) => {
  console.log('Chunk:', chunk);
});

readableStream.on('end', () => {
  console.log('Finished reading file');
});
----------------------------------------------------------------------------------------------
//second.js
const fs = require('fs');

const readStream = fs.createReadStream('./source.txt');
const writeStream = fs.createWriteStream('./dest.txt');

readStream.on('data', (chunk) => {
  writeStream.write(chunk);
});

readStream.on('end', () => {
  writeStream.end();
  console.log('File copied using streams');
});
----------------------------------------------------------------------------------------------
//third.js
const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream');

pipeline(
  fs.createReadStream('./data.txt'),
  zlib.createGzip(),
  fs.createWriteStream('./data.txt.gz'),
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('File compressed successfully');
    }
  }
);
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
//part2
//http.js
const http = require('http');
const fs = require('fs');
let users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
const server=http.createServer((req,res)=>{

let {url,method}= req;
if(url=='/users' && method=='POST'){
let data='';
let id;
req.on('data',(chunk)=>{
     data+=chunk;
})
req.on('end',()=>{
let parseddata=JSON.parse(data); 
id=users.length+1; 
let {name , email, age}=parseddata;
let existuser=users.find((user)=> user.email==parseddata.email);
if(existuser){
res.statusCode=400;
res.end(JSON.stringify({message:'user already exists'}));
}
else{
users.push({id, name , email, age});
fs.writeFileSync('users.json',JSON.stringify(users))
res.end(JSON.stringify({message:'user created successfully'}));
}}

)


}
else if (url.startsWith('/users/') && method=='PATCH'){
let id=url.split('/')[2];
let data='';
req.on('data',(chunk)=>{
data +=chunk;

})
req.on('end',()=>{
let dataparsed=JSON.parse(data);
let {name , email, age}=dataparsed;

let userupdated =users.find((user)=> user.id==id);
if(userupdated){
userupdated.name=name;
userupdated.email=email;
userupdated.age=age;


fs.writeFileSync('users.json',JSON.stringify(users))
res.statusCode=200;
res.end(JSON.stringify({message:'user updated successfully'}))

}
else{
    res.statusCode=404;
    res.end(JSON.stringify({message:'user not found'}));
}
})

}

else if(url.startsWith('/users/') && method=='DELETE'){
let id=url.split('/')[2];
let userindex =users.findIndex((user)=> user.id==id);

if(userindex>-1){
users.splice(userindex,1);  
fs.writeFileSync('users.json',JSON.stringify(users))
res.statusCode=200;
res.end(JSON.stringify({message:'user deleted successfully'}))
}
else{
res.statusCode=404;


}

}
else if(url=='/users' && method=='GET'){

res.statusCode=200;
res.end(JSON.stringify(users));
console.log(users);


}
else if(url.startsWith('/users/') && method=='GET'){
let id=url.split('/')[2];
let userfind =users.find((user)=> user.id==id);
if(userfind){
    res.statusCode=200;
    res.end(JSON.stringify(userfind));
}
else{
    res.statusCode=404;
    res.end(JSON.stringify({message:'user not found'}));
}

}

}

);
server.listen(3000,()=>{

    console.log('server is running on port 3000');
});

//users.json
[{"id":1,"name":"dddd said","email":"harraz@gmail.com","age":45},{"id":2,"name":"dddd said","email":"mohaemd@gmail.com","age":45},{"id":3,"name":"dddd said","email":"saiddddddddddd@gmail.com","age":45}]

----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
//part3
----------------------------------------------------------------------------------------------
//q1.txt
the Event Loop is the  mechanism that allows Node.js to run asynchronous code.
it continuously checks if there are tasks callbacks ready to execute and runs them without blocking the main thread.
----------------------------------------------------------------------------------------------
//q2.txt
Libuv is a C library used by Node.js that handles:
1-Asynchronous I/O (files, network, etc.)
2-Thread pool management
and it is the reason Node.js can perform non-blocking operations efficiently.
----------------------------------------------------------------------------------------------
//q3.txt
node.js sends heavy or I/O tasks (like file reading or network requests) to Libuv then  Once the task is done  a callback is placed in a queueand the Event Loop executes it when the main thread is free.
----------------------------------------------------------------------------------------------
//q4.txt
call Stack : Executes functions (synchronous code)
event Queue : Holds callbacks waiting to run
event Loop : Moves callbacks from the queue to the stack when it's empty
----------------------------------------------------------------------------------------------
//q5.txt
node.js uses a thread pool (in Libuv) to handle heavy tasks like file system operations.
default size is 4 threads and it can be changed
----------------------------------------------------------------------------------------------
//q6.txt

Blocking code : stps execution until the task finishes
Non-blocking code : executes tasks in the background and continues running other code