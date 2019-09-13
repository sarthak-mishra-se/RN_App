window.navigator.userAgent = "react-native";
import socketIOClient from 'socket.io-client';
import {AsyncStorage, Platform} from 'react-native';
import PubSub from 'pubsub-js'
import base from './base'

var socket = null;

export class ldsocket {

    static instance = null;

    constructor() {
        console.log("BP Instance created");
        socket = socketIOClient('ws://laaddu.com/ws/chat/');
    }

    static getInstance() {

        if (ldsocket.instance == null) {
            ldsocket.instance = new ldsocket();
        }
        return this.instance;
    }

    async establishConnection() {
        this.initSocketEvents()
        socket.connect();
    }

    async initSocketEvents() {
        console.log("initializing socket events")
        let self = this;

        socket.on('connect', function (data) {
            console.log("Connected");            
        });
    }

}