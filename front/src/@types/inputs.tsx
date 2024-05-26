export type propsInputValue={
    name?:string,
    phone?: string,
    password?: string,
    email?: string
}


export type prposCredential ={
    onChange:((inputValue: propsInputValue)=>void)
    
}