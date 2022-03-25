export namespace mineysocket {
    export enum autheniticationCodes {
        AUTH_OK = "auth_ok",
        AUTH_FAILED = "auth_failed"
    }

    export enum possibleEvents {
        Shutdown = "shutdown",
        PlayerHpChanged = "player_hpchanged",
        PlayerDied = "player_died",
        PlayerRespawned = "player_respawned",
        PlayerJoined = "player_joined",
        PlayerLeft = "player_left",
        AuthFailed = "auth_failed",
        PlayerCheated = "player_cheated",
        ChatMessage = "chat_message"
    }

    export enum cheatingTypes {
        MovedTooFast = "moved_too_fast",
        InteractedTooFar = "interacted_too_far",
        InteractedWhileDead = "interacted_while_dead",
        FinishedUnknownDig = "finished_unknown_dig",
        DugUnbreakable = "dug_unbreakable",
        DugTooFast = "dug_too_fast"
    }

    export interface authentificationPayload {
        "playername": string, 
        "password": string
    }

    export interface luaPayload {
        "lua": string, 
        "id": string
    }

    export interface authenticationOkResult {
        "result": [autheniticationCodes.AUTH_OK, string],
        "id": "auth"
    }

    export interface authenticationBadResult {
        "error": "authentication error"
    }

    export interface luaResult {
        "result": any[],
        "id": string
    }

    export interface eventRegisteration {
        "register_event": string
    }

    export interface eventDeregisteration {
        "unregister_event": string
    }

    export interface receivedEvent {
        "event": [possibleEvents, ...any]
    }

    export interface shutdownEvent extends receivedEvent {
        "event": [possibleEvents.Shutdown]
    }

    /**
     * {"event": ["player_hpchanged", "<playername>", "<hp change>", {'type': '<reason>', 'from': '<player or engine>'}]}
     */
    export interface PlayerHpChangedEvent extends receivedEvent {
        "event": [possibleEvents.PlayerHpChanged, string, string, {"type": string, "from": "engine" | string}]
    }

    /**
     * {"event": ["player_died", "<playername>", "<reason>"]}
     */
    export interface PlayerDiedEvent extends receivedEvent {
        "event": [possibleEvents.PlayerDied, string, string]
    }

    export interface PlayerRespawnedEvent extends receivedEvent {
        "event": [possibleEvents.PlayerRespawned, string]
    }

    export interface PlayerJoinedEvent extends receivedEvent {
        "event": [possibleEvents.PlayerJoined, string]
    }

    export interface PlayerLeftEvent extends receivedEvent {
        "event": [possibleEvents.PlayerLeft, string]
    }

    export interface PlayerCheatedEvent extends receivedEvent {
        "event": [possibleEvents.PlayerLeft, string, {"type": cheatingTypes}]
    }

    export interface AuthFailedEvent extends receivedEvent {
        "event": [possibleEvents.AuthFailed, string, string]
    }

    export interface ChatMessageEvent extends receivedEvent {
        "event": [possibleEvents.ChatMessage, string, string]
    }




}