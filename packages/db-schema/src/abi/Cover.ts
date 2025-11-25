import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    CoverBought: event("0xe2b69afa632923dbb71755db531ac4d82b79662feb2c342c55d80c644a97003f", "CoverBought(uint256,uint256,uint256,uint256)", {"coverId": indexed(p.uint256), "originalCoverId": indexed(p.uint256), "buyerMemberId": indexed(p.uint256), "productId": p.uint256}),
}

export const functions = {
    DEFAULT_MIN_PRICE_RATIO: viewFun("0x3ae28b55", "DEFAULT_MIN_PRICE_RATIO()", {}, p.uint256),
    DOMAIN_SEPARATOR: viewFun("0x3644e515", "DOMAIN_SEPARATOR()", {}, p.bytes32),
    MAX_COMMISSION_RATIO: viewFun("0xdd9bce3f", "MAX_COMMISSION_RATIO()", {}, p.uint256),
    NXM_PER_ALLOCATION_UNIT: viewFun("0x4146f14e", "NXM_PER_ALLOCATION_UNIT()", {}, p.uint256),
    activeCover: viewFun("0x3d1c7197", "activeCover(uint256)", {"assetId": p.uint256}, {"totalActiveCoverInAsset": p.uint192, "lastBucketUpdateId": p.uint64}),
    burnStake: fun("0xa48c282a", "burnStake(uint256,uint256)", {"coverId": p.uint256, "payoutAmountInAsset": p.uint256}, ),
    buyCover: fun("0x7c59cac4", "buyCover((uint256,address,uint24,uint8,uint96,uint32,uint256,uint8,uint16,address,string),(uint256,uint256)[])", {"params": p.struct({"coverId": p.uint256, "owner": p.address, "productId": p.uint24, "coverAsset": p.uint8, "amount": p.uint96, "period": p.uint32, "maxPremiumInAsset": p.uint256, "paymentAsset": p.uint8, "commissionRatio": p.uint16, "commissionDestination": p.address, "ipfsData": p.string}), "poolAllocationRequests": p.array(p.struct({"poolId": p.uint256, "coverAmountInAsset": p.uint256}))}, p.uint256),
    buyCoverWithRi: fun("0xbf32720e", "buyCoverWithRi((uint256,address,uint24,uint8,uint96,uint32,uint256,uint8,uint16,address,string),(uint256,uint256)[],(uint256,uint256,uint256,bytes))", {"params": p.struct({"coverId": p.uint256, "owner": p.address, "productId": p.uint24, "coverAsset": p.uint8, "amount": p.uint96, "period": p.uint32, "maxPremiumInAsset": p.uint256, "paymentAsset": p.uint8, "commissionRatio": p.uint16, "commissionDestination": p.address, "ipfsData": p.string}), "poolAllocationRequests": p.array(p.struct({"poolId": p.uint256, "coverAmountInAsset": p.uint256})), "riRequest": p.struct({"providerId": p.uint256, "amount": p.uint256, "premium": p.uint256, "signature": p.bytes})}, p.uint256),
    changeCoverNFTDescriptor: fun("0x8aaff34a", "changeCoverNFTDescriptor(address)", {"_coverNFTDescriptor": p.address}, ),
    changeStakingNFTDescriptor: fun("0x30dc2a82", "changeStakingNFTDescriptor(address)", {"_stakingNFTDescriptor": p.address}, ),
    claims: viewFun("0xdcc59b6f", "claims()", {}, p.address),
    coverNFT: viewFun("0x42e53fcf", "coverNFT()", {}, p.address),
    coverProducts: viewFun("0x5a43a902", "coverProducts()", {}, p.address),
    executeCoverBuy: fun("0x9e9c4d05", "executeCoverBuy((uint256,address,uint24,uint8,uint96,uint32,uint256,uint8,uint16,address,string),(uint256,uint256)[],address)", {"params": p.struct({"coverId": p.uint256, "owner": p.address, "productId": p.uint24, "coverAsset": p.uint8, "amount": p.uint96, "period": p.uint32, "maxPremiumInAsset": p.uint256, "paymentAsset": p.uint8, "commissionRatio": p.uint16, "commissionDestination": p.address, "ipfsData": p.string}), "poolAllocationRequests": p.array(p.struct({"poolId": p.uint256, "coverAmountInAsset": p.uint256})), "buyer": p.address}, p.uint256),
    expireCover: fun("0xf4136f7f", "expireCover(uint256)", {"coverId": p.uint256}, ),
    getCoverData: viewFun("0x00407d2a", "getCoverData(uint256)", {"coverId": p.uint256}, p.struct({"productId": p.uint24, "coverAsset": p.uint8, "amount": p.uint96, "start": p.uint32, "period": p.uint32, "gracePeriod": p.uint32, "rewardsRatio": p.uint16, "capacityRatio": p.uint16})),
    getCoverDataCount: viewFun("0x0291cdb8", "getCoverDataCount()", {}, p.uint256),
    getCoverDataWithReference: viewFun("0x261cd0e9", "getCoverDataWithReference(uint256)", {"coverId": p.uint256}, {"_0": p.struct({"productId": p.uint24, "coverAsset": p.uint8, "amount": p.uint96, "start": p.uint32, "period": p.uint32, "gracePeriod": p.uint32, "rewardsRatio": p.uint16, "capacityRatio": p.uint16}), "_1": p.struct({"originalCoverId": p.uint32, "latestCoverId": p.uint32})}),
    getCoverDataWithRi: viewFun("0xbf4e3919", "getCoverDataWithRi(uint256)", {"coverId": p.uint256}, {"_0": p.struct({"productId": p.uint24, "coverAsset": p.uint8, "amount": p.uint96, "start": p.uint32, "period": p.uint32, "gracePeriod": p.uint32, "rewardsRatio": p.uint16, "capacityRatio": p.uint16}), "_1": p.struct({"providerId": p.uint24, "amount": p.uint96})}),
    getCoverMetadata: viewFun("0x09f117d7", "getCoverMetadata(uint256)", {"coverId": p.uint256}, p.string),
    getCoverReference: viewFun("0x2a15e644", "getCoverReference(uint256)", {"coverId": p.uint256}, p.struct({"originalCoverId": p.uint32, "latestCoverId": p.uint32})),
    getCoverRi: viewFun("0x94f34a5c", "getCoverRi(uint256)", {"coverId": p.uint256}, p.struct({"providerId": p.uint24, "amount": p.uint96})),
    getDefaultMinPriceRatio: viewFun("0xef072e02", "getDefaultMinPriceRatio()", {}, p.uint256),
    getGlobalCapacityAndPriceRatios: viewFun("0xed258005", "getGlobalCapacityAndPriceRatios()", {}, {"_globalCapacityRatio": p.uint256, "_defaultMinPriceRatio": p.uint256}),
    getGlobalCapacityRatio: viewFun("0x78b4f606", "getGlobalCapacityRatio()", {}, p.uint256),
    getGlobalRewardsRatio: viewFun("0xffb68174", "getGlobalRewardsRatio()", {}, p.uint256),
    getLatestEditCoverData: viewFun("0x323e41ef", "getLatestEditCoverData(uint256)", {"coverId": p.uint256}, p.struct({"productId": p.uint24, "coverAsset": p.uint8, "amount": p.uint96, "start": p.uint32, "period": p.uint32, "gracePeriod": p.uint32, "rewardsRatio": p.uint16, "capacityRatio": p.uint16})),
    getPoolAllocations: viewFun("0x97cf045a", "getPoolAllocations(uint256)", {"coverId": p.uint256}, p.array(p.struct({"poolId": p.uint40, "coverAmountInNXM": p.uint96, "premiumInNXM": p.uint96, "allocationId": p.uint24}))),
    multicall: fun("0xac9650d8", "multicall(bytes[])", {"data": p.array(p.bytes)}, p.array(p.bytes)),
    pool: viewFun("0x16f0115b", "pool()", {}, p.address),
    populateIpfsMetadata: fun("0xc7ea201f", "populateIpfsMetadata(uint256[],string[])", {"coverIds": p.array(p.uint256), "ipfsMetadata": p.array(p.string)}, ),
    recalculateActiveCoverInAsset: fun("0xcccf4d4a", "recalculateActiveCoverInAsset(uint256)", {"coverAsset": p.uint256}, ),
    registry: viewFun("0x7b103999", "registry()", {}, p.address),
    riSigner: viewFun("0x68a1ecb6", "riSigner()", {}, p.address),
    setRiConfig: fun("0xd6504fd7", "setRiConfig(uint256,address)", {"providerId": p.uint256, "premiumDestination": p.address}, ),
    setRiSigner: fun("0x8f1d3004", "setRiSigner(address)", {"_riSigner": p.address}, ),
    stakingNFT: viewFun("0x0ce71e32", "stakingNFT()", {}, p.address),
    stakingPool: viewFun("0x21b0b0cb", "stakingPool(uint256)", {"poolId": p.uint256}, p.address),
    stakingPoolFactory: viewFun("0xa1b8adcb", "stakingPoolFactory()", {}, p.address),
    stakingPoolImplementation: viewFun("0x2aa8195e", "stakingPoolImplementation()", {}, p.address),
    tokenController: viewFun("0xeddd9d82", "tokenController()", {}, p.address),
    totalActiveCoverInAsset: viewFun("0xf480b7b9", "totalActiveCoverInAsset(uint256)", {"assetId": p.uint256}, p.uint256),
    updateTotalActiveCoverAmount: fun("0x78d06995", "updateTotalActiveCoverAmount(uint256)", {"coverAsset": p.uint256}, ),
}

