# Упражнение 8

## 30.11.22


1. Използвайки [Express](https://expressjs.com/) създайте сървър за базово менажиране на събития. Той да има следните endpoint-и:
    - **POST** /event, body: `{ name: string, capacity: number }` -- създава събитие и го връща в отговора;
    - **GET** /event/:id -- връща данните за дадено събитие;
    - **DELETE** /event/:id -- изтрива данните за дадено събитие;
    - **POST** /event/:id/booking, body: `{ firstName: string, lastName: string }` -- запазва дадения потребител в гостите на даденото събитие, ако има свободни места. В отговора да връща оставащите свободни места, ако е успяло да запази, в противен случай да връща грешка
    - **GET** /event/:id/booking -- връща данните за гостите на даденото събитие;
    - **GET** /event/:id/booking/:bookingId -- връща данните за конкретен гост на даденото събитие;
    - **DELETE** /event/:id/booking/:bookingId -- изтива данните за конкретен гост на даденото събитие;

  Като "база данни" може да използвате [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). 