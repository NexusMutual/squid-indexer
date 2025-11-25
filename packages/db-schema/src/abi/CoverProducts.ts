import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    ProductSet: event("0xe757b28b33896bc8918816faf8078f9ec27409af77ad80806d7196478897149b", "ProductSet(uint256)", {"id": p.uint256}),
    ProductTypeSet: event("0xd88b8450ea1e752935616a2e6cb78fbb30e68c5fb6859a9edcb110a95e5f882a", "ProductTypeSet(uint256)", {"id": p.uint256}),
}

export const functions = {
    changeDependentContractAddress: fun("0x0ea9c984", "changeDependentContractAddress()", {}, ),
    changeMasterAddress: fun("0xd46655f4", "changeMasterAddress(address)", {"masterAddress": p.address}, ),
    getAllowedPools: viewFun("0x6739d3d5", "getAllowedPools(uint256)", {"productId": p.uint256}, p.array(p.uint256)),
    getAllowedPoolsCount: viewFun("0xfd32763e", "getAllowedPoolsCount(uint256)", {"productId": p.uint256}, p.uint256),
    getCapacityReductionRatios: viewFun("0xfb9523a3", "getCapacityReductionRatios(uint256[])", {"productIds": p.array(p.uint256)}, p.array(p.uint256)),
    getInitialPrices: viewFun("0x168d3dc4", "getInitialPrices(uint256[])", {"productIds": p.array(p.uint256)}, p.array(p.uint256)),
    getLatestProductMetadata: viewFun("0x19cc31c4", "getLatestProductMetadata(uint256)", {"productId": p.uint256}, p.struct({"ipfsHash": p.string, "timestamp": p.uint256})),
    getLatestProductTypeMetadata: viewFun("0x14073e32", "getLatestProductTypeMetadata(uint256)", {"productTypeId": p.uint256}, p.struct({"ipfsHash": p.string, "timestamp": p.uint256})),
    getMinPrices: viewFun("0x5c268eeb", "getMinPrices(uint256[])", {"productIds": p.array(p.uint256)}, p.array(p.uint256)),
    getProduct: viewFun("0xb9db15b4", "getProduct(uint256)", {"productId": p.uint256}, p.struct({"productType": p.uint16, "minPrice": p.uint16, "__gap": p.uint144, "coverAssets": p.uint32, "initialPriceRatio": p.uint16, "capacityReductionRatio": p.uint16, "isDeprecated": p.bool, "useFixedPrice": p.bool})),
    getProductCount: viewFun("0x4a348da9", "getProductCount()", {}, p.uint256),
    getProductMetadata: viewFun("0x9d26bd1c", "getProductMetadata(uint256)", {"productId": p.uint256}, p.array(p.struct({"ipfsHash": p.string, "timestamp": p.uint256}))),
    getProductName: viewFun("0x9e62e795", "getProductName(uint256)", {"productId": p.uint256}, p.string),
    getProductType: viewFun("0xff10ca34", "getProductType(uint256)", {"productTypeId": p.uint256}, p.struct({"claimMethod": p.uint8, "gracePeriod": p.uint32, "assessmentCooldownPeriod": p.uint32, "payoutRedemptionPeriod": p.uint32})),
    getProductTypeCount: viewFun("0xc6a36630", "getProductTypeCount()", {}, p.uint256),
    getProductTypeMetadata: viewFun("0xd1f5e21f", "getProductTypeMetadata(uint256)", {"productTypeId": p.uint256}, p.array(p.struct({"ipfsHash": p.string, "timestamp": p.uint256}))),
    getProductTypeName: viewFun("0xbfe94713", "getProductTypeName(uint256)", {"productTypeId": p.uint256}, p.string),
    getProductTypeOf: viewFun("0x949e5c79", "getProductTypeOf(uint256)", {"productId": p.uint256}, p.struct({"claimMethod": p.uint8, "gracePeriod": p.uint32, "assessmentCooldownPeriod": p.uint32, "payoutRedemptionPeriod": p.uint32})),
    getProductTypes: viewFun("0x16076e76", "getProductTypes()", {}, p.array(p.struct({"claimMethod": p.uint8, "gracePeriod": p.uint32, "assessmentCooldownPeriod": p.uint32, "payoutRedemptionPeriod": p.uint32}))),
    getProductWithType: viewFun("0xb6c700c0", "getProductWithType(uint256)", {"productId": p.uint256}, {"product": p.struct({"productType": p.uint16, "minPrice": p.uint16, "__gap": p.uint144, "coverAssets": p.uint32, "initialPriceRatio": p.uint16, "capacityReductionRatio": p.uint16, "isDeprecated": p.bool, "useFixedPrice": p.bool}), "productType": p.struct({"claimMethod": p.uint8, "gracePeriod": p.uint32, "assessmentCooldownPeriod": p.uint32, "payoutRedemptionPeriod": p.uint32})}),
    getProducts: viewFun("0xc29b2f20", "getProducts()", {}, p.array(p.struct({"productType": p.uint16, "minPrice": p.uint16, "__gap": p.uint144, "coverAssets": p.uint32, "initialPriceRatio": p.uint16, "capacityReductionRatio": p.uint16, "isDeprecated": p.bool, "useFixedPrice": p.bool}))),
    internalContracts: viewFun("0xeb962360", "internalContracts(uint256)", {"_0": p.uint256}, p.address),
    isPoolAllowed: viewFun("0x2c328aa6", "isPoolAllowed(uint256,uint256)", {"productId": p.uint256, "poolId": p.uint256}, p.bool),
    master: viewFun("0xee97f7f3", "master()", {}, p.address),
    multicall: fun("0xac9650d8", "multicall(bytes[])", {"data": p.array(p.bytes)}, p.array(p.bytes)),
    prepareStakingProductsParams: viewFun("0x94e5f369", "prepareStakingProductsParams((uint256,uint8,uint96,uint96)[])", {"params": p.array(p.struct({"productId": p.uint256, "weight": p.uint8, "initialPrice": p.uint96, "targetPrice": p.uint96}))}, p.array(p.struct({"productId": p.uint256, "weight": p.uint8, "initialPrice": p.uint96, "targetPrice": p.uint96}))),
    requirePoolIsAllowed: viewFun("0xd4179cbd", "requirePoolIsAllowed(uint256[],uint256)", {"productIds": p.array(p.uint256), "poolId": p.uint256}, ),
    setProductTypes: fun("0xe5aa3aff", "setProductTypes((string,uint256,string,(uint8,uint32,uint32,uint32))[])", {"productTypeParams": p.array(p.struct({"productTypeName": p.string, "productTypeId": p.uint256, "ipfsMetadata": p.string, "productType": p.struct({"claimMethod": p.uint8, "gracePeriod": p.uint32, "assessmentCooldownPeriod": p.uint32, "payoutRedemptionPeriod": p.uint32})}))}, ),
    setProductTypesMetadata: fun("0x6bcd0d0a", "setProductTypesMetadata(uint256[],string[])", {"productTypeIds": p.array(p.uint256), "ipfsMetadata": p.array(p.string)}, ),
    setProducts: fun("0x3392473a", "setProducts((string,uint256,string,(uint16,uint16,uint144,uint32,uint16,uint16,bool,bool),uint256[])[])", {"productParams": p.array(p.struct({"productName": p.string, "productId": p.uint256, "ipfsMetadata": p.string, "product": p.struct({"productType": p.uint16, "minPrice": p.uint16, "__gap": p.uint144, "coverAssets": p.uint32, "initialPriceRatio": p.uint16, "capacityReductionRatio": p.uint16, "isDeprecated": p.bool, "useFixedPrice": p.bool}), "allowedPools": p.array(p.uint256)}))}, ),
    setProductsMetadata: fun("0x7f0f36e3", "setProductsMetadata(uint256[],string[])", {"productIds": p.array(p.uint256), "ipfsMetadata": p.array(p.string)}, ),
}

