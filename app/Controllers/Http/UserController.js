'use strict'

const Mail = use('Mail')
const User = use('App/Models/User')
const { validate } = use('Validator') 

class UserController {  
  async contactUs ({request}){
    try {
      const {name, email, subject, message } = request.all()
      const data = request.body
      const rules = {
        email: 'required|email',
        name: 'required',
        subject: 'required',
        message: 'required'
      }
      const validation = await validate(request.all(), rules)
      if (validation.fails()) {  
          return console.log(validation)
      }else{
      await Mail.send('email', data, (message) => {
        message
          .to('giovanni.noceti@gmail.com')
          .from('giovanni.noceti@gmail.com')
          .subject(subject)
      })   
    return console.log(data)}
    } catch (error) {
      console.log(error)
    }
  }
  async login ({ request, auth, response}){
    try{
      const {email, password} = request.all()
      const rules = {
        email: 'required|email',        
        password: 'required'
      }
      const validation = await validate(request.all(), rules)
      if (validation.fails()) {  
          return console.log(validation)
      }      
      const token = await auth.attempt(email, password)
      return console.log(token)      
    }catch(e){
      return response.json(e.message)
    }    
  }  
  async store ({ request, response }) {    
    const {email, password, username, suscribe} = request.all()   
    const rules = {
      email: 'required|email|unique:users,email',        
      password: 'required',
      username: 'required'
    }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) { 
        return console.log(validation)
    }
    await User.create({
      email,
      password,
      username,
      suscribe
    })
      return console.log(request.body)
  }
  async suscribe({request, response}){
    try{
    const {email, suscribe} = request.all()      
    const rules = {
      email: 'required|email|unique:users, email',       
    }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) { 
        return console.log(validation)
    }     
    const newSuscriber = await User.create({
      email,
      suscribe
    }) 
      return console.log(newSuscriber.$attributes)       
    }catch(e){
      return response.json(e.message)
    }
  }
  
}

module.exports = UserController
