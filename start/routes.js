'use strict'

const Route = use('Route')

Route.group(() =>{
  Route.post('auth/register', 'UserController.store')  
  Route.post('auth/login', 'UserController.login')  
  Route.post('landing/suscribe', 'UserController.suscribe')
  Route.post('landing/contactUs', 'UserController.contactUs')
}).prefix('api')
