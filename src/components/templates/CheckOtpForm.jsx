import { checkOtp } from "../../services/auth";

const CheckOtpForm = ({ code, setCode, mobile, setIsSent }) => {
  const submitHandler = async (event) => {
    event.preventDefault();

    if (code.length !== 5) return;

    const { response, error } = await checkOtp(mobile, code);
    console.log({ response, error });
  }  
  
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
