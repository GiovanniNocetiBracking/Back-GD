"use strict";

const Mail = use("Mail");
const User = use("App/Models/User");
const Sensor = use("App/Models/Sensor");
const { validate } = use("Validator");
const Hash = use("Hash");

class UserController {
  /* ---------------------------------------------LOGIN-------------------------------------------- */
  async login({ request, auth, response }) {
    try {
      const { email, password } = request.all();
      const rules = {
        email: "required|email",
        password: "required",
      };
      const messages = {
        "email.email": "Por favor ingrese un email valido",
        "email.required": "El campo email es obligatorio",
        "password.required": "El campo contraseña es obligatorio",
      };
      const validation = await validate(request.all(), rules, messages);
      if (validation.fails()) {
        return response.json(validation);
      }
      const token = await auth.attempt(email, password);
      return response.json(token);
    } catch (e) {
      return response.json(e.message);
    }
  }
  /* -------------------------------------------REGISTER----------------------------------------- */
  async store({ request, response }) {
    const { email, password, username, suscribe } = request.all();
    const rules = {
      email: "required|email|unique:users,email",
      password: "required",
      username: "required",
    };
    const messages = {
      "email.unique": "El correo ingresado ya esta registrado",
      "email.required": "El campo correo es obligatorio",
      "email.email": "El email ingresado no es valido",
      "password.required": "El campo contraseña es obligatorio",
      "username.required": "El campo nombre es obligatorio",
    };
    const validation = await validate(request.all(), rules, messages);
    try {
      if (validation.fails()) {
        const userRepeat = await User.query()
          .select("id")
          .where("email", email)
          .from("users")
          .update({
            password: await Hash.make(password),
            username: username,
          });
        return response.json([
          validation,
          { registrado: "El usuario se a registrado con exito" },
        ]);
      } else {
        const newUser = await User.create({
          email,
          password,
          username,
          suscribe,
        });
        return response.json([
          newUser,
          { registrado: "El usuario se a registrado con exito" },
        ]);
      }
    } catch (error) {
      return response.json(error);
    }
  }
  /* -------------------------------------------- CONTACT US ------------------------------------- */
  async contactUs({ request, response }) {
    try {
      const { name, email, subject, message } = request.all();
      const data = request.body;
      const rules = {
        email: "required|email",
        name: "required",
        subject: "required",
        message: "required",
      };
      const messages = {
        "email.email": "Por favor ingrese un email valido",
        "email.required": "El campo email es obligatorio",
        "name.required": "El campo nombre es obligatorio",
        "subject.required": "El campo asunto es obligatorio",
        "message.required": "El campo mensaje es obligatorio",
      };
      const validation = await validate(request.all(), rules, messages);
      if (validation.fails()) {
        return response.json(Validation);
      } else {
        await Mail.send("email", data, (message) => {
          message
            .to("giovanni.noceti@gmail.com")
            .from("giovanni.noceti@gmail.com")
            .subject(subject);
        });
        return response.json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  /* ---------------------------------------------SUSCRIBE-------------------------------------- */
  async suscribe({ request, response }) {
    try {
      const { email, suscribe } = request.all();
      const rules = {
        email: "required|email|unique:users, email",
      };
      const messages = {
        "email.unique": "El correo ingresado ya esta suscrito",
        "email.required": "El campo correo es obligatorio",
        "email.email": "El email ingresado es invalido",
      };
      const validation = await validate(request.only("email"), rules, messages);
      if (validation.fails()) {
        const userRepeat = await User.query()
          .select("id", "suscribe")
          .where("email", email)
          .from("users")
          .first();
        const user = await User.find(userRepeat.id);
        if (userRepeat.suscribe == 0) {
          user.suscribe = 1;
          user.save();
          return response.json({ suscrito: "El usuario ahora esta suscrito" });
        } else {
          return response.json(validation);
        }
      }
      const newSuscriber = await User.create({
        email,
        suscribe,
      });
      return response.json(newSuscriber);
    } catch (e) {
      return response.json(e.message);
    }
  }
  async arduinoSensor({ request, response }) {
    try {
      const { sensor } = request.all();
      const data = await Sensor.create({
        sensor,
      });
      return response.json(data);
    } catch (error) {
      return response.json(error.message);
    }
  }
}

module.exports = UserController;
