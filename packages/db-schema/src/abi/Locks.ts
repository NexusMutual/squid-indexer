import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    MemberRewarded: event("0xb0514a0573d780d5feaa675de78f30d000fdac96e5879a414bb01090ce127cfc", "MemberRewarded(uint256,uint256)", {"memberId": indexed(p.uint256), "amount": p.uint256}),
    RewardsAdded: event("0xf98479c90d725b76f182671561afd73370bdc5650f4a17a29f93a21690c60957", "RewardsAdded(address,uint256,uint256)", {"asset": p.address, "totalAssetAmount": p.uint256, "snapshotTimestamp": p.uint256}),
    SharesLocked: event("0xc3f47d3cc3452098696395327c1c73cbc75b866bca9405b8743a78d5cde4e8a7", "SharesLocked(uint256,uint256,uint256,uint256,uint256)", {"memberId": indexed(p.uint256), "lockId": indexed(p.uint256), "shares": p.uint256, "topUpShares": p.uint256, "period": p.uint256}),
    SharesWithdrawn: event("0x6e5bae3e6b5f65f36fc800e791335eb2d3b0a42d95d795627d76a605e4576629", "SharesWithdrawn(uint256,uint256)", {"memberId": indexed(p.uint256), "lockId": indexed(p.uint256)}),
}

export const functions = {
    MAX_LOCK_PERIOD: viewFun("0xf5540162", "MAX_LOCK_PERIOD()", {}, p.uint256),
    MIN_LOCK_PERIOD: viewFun("0x385dc3df", "MIN_LOCK_PERIOD()", {}, p.uint256),
    addReward: fun("0x99b73297", "addReward(uint256[],uint256[],address,uint256,uint256)", {"memberIds": p.array(p.uint256), "assetAmounts": p.array(p.uint256), "asset": p.address, "totalAssetAmounts": p.uint256, "snapshotTimestamp": p.uint256}, ),
    editLock: fun("0xb3b9aa48", "editLock(uint256,uint256,uint256)", {"lockId": p.uint256, "topUpShares": p.uint256, "period": p.uint256}, ),
    getAllMemberLocks: viewFun("0x1dbd5af7", "getAllMemberLocks(uint256)", {"memberId": p.uint256}, p.array(p.struct({"shares": p.uint96, "startTime": p.uint32, "period": p.uint32}))),
    getMemberLock: viewFun("0x853ed821", "getMemberLock(uint256,uint256)", {"memberId": p.uint256, "lockId": p.uint256}, p.struct({"shares": p.uint96, "startTime": p.uint32, "period": p.uint32})),
    lockShares: fun("0x008c687e", "lockShares(uint256,uint256)", {"shares": p.uint256, "period": p.uint256}, ),
    lockSharesOnDeposit: fun("0x9b6d3a69", "lockSharesOnDeposit(uint256,uint256,uint256)", {"shares": p.uint256, "memberId": p.uint256, "period": p.uint256}, ),
    registry: viewFun("0x7b103999", "registry()", {}, p.address),
    vault: viewFun("0xfbfa77cf", "vault()", {}, p.address),
    withdrawShares: fun("0x19810f3c", "withdrawShares(uint256)", {"lockId": p.uint256}, ),
}

export class Contract extends ContractBase {

    MAX_LOCK_PERIOD() {
        return this.eth_call(functions.MAX_LOCK_PERIOD, {})
    }

    MIN_LOCK_PERIOD() {
        return this.eth_call(functions.MIN_LOCK_PERIOD, {})
    }

    getAllMemberLocks(memberId: GetAllMemberLocksParams["memberId"]) {
        return this.eth_call(functions.getAllMemberLocks, {memberId})
    }

    getMemberLock(memberId: GetMemberLockParams["memberId"], lockId: GetMemberLockParams["lockId"]) {
        return this.eth_call(functions.getMemberLock, {memberId, lockId})
    }

    registry() {
        return this.eth_call(functions.registry, {})
    }

    vault() {
        return this.eth_call(functions.vault, {})
    }
}

/// Event types
export type MemberRewardedEventArgs = EParams<typeof events.MemberRewarded>
export type RewardsAddedEventArgs = EParams<typeof events.RewardsAdded>
export type SharesLockedEventArgs = EParams<typeof events.SharesLocked>
export type SharesWithdrawnEventArgs = EParams<typeof events.SharesWithdrawn>

/// Function types
export type MAX_LOCK_PERIODParams = FunctionArguments<typeof functions.MAX_LOCK_PERIOD>
export type MAX_LOCK_PERIODReturn = FunctionReturn<typeof functions.MAX_LOCK_PERIOD>

export type MIN_LOCK_PERIODParams = FunctionArguments<typeof functions.MIN_LOCK_PERIOD>
export type MIN_LOCK_PERIODReturn = FunctionReturn<typeof functions.MIN_LOCK_PERIOD>

export type AddRewardParams = FunctionArguments<typeof functions.addReward>
export type AddRewardReturn = FunctionReturn<typeof functions.addReward>

export type EditLockParams = FunctionArguments<typeof functions.editLock>
export type EditLockReturn = FunctionReturn<typeof functions.editLock>

export type GetAllMemberLocksParams = FunctionArguments<typeof functions.getAllMemberLocks>
export type GetAllMemberLocksReturn = FunctionReturn<typeof functions.getAllMemberLocks>

export type GetMemberLockParams = FunctionArguments<typeof functions.getMemberLock>
export type GetMemberLockReturn = FunctionReturn<typeof functions.getMemberLock>

export type LockSharesParams = FunctionArguments<typeof functions.lockShares>
export type LockSharesReturn = FunctionReturn<typeof functions.lockShares>

export type LockSharesOnDepositParams = FunctionArguments<typeof functions.lockSharesOnDeposit>
export type LockSharesOnDepositReturn = FunctionReturn<typeof functions.lockSharesOnDeposit>

export type RegistryParams = FunctionArguments<typeof functions.registry>
export type RegistryReturn = FunctionReturn<typeof functions.registry>

export type VaultParams = FunctionArguments<typeof functions.vault>
export type VaultReturn = FunctionReturn<typeof functions.vault>

export type WithdrawSharesParams = FunctionArguments<typeof functions.withdrawShares>
export type WithdrawSharesReturn = FunctionReturn<typeof functions.withdrawShares>

