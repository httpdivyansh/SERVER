import express from 'express'
const app = express();
const port = 3000;

app.get("/",(req,res)=>{
    res.send("hello there")
})

app.get("/home",(req,res)=>{
    res.send("welcome to my home page");
})

app.get("/pipariya",(req,res)=>{
    res.send ("this is my home city")
})

app.use(express.json())
// add new toy

let toyData=[]
let nextId=1

app.post("/toys",(req,res)=>{
    let {name,price}=req.body
    let toyinfo={id:nextId++,name,price}
    toyData.push(toyinfo);
    res.status(201).send(toyinfo)
})
// get all toy  

app.get("/toys",(req,res)=>{
    res.status(200).send(toyData)
})

//get a toy with id

app.get("/toys/:id",(req,res)=>{
    let toy = toyData.find(t => t.id===parseInt(req.params.id))
    if(!toy){
        res.status(404).send("not found")
    }
    else{
        res.status(200).send(toy)
    }

})
//update the data
app.put("/toys/:id",(req,res)=>{
    const toy= toyData.find(t=>t.id===parseInt(req.params.id))
    if(!toy){
        res.status(404).send("not found")
    }
    else{
        let{name,price}=req.body
        toy.name=name;
        toy.price=price;
        res.send(toy)
        console.log("deleted")

    }
})

app.delete("toy/:id",(res,req)=>{
    const index=toydata.findIndex(t=>t.id===parseInt(req.params.id))
    if(index==-1){
        return res.status(404).send("not found");
    }
    else{
        return res.status(204).send("deleted")
    }
})

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
    
})