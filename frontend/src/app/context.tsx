import { User } from "@/lib/types"
import React from "react"

export const updateAuthContext = (user = null) => ({ user: user })

const AppContext = React.createContext({})

export default AppContext