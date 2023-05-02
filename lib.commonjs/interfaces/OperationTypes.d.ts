export interface ITransactionOpType {
    Transaction: {
        amount: string;
        recipient_address: string;
    };
}
export interface IRollBuyOpType {
    RollBuy: {
        roll_count: number;
    };
}
export interface IRollSellOpType {
    RollSell: {
        roll_count: number;
    };
}
export interface IExecSmartContractOpType {
    ExecuteSC: {
        data: number[];
        max_gas: number;
        datastore: Map<Uint8Array, Uint8Array>;
    };
}
export interface ICallSmartContractOpType {
    CallSC: {
        max_gas: number;
        param: Array<number>;
        coins: string;
        target_addr: string;
        target_func: string;
    };
}
export declare enum OperationTypeId {
    Transaction = 0,
    RollBuy = 1,
    RollSell = 2,
    ExecuteSC = 3,
    CallSC = 4
}
export type OpType = ITransactionOpType | IRollSellOpType | IRollBuyOpType | IExecSmartContractOpType | ICallSmartContractOpType;