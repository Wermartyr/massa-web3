/**
 * Represents the status of an operation on the Massa blockchain.
 */
export enum EOperationStatus {
  INCLUDED_PENDING = 0,
  AWAITING_INCLUSION = 1,
  FINAL = 2,
  NCONSISTENT = 3,
  NOT_FOUND = 4,
}
