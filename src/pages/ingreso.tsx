import { type NextPage } from "next";
import { TextInput, PasswordInput } from "~/components/utils/inputs";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Title } from "~/components/utils/texts";
import { ActionButton } from "~/components/utils/buttons";
import Head from "next/head";
import { api } from "~/utils/api";

const Ingreso: NextPage = () => {
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const { mutate: checkPasswordChange } = api.users.isPasswordChanged.useMutation();
    let isPasswordChanged = false;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!(mail.endsWith("@est.ort.edu.ar") || mail.endsWith("@ort.edu.ar"))) {
            setErrorMessage("El mail debe ser de ORT");
            return;
        }
        setLoading(true);

        checkPasswordChange({
            email: mail
        }, {
            onSuccess: (data) => {
                isPasswordChanged = data;
            },
            onError: (error) => {
                setErrorMessage(error.message ?? "Hubo un error al verificar si la contraseña fue cambiada");
            }
        });

        await signIn("credentials", {
            redirect: false,
            email: mail,
            password
        }).then((response) => {
            if (response?.ok) {
                setLoading(false);
                setErrorMessage("");
                if (isPasswordChanged) {
                    void router.push("/dashboard");
                    return;
                }
                void router.push("/nuevaClave");
            } else {
                setLoading(false);
                setErrorMessage(response?.error ?? "Email o contraseña incorrectos");
            }
        });
    }

    return (
        <>
            <Head>
                <title>PrinTIC - Ingreso</title>
                <meta name="description" content="PrinTIC" />
                <link rel="icon" href="/general/ticLogo.ico" />
            </Head>
            <div className="relative z-10 flex flex-col h-screen w-screen items-center justify-center gap-3 px-5">
                <Title>{"<Ingreso/>"}</Title>
                <div className="flex flex-col w-full min-h-2/6 md:w-2/3 lg:w-1/3 bg-container_background rounded-lg p-5">
                    <form className="flex flex-col w-full gap-6" onSubmit={(e) => handleSubmit(e)}>
                        <TextInput titleClassName="text-lg font-roboto" label="Mail" placeholder="DNI@est.ort.edu.ar" value={mail} setValue={setMail} isError={!(errorMessage.length === 0)} />
                        <PasswordInput className="w-full" label="Contraseña" placeholder="inventaronelVAR" value={password} setValue={setPassword} isError={!(errorMessage.length === 0)} />
                        {errorMessage.length > 0 && <p className="text-red_tic text-center text-lg">{errorMessage}</p>}

                        <div className="flex flex-col gap-1 mt-5">
                            <ActionButton
                                isLoading={loading}
                                onClick={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
                            >{loading ? "Ingresando..." : "Ingresar"}</ActionButton>
                            <Link href={"/"} passHref className="text-lg text-center text-lightBlue_tic underline">volver</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Ingreso;