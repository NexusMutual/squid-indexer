import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    AdvisoryBoardMemberSwapped: event("0x323f65051329fb69b05d664d7b6cf1ef4da975bcde1cacb41dc7b4c30d169162", "AdvisoryBoardMemberSwapped(uint256,uint256,uint256)", {"seat": indexed(p.uint256), "from": indexed(p.uint256), "to": indexed(p.uint256)}),
    ContractAdded: event("0xb08a062b3f46f2a16b4eb358d710feeb6605b8f593a3f6c049b403a9718cc21e", "ContractAdded(uint256,address,bool)", {"index": indexed(p.uint256), "contractAddress": indexed(p.address), "isProxy": p.bool}),
    ContractDeployed: event("0xd274d16612c69f430bc382e211c9223ab05c6e67d054e0db95d6f9345069613d", "ContractDeployed(uint256,address,address)", {"index": indexed(p.uint256), "proxy": indexed(p.address), "implementation": p.address}),
    ContractRemoved: event("0x2bc7ad94ce71c4796c6aaf63a5b30e6ec43c9dbb1413a9f4c371883fec2c42f0", "ContractRemoved(uint256,address,bool)", {"index": indexed(p.uint256), "contractAddress": indexed(p.address), "isProxy": p.bool}),
    ContractUpgraded: event("0xdc69b57038334451ee12fd1742228917cea7f40dbd33cda5162e7e5754acee1c", "ContractUpgraded(uint256,address,address)", {"index": indexed(p.uint256), "proxy": indexed(p.address), "implementation": p.address}),
    EmergencyAdminSet: event("0x802c08b4ca88b6fe4c53bf09774a077f3d64433ae8add328f760b3cf24e93f72", "EmergencyAdminSet(address,bool)", {"emergencyAdmin": indexed(p.address), "enabled": p.bool}),
    MembershipChanged: event("0xe3d4a8a4369de4e06b90e384833a7a222c17b89ddd2494d8dce719f987b58a9a", "MembershipChanged(uint256,address,address)", {"memberId": indexed(p.uint256), "previous": indexed(p.address), "current": indexed(p.address)}),
    PauseConfigConfirmed: event("0xfabb1628a5e721d26e5f52beeb4de2874077357febfd0022fd91ea72e2bb614c", "PauseConfigConfirmed(uint256,address)", {"config": p.uint256, "confirmer": indexed(p.address)}),
    PauseConfigProposed: event("0x069657877ee7d0dc64b825ce0f4969f083186c5d344b0997e72c52270c25df6a", "PauseConfigProposed(uint256,address)", {"config": p.uint256, "proposer": indexed(p.address)}),
}

