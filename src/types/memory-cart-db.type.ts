export type MemoryCartDb = {
    [customerId : string]:{
        [productId :string] : {
            quantity:number,
            addedAt: Date,
            updatedAt:Date
        }
    }
}