"use client"
import { Button } from "@/components/Button"
import { InputText } from "@/components/InputText"
import { RenderIf } from "@/components/RenderIf"
import { Template } from "@/components/Template"
import { useFormik } from "formik"
import { useState } from "react"
import { FormLoginProps, formLoginScheme, formLoginValidationSchema } from "./formScheme"
import { useAuth } from "@/resources/user/authentication.service"
import { useRouter } from "next/navigation"
import { AccessToken, User, UserLogin } from "@/resources/user/users.resources"
import { useNotification } from "@/components/notification"

export default function Login(){

    const [newUserState, setNewUserState] = useState<boolean>(false);
    const auth = useAuth();
    const notification = useNotification();
    const router = useRouter();

    async function onSubmit(values: FormLoginProps){
        if(!newUserState){
            const credentials: UserLogin = {
                email: values.email,
                password: values.password
            }
            try{
                const accessToken:AccessToken = await auth.authentication(credentials);
                auth.initSession(accessToken);
                console.log("Sessao esta valida:", auth.isSessionValid())
                //router.push("/galeria")
            }catch(error: any){
                const message = error?.message;
                notification.notify(message, "error")
            }
        }else{
            const user: User = {
                email: values.email, 
                name: values.name, 
                password: values.password
            }

            try{
                await auth.save(user);
                notification.notify("Success on saving user!", "success")
                formik.resetForm();
                setNewUserState(false)
            }catch(error: any){
                const message = error?.message;
                notification.notify(message, "error")
            }
        }
    }

    const formik = useFormik<FormLoginProps>({
        initialValues: formLoginScheme,
        validationSchema: formLoginValidationSchema,
        onSubmit: onSubmit
    })



    return (
        <Template>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-1x1 font-bold leading-9 tracking-tight text-gray-900">
                        {newUserState ? 'Create new User' : 'Login to yout account'}
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={formik.handleSubmit} className="space-y-2">
                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Name:</label>
                            </div>
                            <div className="mt-2">
                                <InputText 
                                    type="text"
                                    style="w-full"
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                                <span className="text-red-500">{formik.errors.name}</span>
                            </div>
                        </RenderIf>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                        </div>
                        <div className="mt-2">
                            <InputText 
                                type="email"
                                style="w-full"
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            <span className="text-red-500">{formik.errors.email}</span>
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
                        </div>
                        <div className="mt-2">
                            <InputText 
                                type="password"
                                style="w-full"
                                id="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            <span className="text-red-500">{formik.errors.password}</span>
                        </div>
                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Reapeat Password:</label>
                            </div>
                            <div className="mt-2">
                                <InputText 
                                    type="password"
                                    style="w-full"
                                    id="passwordMatch"
                                    name="passwordMatch"
                                    value={formik.values.passwordMatch}
                                    onChange={formik.handleChange}
                                />
                                <span className="text-red-500">{formik.errors.passwordMatch}</span>
                            </div>
                        </RenderIf> 
                        <div>
                            <RenderIf condition={newUserState}>
                                <Button
                                    type="submit"
                                    label="Save"
                                    color="bg-indigo-700 hover:bg-indigo-500 mr-2"
                                />
                                <Button
                                    type="button"
                                    label="Cancel"
                                    color="bg-red-700 hover:bg-red-500"
                                    onClick={() => setNewUserState(false)}
                                />
                            </RenderIf>
                            
                            <RenderIf condition={!newUserState}>

                                <Button
                                    type="submit"
                                    label="Login"
                                    color="bg-indigo-700 hover:bg-indigo-500 mr-2"
                                />
                                <Button
                                    type="button"
                                    label="SignUp"
                                    color="bg-red-700 hover:bg-red-500"
                                    onClick={() => {
                                        setNewUserState(true)
                                        formik.resetForm();
                                        }
                                    }
                                />
                            </RenderIf>

                        </div>
                    </form>
                </div>
            </div>
        </Template>
    )
}