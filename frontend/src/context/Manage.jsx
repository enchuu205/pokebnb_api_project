import { createContext } from "react";
import { useState } from "react";



// Manage context
export const ManageContext = createContext()

// export function ManageProvider({ children }) {
//     const [manage, setManage] = useState(false)

//     const contextValue = {
//         manage,
//         setManage
//     }

//     return (
//         <>
//             <ManageContext.Provider value={contextValue}>
//                 {children}
//             </ManageContext.Provider>
//         </>
//     )
// }

export const ManageProvider = props => {
    const [manage, setManage] = useState(false)

    return (
        <ManageContext.Provider value={{ manage, setManage }}>
            {props.children}
        </ManageContext.Provider>
    )
}
