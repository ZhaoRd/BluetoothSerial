/*global cordova*/
module.exports = {

    connect: function (macAddress, success, failure) {
        cordova.exec(success, failure, "PhxTool", "connect", [macAddress]);
    },

    // Android only - see http://goo.gl/1mFjZY
    connectInsecure: function (macAddress, success, failure) {
        cordova.exec(success, failure, "PhxTool", "connectInsecure", [macAddress]);
    },

    disconnect: function (success, failure) {
        cordova.exec(success, failure, "PhxTool", "disconnect", []);
    },

    // list bound devices
    list: function (success, failure) {
        cordova.exec(success, failure, "PhxTool", "list", []);
    },

    isEnabled: function (success, failure) {
        cordova.exec(success, failure, "PhxTool", "isEnabled", []);
    },

    isConnected: function (success, failure) {
        cordova.exec(success, failure, "PhxTool", "isConnected", []);
    },

    // the number of bytes of data available to read is passed to the success function
    available: function (success, failure) {
        cordova.exec(success, failure, "PhxTool", "available", []);
    },

    // read all the data in the buffer
    read: function (success, failure) {
        cordova.exec(success, failure, "PhxTool", "read", []);
    },
	
	readRawData: function (success, failure) {
        cordova.exec(success, failure, "PhxTool", "readRawData", []);
    },
	

    // reads the data in the buffer up to and including the delimiter
    readUntil: function (delimiter, success, failure) {
        cordova.exec(success, failure, "PhxTool", "readUntil", [delimiter]);
    },

    // writes data to the bluetooth serial port
    // data can be an ArrayBuffer, string, integer array, or Uint8Array
    write: function (data, success, failure) {

        // convert to ArrayBuffer
        if (typeof data === 'string') {
            data = stringToArrayBuffer(data);
        } else if (data instanceof Array) {
            // assuming array of interger
            data = new Uint8Array(data).buffer;
        } else if (data instanceof Uint8Array) {
            data = data.buffer;
        }

        cordova.exec(success, failure, "PhxTool", "write", [data]);
    },

    // calls the success callback when new data is available
    subscribe: function (delimiter, success, failure) {
        cordova.exec(success, failure, "PhxTool", "subscribe", [delimiter]);
    },

    // removes data subscription
    unsubscribe: function (success, failure) {
        cordova.exec(success, failure, "PhxTool", "unsubscribe", []);
    },

    // calls the success callback when new data is available with an ArrayBuffer
    subscribeRawData: function (success, failure) {

        successWrapper = function(data) {
            // Windows Phone flattens an array of one into a number which
            // breaks the API. Stuff it back into an ArrayBuffer.
            if (typeof data === 'number') {
                var a = new Uint8Array(1);
                a[0] = data;
                data = a.buffer;
            }
            success(data);
        };
        cordova.exec(successWrapper, failure, "PhxTool", "subscribeRaw", []);
    },

    // removes data subscription
    unsubscribeRawData: function (success, failure) {
        cordova.exec(success, failure, "PhxTool", "unsubscribeRaw", []);
    },

    // clears the data buffer
    clear: function (success, failure) {
        cordova.exec(success, failure, "PhxTool", "clear", []);
    },

    // reads the RSSI of the *connected* peripherial
    readRSSI: function (success, failure) {
        cordova.exec(success, failure, "PhxTool", "readRSSI", []);
    },

    showBluetoothSettings: function (success, failure) {
        cordova.exec(success, failure, "PhxTool", "showBluetoothSettings", []);
    },

    enable: function (success, failure) {
        cordova.exec(success, failure, "PhxTool", "enable", []);
    },

    discoverUnpaired: function (success, failure) {
        cordova.exec(success, failure, "PhxTool", "discoverUnpaired", []);
    },

    setDeviceDiscoveredListener: function (notify) {
        if (typeof notify != 'function')
            throw 'PhxTool.setDeviceDiscoveredListener: Callback not a function';

        cordova.exec(notify, null, "PhxTool", "setDeviceDiscoveredListener", []);
    },

    clearDeviceDiscoveredListener: function () {
        cordova.exec(null, null, "PhxTool", "clearDeviceDiscoveredListener", []);
    },

    setName: function (newName) {
        cordova.exec(null, null, "PhxTool", "setName", [newName]);
    },

    setDiscoverable: function (discoverableDuration) {
        cordova.exec(null, null, "PhxTool", "setDiscoverable", [discoverableDuration]);
    }


};

var stringToArrayBuffer = function(str) {
    var ret = new Uint8Array(str.length);
    for (var i = 0; i < str.length; i++) {
        ret[i] = str.charCodeAt(i);
    }
    return ret.buffer;
};
