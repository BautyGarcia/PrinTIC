import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { ActionButton } from "~/components/utils/buttons";
import { PasswordInput } from "~/components/utils/inputs";
import { Subtitle, Title } from "~/components/utils/texts";
import { api } from "~/utils/api";

const NuevaClave: NextPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { mutate: changePassword } = api.users.cambiarPassword.useMutation();
  const { data: sessionData } = useSession();
  const router = useRouter();

  const handlePasswordChange = () => {
    setIsChangingPassword(true);

    changePassword({
      password: newPassword
    }, {
      onSuccess: () => {
        setIsChangingPassword(false);
        toast.success("Contraseña cambiada exitosamente");
        void router.push("/dashboard");
      },
      onError: () => {
        setIsChangingPassword(false);
        toast.error("Hubo un error al cambiar la contraseña");
      }
    });
  }

  return (
    <>
      <Head>
        <title>PrinTIC - Nueva Contraseña</title>
        <meta name='description' content='PrinTIC' />
        <link rel='icon' href='/general/ticLogo.ico' />
      </Head>
      <div className="relative z-10 flex items-center justify-center h-screen w-screen">
        <div className="bg-purple_tic p-6 lg:p-12 rounded-lg flex flex-col gap-12 mx-4 max-w-[500px]">
          <div className="flex flex-col">
            <Title className="text-center text-[30px] sm:text-[35px] leading-none">{`¡Hola ${sessionData?.user?.name}!`}</Title>
            <Subtitle className="text-[15px] sm:text-[20px] text-center">Escribí tu nueva contraseña</Subtitle>
          </div>
          <div className="flex flex-col gap-4">
            <PasswordInput
              isError={false}
              label=""
              className="w-full"
              placeholder="********"
              value={newPassword}
              setValue={setNewPassword}
            />
            <ActionButton
              isLoading={isChangingPassword}
              onClick={handlePasswordChange}
              withAnimation
            >Cambiar</ActionButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default NuevaClave;