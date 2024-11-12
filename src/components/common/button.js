import {useI18n} from "../../context/i18n";

const Button = ({children, className, disabled, ...props}) => {
    const i18n = useI18n()
    return (
        <button {...props}
            disabled={disabled}
            className={`bg-main px-4 py-2 text-lg text-black rounded text-wra disabled:bg-main2 disabled:bg-opacity-40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${className}`}
            style={{whiteSpace: 'nowrap'}}>{!!i18n.t && typeof children === 'string' ? i18n.t(children) : children}</button>
    )
}
export default Button