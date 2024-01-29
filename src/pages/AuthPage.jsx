import { useState } from "react";
import CheckOtpForm from "components/templates/CheckOtpForm";
import SendOtpForm from "components/templates/SendOtpForm";

const AuthPage = () => {
    const [isSent, setIsSent] = useState(false);
    const [mobile, setMobile] = useState("");
    const [code, setCode] = useState("");

    return (
        <div>
            {isSent ? (
                <CheckOtpForm
                    code={code}
                    setCode={setCode}
                    mobile={mobile}
                    setIsSent={setIsSent}
                />
            ) : (
                <SendOtpForm
                    setIsSent={setIsSent}
                    mobile={mobile}
                    setMobile={setMobile}
                />
            )}
        </div>
    );
};

export default AuthPage;
