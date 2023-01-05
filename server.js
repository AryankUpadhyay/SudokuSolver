const PORT=8000
const axios = require('axios').default
const express=require('express')
const  cors = require('cors')
const { response } = require('express')
require('dotenv').config()
const  app=  express()
app.use(cors())
app.use(express.json())

app.post('/callingAPI',async (req,res)=>{
    let f = await req.body.numbers;
    console.log('please dikh jao bhai ', f)
    console.log('API was called')
    const options = {
        method: 'POST',
        url: 'https://sudoku-solver3.p.rapidapi.com/sudokusolver/',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key':  process.env.APIID,
          'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com'
        },
        data: `{"input":[${f}]}`
    };
      
      axios.request(options).then( (response)=> {
          console.log(response.data)
          res.json(response.data)
      }).catch( (error) =>{
          console.error('there is an error', error)
          response.data=[]
          console.log('data will be ', response.data)
          res.json(response.data)
          // ResultStatement.innerHTML='This Sudoku is Not Solvable'
      })
})

app.listen(PORT,()=>console.log(`Server is Working on port ${PORT}`))