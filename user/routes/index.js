const express = require("express")
const router = express.Router()
const {create, login, refresh} = require("../services")
const {createUserMiddleware}= require("../middleware")

router.post("/signup", createUserMiddleware, (req, res)=>{
    create((code, status, message)=>{
        res.status(code).json({
            status: status,
            message: message
         })
    }, req.body)
})

router.post("/login", (req, res)=>{
    login((code, message, data)=>{
        res.status(code).json({
            msg: message,
            data: data
         })
    }, req.body)
})

router.post("/refreshtoken", (req, res)=>{
    refresh((code, message, data)=>{
        res.status(code).json({
            msg: message,
            data: data
         })
    }, req.body)
})



module.exports = router