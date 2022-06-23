# [Framework](https://framework.abrosimov.site)
Тестовое от ребят с [framework.team](https://framework.team).
## Инструменты
**REACT, JS, NGINX, UBUNTU, TRELLO, SCSS, GIT, HTML, FIGMA.**

## Хостинг
Страница расположена на [VPS](https://ruvds.com/ru-rub) по домену **[framework.abrosimov.site](https://framework.abrosimov.site/).**

Cервер работает на **nginx 1.18.0.** OS: **ubuntu 20.04.** 
## О проекте
Небольшое веб-приложение, в котором реализовано получение данных с [сервера](https://test-front.framework.team/api-docs/) framework. 

В работе возможно переключение темы, реализован поиск от одного до четырех значений как на основной странице в виде value в полях, так и value в виде параметров в url. 

Пагинация и взаимодействия с url.

Данные приходят в виде объекта с тремя ключами, каждое значение которого является массивом.

      {
        paintings: [{
          athorId: Number,
          created: Number,
          id: Number,
          imageUrl: 'https://api.framework.team/some-image.jpeg',
          locationId: Number,
          name: String
          }, {}, {}, ...],
        authors: [{
          id: Number,
          name: String
        }, {}, {}, ...],
        locations: [{
          id: Number,
          location: String
        }, {}, {}, ...]
      }


## Добавлено в проект новое:
* Прелоудер при загрузки начальных данных карточек;
* Компонент AppCrashApp, который отображает ошибки с сервера при работе с приложением;
* Компонент ErrorNoResultFound, который отображается на неверный запрос параметров в одном из полей и/или url запроса;
* Компонент PageNotFound, который показывает страницу пользователю о том, что по перешедшему url ничего не существует.

## Изучено новое:
* написание стилей на препропцессоре sass;
* фильтрация (поиск) от одного до четырех значений;
* реализация светлой и темной темы;
* работа с url.

## Что можно улучшить:
* Более лаконичная реализация компонента HandlerSearch;
* Более быструю загрузку карточек, либо добавить прелоудер для каждой карточки, пока та подгружает страницу.