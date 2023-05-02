/// <reference types="node" />
import { IProvider } from '../interfaces/IProvider';
import { IClientConfig } from '../interfaces/IClientConfig';
import { Buffer } from 'buffer';
import { IAccount } from '../interfaces/IAccount';
import { IContractData } from '../interfaces/IContractData';
import { JSON_RPC_REQUEST_METHOD } from '../interfaces/JsonRpcMethods';
import { ITransactionData } from '../interfaces/ITransactionData';
import { OperationTypeId } from '../interfaces/OperationTypes';
import { IRollsData } from '../interfaces/IRollsData';
import { ICallData } from '../interfaces/ICallData';
import 'cross-fetch/polyfill';
export type DataType = IContractData | ITransactionData | IRollsData | ICallData;
export declare const PERIOD_OFFSET = 5;
/**  Base Client which is to be extended by other clients as it provides core methods */
export declare class BaseClient {
    protected clientConfig: IClientConfig;
    constructor(clientConfig: IClientConfig);
    /** set new providers */
    setProviders(providers: Array<IProvider>): void;
    /** return all private providers */
    protected getPrivateProviders(): Array<IProvider>;
    /** return all public providers */
    protected getPublicProviders(): Array<IProvider>;
    /** find provider for a concrete rpc method */
    private getProviderForRpcMethod;
    private promisifyJsonRpcCall;
    /** send a post JSON rpc request to the node */
    protected sendJsonRPCRequest<T>(resource: JSON_RPC_REQUEST_METHOD, params: object): Promise<T>;
    /** compact bytes payload per operation */
    protected compactBytesForOperation(data: DataType, opTypeId: OperationTypeId, account: IAccount, expirePeriod: number): Buffer;
}