export class Contract extends ContractBase {

    DEFAULT_MIN_PRICE_RATIO() {
        return this.eth_call(functions.DEFAULT_MIN_PRICE_RATIO, {})
    }

    DOMAIN_SEPARATOR() {
        return this.eth_call(functions.DOMAIN_SEPARATOR, {})
    }

    MAX_COMMISSION_RATIO() {
        return this.eth_call(functions.MAX_COMMISSION_RATIO, {})
    }

    NXM_PER_ALLOCATION_UNIT() {
        return this.eth_call(functions.NXM_PER_ALLOCATION_UNIT, {})
    }

    activeCover(assetId: ActiveCoverParams["assetId"]) {
        return this.eth_call(functions.activeCover, {assetId})
    }

    claims() {
        return this.eth_call(functions.claims, {})
    }

    coverNFT() {
        return this.eth_call(functions.coverNFT, {})
    }

    coverProducts() {
        return this.eth_call(functions.coverProducts, {})
    }

    getCoverData(coverId: GetCoverDataParams["coverId"]) {
        return this.eth_call(functions.getCoverData, {coverId})
    }

    getCoverDataCount() {
        return this.eth_call(functions.getCoverDataCount, {})
    }

    getCoverDataWithReference(coverId: GetCoverDataWithReferenceParams["coverId"]) {
        return this.eth_call(functions.getCoverDataWithReference, {coverId})
    }

