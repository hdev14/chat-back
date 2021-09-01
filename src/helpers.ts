import WebSocket from 'ws'
import { MessageData } from './types'

export function getUrlParam (url: string, field: string): string | null {
  const params = url?.split('/')[1]
  return (new URLSearchParams(params)).get(field)
}

export function isSameChatId (currentUrl: string, clientUrl: string): boolean {
  return getUrlParam(currentUrl, 'id') === getUrlParam(clientUrl, 'id')
}

export function sendMessage (current: WebSocket.WebSocket, client: WebSocket.WebSocket, messageData: MessageData): void {
  if (client !== current &&
    client.readyState === WebSocket.OPEN &&
    isSameChatId(current.clientUrl, client.clientUrl)) {
    const data = JSON.stringify({
      ...messageData,
      author: getUrlParam(current.clientUrl, 'name')
    })
    client.send(data)
  }
}
