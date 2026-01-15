import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Approval: event("0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", "Approval(address,address,uint256)", {"owner": indexed(p.address), "spender": indexed(p.address), "value": p.uint256}),
    BaseApyChangeExecuted: event("0xc7f5059cd178c28c2cc8ba06c01a91fd8ade21503a5f0884ca5e263b4f5888e1", "BaseApyChangeExecuted(uint256,uint256,uint256)", {"newBaseApy": p.uint256, "activeFrom": p.uint256, "assetsPerShare": p.uint256}),
    BaseApyChangeProposed: event("0x2322c4a28b9716d112153d244f97bffa982971726ca54d38cbbed864015cd2fe", "BaseApyChangeProposed(uint256,uint256)", {"newBaseApy": p.uint256, "activeFrom": p.uint256}),
    Deposit: event("0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7", "Deposit(address,address,uint256,uint256)", {"sender": indexed(p.address), "owner": indexed(p.address), "assets": p.uint256, "shares": p.uint256}),
    DepositFulfilled: event("0x9e7d8c35e1c511e11fb003215b6930a1d011af87d41fa66bd02c2d57da54d21c", "DepositFulfilled(uint256,uint256,address,uint256,uint256)", {"requestId": indexed(p.uint256), "memberId": indexed(p.uint256), "memberAddress": indexed(p.address), "assets": p.uint256, "shares": p.uint256}),
    DepositRequest: event("0xbb58420bb8ce44e11b84e214cc0de10ce5e7c24d0355b2815c3d758b514cae72", "DepositRequest(address,address,uint256,address,uint256)", {"controller": indexed(p.address), "owner": indexed(p.address), "requestId": indexed(p.uint256), "sender": p.address, "assets": p.uint256}),
    DepositRequestCanceled: event("0xe45944747b4563713c6ee79b4a793d35528282bfccf210bdc4798f70d4509f38", "DepositRequestCanceled(uint256,uint256,address)", {"requestId": indexed(p.uint256), "memberId": indexed(p.uint256), "sender": indexed(p.address)}),
    DepositRequestId: event("0x601b4ab03b05ba848eb4422169aab36c0910375fcbe77b2c22b2d12996f9ac7f", "DepositRequestId(uint256,uint256)", {"requestId": indexed(p.uint256), "memberId": indexed(p.uint256)}),
    OperatorSet: event("0xceb576d9f15e4e200fdb5096d64d5dfd667e16def20c1eefd14256d8e3faa267", "OperatorSet(address,address,bool)", {"controller": indexed(p.address), "operator": indexed(p.address), "approved": p.bool}),
    RedeemFulfilled: event("0x4c02fd03d2b5434e49f528f42ad1ac241f31cf80a98f387b0086d90517715271", "RedeemFulfilled(uint256,uint256,address,uint256,uint256)", {"requestId": indexed(p.uint256), "memberId": indexed(p.uint256), "memberAddress": indexed(p.address), "assets": p.uint256, "shares": p.uint256}),
    RedeemRequest: event("0x1fdc681a13d8c5da54e301c7ce6542dcde4581e4725043fdab2db12ddc574506", "RedeemRequest(address,address,uint256,address,uint256)", {"controller": indexed(p.address), "owner": indexed(p.address), "requestId": indexed(p.uint256), "sender": p.address, "shares": p.uint256}),
    RedeemRequestCanceled: event("0xfc18befd4fdf30b76c392e0f340726fd9792f0eb5e23b2d31cca6747f3adb865", "RedeemRequestCanceled(uint256,uint256,address)", {"requestId": indexed(p.uint256), "memberId": indexed(p.uint256), "sender": indexed(p.address)}),
    RedeemRequestId: event("0x0e39b088316bb20d4926b4fdacfa99a15cb2160fde3aa0dbcb5b61669bdaf8f3", "RedeemRequestId(uint256,uint256)", {"requestId": indexed(p.uint256), "memberId": indexed(p.uint256)}),
    Transfer: event("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "Transfer(address,address,uint256)", {"from": indexed(p.address), "to": indexed(p.address), "value": p.uint256}),
    Withdraw: event("0xfbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db", "Withdraw(address,address,address,uint256,uint256)", {"sender": indexed(p.address), "receiver": indexed(p.address), "owner": indexed(p.address), "assets": p.uint256, "shares": p.uint256}),
}

