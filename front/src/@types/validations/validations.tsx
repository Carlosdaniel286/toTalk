export type typeValidations ={
    inputType:'email' | 'numberPhone' | 'name'| 'password' | 'lastName' | undefined;
}


export type errorValidation = {
    isError: boolean,
    errorMessage: string | undefined;
    
  }