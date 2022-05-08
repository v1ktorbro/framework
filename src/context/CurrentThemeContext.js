import React from 'react';

export const CurrentThemeContext = React.createContext();

// чекаем какая тема стоит на ОС
const isNightTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches;

export const defaultTheme = isNightTheme ? 'night' : 'day';
