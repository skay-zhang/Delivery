import { defineStore } from 'pinia'

export const confStore = defineStore('conf', {
  state: () => ({
    service: {
      share: {
        enable: false,
        speed: 1024,
        qps: 3
      },
      receive: {
        enable: false,
        maxSize: 10000000
      }
    },
    network: {
      http: {
        port: 38950,
      },
      webrtc: {
        port: 38900,
      }
    },
    security: {
      auth: {
        enable: false,
        list: []
      },
      blacklist: [],
      whitelist: []
    },
    logs: {
      enable: false,
      level: 'info'
    },
    advanced: {
      api: {
        enable: false,
        token: ''
      }
    }
  }),
  getters: {

  },
  actions: {
    init(data) {
      this.service = data.service;
      this.network = data.network;
      this.security = data.security;
      this.logs = data.logs;
      this.advanced = data.advanced;
    }
  },
})