export const functions = {
    ASSET_UNIT: viewFun("0x87c25b52", "ASSET_UNIT()", {}, p.uint256),
    BPS: viewFun("0x249d39e9", "BPS()", {}, p.uint256),
    MIN_APY_PROPOSAL_TIME: viewFun("0x186b18fa", "MIN_APY_PROPOSAL_TIME()", {}, p.uint256),
    allowance: viewFun("0xdd62ed3e", "allowance(address,address)", {"owner": p.address, "spender": p.address}, p.uint256),
    approve: fun("0x095ea7b3", "approve(address,uint256)", {"spender": p.address, "value": p.uint256}, p.bool),
    asset: viewFun("0x38d52e0f", "asset()", {}, p.address),
    assetCap: viewFun("0x376c9cf8", "assetCap()", {}, p.uint256),
    assetDecimals: viewFun("0xc2d41601", "assetDecimals()", {}, p.uint8),
    balanceOf: viewFun("0x70a08231", "balanceOf(address)", {"account": p.address}, p.uint256),
    cancelDepositRequest: fun("0xc0b568e1", "cancelDepositRequest(uint256)", {"requestId": p.uint256}, ),
    cancelRedeemRequest: fun("0xc3f0d30e", "cancelRedeemRequest(uint256)", {"requestId": p.uint256}, ),
    claimableDepositRequest: viewFun("0x995ea21a", "claimableDepositRequest(uint256,address)", {"_0": p.uint256, "_1": p.address}, p.uint256),
    claimableRedeemRequest: viewFun("0xeaed1d07", "claimableRedeemRequest(uint256,address)", {"_0": p.uint256, "_1": p.address}, p.uint256),
    convertToAssets: viewFun("0x07a2d13a", "convertToAssets(uint256)", {"shares": p.uint256}, p.uint256),
    convertToShares: viewFun("0xc6e6f592", "convertToShares(uint256)", {"assets": p.uint256}, p.uint256),
    decimals: viewFun("0x313ce567", "decimals()", {}, p.uint8),
    deposit: fun("0x6e553f65", "deposit(uint256,address)", {"_0": p.uint256, "_1": p.address}, p.uint256),
    executeBaseApyChange: fun("0xc81f4688", "executeBaseApyChange()", {}, ),
    fulfillDeposit: fun("0x0f961663", "fulfillDeposit(uint256,uint256)", {"requestId": p.uint256, "amount": p.uint256}, ),
    fulfillRedeems: fun("0xa71b6f3d", "fulfillRedeems(uint256,uint256)", {"maxRequestId": p.uint256, "maxTotalAssets": p.uint256}, ),
    getBaseApy: viewFun("0x663f6815", "getBaseApy()", {}, p.uint256),
    getBaseApyConfig: viewFun("0xf143dcc0", "getBaseApyConfig()", {}, p.struct({"startAssetsPerShare": p.uint96, "apy": p.uint16, "activeFrom": p.uint32, "proposedApy": p.uint16, "proposedActivationTime": p.uint32})),
    getDepositRequests: viewFun("0xe3fc44b3", "getDepositRequests(uint256[])", {"requestIds": p.array(p.uint256)}, p.array(p.struct({"assets": p.uint96, "fulfilledAssets": p.uint96, "memberId": p.uint32, "lockPeriod": p.uint32, "status": p.uint8}))),
    getRedeemRequests: viewFun("0xd9ee038f", "getRedeemRequests(uint256[])", {"requestIds": p.array(p.uint256)}, p.array(p.struct({"shares": p.uint96, "fulfilledShares": p.uint96, "memberId": p.uint32, "status": p.uint8}))),
    initialize: fun("0xb119490e", "initialize(string,string,uint256)", {"_name": p.string, "_symbol": p.string, "_baseApy": p.uint256}, ),
    isOperator: viewFun("0xb6363cf2", "isOperator(address,address)", {"_0": p.address, "_1": p.address}, p.bool),
    maxDeposit: viewFun("0x402d267d", "maxDeposit(address)", {"_0": p.address}, p.uint256),
    maxMint: viewFun("0xc63d75b6", "maxMint(address)", {"_0": p.address}, p.uint256),
    maxRedeem: viewFun("0xd905777e", "maxRedeem(address)", {"owner": p.address}, p.uint256),
    maxWithdraw: viewFun("0xce96cb77", "maxWithdraw(address)", {"owner": p.address}, p.uint256),
    mint: fun("0x94bf804d", "mint(uint256,address)", {"_0": p.uint256, "_1": p.address}, p.uint256),
    name: viewFun("0x06fdde03", "name()", {}, p.string),
    pendingDepositRequest: viewFun("0x26c6f96c", "pendingDepositRequest(uint256,address)", {"requestId": p.uint256, "_1": p.address}, p.uint256),
    pendingRedeemRequest: viewFun("0xf5a23d8d", "pendingRedeemRequest(uint256,address)", {"requestId": p.uint256, "_1": p.address}, p.uint256),
    previewDeposit: viewFun("0xef8b30f7", "previewDeposit(uint256)", {"assets": p.uint256}, p.uint256),
    previewMint: viewFun("0xb3d7f6b9", "previewMint(uint256)", {"shares": p.uint256}, p.uint256),
    previewRedeem: viewFun("0x4cdad506", "previewRedeem(uint256)", {"shares": p.uint256}, p.uint256),
    previewWithdraw: viewFun("0x0a28a477", "previewWithdraw(uint256)", {"assets": p.uint256}, p.uint256),
    proposeBaseApyChange: fun("0xf533f689", "proposeBaseApyChange(uint256,uint256)", {"proposalApy": p.uint256, "proposalActivationTime": p.uint256}, ),
    redeem: viewFun("0xba087652", "redeem(uint256,address,address)", {"_0": p.uint256, "_1": p.address, "_2": p.address}, p.uint256),
    registry: viewFun("0x7b103999", "registry()", {}, p.address),
    requestDeposit: fun("0x85b77f45", "requestDeposit(uint256,address,address)", {"assets": p.uint256, "controller": p.address, "owner": p.address}, p.uint256),
    requestDepositAndLock: fun("0x297b9783", "requestDepositAndLock(uint256,address,address,uint256)", {"assets": p.uint256, "controller": p.address, "owner": p.address, "lockPeriod": p.uint256}, p.uint256),
    requestRedeem: fun("0x7d41c86e", "requestRedeem(uint256,address,address)", {"shares": p.uint256, "controller": p.address, "owner": p.address}, p.uint256),
    setAssetCap: fun("0x8c36c34c", "setAssetCap(uint256)", {"newAssetCap": p.uint256}, ),
    setOperator: fun("0x558a7297", "setOperator(address,bool)", {"_0": p.address, "_1": p.bool}, p.bool),
    symbol: viewFun("0x95d89b41", "symbol()", {}, p.string),
    totalAssets: viewFun("0x01e1d114", "totalAssets()", {}, p.uint256),
    totalSupply: viewFun("0x18160ddd", "totalSupply()", {}, p.uint256),
    transfer: fun("0xa9059cbb", "transfer(address,uint256)", {"to": p.address, "value": p.uint256}, p.bool),
    transferFrom: fun("0x23b872dd", "transferFrom(address,address,uint256)", {"from": p.address, "to": p.address, "value": p.uint256}, p.bool),
    withdraw: fun("0xb460af94", "withdraw(uint256,address,address)", {"_0": p.uint256, "_1": p.address, "_2": p.address}, p.uint256),
}

