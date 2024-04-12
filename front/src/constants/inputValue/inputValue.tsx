import { initError } from "../validations/validations"

export const initInputValue={
    name: '',
    lastName: '',
    phone: '',
    password: '',
    email: '',
}

export const initInputValidation={
    name: initError,
    lastName:initError,
    phone: initError,
    password: initError,
    email: initError,
}

