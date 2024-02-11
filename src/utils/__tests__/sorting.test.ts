import {sortArray} from "../sorting";

 interface ObjTest {
     va1:string,
     var2:string
 }
 const data:ObjTest[] = [
     {va1:'a',var2:'b'},
     {va1:'b',var2:'a'},
     {va1:'b',var2:'a'},
     {va1:'e',var2:'c'},
     {va1:'f',var2:'d'},
 ]
describe('sort utils',()=>{
    it('test sort asc based on var2',()=>{
       const result:ObjTest[]=  sortArray<ObjTest>(data,'var2')
       expect(result[0].var2).toBe('a')
    })
    it('test sort desc based on var1',()=>{
        const result:ObjTest[]=  sortArray<ObjTest>(data,'va1',false)
        expect(result[0].va1).toBe('f')
    })
})