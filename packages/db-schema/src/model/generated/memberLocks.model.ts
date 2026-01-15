import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class MemberLocks {
    constructor(props?: Partial<MemberLocks>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @BigIntColumn_({nullable: false})
    memberId!: bigint

    @BigIntColumn_({nullable: false})
    lockId!: bigint

    @BigIntColumn_({nullable: false})
    shares!: bigint

    @DateTimeColumn_({nullable: false})
    startTime!: Date

    @BigIntColumn_({nullable: false})
    period!: bigint

    @DateTimeColumn_({nullable: true})
    withdrawnAt!: Date | undefined | null
}