    getCoverDataWithRi(coverId: GetCoverDataWithRiParams["coverId"]) {
        return this.eth_call(functions.getCoverDataWithRi, {coverId})
    }

    getCoverMetadata(coverId: GetCoverMetadataParams["coverId"]) {
        return this.eth_call(functions.getCoverMetadata, {coverId})
    }

    getCoverReference(coverId: GetCoverReferenceParams["coverId"]) {
        return this.eth_call(functions.getCoverReference, {coverId})
    }

    getCoverRi(coverId: GetCoverRiParams["coverId"]) {
        return this.eth_call(functions.getCoverRi, {coverId})
    }

    getDefaultMinPriceRatio() {
        return this.eth_call(functions.getDefaultMinPriceRatio, {})
    }

    getGlobalCapacityAndPriceRatios() {
        return this.eth_call(functions.getGlobalCapacityAndPriceRatios, {})
    }

    getGlobalCapacityRatio() {
        return this.eth_call(functions.getGlobalCapacityRatio, {})
    }

    getGlobalRewardsRatio() {
        return this.eth_call(functions.getGlobalRewardsRatio, {})
    }

    getLatestEditCoverData(coverId: GetLatestEditCoverDataParams["coverId"]) {
        return this.eth_call(functions.getLatestEditCoverData, {coverId})
    }

    getPoolAllocations(coverId: GetPoolAllocationsParams["coverId"]) {
        return this.eth_call(functions.getPoolAllocations, {coverId})
    }

    pool() {
        return this.eth_call(functions.pool, {})
    }

    registry() {
        return this.eth_call(functions.registry, {})
    }

    riSigner() {
        return this.eth_call(functions.riSigner, {})
    }

    stakingNFT() {
        return this.eth_call(functions.stakingNFT, {})
    }

    stakingPool(poolId: StakingPoolParams["poolId"]) {
        return this.eth_call(functions.stakingPool, {poolId})
    }

    stakingPoolFactory() {
        return this.eth_call(functions.stakingPoolFactory, {})
    }

    stakingPoolImplementation() {
        return this.eth_call(functions.stakingPoolImplementation, {})
    }

    tokenController() {
        return this.eth_call(functions.tokenController, {})
    }

