import './BtnSwitchTheme.css';

function BtnSwitchTheme () {
  return (
    <label className='btn-switch-theme'>
      <input type='checkbox' className='btn-switch-theme__checker' />
      <span className='btn-switch-theme__slider' />
    </label>
  );
}

export default BtnSwitchTheme;