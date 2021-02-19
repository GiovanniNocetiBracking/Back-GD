'use strict'

const Mail = use('Mail')
const User = use('App/Models/User')
const { validate } = use('Validator') 
const Hash = use('Hash')

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
          return response.json(Validation)
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
      const userRepeat = await User.query()
      .select('id')
      .where('email', email)
      .from('users')
      .update({
        password : await Hash.make(password),
        username : username
      })     
      return response.json({"registrado" : "El usuario se a registrado con exito"})
    }else{
    await User.create({
      email,
      password,
      username,
      suscribe
    })
      return response.json({"registrado" : "El usuario se a registrado con exito"})
  }
}
  async suscribe({request, response}){
    try{
    const {email, suscribe} = request.all()      
    const rules = {
      email: 'required|email|unique:users, email',       
    }
    const messages = {
      'email.unique': 'El correo ingresado ya esta suscrito'
    }
    const validation = await validate(request.only('email'), rules, messages)
    if (validation.fails()) {       
      const userRepeat = await User.query()
      .select('id', 'suscribe')
      .where('email', email)
      .from('users')
      .first() 
      const user = await User.find(userRepeat.id)
      if(userRepeat.suscribe == 0){
        user.suscribe = 1
        user.save()
        return response.json({"suscrito" : "El usuario ahora esta suscrito"} )
      }else{
        return response.json(validation)
      }
        
    }     
    const newSuscriber = await User.create({
      email,
      suscribe 
    }) 
      return response.json(newSuscriber)       
    }catch(e){
      return response.json(e.message)
    }
  }
  
}

module.exports = UserController
