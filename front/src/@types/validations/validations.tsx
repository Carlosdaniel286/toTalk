export type inputType = 'email' | 'phone' | 'name'| 'password' | 'lastName' 

export interface typeValidations {
    inputType?:'email' | 'phone' | 'name'| 'password' | 'lastName' 
}

export type errorValidation = {
    error:boolean,
    message:string| undefined
    
  }