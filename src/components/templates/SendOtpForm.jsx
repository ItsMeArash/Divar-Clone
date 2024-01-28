import { sendOtp } from "../../services/auth";

const SendOtpForm = ({ mobile, setMobile, setIsSent }) => {
    const submitHandler = async (event) => {
        event.preventDefault();

        if (mobile.length !== 11) return;
        // @Todo more complicated validation logic

        const { response, error } = await sendOtp(mobile);
        if (response?.status === 200) setIsSent(true);
        if (error) console.log(error.response.data.message);
    };

    return (
        <form onSubmit={submitHandler}>
            <p>ورود به حساب کاربری</p>
            <span>
                برای استفاده از امکانات دیوار، لطفاً شمارهٔ موبایل خود را وارد
                کنید. کد تأیید به این شماره پیامک خواهد شد.
            </span>
            <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
            <input
                type="text"
                id="input"
                placeholder="شماره موبایل"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
            />
            <button type="submit">ارسال کد تایید</button>
        </form>
    );
};

export default SendOtpForm;
