const constant = {
  "GENERAL_ROOM_ID" : 1,
  "HOST" : process.env.HOST,
  "PROTOCOL" : process.env.PROTOCOL,
  "SERVER_PORT" : parseInt(process.env.SERVER_PORT),
  "CHAT_SERVER_PORT" : parseInt(process.env.CHAT_SERVER_PORT),
  "CHAT_SECURE" : (process.env.CHAT_SECURE === "true")
}

export default constant;