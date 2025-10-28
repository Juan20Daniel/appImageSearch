import { ErrorNetwork } from "./ErrorNetwork";

interface Props {
    errorCode: string;
}

export const ErrorIlustration = ({errorCode}:Props) => {
    if(errorCode === "ERR_NETWORK") return <ErrorNetwork />;
    if(errorCode === "ERR_BAD_REQUEST") return <ErrorNetwork />;
    if(errorCode === "UNKNOWN_ERROR") return <ErrorNetwork />;
    return <ErrorNetwork />;
}