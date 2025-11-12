import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, StringColumn as StringColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class Product {
    constructor(props?: Partial<Product>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({nullable: false})
    productType!: bigint

    @StringColumn_({nullable: false})
    name!: string

    @BigIntColumn_({nullable: false})
    minPrice!: bigint

    @BigIntColumn_({nullable: false})
    coverAssets!: bigint

    @BigIntColumn_({nullable: false})
    initialPriceRatio!: bigint

    @BigIntColumn_({nullable: false})
    capacityReductionRatio!: bigint

    @BooleanColumn_({nullable: false})
    isDeprecated!: boolean

    @BooleanColumn_({nullable: false})
    useFixedPrice!: boolean

    @StringColumn_({nullable: false})
    metadata!: string
}
