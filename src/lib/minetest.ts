import { mineysocket } from "./types"

import * as Net from "net"

export default class Minetest {
    server: string
    port: number
    playername: string
    connection: Net.Socket
    password: string
    eventQueue: mineysocket.receivedEvent[]
    resultQueue: (mineysocket.luaResult | mineysocket.authenticationOkResult | mineysocket.authenticationBadResult)[]
    callbacks: any[]
    clientid!: string

    constructor(server: string = "127.0.0.1", port: number = 29999, playername: string | null = null, password: string = "") {
        this.server = server
        this.port = port
        if (playername) {this.playername = playername} else {this.playername = "MineyPlayer"}
        this.password = password

        this.eventQueue = []
        this.resultQueue = []
        this.callbacks = []

        // Initiate connection
        this.connection = Net.createConnection({host: this.server, port: this.port, timeout:2000})
        this.connection.on("error", (err) => {
            console.log(err)
        })

        this.connection.on("close", (hadError) => {
            if (hadError) {
                console.log("Connection Aborted due to Error!\n Trying to reconnect!")
                this.connect()
            } else {
                console.log("Connection closed gracefully\n")
            }
        })
    }

    private connect() {
        this.connection = Net.createConnection({host: this.server, port: this.port, timeout:2000})
    }

    private authenticate() {
        this.send({"playername": this.playername, "password": this.password})

    }

    send(data: object) {
        let chunkSize = 4096
        let dataStr = JSON.stringify(data)+"\n"
        this.connection.write(dataStr)

        this.connection.on("close", (hadError) => {
            if (hadError) {
                this.connection.once("ready", () => {this.connection.write(dataStr)})
            }
        })
    }


}