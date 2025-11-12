import { ErrorIlustration } from "./ErrorIlustration";

interface Props {
    errorCode: string;
}

export const StatusError = ({errorCode}:Props) => {
    if(errorCode === "ERR_NETWORK") return <ErrorIlustration image={require('../../../assets/connectionLost.png')} />;
    if(errorCode === "ERR_BAD_REQUEST") return <ErrorIlustration image={require('../../../assets/badRecuest.png')} />;
    if(errorCode === "UNKNOWN_ERROR") return <ErrorIlustration image={require('../../../assets/badRecuest.png')}/>;
    return <ErrorIlustration image={require('../../../assets/badRecuest.png')} />;
}