"use client";
import Link from "next/link";
import "./header.scss";
import { useEffect, useState } from "react";

export default function Header() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(localStorage.getItem("username") ?? "Аноним");
  }, []);

  return (
    <header>
      <div className="leftSide">
        <p>Название</p>
        <nav>
          <ul>
            <li>
              <Link href="/password-generator">Главная</Link>
            </li>
            <li>
              <Link href="/calculator">Калькулятор</Link>
            </li>
            <li>Название 3</li>
          </ul>
        </nav>
      </div>
      <div className="rightSide">
        <p>{username}</p>
        <span>{username.slice(0, 1)}</span>
      </div>
    </header>
  );
}
