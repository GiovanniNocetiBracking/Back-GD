'use strict'

const Route = use('Route')

//AUTH
Route.group(() =>{
  Route.post('auth/register', 'UserController.store')  
  Route.post('auth/login', 'UserController.login')  
  Route.post('landing/suscribe', 'UserController.suscribe')  
}).prefix('api')
