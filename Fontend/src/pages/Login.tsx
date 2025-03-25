import { useProductCart } from "../hooks/useProductCart";
import { useForm, SubmitHandler } from "react-hook-form";
import {    LoginUser, User } from "../services/Auth";
import toast from "react-hot-toast";

export default function Login() {
    const { getCartUser } = useProductCart();
    const { register, handleSubmit, formState: { errors } } = useForm<User>();

    const handleLogin: SubmitHandler<User> = (values) => {
        LoginUser(values)
          .then(({ data }) => {
            console.log("Login response data:", data); 
            console.log(localStorage.getItem("user"));
            

            toast.success("Đăng nhập thành công");
            console.log("Token:", data.token);
            localStorage.setItem("token", data.token); 
            localStorage.setItem("username", data.username); 
            localStorage.setItem("role", data.user.role);
            localStorage.setItem("user", JSON.stringify(data.user ));

            
            getCartUser()
            window.location.reload();
          })
          .catch((error) => {
            toast.error("Error: " + error.message);
          });
      };
    return (

        <>
            <div className="modal fade" id="loginModal" tabIndex={-1} aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="close-btn">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="identityBox">
                                <div className="form-wrapper">
                                    <h1 id="loginModalLabel">welcome back!</h1>
                                    <form onSubmit={handleSubmit(handleLogin)}>
                                    <input
                                        className="inputField"
                                        type="email"
                                        placeholder="Email Address"
                                        {...register("email", { required: "Email không được để trống" })}
                                    />
                                    {errors.email && <span className="error">{errors.email.message}</span>}

                                    <input
                                        className="inputField"
                                        type="password"
                                        placeholder="Enter Password"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                              value: 6,
                                              message: "Minimum 6 Characters required",
                                            },
                                          })}
                                        />
                                        {errors?.password && (
                                          <small className="text-danger">{errors.password.message}</small>
                                        )}

                                    <div className="input-check remember-me">
                                        <div className="checkbox-wrapper">
                                            <input type="checkbox" className="form-check-input" id="saveForNext" />
                                            <label htmlFor="saveForNext">Remember me</label>
                                        </div>
                                    </div>

                                    <div className="loginBtn">
                                        <button type="submit" className="theme-btn rounded-0">Log in</button>
                                    </div>
                                </form>
                                    <div className="orting-badge">
                                        Or
                                    </div>
                                    <div>
                                        <a className="another-option" href="https://www.google.com/">
                                            <img src="./src/assets/img/google.png" alt="google" />
                                            Continue With Google
                                        </a>
                                    </div>
                                    <div>
                                        <a className="another-option another-option-two" href="https://www.facebook.com/">
                                            <img src="./src/assets/img/facebook.png" alt="google" />
                                            Continue With Facebook
                                        </a>
                                    </div>

                                    <div className="form-check-3 d-flex align-items-center from-customradio-2 mt-3">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" />
                                        <label className="form-check-label">
                                            I Accept Your Terms & Conditions
                                        </label>
                                    </div>
                                </div>

                                <div className="banner">
                                    <button type="button" className="rounded-0 login-btn" data-bs-toggle="modal"
                                        data-bs-target="#loginModal">Log in</button>
                                    <button type="button" className="theme-btn rounded-0 register-btn" data-bs-toggle="modal"
                                        data-bs-target="#registrationModal">Create
                                        Account</button>
                                    <div className="loginBg">
                                        <img src="./src/assets/img/signUpbg.jpg" alt="signUpBg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}