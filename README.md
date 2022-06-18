# [Framework](http://45.11.27.5:80/framework)
Тестовое от ребят с [framework.team](https://framework.team)

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
    <a>
      <img 
        style='width: 45px; height: 40px; object-fit: contain; margin-right: 20px' 
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMd7eiGMX9FwRLC0uJTDewSjw_7_WvCF4ABLdwztLrCnPEXrqW0gG-pH8eT-fYPLlghjY&usqp=CAU' 
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
  </nav>
</div>


## Хостинг
Страница расположена на VPS по адресу **http://45.11.27.5:80/framework**.

Cервер работает на nginx. OS: ubuntu. 
## О проекте
Небольшое веб-приложение, в котором реализовано получение данных с сервера от ребят [framework](https://test-front.framework.team/api-docs/). Переключение темы, фильтрации от одного до четырех значений. Пагинации и взаимодействии с url.

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

## Изучено новое:
* написание стилей на препропцессоре sass;
* фильтрация (поиск) от одного до четырех значений;
* реализация светлой и темной темы;
* работа с url.