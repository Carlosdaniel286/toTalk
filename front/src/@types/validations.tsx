export type inputType = 'email' | 'phone' | 'name'| 'password' 

export interface typeValidations {
    inputType?:'email' | 'phone' | 'name'| 'password'  
}

export type errorValidation = {
    error:boolean,
    message:string| undefined
    
  }