    totalActiveCoverInAsset(assetId: TotalActiveCoverInAssetParams["assetId"]) {
        return this.eth_call(functions.totalActiveCoverInAsset, {assetId})
    }
}

/// Event types
export type CoverBoughtEventArgs = EParams<typeof events.CoverBought>

/// Function types
export type DEFAULT_MIN_PRICE_RATIOParams = FunctionArguments<typeof functions.DEFAULT_MIN_PRICE_RATIO>
export type DEFAULT_MIN_PRICE_RATIOReturn = FunctionReturn<typeof functions.DEFAULT_MIN_PRICE_RATIO>

export type DOMAIN_SEPARATORParams = FunctionArguments<typeof functions.DOMAIN_SEPARATOR>
export type DOMAIN_SEPARATORReturn = FunctionReturn<typeof functions.DOMAIN_SEPARATOR>

export type MAX_COMMISSION_RATIOParams = FunctionArguments<typeof functions.MAX_COMMISSION_RATIO>
export type MAX_COMMISSION_RATIOReturn = FunctionReturn<typeof functions.MAX_COMMISSION_RATIO>

export type NXM_PER_ALLOCATION_UNITParams = FunctionArguments<typeof functions.NXM_PER_ALLOCATION_UNIT>
export type NXM_PER_ALLOCATION_UNITReturn = FunctionReturn<typeof functions.NXM_PER_ALLOCATION_UNIT>

export type ActiveCoverParams = FunctionArguments<typeof functions.activeCover>
export type ActiveCoverReturn = FunctionReturn<typeof functions.activeCover>

export type BurnStakeParams = FunctionArguments<typeof functions.burnStake>
export type BurnStakeReturn = FunctionReturn<typeof functions.burnStake>

export type BuyCoverParams = FunctionArguments<typeof functions.buyCover>
export type BuyCoverReturn = FunctionReturn<typeof functions.buyCover>

export type BuyCoverWithRiParams = FunctionArguments<typeof functions.buyCoverWithRi>
export type BuyCoverWithRiReturn = FunctionReturn<typeof functions.buyCoverWithRi>

export type ChangeCoverNFTDescriptorParams = FunctionArguments<typeof functions.changeCoverNFTDescriptor>
export type ChangeCoverNFTDescriptorReturn = FunctionReturn<typeof functions.changeCoverNFTDescriptor>

export type ChangeStakingNFTDescriptorParams = FunctionArguments<typeof functions.changeStakingNFTDescriptor>
export type ChangeStakingNFTDescriptorReturn = FunctionReturn<typeof functions.changeStakingNFTDescriptor>

export type ClaimsParams = FunctionArguments<typeof functions.claims>
export type ClaimsReturn = FunctionReturn<typeof functions.claims>

export type CoverNFTParams = FunctionArguments<typeof functions.coverNFT>
export type CoverNFTReturn = FunctionReturn<typeof functions.coverNFT>

export type CoverProductsParams = FunctionArguments<typeof functions.coverProducts>
export type CoverProductsReturn = FunctionReturn<typeof functions.coverProducts>

export type ExecuteCoverBuyParams = FunctionArguments<typeof functions.executeCoverBuy>
export type ExecuteCoverBuyReturn = FunctionReturn<typeof functions.executeCoverBuy>

export type ExpireCoverParams = FunctionArguments<typeof functions.expireCover>
export type ExpireCoverReturn = FunctionReturn<typeof functions.expireCover>

export type GetCoverDataParams = FunctionArguments<typeof functions.getCoverData>
export type GetCoverDataReturn = FunctionReturn<typeof functions.getCoverData>

export type GetCoverDataCountParams = FunctionArguments<typeof functions.getCoverDataCount>
export type GetCoverDataCountReturn = FunctionReturn<typeof functions.getCoverDataCount>

export type GetCoverDataWithReferenceParams = FunctionArguments<typeof functions.getCoverDataWithReference>
export type GetCoverDataWithReferenceReturn = FunctionReturn<typeof functions.getCoverDataWithReference>

export type GetCoverDataWithRiParams = FunctionArguments<typeof functions.getCoverDataWithRi>
export type GetCoverDataWithRiReturn = FunctionReturn<typeof functions.getCoverDataWithRi>

export type GetCoverMetadataParams = FunctionArguments<typeof functions.getCoverMetadata>
export type GetCoverMetadataReturn = FunctionReturn<typeof functions.getCoverMetadata>

export type GetCoverReferenceParams = FunctionArguments<typeof functions.getCoverReference>
export type GetCoverReferenceReturn = FunctionReturn<typeof functions.getCoverReference>

