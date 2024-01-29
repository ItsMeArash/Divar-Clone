import toast from "react-hot-toast";
import { checkOtp } from "services/auth";
import { setCookie } from "src/utils/cookie";


const CheckOtpForm = ({ code, setCode, mobile, setIsSent }) => {
    const submitHandler = async (event) => {
        event.preventDefault();

        if (code.length !== 5) return;

        const { response, error } = await checkOtp(mobile, code);
        console.log({ response, error });
        if (response && response.status === 200) {
            setCookie(response.data);
            toast.success("عملیات ورود با موفقت انجام شد");
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
