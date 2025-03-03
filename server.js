const express=require("express")

const cors=require("cors")

require("dotenv").config()

const mongoose=require("mongoose")

const port=process.env.port

const app=express()

app.use(express.json())

app.use(cors())

const User=require("./schema")




app.get("/movie/:id", async(req,res)=>{
    res.status(200).json({message:"running"})
})


app.post("/newmovie", async(req,res)=>{

    try {
    const {moviename , review , collected}=req.body
    const newmovie= new User({title, director , genre,releaseYear,availableCopies})
    if(!title || !genre || !releaseYear || !director || !availableCopies ){
         res.status(400).json({message:"Bad request"})
    }
    

    

    await newmovie.save()

      res.status(200).json({message:"saved",newmovie})
        
    } catch (error) {
        console.log(error)
    }
    
})

const db=async()=>{
   try {
    await mongoose.connect(process.env.mongodb)

    console.log('connected')
   } catch (error) {
    console.log(error)
   }
}

db();




app.put("/movie",async(req,res)=>{
    try {
        const updated=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})

        if(!updated){
            res.status(400).json({message:"Bad request"})
        }
        else{
            res.status(200).json({message:"Movie updated"})
        }
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
              
    }

})



app.delete("/remove",async(req,res)=>{
    try {
        const deleted=await User.findByIdAndDelete(req.params.id);
        if(!deleted){
            res.status(400).json({message:"Bad request"})
        }
        else{
            res.status(200).json({message:"deleted"})
        }
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
})



app.listen(port,()=>{
    console.log(`successfully connected http://localhost:${port}`)
})