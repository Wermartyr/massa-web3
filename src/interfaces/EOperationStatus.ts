/**
 * Enum for representing operation state transitions
 */
export enum EOperationStatus {
  INCLUDED_PENDING = 0,
  AWAITING_INCLUSION = 1,
  FINAL = 2,
  INCONSISTENT = 3,
  NOT_FOUND = 4,
}
