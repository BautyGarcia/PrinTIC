import ORTIcon from "../icons/ORTIcon"
import TicXIcon from "../icons/ticXIcon"

const HomeFooter = () => {
    return (
        <footer className="flex bg-purple_tic h-[200px] w-screen justify-evenly items-center">
            <ORTIcon width={100} height={100} />
            <TicXIcon width={100} height={100} />
        </footer>
    )
}

export default HomeFooter;