export default function AuthInput ({ type, onChangeText, value }) {
  return (
    <label>
      {(() => {
        if (type === 'username') return 'Username';
        if (type === 'email') return 'Email';
        if (type === 'identification') return 'Username or email address';
        if (type === 'password') return 'Password';
        if (type === 'repeat-password') return 'Repeat Password';
      })()}
      <input
        className='auth-input'
        type={(() => {
          if (type === 'username' || type === 'identification') return 'text';
          if (type === 'email') return 'email';
          if (type === 'password' || type === 'repeat-password') return 'password';
        })()}
        onChange={({ target: { value } }) => onChangeText(value)}
        value={value}
        required
        placeholder={(() => {
          if (type === 'username') return 'Username';
          if (type === 'email') return 'user@website.com';
          if (type === 'identification') return 'Username or email address';
          if (type === 'password') return 'Password';
          if (type === 'repeat-password') return 'Repeat Password';
        })()}
      />
    </label>
  );
}
