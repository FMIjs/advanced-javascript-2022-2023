# Домашно 1

### Задание
Създайте сървър, който по подаден URL извлича съдържанието на дадената страница, филтрира съдържанието ѝ и го връща.
Филтрирането да се случва на база допълнителен файл с регулярни изрази.
Това да става посредством крайната точка `sanitize` - `localhost:8000/sanitize?url=..."`

Изразите и думите за филтриране да се държат държат локално и да може да се добавят и махат такива посредством крайната точка `condition`:
- **POST** `localhost:8000/condition` за добавяне
- **DELETE** `localhost:8000/condition/:id` за добавяне

### Предаване
За предаване е създадено [задание в Moodle](https://learn.fmi.uni-sofia.bg/mod/assign/view.php?id=262895&forceview=1).