export const functions = {
    ADVISORY_BOARD_SEATS: viewFun("0xa3acbb41", "ADVISORY_BOARD_SEATS()", {}, p.uint256),
    DOMAIN_SEPARATOR: viewFun("0x3644e515", "DOMAIN_SEPARATOR()", {}, p.bytes32),
    JOIN_FEE: viewFun("0xc0b226dc", "JOIN_FEE()", {}, p.uint256),
    addContract: fun("0xbb7f7018", "addContract(uint256,address,bool)", {"index": p.uint256, "contractAddress": p.address, "isProxy": p.bool}, ),
    confirmPauseConfig: fun("0x37f33848", "confirmPauseConfig(uint256)", {"config": p.uint256}, ),
    deployContract: fun("0x3f3ff4fb", "deployContract(uint256,bytes32,address)", {"index": p.uint256, "salt": p.bytes32, "implementation": p.address}, ),
    getAdvisoryBoardSeat: viewFun("0x15376e38", "getAdvisoryBoardSeat(address)", {"member": p.address}, p.uint256),
    getContractAddressByIndex: viewFun("0x8526a536", "getContractAddressByIndex(uint256)", {"index": p.uint256}, p.address),
    getContractIndexByAddress: viewFun("0xadd553ea", "getContractIndexByAddress(address)", {"contractAddress": p.address}, p.uint256),
    getContracts: viewFun("0xf4e00532", "getContracts(uint256[])", {"indexes": p.array(p.uint256)}, p.array(p.struct({"addr": p.address, "isProxy": p.bool}))),
    getKycAuthAddress: viewFun("0x66ccb385", "getKycAuthAddress()", {}, p.address),
    getLastMemberId: viewFun("0x14431d41", "getLastMemberId()", {}, p.uint256),
    getMemberAddress: viewFun("0x9029444a", "getMemberAddress(uint256)", {"memberId": p.uint256}, p.address),
    getMemberAddressBySeat: viewFun("0xf0d094a5", "getMemberAddressBySeat(uint256)", {"seat": p.uint256}, p.address),
    getMemberCount: viewFun("0x997072f7", "getMemberCount()", {}, p.uint256),
    getMemberId: viewFun("0xc269014b", "getMemberId(address)", {"member": p.address}, p.uint256),
    getMemberIdBySeat: viewFun("0xf97a83a0", "getMemberIdBySeat(uint256)", {"seat": p.uint256}, p.uint256),
    getPauseConfig: viewFun("0x5c72c392", "getPauseConfig()", {}, p.uint256),
    getSystemPause: viewFun("0x70c6dd32", "getSystemPause()", {}, p.struct({"config": p.uint48, "proposedConfig": p.uint48, "proposer": p.address})),
    isAdvisoryBoardMember: viewFun("0x2246488d", "isAdvisoryBoardMember(address)", {"member": p.address}, p.bool),
    isAdvisoryBoardMemberById: viewFun("0xb7f0dc25", "isAdvisoryBoardMemberById(uint256)", {"memberId": p.uint256}, p.bool),
    isEmergencyAdmin: viewFun("0x2500f2b6", "isEmergencyAdmin(address)", {"_0": p.address}, p.bool),
    isMember: viewFun("0xa230c524", "isMember(address)", {"member": p.address}, p.bool),
    isPaused: viewFun("0xbdf2a43c", "isPaused(uint256)", {"mask": p.uint256}, p.bool),
    isProxyContract: viewFun("0xbb5b8b0a", "isProxyContract(uint256)", {"index": p.uint256}, p.bool),
    isValidContractIndex: viewFun("0xba5672e7", "isValidContractIndex(uint256)", {"index": p.uint256}, p.bool),
    join: fun("0xd8d52713", "join(address,bytes)", {"member": p.address, "signature": p.bytes}, ),
    leave: fun("0xd66d9e19", "leave()", {}, ),
    master: viewFun("0xee97f7f3", "master()", {}, p.address),
    migrate: fun("0xe0498d67", "migrate(address,address,address,address,address,bytes32,bytes32,bytes32,bytes32,bytes32)", {"governorImplementation": p.address, "coverNFT": p.address, "stakingNFT": p.address, "stakingPoolFactory": p.address, "token": p.address, "governorSalt": p.bytes32, "poolSalt": p.bytes32, "swapOperatorSalt": p.bytes32, "assessmentSalt": p.bytes32, "claimsSalt": p.bytes32}, ),
    migrateAdvisoryBoardMembers: fun("0xb323568b", "migrateAdvisoryBoardMembers(address[])", {"abMembers": p.array(p.address)}, ),
    migrateMembers: fun("0x511eb72a", "migrateMembers(address[])", {"membersToMigrate": p.array(p.address)}, ),
    proposePauseConfig: fun("0xde911330", "proposePauseConfig(uint256)", {"config": p.uint256}, ),
    removeContract: fun("0x7cca3b06", "removeContract(uint256)", {"index": p.uint256}, ),
    setEmergencyAdmin: fun("0x4d0503d4", "setEmergencyAdmin(address,bool)", {"_emergencyAdmin": p.address, "enabled": p.bool}, ),
    setKycAuthAddress: fun("0x549a65f4", "setKycAuthAddress(address)", {"_kycAuthAddress": p.address}, ),
    swapAdvisoryBoardMember: fun("0xe333cc85", "swapAdvisoryBoardMember(uint256,uint256)", {"from": p.uint256, "to": p.uint256}, ),
    switchFor: fun("0x8590fc62", "switchFor(address,address)", {"from": p.address, "to": p.address}, ),
    switchTo: fun("0x3a85a2df", "switchTo(address)", {"to": p.address}, ),
    upgradeContract: fun("0x549d776a", "upgradeContract(uint256,address)", {"index": p.uint256, "implementation": p.address}, ),
}

