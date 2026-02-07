
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"


const router = useRouter();
const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                // Handle redirect here, where 'router' exists
                onSuccess: () => {
                    router.push("/")
                    router.refresh()
                },
            },
        })
    }