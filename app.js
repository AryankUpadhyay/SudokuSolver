// require('dotenv').config();
// console.log(process.env);
// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()




// const { formToJSON } = require("axios")

// const { application } = require("express")

// const { response } = require("express")

const  puzzleBoard = document.querySelector('#puzzle')

const solveButton  = document.querySelector('#solve-button')
const ResultStatement= document.querySelector('#ResultStatement')

const squares=81
let submission =[]
for(let i=1;i<=squares;i++){
    const inputElement=document.createElement('input')
    inputElement.setAttribute('type', 'number');
    inputElement.setAttribute('min', '1');
    inputElement.setAttribute('max',9)
    puzzleBoard.appendChild(inputElement);
}

const  joinvalues=()=>{
    const inputs =document.querySelectorAll('input')
    inputs.forEach(input=>{
        if(input.value>0 && input.value<=9 ){
            submission.push(input.value)
        }
        else{
            submission.push(0)
        }
    })
    console.log(submission);
}

const populateValues = (response) =>{
    const inputs =document.querySelectorAll('input')
    if(Object.keys(response).length !=0){
        console.log('Working upto this part')
        // let i=0;
        inputs.forEach((input, i)=> {
            input.value=response.answer[i]
        })
        ResultStatement.innerHTML='There You Got the Solution..!'
    }
    else{
        ResultStatement.innerHTML='This Sudoku is Not Solvable'
    }
}

const callingAPI=()=>{
    // const axios = require("axios");
    joinvalues()
    ResultStatement.innerHTML='We are getting the best results for you !!.. PLEASE WAIT .. !! '
    const  inputdata = {numbers:  submission.join(',')}
    const checkingData={username:  'me'}
    console.log('input data is ', inputdata)
    fetch('http://localhost:8000/callingAPI',{
        method:"POST",
        headers :{
            // 'Accept':'application.json',
            'Content-Type':'application/json'
        },
        body : JSON.stringify(
            inputdata    
        ),
        // console.log('kya hua bhai',  body),
    }).then(response=>response.json())
        .then(data=>{console.log('outputing the data=> ',data),
            populateValues(data)
            submission=[]
        })
        .catch((error)=>{
            console.log('Error', error)
        })

}


solveButton.addEventListener('click', callingAPI)

