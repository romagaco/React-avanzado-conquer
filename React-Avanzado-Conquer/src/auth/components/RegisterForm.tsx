import { z } from "zod";
import { useForm} from "react-hook-form"
import { authService } from "../services/AuthService"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput } from "../../shared/components";

const registerSchema = z.object([
    email: z.string().email("Email es invalido"),
    password: z.string().min(6, "Minimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Minimo 6 caracteres")
]).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
})

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
const { register, handleSubmit, formState} = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
})

const navigate  = useNavigate();

const onSubmit = async (data: RegisterFormData) => {
    try {
        const authService.register(data.email, data.password)
        alert("Registro Exitoso, ahora peude iniciar sesion")
        navigate("/")
    } catch (error) {
        console.error{error}
        if (error instanceof Error)
            alert(error.message || "Error en el registro")
    }}

    return (
        <div className="container">
            <h2> Registrarse </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <FormInput label="Email" register={register("email")} error={formState.errors.email?.message} />
                <FormInput label="Password" register={register("password")} error={formState.errors.password?.message} />
                <FormInput label="ConfirmPassword" register={register("confirmPassword")} error={formState.errors.confirmPassword?.message} />
                <button type="submit">Registarse</button>
            </form>
            <p>Ya tenes ceunta? <Link to="/">aca</Link></p>
        </div>
    )
}