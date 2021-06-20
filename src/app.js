const mongoose=require('mongoose');
const validator=require('validator');

mongoose.connect("mongodb://localhost:27017/rajanchannell",
 {useNewUrlParser:true,useUnifiedTopology: true})
.then(()=> console.log("connection successful"))
.catch((err)=> console.log(err));
    
//schema
//A mongoose Schema defines the structure of the document.
//default values ,validators,etc..

const playlistSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        minLength:[2,"minimum 2letters"],
        maxLength:30
    },
    ctype:{
        type:String,
        required:true,
        lowercase:true,
        enum:["frontend","backend","database"]
    },
    videos:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error("videos count should not be negative")
            }
        } 
    },
    author:String,
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    } , 
    active:Boolean,
    date:{
        type:Date,
        default:Date.now
    }
})

//A Mongoose model is a wrapper on the Mongose Schema.
//A mongoose schema defines the structure of the document

//collection creation
const Playlist =new mongoose.model("Playlist",playlistSchema)

//create document or insert

const createDocument= async()=>{
    try{
        const jsPlaylist=new Playlist({
            name:"Jvascript ",
            ctype:"Front End",
            videos:80,
            author:"Rajan",
            active:true
        })
        const mongoPlaylist=new Playlist({
            name:"MongoDB ",
            ctype:"Database ",
            videos:50,
            author:"Rajan",
            active:true
        })
        const mongoosePlaylist=new Playlist({
            name:"javascript",
            ctype:"database",
            videos:5,
            author:"Rajan",
            email:"rajan@gmail.com",
            active:true
        })
        const expressPlaylist=new Playlist({
            name:"Express JS",
            ctype:"Back End ",
            videos:40,
            author:"Rajan",
            active:true
        })
         const result=await Playlist.insertMany([mongoosePlaylist]);
         console.log(result);
    }catch(err){
       console.log(err);
    }
}
createDocument();


const getDocument=async()=>{
    const result=await Playlist
    .find({$or:[{ctype:"Front End"},{name:"Javascript"}]})
    .select({name:-1})
    .sort({name:1});
    // .countDocuments();
    console.log(result);
}

// getDocument();
//update the document
 const updateDocument=async (_id)=>{
     try{
        const result=await Playlist.findByIdAndUpdate({_id},{$set:{
            name:"Rajan Sandilya"
        }
    },{
        useFindAndModify:false
    }
    )
        console.log(result)
     }catch(err){
         console.log(err)
     }
    
 }

// updateDocument("60b1c5769121ce0bc065ed1b")
const deleteDocument= async(_id)=>{
    try{
        const result= await Playlist.findByIdAndDelete({_id})
        console.log(result);
    }catch(err){
        console.log(err);
    }
    
}


// deleteDocument("60b1c5769121ce0bc065ed1b");
