
import { User } from "../hooks/types"

export interface UserContextType {
    user: User | null
    setUser: (user: User | null) => void
    updateUser: (updates: Partial<User>) => void
} 