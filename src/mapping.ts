import { BigInt } from "@graphprotocol/graph-ts"
import {
  Definer,
  Approval as ApprovalEvent,
  Transfer as TransferEvent
} from "../generated/Definer/Definer"
import { Approval, Transfer } from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = Approval.load(event.params.value.toHex())

  if (entity == null) {
    entity = new Approval(event.params.value.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value
  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = Transfer.load(event.params.value.toHex())

  if (entity == null) {
    entity = new Transfer(event.params.value.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value
  entity.save()
}