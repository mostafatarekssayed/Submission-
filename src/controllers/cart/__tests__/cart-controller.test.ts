import addUserCart from "../cart-controller";
import db from "../../../db/db";

describe('cart controller test',()=>{
    beforeEach(()=>{
        // clear db before any test
        Object.keys(db).forEach(user=>{
            delete db[user]
        })
    })
    it('addUserCart should add product of quantity 1 ',()=>{
        addUserCart(11,12)
        expect(db[11]).toBeTruthy()
        expect(db[11][12]).toBeTruthy()
        expect(db[11][12].quantity).toBe(1)

    })
    it('addUserCart should add product two time of quantity must be 2 ',()=>{
        addUserCart(11,12)
        addUserCart(11,12)
        expect(db[11]).toBeTruthy()
        expect(db[11][12]).toBeTruthy()
        expect(db[11][12].quantity).toBe(2)

    })
    it('addUserCart should add two different product, cart should have 2 ',()=>{
        addUserCart(11,12)
        addUserCart(11,13)
        expect(db[11]).toBeTruthy()
        expect(db[11][12]).toBeTruthy()
        expect(db[11][13]).toBeTruthy()
        expect(Object.keys(db[11]).length).toBe(2)

    })
})