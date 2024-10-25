"use client";

import { userStore, UserState } from "@/store/user";
import style from "./style.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Authorization() {
  const [name, setName] = useState("");
  const username = userStore((state: UserState) => state.user.username);
  const updateUser = userStore((state: UserState) => state.updateUser);
  const route = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!name) {
      localStorage.setItem('username', username);
      console.log('id', e.currentTarget.name)
      route.push(`/${e.currentTarget.name}`);
      return;
    }
    updateUser({
      username: name,
    });
    localStorage.setItem('username', name);
    route.push(`/${e.currentTarget.id}`);
  };
  return (
    <main className={style.main}>
      <div className={style.wrapper}>
        <form>
          <div className={style.contentTop}>
            <p className={style.title}>Начать</p>
            <div className={style.control}>
              <label className={style.label} htmlFor="name">
                Напишите ваше имя
              </label>
              <input
                className={style.input}
                type="text"
                id="name"
                placeholder="Ваше имя"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={style.contentBottom}>
            <button type="submit" name="calculator" className="btn" onClick={handleClick}>
              Открыть калькулятор
            </button>
            <button type="submit" name="password-generator" className="btn" onClick={handleClick}>
              Открыть генератор
            </button>
          </div>
        </form>
        <button  className={style.closeButton} name="password-generator" onClick={handleClick}>
          <svg
            width="11"
            height="10"
            viewBox="0 0 11 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.58716 3.88906L9.47622 0L10.5872 1.11094L6.69809 5L10.5872 8.88906L9.47622 10L5.58716 6.11094L1.69809 10L0.587158 8.88906L4.47622 5L0.587158 1.11094L1.69809 0L5.58716 3.88906Z"
              fill="#4F4F4F"
            />
          </svg>
        </button>
      </div>
    </main>
  );
}
