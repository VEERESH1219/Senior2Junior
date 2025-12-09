const express = require("express");
const router = express.Router();
const pool = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req,res)=>{
  const {name,email,password} = req.body;

  const [exists] = await pool.query("SELECT id FROM users WHERE email=?", [email]);
  if(exists.length) return res.status(400).json({msg:"Email exists"});

  const hashed = await bcrypt.hash(password,10);

  await pool.query(
    "INSERT INTO users (name,email,password) VALUES (?,?,?)",
    [name,email,hashed]
  );

  res.json({msg:"Registered"});
});

// LOGIN
router.post("/login", async (req,res)=>{
  const {email,password} = req.body;

  const [user] = await pool.query("SELECT * FROM users WHERE email=?", [email]);
  if(!user.length) return res.status(400).json({msg:"Invalid"});

  const ok = await bcrypt.compare(password, user[0].password);
  if(!ok) return res.status(400).json({msg:"Invalid"});

  const token = jwt.sign({id:user[0].id}, process.env.JWT_SECRET, {expiresIn:"7d"});

  res.json({msg:"Login success", token});
});

module.exports = router;
