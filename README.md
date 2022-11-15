# Verbum
Веб приложение для чтения книг (PDF) и отслеживания прогресса чтения. 

## Деплой (Демо):
https://verbum-app.herokuapp.com/

Можно зарегистрироваться и активировать через письмо на указанную почту (письмо может попасть в спам), либо авторизоваться под моей учетной записью:
<br>
**Email: daniilhanchenkov@yandex.ru**
<br>
**Password: 12345**

**_С 28.11.2022 heroku убирает бесплатую поддержку БД postgres, в поисках другого хостинга._**

Также можно ознакомиться с внешним видом приложения через Wiki
https://github.com/khanchenkov/verbum-app/wiki

## Техноллогии
**Front-end:** Typescript, Redux, Styled-components, React-router 6, Axios, Pdfjs-dist (Mozilla)

**Back-end:** NodeJS (ExpressJS), PostgreSQL, Knex (pg), Multer, Nodemailer, jsonwebtoken (refresh, access token), 

## Проект на локальной машине
Чтобы посмотреть проект на локальной машине, нужно установить пакеты зависимостей в обе папки (server и client)
```
npm install
```
Из папки сервера запустить
```
npm run dev:client
```
Также потребуется создать схему БД. Модели можно найти в `/server/models`
