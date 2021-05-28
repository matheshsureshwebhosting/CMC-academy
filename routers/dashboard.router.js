const router=require("express").Router()

router.get("/",async(req,res)=>{
    res.render("dash")
})

module.exports=router