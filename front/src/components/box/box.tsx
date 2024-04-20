import { ReactNode } from "react";

type propsBox={
    children:ReactNode | ReactNode[];
    id?:string
}

export const BoxGrid =({children,id}:propsBox)=>{
    return(
        <div id={id} style={{
            display:'grid'
        }}>
         {children}
        </div>
    )
}

