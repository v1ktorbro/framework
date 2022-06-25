# [Framework](https://framework.abrosimov.site)

**[ Base URL: framework.abrosimov.site ]**

Тестовое от ребят с [framework.team](https://framework.team).
## Инструменты
**REACT, JS, NGINX, UBUNTU, TRELLO, SCSS, GIT, HTML, FIGMA.**

## О проекте
Небольшое веб-приложение, в котором реализовано получение данных с [сервера](https://test-front.framework.team/api-docs/) framework. 

В работе возможно переключение темы, реализован поиск от одного до четырех значений как на основной странице в виде value в полях, так и value в виде параметров в url. 

Написана пагинация и логика взаимодействия с url.

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
* Прелоудер при загрузке данных с сервера;
* Компонент AppCrashApp, который отображает ошибки с сервера при работе с приложением;
* Компонент ErrorNoResultFound, который отображает неверный запрос параметров в одном из полей и/или url запроса;
* Компонент PageNotFound, который сообщает пользователю о том, что по перешедшему url, страницы в приложении не существует.

## Изучено новое:
* написание стилей на препроцессоре sass;
* фильтрация (поиск) от одного до четырех значений;
* реализация светлой и темной темы;
* работа с url.

## Что можно улучшить:
* Более лаконичная реализация компонента HandlerSearch;
* Более быструю загрузку карточек, либо добавить прелоудер для каждой карточки, пока та подгружает изображение.

## Хостинг
Страница расположена на [VPS](https://ruvds.com/ru-rub) по домену **[framework.abrosimov.site](https://framework.abrosimov.site/).**

Cервер работает на **nginx 1.18.0.** OS: **ubuntu 20.04.** 
