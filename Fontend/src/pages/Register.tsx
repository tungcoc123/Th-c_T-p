import { registerUser, User } from "../services/Auth";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";


export function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<User>();

    const handleRegister: SubmitHandler<User> = (values) => {
        registerUser(values)
            .then(() => {
                toast.success("Đăng ký thành công!");

                // Đóng modal đăng ký
                const modal = document.getElementById("registrationModal");
                if (modal) {
                    const bsModal = bootstrap.Modal.getInstance(modal);
                    bsModal?.hide();
                }

                // Nếu muốn mở login sau khi đăng ký, dùng Bootstrap Modal API
                const loginModal = document.getElementById("loginModal");
                if (loginModal) {
                    const bsLoginModal = new bootstrap.Modal(loginModal);
                    bsLoginModal.show();
                }
            })
            .catch((error) => {
                toast.error("Lỗi: " + error.message);
            });
    };

    return (
        <div className="modal fade" id="registrationModal" tabIndex={-1} aria-labelledby="registrationModalLabel"
            aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="close-btn">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="identityBox">
                            <div className="form-wrapper">
                                <form className="form-wrapper" onSubmit={handleSubmit(handleRegister)}>
                                    <h1 id="registrationModalLabel">Tạo tài khoản!</h1>

                                    <input {...register("username", { required: "Tên không được để trống" })} className="inputField" type="text" placeholder="User Name" />
                                    {errors.username && <p className="text-danger">{errors.username.message}</p>}

                                    <input {...register("email", { required: "Email không được để trống" })} className="inputField" type="email" placeholder="Email Address" />
                                    {errors.email && <p className="text-danger">{errors.email.message}</p>}

                                    <input {...register("password", { required: "Mật khẩu không được để trống" })} className="inputField" type="password" placeholder="Mật khẩu" />
                                    {errors.password && <p className="text-danger">{errors.password.message}</p>}

                                   

                                    <div className="input-check remember-me">
                                        <div className="checkbox-wrapper">
                                            <input type="checkbox" className="form-check-input" id="saveForNext" />
                                            <label htmlFor="saveForNext">Remember me</label>
                                        </div>
                                    </div>

                                    <button type="submit" className="theme-btn rounded-0">Đăng ký</button>
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
                                    data-bs-target="#registrationModal">Create Account</button>
                                <div className="signUpBg">
                                    <img src="./src/assets/img/registrationbg.jpg" alt="signUpBg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
