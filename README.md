**Json Web Token Authentication**

_Made with :_

- Node

_Steps to run application :_

> `git clone https://github.com/lokeshchoudhary-lc/jwt-authentication.git`

> `Make you own .env from .evn.example`

> `npm install`

> `npm start`

_Npm Packages Used :_

- Expressjs
- mongoose
- https-errors
- bcrypt
- joi(validation)
- jsonwebtoken
- dotenv
- nodemon (dev)

---

**Routes**

| Path            | Method | Body                 | Return |
| --------------- | ------ | -------------------- | ------ |
| 'auth/register' | POST   | {"email","password"} | none   |

| Path         | Method | Body                 | Return                     |
| ------------ | ------ | -------------------- | -------------------------- |
| 'auth/login' | POST   | {"email","password"} | accessToken & refreshToken |

| Path                 | Method | Body             | Return                         |
| -------------------- | ------ | ---------------- | ------------------------------ |
| 'auth/refresh-token' | POST   | {"refreshToken"} | new accessToken & refreshToken |

| Path | Method | Headers       | Return |
| ---- | ------ | ------------- | ------ |
| '/'  | GET    | authorization |        |

- **This is a protected route and can be accessed by putting accessToken in authorization header like this:Bearer<space><accessToken-here>**

- **Example:Bearer asjdaksjd2j3rjkdsfkjdfjs-asda3-asda**
