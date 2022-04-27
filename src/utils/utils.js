// обработчик бордеров открытия и закрытия фильтров поиска
// и выбранной темы день/ночь
const borderStyleHandlerThemeForFilter = (container, colorTheme, isOpenListSearchedResult, isFocusContainer) => { 
  if (isOpenListSearchedResult) {
    container.style.borderBottom = 'none';
    container.style.borderBottomLeftRadius = '0px';
    container.style.borderBottomRightRadius = '0px';
  } else if (!isOpenListSearchedResult && isFocusContainer) {
    container.style.borderBottom = (colorTheme === 'naight' ? '1px solid #fff' : '1px solid #000');
    container.style.borderBottomLeftRadius = '8px';
    container.style.borderBottomRightRadius = '8px';
  } else {
    container.style.borderBottom = (colorTheme === 'naight' ? '1px solid rgba(255, 255, 255, .3)' : '1px solid rgba(0, 0, 0, .3)');
    container.style.borderBottomLeftRadius = '8px';
    container.style.borderBottomRightRadius = '8px';
  }
};


export { borderStyleHandlerThemeForFilter }