export class Contract extends ContractBase {

    getAllowedPools(productId: GetAllowedPoolsParams["productId"]) {
        return this.eth_call(functions.getAllowedPools, {productId})
    }

    getAllowedPoolsCount(productId: GetAllowedPoolsCountParams["productId"]) {
        return this.eth_call(functions.getAllowedPoolsCount, {productId})
    }

    getCapacityReductionRatios(productIds: GetCapacityReductionRatiosParams["productIds"]) {
        return this.eth_call(functions.getCapacityReductionRatios, {productIds})
    }

    getInitialPrices(productIds: GetInitialPricesParams["productIds"]) {
        return this.eth_call(functions.getInitialPrices, {productIds})
    }

    getLatestProductMetadata(productId: GetLatestProductMetadataParams["productId"]) {
        return this.eth_call(functions.getLatestProductMetadata, {productId})
    }

    getLatestProductTypeMetadata(productTypeId: GetLatestProductTypeMetadataParams["productTypeId"]) {
        return this.eth_call(functions.getLatestProductTypeMetadata, {productTypeId})
    }

    getMinPrices(productIds: GetMinPricesParams["productIds"]) {
        return this.eth_call(functions.getMinPrices, {productIds})
    }

    getProduct(productId: GetProductParams["productId"]) {
        return this.eth_call(functions.getProduct, {productId})
    }

