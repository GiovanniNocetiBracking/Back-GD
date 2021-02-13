'use strict'

const Mail = use('Mail')
const User = use('App/Models/User') 

class UserController {
 
  async index ({ request, response, view }) {

  }
  
  async create ({ request, response, view }) {
    
  }
  async contactUs ({request}){
    try {
      const {name, email, subject, message } = request.all()
      await Mail.send('email', request.toJSON(), (message) => {
        message
        .to(email)
        .from('giovanni.noceti@gmail.com')
        .subject(subject)
    })
    } catch (error) {
      
    }
  }

  async login ({ request, auth, response}){
    try{
      const {email, password} = request.all()
      const token = await auth.attempt(email, password)
      return token
    }catch(e){
      return response.json(e.message)
    }
    
  }
  
  async store ({ request, response }) {
    console.log('hello world')
    const {email, password, username, suscribe} = request.all()
    await User.create({
      email,
      password,
      username,
      suscribe
    })
      return this.login(...arguments)
  }

  async suscribe({request, response}){
    try{
    const {email, suscribe} = request.all()
    
    const newSuscriber = await User.create({
      email,
      suscribe
    })    
      return response.json(newSuscriber)        
    }catch(e){
      return response.json(e.message)
    }
  }
   
  
  async show ({ params, request, response, view }) {
    
  }
 
  async edit ({ params, request, response, view }) {
  }
  
  async update ({ params, request, response }) {
  }
  
  async destroy ({ params, request, response }) {
  }
}

module.exports = UserController
