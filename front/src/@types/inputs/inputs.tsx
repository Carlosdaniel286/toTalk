export type propsInputValue={
    name:string,
    lastName: string,
    phone: string,
    password: string,
    email: string
}


export type prposCredential ={
    onChange:((inputValue: propsInputValue)=>void)
    
}