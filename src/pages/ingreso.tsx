import { type NextPage } from "next";
import { Text, Button } from "@mantine/core";
import { TextInput, PasswordInput } from "~/components/utils/inputs";
import { useState } from "react";
import Link from "next/link";

const Ingreso: NextPage = () => {
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="flex flex-col h-screen w-screen items-center justify-center gap-3 px-5">
            <Text className="text-[40px] sm:text-[80px] font-raleway">{"< Ingreso />"}</Text>
            <div className="flex flex-col w-full h-2/6 lg:w-1/3 bg-container_background rounded-lg p-5 justify-between">
                <div className="flex flex-col w-full gap-6">
                    <TextInput label="Mail" placeholder="DNI@est.ort.edu.ar" value={mail} setValue={setMail} />
                    <PasswordInput label="Contraseña" placeholder="inventaronelVAR" value={password} setValue={setPassword} />
                </div>
                <div className="flex flex-col gap-1">
                    <Button className="bg-pink_tic p-3 rounded-lg w-full justify-self-end">Ingresar</Button>
                    <Text className="text-lg text-center">ó <Link href={"/"} passHref className="text-lightBlue_tic underline">volver</Link></Text>
                </div>
            </div>
        </div>
    )
}

export default Ingreso;