export class Contract extends ContractBase {

    ASSET_UNIT() {
        return this.eth_call(functions.ASSET_UNIT, {})
    }

    BPS() {
        return this.eth_call(functions.BPS, {})
    }

    MIN_APY_PROPOSAL_TIME() {
        return this.eth_call(functions.MIN_APY_PROPOSAL_TIME, {})
    }

    allowance(owner: AllowanceParams["owner"], spender: AllowanceParams["spender"]) {
        return this.eth_call(functions.allowance, {owner, spender})
    }

    asset() {
        return this.eth_call(functions.asset, {})
    }

    assetCap() {
        return this.eth_call(functions.assetCap, {})
    }

    assetDecimals() {
        return this.eth_call(functions.assetDecimals, {})
    }

    balanceOf(account: BalanceOfParams["account"]) {
        return this.eth_call(functions.balanceOf, {account})
    }

    claimableDepositRequest(_0: ClaimableDepositRequestParams["_0"], _1: ClaimableDepositRequestParams["_1"]) {
        return this.eth_call(functions.claimableDepositRequest, {_0, _1})
    }

    claimableRedeemRequest(_0: ClaimableRedeemRequestParams["_0"], _1: ClaimableRedeemRequestParams["_1"]) {
        return this.eth_call(functions.claimableRedeemRequest, {_0, _1})
    }

