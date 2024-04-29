import { createContext } from "react";
import { useState } from "react";

// Manage context
export const ManageContext = createContext()

export const ManageProvider = props => {
    const [manage, setManage] = useState(false)

    return (
        <ManageContext.Provider value={{ manage, setManage }}>
            {props.children}
        </ManageContext.Provider>
    )
}
