# Verbum
Веб приложение для чтения книг (PDF) и отслеживания прогресса чтения. 

## Техноллогии
**Front-end:** Typescript, Redux, Styled-components, React-router 6, Axios, Pdfjs-dist (Mozilla)

**Back-end:** NodeJS (ExpressJS), PostgreSQL, Knex (pg), Multer, Nodemailer, jsonwebtoken (refresh, access token), 


## Деплой (Демо):
https://verbum-app.herokuapp.com/

**_С 28.11.2022 heroku убирает бесплатую поддержку БД postgres, в поисках другого хостинга._**

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
