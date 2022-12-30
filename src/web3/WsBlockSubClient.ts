import { IBlockHeaderInfo } from "../interfaces/IBlockcliqueBlockBySlot";
import { ISubscribeNewBlocksMessage } from "../interfaces/ISubscribeNewBlocksMessage";
import { IWsClientConfig } from "../interfaces/IWsClientConfig";
import { WebsocketEvent } from "../interfaces/WebsocketEvent";
import { WS_RPC_REQUEST_METHOD } from "../interfaces/WsRpcMethods";
import { BaseWsClient, bin2String } from "./BaseWsClient";

/** Public Ws Client for interacting with the massa network */
export class WsBlockSubClient extends BaseWsClient {

	// subscription ids
	private subId: number;

	// methods
	private onNewBlockHandler?: (data: ISubscribeNewBlocksMessage) => void;

	public constructor(wsClientConfig: IWsClientConfig) {
		super(wsClientConfig);
		this.subscribeNewBlocks = this.subscribeNewBlocks.bind(this);
		this.unsubscribeNewBlocks = this.unsubscribeNewBlocks.bind(this);
		this.onNewBlock = this.onNewBlock.bind(this);
		this.parseWsMessage = this.parseWsMessage.bind(this);
	}

	public onNewBlock(onNewBlockHandler?: (data: ISubscribeNewBlocksMessage) => void) {
		if (onNewBlockHandler) {
			this.onNewBlockHandler = onNewBlockHandler;
		}
	}

	public subscribeNewBlocks(): void {
		if (!((this.wss && this.isConnected))) {
			throw new Error("Websocket Client is not connected");
		}
		this.wss.send(JSON.stringify({
			"jsonrpc": "2.0",
			"id": 1,
			"method": WS_RPC_REQUEST_METHOD.SUBSCRIBE_NEW_BLOCKS,
			"params": []
		}));
	}

	public unsubscribeNewBlocks(): void {
		if (!((this.wss && this.isConnected))) {
			throw new Error("Websocket Client is not connected");
		}
		if (!this.subId) {
			throw new Error("Cannot unsubscribe to new blocks as subscription id is missing. Subscribe client first!");
		}
		this.wss.send(JSON.stringify({
			"jsonrpc": "2.0",
			"id": 1,
			"method": WS_RPC_REQUEST_METHOD.UNSUBSCRIBE_NEW_BLOCKS,
			"params": [this.subId]
		}));
	}

	protected parseWsMessage(data: any): void {
		const messageStr = bin2String(data);
		let parsedMsg: Object = null;
		try {
			parsedMsg = JSON.parse(messageStr);
			if (parsedMsg["result"]) {
				this.subId = parseInt(parsedMsg["result"]);
			}
			if (parsedMsg["params"] && parsedMsg["params"]["result"] && parsedMsg["params"]["subscription"] === this.subId) {
				if (this.onNewBlockHandler) {
					this.onNewBlockHandler(parsedMsg["params"]["result"] as ISubscribeNewBlocksMessage);
				}
			}
		} catch (err) {
			console.error(`Error parsing misformed message ${err.message}`);
		}
	}
}