    getProductCount() {
        return this.eth_call(functions.getProductCount, {})
    }

    getProductMetadata(productId: GetProductMetadataParams["productId"]) {
        return this.eth_call(functions.getProductMetadata, {productId})
    }

    getProductName(productId: GetProductNameParams["productId"]) {
        return this.eth_call(functions.getProductName, {productId})
    }

    getProductType(productTypeId: GetProductTypeParams["productTypeId"]) {
        return this.eth_call(functions.getProductType, {productTypeId})
    }

    getProductTypeCount() {
        return this.eth_call(functions.getProductTypeCount, {})
    }

    getProductTypeMetadata(productTypeId: GetProductTypeMetadataParams["productTypeId"]) {
        return this.eth_call(functions.getProductTypeMetadata, {productTypeId})
    }

    getProductTypeName(productTypeId: GetProductTypeNameParams["productTypeId"]) {
        return this.eth_call(functions.getProductTypeName, {productTypeId})
    }

    getProductTypeOf(productId: GetProductTypeOfParams["productId"]) {
        return this.eth_call(functions.getProductTypeOf, {productId})
    }

    getProductTypes() {
        return this.eth_call(functions.getProductTypes, {})
    }

    getProductWithType(productId: GetProductWithTypeParams["productId"]) {
        return this.eth_call(functions.getProductWithType, {productId})
    }

    getProducts() {
        return this.eth_call(functions.getProducts, {})
    }

    internalContracts(_0: InternalContractsParams["_0"]) {
        return this.eth_call(functions.internalContracts, {_0})
    }

    isPoolAllowed(productId: IsPoolAllowedParams["productId"], poolId: IsPoolAllowedParams["poolId"]) {
        return this.eth_call(functions.isPoolAllowed, {productId, poolId})
    }

    master() {
        return this.eth_call(functions.master, {})
    }

    prepareStakingProductsParams(params: PrepareStakingProductsParamsParams["params"]) {
        return this.eth_call(functions.prepareStakingProductsParams, {params})
    }
}

/// Event types
export type ProductSetEventArgs = EParams<typeof events.ProductSet>
export type ProductTypeSetEventArgs = EParams<typeof events.ProductTypeSet>

/// Function types
export type ChangeDependentContractAddressParams = FunctionArguments<typeof functions.changeDependentContractAddress>
export type ChangeDependentContractAddressReturn = FunctionReturn<typeof functions.changeDependentContractAddress>

export type ChangeMasterAddressParams = FunctionArguments<typeof functions.changeMasterAddress>
export type ChangeMasterAddressReturn = FunctionReturn<typeof functions.changeMasterAddress>

export type GetAllowedPoolsParams = FunctionArguments<typeof functions.getAllowedPools>
export type GetAllowedPoolsReturn = FunctionReturn<typeof functions.getAllowedPools>

export type GetAllowedPoolsCountParams = FunctionArguments<typeof functions.getAllowedPoolsCount>
export type GetAllowedPoolsCountReturn = FunctionReturn<typeof functions.getAllowedPoolsCount>

export type GetCapacityReductionRatiosParams = FunctionArguments<typeof functions.getCapacityReductionRatios>
export type GetCapacityReductionRatiosReturn = FunctionReturn<typeof functions.getCapacityReductionRatios>

export type GetInitialPricesParams = FunctionArguments<typeof functions.getInitialPrices>
export type GetInitialPricesReturn = FunctionReturn<typeof functions.getInitialPrices>

export type GetLatestProductMetadataParams = FunctionArguments<typeof functions.getLatestProductMetadata>
export type GetLatestProductMetadataReturn = FunctionReturn<typeof functions.getLatestProductMetadata>

