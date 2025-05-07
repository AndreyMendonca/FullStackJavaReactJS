"use client"

import { Button } from "@/components/Button"
import { InputText } from "@/components/InputText"
import { RenderIf } from "@/components/RenderIf"
import { Template } from "@/components/Template"
import { useState } from "react"

export default function Login(){

    const [newUserState, setNewUserState] = useState<boolean>(false);

    return (
        <Template>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-1x1 font-bold leading-9 tracking-tight text-gray-900">
                        {newUserState ? 'Create new User' : 'Login to yout account'}
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-2">
                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Name:</label>
                            </div>
                            <div className="mt-2">
                                <InputText 
                                    type="text"
                                    style="w-full"
                                    id="name"
                                />
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
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
                        </div>
                        <div className="mt-2">
                            <InputText 
                                type="password"
                                style="w-full"
                                id="password"
                            />
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
                                />
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
                                    onClick={() => setNewUserState(true)}
                                />
                            </RenderIf>

                        </div>
                    </form>

                </div>
            </div>
        </Template>
    )
}