export class Contract extends ContractBase {

    ADVISORY_BOARD_SEATS() {
        return this.eth_call(functions.ADVISORY_BOARD_SEATS, {})
    }

    DOMAIN_SEPARATOR() {
        return this.eth_call(functions.DOMAIN_SEPARATOR, {})
    }

    JOIN_FEE() {
        return this.eth_call(functions.JOIN_FEE, {})
    }

    getAdvisoryBoardSeat(member: GetAdvisoryBoardSeatParams["member"]) {
        return this.eth_call(functions.getAdvisoryBoardSeat, {member})
    }

    getContractAddressByIndex(index: GetContractAddressByIndexParams["index"]) {
        return this.eth_call(functions.getContractAddressByIndex, {index})
    }

    getContractIndexByAddress(contractAddress: GetContractIndexByAddressParams["contractAddress"]) {
        return this.eth_call(functions.getContractIndexByAddress, {contractAddress})
    }

    getContracts(indexes: GetContractsParams["indexes"]) {
        return this.eth_call(functions.getContracts, {indexes})
    }

    getKycAuthAddress() {
        return this.eth_call(functions.getKycAuthAddress, {})
    }

    getLastMemberId() {
        return this.eth_call(functions.getLastMemberId, {})
    }

    getMemberAddress(memberId: GetMemberAddressParams["memberId"]) {
        return this.eth_call(functions.getMemberAddress, {memberId})
    }

    getMemberAddressBySeat(seat: GetMemberAddressBySeatParams["seat"]) {
        return this.eth_call(functions.getMemberAddressBySeat, {seat})
    }

    getMemberCount() {
        return this.eth_call(functions.getMemberCount, {})
    }

    getMemberId(member: GetMemberIdParams["member"]) {
        return this.eth_call(functions.getMemberId, {member})
    }

    getMemberIdBySeat(seat: GetMemberIdBySeatParams["seat"]) {
        return this.eth_call(functions.getMemberIdBySeat, {seat})
    }

    getPauseConfig() {
        return this.eth_call(functions.getPauseConfig, {})
    }

    getSystemPause() {
        return this.eth_call(functions.getSystemPause, {})
    }

    isAdvisoryBoardMember(member: IsAdvisoryBoardMemberParams["member"]) {
        return this.eth_call(functions.isAdvisoryBoardMember, {member})
    }

    isAdvisoryBoardMemberById(memberId: IsAdvisoryBoardMemberByIdParams["memberId"]) {
        return this.eth_call(functions.isAdvisoryBoardMemberById, {memberId})
    }

    isEmergencyAdmin(_0: IsEmergencyAdminParams["_0"]) {
        return this.eth_call(functions.isEmergencyAdmin, {_0})
    }

    isMember(member: IsMemberParams["member"]) {
        return this.eth_call(functions.isMember, {member})
    }

    isPaused(mask: IsPausedParams["mask"]) {
        return this.eth_call(functions.isPaused, {mask})
    }

    isProxyContract(index: IsProxyContractParams["index"]) {
        return this.eth_call(functions.isProxyContract, {index})
    }

    isValidContractIndex(index: IsValidContractIndexParams["index"]) {
        return this.eth_call(functions.isValidContractIndex, {index})
    }

    master() {
        return this.eth_call(functions.master, {})
    }
}

