# [Framework](https:framework.abrosimov.site)
Тестовое от ребят с [framework.team](https://framework.team).

## Инструменты
<div>
  <nav style='display: flex'>
    <a
      href='https://ru.reactjs.org/'
      style='cursor: pointer'
      target='_blank'
    >
      <img 
        style='width: 45px; height: 40px; object-fit: contain; margin-right: 20px' 
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png' 
        alt='лого react'
        />
    </a>
    <a
      href='https://nginx.org/ru/'
      style='cursor: pointer'
      target='_blank'
    >
      <img 
        style='width: 45px; height: 40px; object-fit: contain; margin-right: 20px' 
        src='https://w7.pngwing.com/pngs/262/242/png-transparent-nginx-phusion-passenger-application-software-proxy-server-reverse-proxy-creativo-logo-de-marca-angle-text-trademark.png' 
        alt='лого nginx' />
    </a>
    <a
      href='https://learn.javascript.ru/'
      style='cursor: pointer'
      target='_blank'
    >
      <img 
        style='width: 45px; height: 40px; object-fit: contain; margin-right: 20px' 
        src='https://www.nicepng.com/png/detail/80-803587_png-file-svg-javascript.png' 
        alt='лого js' />
    </a>
    <a
      href='https://ubuntu.ru/doku.php'
      style='cursor: pointer'
      target='_blank'
    >
      <img 
        style='width: 45px; height: 40px; object-fit: contain; margin-right: 20px' 
        src='https://raw.githubusercontent.com/docker-library/docs/01c12653951b2fe592c1f93a13b4e289ada0e3a1/ubuntu/logo.png' 
        alt='лого ubuntu' />
    </a>
        <a
      href='https://trello.com/b/7TQMXPqM/teamwork'
      style='cursor: pointer'
      target='_blank'
    >
      <img 
        style='width: 45px; height: 40px; object-fit: contain; margin-right: 20px' 
        src='https://cdn.iconscout.com/icon/free/png-256/trello-9-722650.png' 
        alt='лого trello' />
    </a>
    <a
      href='https://sass-scss.ru/'
      style='cursor: pointer'
      target='_blank'
    >
      <img 
        style='width: 45px; height: 40px; object-fit: contain; margin-right: 20px' 
        src='https://vanseodesign.com/blog/wp-content/uploads/2015/09/sass-logo-2.png' 
        alt='лого scss' />
    </a>
    <a
      href='https://www.w3schools.com/html/'
      style='cursor: pointer'
      target='_blank'
    >
      <img 
        style='width: 45px; height: 40px; object-fit: contain; margin-right: 20px' 
        src='https://webref.ru/assets/images/book/html5.png' 
        alt='лого html' />
    </a>
    <a
      href='https://git-scm.com/'
      style='cursor: pointer'
      target='_blank'
    >
      <img 
        style='width: 45px; height: 40px; object-fit: contain; margin-right: 20px' 
        src='https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png' 
        alt='лого git' />
    </a>
    <a
      href='https://www.w3schools.com/css/'
      style='cursor: pointer'
      target='_blank'
    >
      <img 
        style='width: 45px; height: 40px; object-fit: contain; margin-right: 20px' 
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjK60Fd1shaOG5Glq2toJyChKNGP9Ocmm4PC_r27rEB0XzDQrSgOUpIDHjOZriA-lZkS0&usqp=CAU' 
        alt='лого css' />
    </a>
    <a
      href='https://www.figma.com/file/5ywfxEN6622vwgnyFBq880/FWT-Front-end-%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-(Copy)?node-id=8368%3A531'
      style='cursor: pointer'
      target='_blank'
    >
      <img 
        style='width: 45px; height: 40px; object-fit: contain; margin-right: 20px' 
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Figma-1-logo.png/640px-Figma-1-logo.png' 
        alt='лого figma' />
    </a>
    <a
      href='https://ru.stackoverflow.com/'
      style='cursor: pointer'
      target='_blank'
    >
      <img 
        style='width: 45px; height: 40px; object-fit: contain; margin-right: 20px' 
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Sz_b0DT-gRXj4YTyFs5oJ8OmqyJsR0BsjbLar5XBWVCUBNHRGoOkd7wTe-7iEjsqIHk&usqp=CAU' 
        alt='лого stackoverflof' />
    </a>
  </nav>
</div>


## Хостинг
Страница расположена на VPS по домену **framework.abrosimov.site**

Cервер работает на **nginx.** OS: **ubuntu.** 
## О проекте
Небольшое веб-приложение, в котором реализовано получение данных с сервера  [framework](https://test-front.framework.team/api-docs/). 

В работе возможно переключение темы, реализован поиск от одного до четырех значений как на основной странице, так и url. 

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
* Компонент PageNotFound, который показывает страницу пользователю о том, что по перешедшему url ничего не существует;

## Изучено новое:
* написание стилей на препропцессоре sass;
* фильтрация (поиск) от одного до четырех значений;
* реализация светлой и темной темы;
* работа с url.