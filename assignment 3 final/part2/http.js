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
})