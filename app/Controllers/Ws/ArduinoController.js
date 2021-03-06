'use strict'

class ArduinoController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = ArduinoController
