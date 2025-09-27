import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { registry, z } from "zod";
import { AuthContext } from "../AuthContainer";
import { Form, useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { AuthActionType } from "../state/AuthState";
import { FormInput } from "../../shared/components";


export const loginSchema = z.object({
    email: z.string().email("Email es invalido"),
    password: z.string().min(6, "minimo 6 caracteres")
})

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const { register, handleSubmit, formState } = useForm<LoginFormData>(
        { resolver: zodResolver(loginSchema) }
    )

    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const authService = new AuthService();
            const user = await authService.login(data.email, data.password)
            dispatch ({ type: AuthActionType.LOGIN, payload: user})
            navigate("/characters")
        }
    } catch (error) {
        console.error(error)
        if (error instanceof Error)
            alert(error.message || "Error en la autentificacion");
        } 
    };

    return (
        <div className="container">
            <h2>Iniciar Sesion</h2>

            <form onSubmit={handleSubmit(onsubmit)} className="loginForm">
                <FormInput label="Email" register={register("email")} error={formState.errors.email?.message} />
                <FormInput label="Password" register={register("password")} error={formState.errors.password?.message} />
                <button type="submit">Iniciar Sesion</button>
            </form>
            <p>No tienes cuenta? <Link to="/register">Registrate</Link> </p>
        </div>
    )