export type GetCoverRiParams = FunctionArguments<typeof functions.getCoverRi>
export type GetCoverRiReturn = FunctionReturn<typeof functions.getCoverRi>

export type GetDefaultMinPriceRatioParams = FunctionArguments<typeof functions.getDefaultMinPriceRatio>
export type GetDefaultMinPriceRatioReturn = FunctionReturn<typeof functions.getDefaultMinPriceRatio>

export type GetGlobalCapacityAndPriceRatiosParams = FunctionArguments<typeof functions.getGlobalCapacityAndPriceRatios>
export type GetGlobalCapacityAndPriceRatiosReturn = FunctionReturn<typeof functions.getGlobalCapacityAndPriceRatios>

export type GetGlobalCapacityRatioParams = FunctionArguments<typeof functions.getGlobalCapacityRatio>
export type GetGlobalCapacityRatioReturn = FunctionReturn<typeof functions.getGlobalCapacityRatio>

export type GetGlobalRewardsRatioParams = FunctionArguments<typeof functions.getGlobalRewardsRatio>
export type GetGlobalRewardsRatioReturn = FunctionReturn<typeof functions.getGlobalRewardsRatio>

export type GetLatestEditCoverDataParams = FunctionArguments<typeof functions.getLatestEditCoverData>
export type GetLatestEditCoverDataReturn = FunctionReturn<typeof functions.getLatestEditCoverData>

export type GetPoolAllocationsParams = FunctionArguments<typeof functions.getPoolAllocations>
export type GetPoolAllocationsReturn = FunctionReturn<typeof functions.getPoolAllocations>

export type MulticallParams = FunctionArguments<typeof functions.multicall>
export type MulticallReturn = FunctionReturn<typeof functions.multicall>

export type PoolParams = FunctionArguments<typeof functions.pool>
export type PoolReturn = FunctionReturn<typeof functions.pool>

export type PopulateIpfsMetadataParams = FunctionArguments<typeof functions.populateIpfsMetadata>
export type PopulateIpfsMetadataReturn = FunctionReturn<typeof functions.populateIpfsMetadata>

export type RecalculateActiveCoverInAssetParams = FunctionArguments<typeof functions.recalculateActiveCoverInAsset>
export type RecalculateActiveCoverInAssetReturn = FunctionReturn<typeof functions.recalculateActiveCoverInAsset>

export type RegistryParams = FunctionArguments<typeof functions.registry>
export type RegistryReturn = FunctionReturn<typeof functions.registry>

export type RiSignerParams = FunctionArguments<typeof functions.riSigner>
export type RiSignerReturn = FunctionReturn<typeof functions.riSigner>

export type SetRiConfigParams = FunctionArguments<typeof functions.setRiConfig>
export type SetRiConfigReturn = FunctionReturn<typeof functions.setRiConfig>

export type SetRiSignerParams = FunctionArguments<typeof functions.setRiSigner>
export type SetRiSignerReturn = FunctionReturn<typeof functions.setRiSigner>

export type StakingNFTParams = FunctionArguments<typeof functions.stakingNFT>
export type StakingNFTReturn = FunctionReturn<typeof functions.stakingNFT>

export type StakingPoolParams = FunctionArguments<typeof functions.stakingPool>
export type StakingPoolReturn = FunctionReturn<typeof functions.stakingPool>

export type StakingPoolFactoryParams = FunctionArguments<typeof functions.stakingPoolFactory>
export type StakingPoolFactoryReturn = FunctionReturn<typeof functions.stakingPoolFactory>

export type StakingPoolImplementationParams = FunctionArguments<typeof functions.stakingPoolImplementation>
export type StakingPoolImplementationReturn = FunctionReturn<typeof functions.stakingPoolImplementation>

export type TokenControllerParams = FunctionArguments<typeof functions.tokenController>
export type TokenControllerReturn = FunctionReturn<typeof functions.tokenController>

export type TotalActiveCoverInAssetParams = FunctionArguments<typeof functions.totalActiveCoverInAsset>
export type TotalActiveCoverInAssetReturn = FunctionReturn<typeof functions.totalActiveCoverInAsset>

export type UpdateTotalActiveCoverAmountParams = FunctionArguments<typeof functions.updateTotalActiveCoverAmount>
export type UpdateTotalActiveCoverAmountReturn = FunctionReturn<typeof functions.updateTotalActiveCoverAmount>

