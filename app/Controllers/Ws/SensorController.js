"use strict";

class SensorController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }
  onMessage(sensorData) {
    this.socket.broadcastToAll("sensorData", sensorData);
  }
}

module.exports = SensorController;