/// Event types
export type AdvisoryBoardMemberSwappedEventArgs = EParams<typeof events.AdvisoryBoardMemberSwapped>
export type ContractAddedEventArgs = EParams<typeof events.ContractAdded>
export type ContractDeployedEventArgs = EParams<typeof events.ContractDeployed>
export type ContractRemovedEventArgs = EParams<typeof events.ContractRemoved>
export type ContractUpgradedEventArgs = EParams<typeof events.ContractUpgraded>
export type EmergencyAdminSetEventArgs = EParams<typeof events.EmergencyAdminSet>
export type MembershipChangedEventArgs = EParams<typeof events.MembershipChanged>
export type PauseConfigConfirmedEventArgs = EParams<typeof events.PauseConfigConfirmed>
export type PauseConfigProposedEventArgs = EParams<typeof events.PauseConfigProposed>

/// Function types
export type ADVISORY_BOARD_SEATSParams = FunctionArguments<typeof functions.ADVISORY_BOARD_SEATS>
export type ADVISORY_BOARD_SEATSReturn = FunctionReturn<typeof functions.ADVISORY_BOARD_SEATS>

export type DOMAIN_SEPARATORParams = FunctionArguments<typeof functions.DOMAIN_SEPARATOR>
export type DOMAIN_SEPARATORReturn = FunctionReturn<typeof functions.DOMAIN_SEPARATOR>

export type JOIN_FEEParams = FunctionArguments<typeof functions.JOIN_FEE>
export type JOIN_FEEReturn = FunctionReturn<typeof functions.JOIN_FEE>

export type AddContractParams = FunctionArguments<typeof functions.addContract>
export type AddContractReturn = FunctionReturn<typeof functions.addContract>

export type ConfirmPauseConfigParams = FunctionArguments<typeof functions.confirmPauseConfig>
export type ConfirmPauseConfigReturn = FunctionReturn<typeof functions.confirmPauseConfig>

export type DeployContractParams = FunctionArguments<typeof functions.deployContract>
export type DeployContractReturn = FunctionReturn<typeof functions.deployContract>

export type GetAdvisoryBoardSeatParams = FunctionArguments<typeof functions.getAdvisoryBoardSeat>
export type GetAdvisoryBoardSeatReturn = FunctionReturn<typeof functions.getAdvisoryBoardSeat>

export type GetContractAddressByIndexParams = FunctionArguments<typeof functions.getContractAddressByIndex>
export type GetContractAddressByIndexReturn = FunctionReturn<typeof functions.getContractAddressByIndex>

export type GetContractIndexByAddressParams = FunctionArguments<typeof functions.getContractIndexByAddress>
export type GetContractIndexByAddressReturn = FunctionReturn<typeof functions.getContractIndexByAddress>

export type GetContractsParams = FunctionArguments<typeof functions.getContracts>
export type GetContractsReturn = FunctionReturn<typeof functions.getContracts>

export type GetKycAuthAddressParams = FunctionArguments<typeof functions.getKycAuthAddress>
export type GetKycAuthAddressReturn = FunctionReturn<typeof functions.getKycAuthAddress>

export type GetLastMemberIdParams = FunctionArguments<typeof functions.getLastMemberId>
export type GetLastMemberIdReturn = FunctionReturn<typeof functions.getLastMemberId>

export type GetMemberAddressParams = FunctionArguments<typeof functions.getMemberAddress>
export type GetMemberAddressReturn = FunctionReturn<typeof functions.getMemberAddress>

export type GetMemberAddressBySeatParams = FunctionArguments<typeof functions.getMemberAddressBySeat>
export type GetMemberAddressBySeatReturn = FunctionReturn<typeof functions.getMemberAddressBySeat>

export type GetMemberCountParams = FunctionArguments<typeof functions.getMemberCount>
export type GetMemberCountReturn = FunctionReturn<typeof functions.getMemberCount>

export type GetMemberIdParams = FunctionArguments<typeof functions.getMemberId>
export type GetMemberIdReturn = FunctionReturn<typeof functions.getMemberId>

export type GetMemberIdBySeatParams = FunctionArguments<typeof functions.getMemberIdBySeat>
export type GetMemberIdBySeatReturn = FunctionReturn<typeof functions.getMemberIdBySeat>

export type GetPauseConfigParams = FunctionArguments<typeof functions.getPauseConfig>
export type GetPauseConfigReturn = FunctionReturn<typeof functions.getPauseConfig>

