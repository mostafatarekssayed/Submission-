export function sortArray<T>(arr:T[],basedOn:keyof T,asc= true):T[]{

    const direction: number = asc ? 1: -1;
   return  arr.sort((a:T,b: T):number=>{
        if(a[basedOn]>b[basedOn]) return direction;
        else if(a[basedOn]<b[basedOn]) return -1*direction;
        else return 0;
    })
}