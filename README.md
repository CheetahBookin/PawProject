# Cheetah Booking

CheetahBooking to nowoczesny system rezerwacji hoteli online, który ma na celu usprawnienie procesu rezerwacji zakwaterowania dla podróżnych. Przejrzysty i prosty w obsłudze interfejs pozwoli użytkownikowi bez żadnych problemów zarezerwować nocleg na całym świecie.

![Logo](https://github.com/CheetahBookin/PawProject/blob/main/client/public/cheetahbooking-high-resolution-logo.png)

## Tech stack

**Klient:** NextJS, Tailwind, Docker

**Serwer:** Node, Express, TypeScript, Docker, Prisma

## Setup

Clone the project

```bash
  git clone https://github.com/CheetahBookin/PawProject.git
```

Go to the project directory

```bash
  cd PawProject
```

Run client side

```bash
  cd client
  npm i
  npm run dev
```

Run docker-compose

```bash
  docker-compose up -d
```

Run server side

```bash
  cd server
  npm i
  npx prisma generate
  npx prisma migrate dev --name init

  Go to docker db image in server container -> exec and run:
  mysql -u root -p
  when asked for password: root
  use bookingDB;
  paste data from /PawProject/db/startupData.sql

  Return to server console and run:
  npm run dev
  ```

## Tips

- Zaloguj się prawdziwym mailem, aby otrzymać e-maile do resetu hasła oraz fakturę po zarezerwowaniu noclegu.

- Aby skorzystać z testowego zakupu stripe przy rezerwacji należy:

    ```
    1. Zmyślić wszystkie dane do karty
    2. Datę podać z przyszłości
    3. CVC podać losowe 3 cyfry
    4. Numer karty: 4242 4242 4242 4242
    ```

## FAQ

#### Czy dostaniemy 6?

Tak

#### Czy nasz projekt jest wybitny?

Tak

## Features

- JWT auth
- Szukanie hoteli
- Szukanie wycieczek z filtrami
- Popularne miejsca
- Szukanie po rodzaju zakwaterowania
- Przecenione
- Najlepiej oceniane
- Zostawianie opinii
- Rezerwowanie hoteli
- Płatności stripe
- Profil użytkownika (Zmiana danych, zdjęcia profilowego, ciemny motyw, statystyki użytkownika, opinie i ulubione hotele)
- Wysyłanie na maila faktury
- Resetowanie hasła, z wysłaniem kodu resetującego na maila
- Szukanie hoteli po państwach

## Problems

Jeśli cokolwiek nie działa, szczególnie jak płatność stripe nie przechodzi to proszę o kontakt na teams do jakub.bilski@uczen.zsk.poznan.pl

## Feedback

Jeśli masz jakiekolwiek uwagi, skontaktuj się z nami pod adresem jakub.bilski@uczen.zsk.poznan.pl

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Authors

- [@JakubBilski1](https://www.github.com/JakubBilski1)
- [@SzKolodziej](https://github.com/SzKolodziej)
- [@AKopydlowski](https://github.com/AKopydlowski)
