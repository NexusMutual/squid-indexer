import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ProductType {
    constructor(props?: Partial<ProductType>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    name!: string

    @BigIntColumn_({nullable: false})
    claimMethod!: bigint

    @BigIntColumn_({nullable: false})
    gracePeriod!: bigint

    @BigIntColumn_({nullable: false})
    assessmentCooldownPeriod!: bigint

    @BigIntColumn_({nullable: false})
    payoutRedemptionPeriod!: bigint

    @StringColumn_({nullable: false})
    metadata!: string
}
