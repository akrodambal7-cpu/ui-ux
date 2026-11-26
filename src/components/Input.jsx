/**
 * Input.jsx
 * Reusable rounded form input with left icon, optional right action, and error state.
 * Matches the 60px-tall, 18px-radius white inputs in 01 Connexion.svg.
 */
const Input = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  leftIcon,
  rightAction,
  error,
  autoComplete,
}) => {
  return (
    <div className="form-field">
      {label && (
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="input-wrapper">
        {leftIcon && <span className="input-icon">{leftIcon}</span>}
        <input
          id={id}
          type={type}
          className={`form-input${error ? ' error' : ''}${rightAction ? ' has-right' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />
        {rightAction}
      </div>
      {error && (
        <span id={`${id}-error`} className="field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