    convertToAssets(shares: ConvertToAssetsParams["shares"]) {
        return this.eth_call(functions.convertToAssets, {shares})
    }

    convertToShares(assets: ConvertToSharesParams["assets"]) {
        return this.eth_call(functions.convertToShares, {assets})
    }

    decimals() {
        return this.eth_call(functions.decimals, {})
    }

    getBaseApy() {
        return this.eth_call(functions.getBaseApy, {})
    }

    getBaseApyConfig() {
        return this.eth_call(functions.getBaseApyConfig, {})
    }

    getDepositRequests(requestIds: GetDepositRequestsParams["requestIds"]) {
        return this.eth_call(functions.getDepositRequests, {requestIds})
    }

    getRedeemRequests(requestIds: GetRedeemRequestsParams["requestIds"]) {
        return this.eth_call(functions.getRedeemRequests, {requestIds})
    }

    isOperator(_0: IsOperatorParams["_0"], _1: IsOperatorParams["_1"]) {
        return this.eth_call(functions.isOperator, {_0, _1})
    }

    maxDeposit(_0: MaxDepositParams["_0"]) {
        return this.eth_call(functions.maxDeposit, {_0})
    }

    maxMint(_0: MaxMintParams["_0"]) {
        return this.eth_call(functions.maxMint, {_0})
    }

    maxRedeem(owner: MaxRedeemParams["owner"]) {
        return this.eth_call(functions.maxRedeem, {owner})
    }

    maxWithdraw(owner: MaxWithdrawParams["owner"]) {
        return this.eth_call(functions.maxWithdraw, {owner})
    }

    name() {
        return this.eth_call(functions.name, {})
    }

    pendingDepositRequest(requestId: PendingDepositRequestParams["requestId"], _1: PendingDepositRequestParams["_1"]) {
        return this.eth_call(functions.pendingDepositRequest, {requestId, _1})
    }

    pendingRedeemRequest(requestId: PendingRedeemRequestParams["requestId"], _1: PendingRedeemRequestParams["_1"]) {
        return this.eth_call(functions.pendingRedeemRequest, {requestId, _1})
    }

    previewDeposit(assets: PreviewDepositParams["assets"]) {
        return this.eth_call(functions.previewDeposit, {assets})
    }

    previewMint(shares: PreviewMintParams["shares"]) {
        return this.eth_call(functions.previewMint, {shares})
    }

    previewRedeem(shares: PreviewRedeemParams["shares"]) {
        return this.eth_call(functions.previewRedeem, {shares})
    }

    previewWithdraw(assets: PreviewWithdrawParams["assets"]) {
        return this.eth_call(functions.previewWithdraw, {assets})
    }

    redeem(_0: RedeemParams["_0"], _1: RedeemParams["_1"], _2: RedeemParams["_2"]) {
        return this.eth_call(functions.redeem, {_0, _1, _2})
    }

    registry() {
        return this.eth_call(functions.registry, {})
    }

    symbol() {
        return this.eth_call(functions.symbol, {})
    }

    totalAssets() {
        return this.eth_call(functions.totalAssets, {})
    }

    totalSupply() {
        return this.eth_call(functions.totalSupply, {})
    }
}

/// Event types
export type ApprovalEventArgs = EParams<typeof events.Approval>
export type BaseApyChangeExecutedEventArgs = EParams<typeof events.BaseApyChangeExecuted>
export type BaseApyChangeProposedEventArgs = EParams<typeof events.BaseApyChangeProposed>
export type DepositEventArgs = EParams<typeof events.Deposit>
export type DepositFulfilledEventArgs = EParams<typeof events.DepositFulfilled>
export type DepositRequestEventArgs = EParams<typeof events.DepositRequest>
export type DepositRequestCanceledEventArgs = EParams<typeof events.DepositRequestCanceled>
export type DepositRequestIdEventArgs = EParams<typeof events.DepositRequestId>
export type OperatorSetEventArgs = EParams<typeof events.OperatorSet>
export type RedeemFulfilledEventArgs = EParams<typeof events.RedeemFulfilled>
export type RedeemRequestEventArgs = EParams<typeof events.RedeemRequest>
export type RedeemRequestCanceledEventArgs = EParams<typeof events.RedeemRequestCanceled>
export type RedeemRequestIdEventArgs = EParams<typeof events.RedeemRequestId>
export type TransferEventArgs = EParams<typeof events.Transfer>
export type WithdrawEventArgs = EParams<typeof events.Withdraw>

