import { ISlot } from "./ISlot";
import { OpType } from "./OperationTypes";

export interface IBlockInfo {
    id: string; // BlockId,
    content: null | {
        is_final: boolean,
        is_stale: boolean,
        is_in_blockclique: boolean,
        block: {
            header: {
                content: {
                  endorsed_block: string, // Block id
                  index: number,
                  sender_public_key: string,
                  slot: ISlot
                },
                signature: string
            },
            operation_merkle_root: string, // Hash of all operations
            parents: [string], // Block ids, as many as thread count
            slot: ISlot
        },
        signature: string,
        operations: [
          {
            content: {
              expire_period: number,
              fee: string, // represent an Amount in coins
              op: OpType,
              sender_public_key: string
            },
            signature: string
          }
        ]
      };
      is_final: boolean;
      is_in_blockclique: boolean;
      is_stale: boolean;
  }
