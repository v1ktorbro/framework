import './BtnResetCross.css';

function BtnResetCross({ theme, hStyle, onClick }) {
  return (
    <button 
      className={`btn-reset-cross btn-reset-cross_theme-${theme}`} 
      style={hStyle} 
      onClick={onClick}
      type='reset'
    />
  );
}

export default BtnResetCross;