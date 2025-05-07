import Login from "@/app/login/page";
import { useAuth } from "@/resources/user/authentication.service"

type AuthentcatedPageProps = {
    children: React.ReactNode
}

export const AuhenticatedPage = ({children}:AuthentcatedPageProps) =>{
    const auth = useAuth();
    if(!auth.isSessionValid()){
        return <Login />
    }
    
    return (
        <>
            {children}
        </>
    )
}
