import {io} from "../../server.js"

function sendNotification(challenge, isRestore = false) {
  const flag = `FLAG-{${challenge.name}}`
  const notification = {
    key: challenge.key,
    name: challenge.name,
    challenge: challenge.name + ' (' + challenge.description + ')',
    flag,
    hidden: false,
    isRestore
  }

  console.log(flag)
  io.emit('challenge solved', notification)
}
export default sendNotification