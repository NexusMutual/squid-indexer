import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"
import {Kind} from "./_kind"

@Entity_()
export class Attribute {
    constructor(props?: Partial<Attribute>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("varchar", {length: 12, nullable: false})
    kind!: Kind

    @StringColumn_({nullable: false})
    targetId!: string

    @StringColumn_({nullable: false})
    key!: string

    @StringColumn_({nullable: false})
    value!: string
}
