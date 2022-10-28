const {machineId} = require("node-machine-id");

class DeviceService{
    async detectUniqueMachine() {
        return machineId();
    }
}

module.exports = new DeviceService()