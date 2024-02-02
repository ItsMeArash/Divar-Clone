import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { checkOtp } from "services/auth";
import { getProfile } from "services/user";
import { setCookie } from "utils/cookie";

const CheckOtpForm = ({ code, setCode, mobile, setIsSent }) => {
    const navigate = useNavigate();
    const { refetch } = useQuery(["profile"], getProfile);

    const submitHandler = async (event) => {
        event.preventDefault();

        if (code.length !== 5) return;

        const { response, error } = await checkOtp(mobile, code);
        console.log({ response, error });
        if (response && response.status === 200) {
            setCookie(response.data);
            toast.success("عملیات ورود با موفقت انجام شد");
            navigate("/");
            refetch(["profile"])
        } else {
            toast.error("خطایی رخ داد");
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <p>تایید کد ارسال شده</p>
            <span>کد ارسال‌شده به شماره «{mobile}» را وارد کنید</span>
            <label htmlFor="input">کد تایید را وارد کنید</label>
            <input
                type="text"
                id="input"
                placeholder="کد تایید"
                value={code}
                onChange={(event) => setCode(event.target.value)}
            />
            <button type="submit">ورود</button>
            <button onClick={() => setIsSent(false)}>تغییر شماره موبایل</button>
        </form>
    );
};

export default CheckOtpForm;