export type GetLatestProductTypeMetadataParams = FunctionArguments<typeof functions.getLatestProductTypeMetadata>
export type GetLatestProductTypeMetadataReturn = FunctionReturn<typeof functions.getLatestProductTypeMetadata>

export type GetMinPricesParams = FunctionArguments<typeof functions.getMinPrices>
export type GetMinPricesReturn = FunctionReturn<typeof functions.getMinPrices>

export type GetProductParams = FunctionArguments<typeof functions.getProduct>
export type GetProductReturn = FunctionReturn<typeof functions.getProduct>

export type GetProductCountParams = FunctionArguments<typeof functions.getProductCount>
export type GetProductCountReturn = FunctionReturn<typeof functions.getProductCount>

export type GetProductMetadataParams = FunctionArguments<typeof functions.getProductMetadata>
export type GetProductMetadataReturn = FunctionReturn<typeof functions.getProductMetadata>

export type GetProductNameParams = FunctionArguments<typeof functions.getProductName>
export type GetProductNameReturn = FunctionReturn<typeof functions.getProductName>

export type GetProductTypeParams = FunctionArguments<typeof functions.getProductType>
export type GetProductTypeReturn = FunctionReturn<typeof functions.getProductType>

export type GetProductTypeCountParams = FunctionArguments<typeof functions.getProductTypeCount>
export type GetProductTypeCountReturn = FunctionReturn<typeof functions.getProductTypeCount>

export type GetProductTypeMetadataParams = FunctionArguments<typeof functions.getProductTypeMetadata>
export type GetProductTypeMetadataReturn = FunctionReturn<typeof functions.getProductTypeMetadata>

export type GetProductTypeNameParams = FunctionArguments<typeof functions.getProductTypeName>
export type GetProductTypeNameReturn = FunctionReturn<typeof functions.getProductTypeName>

export type GetProductTypeOfParams = FunctionArguments<typeof functions.getProductTypeOf>
export type GetProductTypeOfReturn = FunctionReturn<typeof functions.getProductTypeOf>

export type GetProductTypesParams = FunctionArguments<typeof functions.getProductTypes>
export type GetProductTypesReturn = FunctionReturn<typeof functions.getProductTypes>

export type GetProductWithTypeParams = FunctionArguments<typeof functions.getProductWithType>
export type GetProductWithTypeReturn = FunctionReturn<typeof functions.getProductWithType>

export type GetProductsParams = FunctionArguments<typeof functions.getProducts>
export type GetProductsReturn = FunctionReturn<typeof functions.getProducts>

export type InternalContractsParams = FunctionArguments<typeof functions.internalContracts>
export type InternalContractsReturn = FunctionReturn<typeof functions.internalContracts>

export type IsPoolAllowedParams = FunctionArguments<typeof functions.isPoolAllowed>
export type IsPoolAllowedReturn = FunctionReturn<typeof functions.isPoolAllowed>

export type MasterParams = FunctionArguments<typeof functions.master>
export type MasterReturn = FunctionReturn<typeof functions.master>

export type MulticallParams = FunctionArguments<typeof functions.multicall>
export type MulticallReturn = FunctionReturn<typeof functions.multicall>

export type PrepareStakingProductsParamsParams = FunctionArguments<typeof functions.prepareStakingProductsParams>
export type PrepareStakingProductsParamsReturn = FunctionReturn<typeof functions.prepareStakingProductsParams>

export type RequirePoolIsAllowedParams = FunctionArguments<typeof functions.requirePoolIsAllowed>
export type RequirePoolIsAllowedReturn = FunctionReturn<typeof functions.requirePoolIsAllowed>

export type SetProductTypesParams = FunctionArguments<typeof functions.setProductTypes>
export type SetProductTypesReturn = FunctionReturn<typeof functions.setProductTypes>

export type SetProductTypesMetadataParams = FunctionArguments<typeof functions.setProductTypesMetadata>
export type SetProductTypesMetadataReturn = FunctionReturn<typeof functions.setProductTypesMetadata>

export type SetProductsParams = FunctionArguments<typeof functions.setProducts>
export type SetProductsReturn = FunctionReturn<typeof functions.setProducts>

export type SetProductsMetadataParams = FunctionArguments<typeof functions.setProductsMetadata>
export type SetProductsMetadataReturn = FunctionReturn<typeof functions.setProductsMetadata>

