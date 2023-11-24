import { type NextPage } from "next";
import { TextInput, PasswordInput } from "~/components/utils/inputs";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Title } from "~/components/utils/texts";
import { ActionButton } from "~/components/utils/buttons";

const Ingreso: NextPage = () => {
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    return (
        <div className="relative z-10 flex flex-col h-screen w-screen items-center justify-center gap-3 px-5">
            <Title>{"<Ingreso/>"}</Title>
            <div className="flex flex-col w-full min-h-2/6 md:w-2/3 lg:w-1/3 bg-container_background rounded-lg p-5 justify-between gap-10">
                <div className="flex flex-col w-full gap-6">
                    <TextInput label="Mail" placeholder="DNI@est.ort.edu.ar" value={mail} setValue={setMail} isError={!(errorMessage.length === 0)} />
                    <PasswordInput label="Contraseña" placeholder="inventaronelVAR" value={password} setValue={setPassword} isError={!(errorMessage.length === 0)} />
                    {errorMessage.length > 0 && <p className="text-red_tic text-center text-lg">{errorMessage}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <ActionButton
                        isLoading={loading}
                        onClick={async () => {
                            if (!(mail.endsWith("@est.ort.edu.ar") || mail.endsWith("@ort.edu.ar"))) {
                                setErrorMessage("El mail debe ser de ORT");
                                return;
                            }
                            setLoading(true);
                            await signIn("credentials", {
                                redirect: false,
                                email: mail,
                                password
                            }).then((response) => {
                                if (response?.ok) {
                                    setLoading(false);
                                    setErrorMessage("");
                                    void router.push("/dashboard");
                                } else {
                                    setLoading(false);
                                    setErrorMessage(response?.error ?? "Email o contraseña incorrectos");
                                }
                            });
                        }}
                    >{ loading ? "Ingresando..." : "Ingresar" }</ActionButton>
                    <p className="text-lg text-center">ó <Link href={"/"} passHref className="text-lightBlue_tic underline">volver</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Ingreso;