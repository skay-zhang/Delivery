import { defineStore } from 'pinia'

export const confStore = defineStore('conf', {
  state: () => ({
    service: {
        share: {
            enable: false
        },
        receive: {
            enable: false
        }
    },
    network: {
        port: 56565,
        http: {},
        webrtc: {}
    },
    security: {},
    logs: {},
    advanced: {}
  }),
  getters: {
    
  },
  actions: {
    init(data){
        this.service = data.service;
        this.network = data.network;
        this.security = data.security;
        this.logs = data.logs;
        this.advanced = data.advanced;
    }
  },
})