"use strict";

class SensorController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }
  onSensorData(data) {
    console.log(this.socket.id);
  }
}

module.exports = SensorController;