/// Function types
export type ASSET_UNITParams = FunctionArguments<typeof functions.ASSET_UNIT>
export type ASSET_UNITReturn = FunctionReturn<typeof functions.ASSET_UNIT>

export type BPSParams = FunctionArguments<typeof functions.BPS>
export type BPSReturn = FunctionReturn<typeof functions.BPS>

export type MIN_APY_PROPOSAL_TIMEParams = FunctionArguments<typeof functions.MIN_APY_PROPOSAL_TIME>
export type MIN_APY_PROPOSAL_TIMEReturn = FunctionReturn<typeof functions.MIN_APY_PROPOSAL_TIME>

export type AllowanceParams = FunctionArguments<typeof functions.allowance>
export type AllowanceReturn = FunctionReturn<typeof functions.allowance>

export type ApproveParams = FunctionArguments<typeof functions.approve>
export type ApproveReturn = FunctionReturn<typeof functions.approve>

export type AssetParams = FunctionArguments<typeof functions.asset>
export type AssetReturn = FunctionReturn<typeof functions.asset>

export type AssetCapParams = FunctionArguments<typeof functions.assetCap>
export type AssetCapReturn = FunctionReturn<typeof functions.assetCap>

export type AssetDecimalsParams = FunctionArguments<typeof functions.assetDecimals>
export type AssetDecimalsReturn = FunctionReturn<typeof functions.assetDecimals>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type CancelDepositRequestParams = FunctionArguments<typeof functions.cancelDepositRequest>
export type CancelDepositRequestReturn = FunctionReturn<typeof functions.cancelDepositRequest>

export type CancelRedeemRequestParams = FunctionArguments<typeof functions.cancelRedeemRequest>
export type CancelRedeemRequestReturn = FunctionReturn<typeof functions.cancelRedeemRequest>

export type ClaimableDepositRequestParams = FunctionArguments<typeof functions.claimableDepositRequest>
export type ClaimableDepositRequestReturn = FunctionReturn<typeof functions.claimableDepositRequest>

export type ClaimableRedeemRequestParams = FunctionArguments<typeof functions.claimableRedeemRequest>
export type ClaimableRedeemRequestReturn = FunctionReturn<typeof functions.claimableRedeemRequest>

export type ConvertToAssetsParams = FunctionArguments<typeof functions.convertToAssets>
export type ConvertToAssetsReturn = FunctionReturn<typeof functions.convertToAssets>

export type ConvertToSharesParams = FunctionArguments<typeof functions.convertToShares>
export type ConvertToSharesReturn = FunctionReturn<typeof functions.convertToShares>

export type DecimalsParams = FunctionArguments<typeof functions.decimals>
export type DecimalsReturn = FunctionReturn<typeof functions.decimals>

export type DepositParams = FunctionArguments<typeof functions.deposit>
export type DepositReturn = FunctionReturn<typeof functions.deposit>

export type ExecuteBaseApyChangeParams = FunctionArguments<typeof functions.executeBaseApyChange>
export type ExecuteBaseApyChangeReturn = FunctionReturn<typeof functions.executeBaseApyChange>

export type FulfillDepositParams = FunctionArguments<typeof functions.fulfillDeposit>
export type FulfillDepositReturn = FunctionReturn<typeof functions.fulfillDeposit>

export type FulfillRedeemsParams = FunctionArguments<typeof functions.fulfillRedeems>
export type FulfillRedeemsReturn = FunctionReturn<typeof functions.fulfillRedeems>

export type GetBaseApyParams = FunctionArguments<typeof functions.getBaseApy>
export type GetBaseApyReturn = FunctionReturn<typeof functions.getBaseApy>

export type GetBaseApyConfigParams = FunctionArguments<typeof functions.getBaseApyConfig>
export type GetBaseApyConfigReturn = FunctionReturn<typeof functions.getBaseApyConfig>

export type GetDepositRequestsParams = FunctionArguments<typeof functions.getDepositRequests>
export type GetDepositRequestsReturn = FunctionReturn<typeof functions.getDepositRequests>

export type GetRedeemRequestsParams = FunctionArguments<typeof functions.getRedeemRequests>
export type GetRedeemRequestsReturn = FunctionReturn<typeof functions.getRedeemRequests>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type IsOperatorParams = FunctionArguments<typeof functions.isOperator>
export type IsOperatorReturn = FunctionReturn<typeof functions.isOperator>

