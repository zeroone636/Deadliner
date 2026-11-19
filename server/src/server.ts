import express from "express";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const db = new Pool({
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD
});

app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (
            typeof username !== "string" ||
            typeof password !== "string" ||
            username.trim().length < 3 ||
            password.length < 8 ||
            password.length > 72
        ) {
            return res.status(400).json({
                message: "Некорректные данные"
            });
        }

        const check = await db.query(
            "SELECT id FROM users WHERE username = $1",
            [username.trim()]
        );

        if (check.rows.length > 0) {
            return res.status(409).json({
                message: "Пользователь уже существует"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        await db.query(
            "INSERT INTO users (username, password) VALUES ($1, $2)",
            [username.trim(), hash]
        );

        res.status(201).json({
            message: "Регистрация успешна"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Ошибка сервера"
        });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (
            typeof username !== "string" ||
            typeof password !== "string" ||
            username.trim().length === 0 ||
            password.length === 0
        ) {
            return res.status(400).json({
                message: "Введите логин и пароль"
            });
        }

        const result = await db.query(
            "SELECT * FROM users WHERE username = $1",
            [username.trim()]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Неверный логин или пароль"
            });
        }

        const user = result.rows[0];

        const valid = await bcrypt.compare(
            password,
            user.password
        );

        if (!valid) {
            return res.status(401).json({
                message: "Неверный логин или пароль"
            });
        }

        res.json({
            message: "Авторизация успешна",
            user: {
                id: user.id,
                username: user.username
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Ошибка сервера"
        });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started!");
});