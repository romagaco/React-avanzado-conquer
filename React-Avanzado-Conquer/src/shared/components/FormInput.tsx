import type { UseFormRegisterReturn } from "react-hook-form"


type Props = {
    label: string;
    register: UseFormRegisterReturn;
    error?: string;
    type?: string;
}


export const FormInput = ({ label, register, error, type = "text"}: Props ) => (
    <div className="formgroup">
        <label>{label}</label>

        <input type={type} {...register} />

        {error && <span className="error">{error</span>}
    </div>
)