export type MaxDepositParams = FunctionArguments<typeof functions.maxDeposit>
export type MaxDepositReturn = FunctionReturn<typeof functions.maxDeposit>

export type MaxMintParams = FunctionArguments<typeof functions.maxMint>
export type MaxMintReturn = FunctionReturn<typeof functions.maxMint>

export type MaxRedeemParams = FunctionArguments<typeof functions.maxRedeem>
export type MaxRedeemReturn = FunctionReturn<typeof functions.maxRedeem>

export type MaxWithdrawParams = FunctionArguments<typeof functions.maxWithdraw>
export type MaxWithdrawReturn = FunctionReturn<typeof functions.maxWithdraw>

export type MintParams = FunctionArguments<typeof functions.mint>
export type MintReturn = FunctionReturn<typeof functions.mint>

export type NameParams = FunctionArguments<typeof functions.name>
export type NameReturn = FunctionReturn<typeof functions.name>

export type PendingDepositRequestParams = FunctionArguments<typeof functions.pendingDepositRequest>
export type PendingDepositRequestReturn = FunctionReturn<typeof functions.pendingDepositRequest>

export type PendingRedeemRequestParams = FunctionArguments<typeof functions.pendingRedeemRequest>
export type PendingRedeemRequestReturn = FunctionReturn<typeof functions.pendingRedeemRequest>

export type PreviewDepositParams = FunctionArguments<typeof functions.previewDeposit>
export type PreviewDepositReturn = FunctionReturn<typeof functions.previewDeposit>

export type PreviewMintParams = FunctionArguments<typeof functions.previewMint>
export type PreviewMintReturn = FunctionReturn<typeof functions.previewMint>

export type PreviewRedeemParams = FunctionArguments<typeof functions.previewRedeem>
export type PreviewRedeemReturn = FunctionReturn<typeof functions.previewRedeem>

export type PreviewWithdrawParams = FunctionArguments<typeof functions.previewWithdraw>
export type PreviewWithdrawReturn = FunctionReturn<typeof functions.previewWithdraw>

export type ProposeBaseApyChangeParams = FunctionArguments<typeof functions.proposeBaseApyChange>
export type ProposeBaseApyChangeReturn = FunctionReturn<typeof functions.proposeBaseApyChange>

export type RedeemParams = FunctionArguments<typeof functions.redeem>
export type RedeemReturn = FunctionReturn<typeof functions.redeem>

export type RegistryParams = FunctionArguments<typeof functions.registry>
export type RegistryReturn = FunctionReturn<typeof functions.registry>

export type RequestDepositParams = FunctionArguments<typeof functions.requestDeposit>
export type RequestDepositReturn = FunctionReturn<typeof functions.requestDeposit>

export type RequestDepositAndLockParams = FunctionArguments<typeof functions.requestDepositAndLock>
export type RequestDepositAndLockReturn = FunctionReturn<typeof functions.requestDepositAndLock>

export type RequestRedeemParams = FunctionArguments<typeof functions.requestRedeem>
export type RequestRedeemReturn = FunctionReturn<typeof functions.requestRedeem>

export type SetAssetCapParams = FunctionArguments<typeof functions.setAssetCap>
export type SetAssetCapReturn = FunctionReturn<typeof functions.setAssetCap>

export type SetOperatorParams = FunctionArguments<typeof functions.setOperator>
export type SetOperatorReturn = FunctionReturn<typeof functions.setOperator>

export type SymbolParams = FunctionArguments<typeof functions.symbol>
export type SymbolReturn = FunctionReturn<typeof functions.symbol>

export type TotalAssetsParams = FunctionArguments<typeof functions.totalAssets>
export type TotalAssetsReturn = FunctionReturn<typeof functions.totalAssets>

export type TotalSupplyParams = FunctionArguments<typeof functions.totalSupply>
export type TotalSupplyReturn = FunctionReturn<typeof functions.totalSupply>

export type TransferParams = FunctionArguments<typeof functions.transfer>
export type TransferReturn = FunctionReturn<typeof functions.transfer>

export type TransferFromParams = FunctionArguments<typeof functions.transferFrom>
export type TransferFromReturn = FunctionReturn<typeof functions.transferFrom>

export type WithdrawParams = FunctionArguments<typeof functions.withdraw>
export type WithdrawReturn = FunctionReturn<typeof functions.withdraw>

