# Moovd - GPS List App

Full Document in this Link 

Here are the tasks that I have completed.

| Task                              | 
| :-------------------------------- |
| `Login Page`                      |
| `Register Page`                   |
| `Show GPS List`                   |
| `Show GPS Details`                |

## Documentation

### Demo

#### Register and Login (Sucess)

show alert success
![login-register-success-case](https://github.com/eldrians/moovd-angular/assets/91566708/3d0fdf33-da23-4a9f-81c1-497f97ddaa96)

#### Register and Login (Validation)

show validation if had uncorrect input or false account

![login-register-failed-case](https://github.com/eldrians/moovd-angular/assets/91566708/313254de-042a-4322-bf89-873e2efd7449)

#### Live Search

![search-id-type](https://github.com/eldrians/moovd-angular/assets/91566708/0fd3d01d-65e8-48bc-ab31-1a92081f67ae)

#### Sort For Any Coloumn (ID & Type)

![sort-id-type](https://github.com/eldrians/moovd-angular/assets/91566708/823dc5f9-c959-4ebf-ad46-90554caa5d64)

#### Detail GPS

show chart and other detail information

![detail](https://github.com/eldrians/moovd-angular/assets/91566708/c23a7955-fe9b-409e-b6bb-659a328c5914)

#### Pagination

![pagination](https://github.com/eldrians/moovd-angular/assets/91566708/b807dbd8-54cd-4244-96b0-6938da3ce470)

#### Responsive

Responsive for monitor, laptop, tablet, and smartphone

![responsive](https://github.com/eldrians/moovd-angular/assets/91566708/976d5d6b-b83d-4595-8758-3e678e9b69f4)

#### Logout (with guard)

The user can't access /gps because there is a guard in the route.

![logout](https://github.com/eldrians/moovd-angular/assets/91566708/34cb81c4-cbb1-4d30-b507-8b5977e7466b)

#### PWA

App can run in offline mode

![pwa](https://github.com/eldrians/moovd-angular/assets/91566708/a49599c4-c8a0-48cb-b75e-df5ba533b23c)

#### Test Coverage

The test coverage is not 100%, but at least it has been done using Jest with the different folder structure outside the app.

![image](https://github.com/eldrians/moovd-angular/assets/91566708/309752a5-de55-464c-8749-4fbbf1a96c22)

## Setup & Run

### Setup

open your terminal and run this command :

```
  git clone https://github.com/eldrians/moovd-angular.git
```

open the application and run this command too:

```
  npm i
```

```
  ng serve
```

### Run App

run the application(terminal 1)

```
  npm run start
```

run the json-server(terminal 2)

```
  npm run start
```

### Run Test

- test all file

```
  npm run test
```

- Test spesific file

```
  npx jest <file name>
```

- see coverage

```
  npx jest --coverage
```