export type GetSystemPauseParams = FunctionArguments<typeof functions.getSystemPause>
export type GetSystemPauseReturn = FunctionReturn<typeof functions.getSystemPause>

export type IsAdvisoryBoardMemberParams = FunctionArguments<typeof functions.isAdvisoryBoardMember>
export type IsAdvisoryBoardMemberReturn = FunctionReturn<typeof functions.isAdvisoryBoardMember>

export type IsAdvisoryBoardMemberByIdParams = FunctionArguments<typeof functions.isAdvisoryBoardMemberById>
export type IsAdvisoryBoardMemberByIdReturn = FunctionReturn<typeof functions.isAdvisoryBoardMemberById>

export type IsEmergencyAdminParams = FunctionArguments<typeof functions.isEmergencyAdmin>
export type IsEmergencyAdminReturn = FunctionReturn<typeof functions.isEmergencyAdmin>

export type IsMemberParams = FunctionArguments<typeof functions.isMember>
export type IsMemberReturn = FunctionReturn<typeof functions.isMember>

export type IsPausedParams = FunctionArguments<typeof functions.isPaused>
export type IsPausedReturn = FunctionReturn<typeof functions.isPaused>

export type IsProxyContractParams = FunctionArguments<typeof functions.isProxyContract>
export type IsProxyContractReturn = FunctionReturn<typeof functions.isProxyContract>

export type IsValidContractIndexParams = FunctionArguments<typeof functions.isValidContractIndex>
export type IsValidContractIndexReturn = FunctionReturn<typeof functions.isValidContractIndex>

export type JoinParams = FunctionArguments<typeof functions.join>
export type JoinReturn = FunctionReturn<typeof functions.join>

export type LeaveParams = FunctionArguments<typeof functions.leave>
export type LeaveReturn = FunctionReturn<typeof functions.leave>

export type MasterParams = FunctionArguments<typeof functions.master>
export type MasterReturn = FunctionReturn<typeof functions.master>

export type MigrateParams = FunctionArguments<typeof functions.migrate>
export type MigrateReturn = FunctionReturn<typeof functions.migrate>

export type MigrateAdvisoryBoardMembersParams = FunctionArguments<typeof functions.migrateAdvisoryBoardMembers>
export type MigrateAdvisoryBoardMembersReturn = FunctionReturn<typeof functions.migrateAdvisoryBoardMembers>

export type MigrateMembersParams = FunctionArguments<typeof functions.migrateMembers>
export type MigrateMembersReturn = FunctionReturn<typeof functions.migrateMembers>

export type ProposePauseConfigParams = FunctionArguments<typeof functions.proposePauseConfig>
export type ProposePauseConfigReturn = FunctionReturn<typeof functions.proposePauseConfig>

export type RemoveContractParams = FunctionArguments<typeof functions.removeContract>
export type RemoveContractReturn = FunctionReturn<typeof functions.removeContract>

export type SetEmergencyAdminParams = FunctionArguments<typeof functions.setEmergencyAdmin>
export type SetEmergencyAdminReturn = FunctionReturn<typeof functions.setEmergencyAdmin>

export type SetKycAuthAddressParams = FunctionArguments<typeof functions.setKycAuthAddress>
export type SetKycAuthAddressReturn = FunctionReturn<typeof functions.setKycAuthAddress>

export type SwapAdvisoryBoardMemberParams = FunctionArguments<typeof functions.swapAdvisoryBoardMember>
export type SwapAdvisoryBoardMemberReturn = FunctionReturn<typeof functions.swapAdvisoryBoardMember>

export type SwitchForParams = FunctionArguments<typeof functions.switchFor>
export type SwitchForReturn = FunctionReturn<typeof functions.switchFor>

export type SwitchToParams = FunctionArguments<typeof functions.switchTo>
export type SwitchToReturn = FunctionReturn<typeof functions.switchTo>

export type UpgradeContractParams = FunctionArguments<typeof functions.upgradeContract>
export type UpgradeContractReturn = FunctionReturn<typeof functions.upgradeContract>

