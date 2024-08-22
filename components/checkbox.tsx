import styles from './checkbox.module.scss';

export function Checkbox(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
        type="checkbox"
        className={`w-5 h-5 bg-green ${styles['checkbox-input']}`}       
        {...props}
    />
  );
}
