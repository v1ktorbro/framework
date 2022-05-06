import './BtnResetCross.css';

function BtnResetCross({ theme, style, onClick }) {
  return (
    <button 
      className={`btn-reset-cross btn-reset-cross_theme-${theme}`} 
      style={style} 
      onClick={onClick}
      type='reset'
    />
  );
}

export default BtnResetCross;