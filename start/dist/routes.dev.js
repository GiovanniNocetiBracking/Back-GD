"use strict";

var Route = use("Route");
Route.group(function () {
  Route.post("auth/register", "UserController.store");
  Route.post("auth/login", "UserController.login");
  Route.post("landing/suscribe", "UserController.suscribe");
  Route.post("landing/contactUs", "UserController.contactUs");
  Route.post("dashboard/arduinoSensor", "UserController.arduinoSensor");
}).prefix("api");