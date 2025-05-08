'use client'
import { useAuth } from "@/resources/user/authentication.service";
import Login from "./login/page";
import GaleriaPage from "./galeria/page";

const Page = () =>{
  const auth = useAuth();
  const user = auth.getUserSession();

  if(!user){
    return <Login/>
  }
  
  return (
    <>
      <GaleriaPage />
    </>
  )
}

export default Page;