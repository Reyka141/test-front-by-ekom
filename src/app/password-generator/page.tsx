"use client";

import password from "./password.module.scss";
import Header from "@/components/header";
import { useFormik } from "formik";
import { generateMultiple, GenerateOptions } from "generate-password";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone } from "@fortawesome/free-solid-svg-icons/faClone";
import { toast } from 'react-toastify';

export default function PasswordGenerator() {
  const [passwordList, setPasswordList] = useState([""]);
  useEffect(() => {
    setPasswordList(generatePassword({ length: 8 }));
  }, []);
  const formik = useFormik({
    initialValues: {
      length: "8",
      uppercase: true,
      lowercase: true,
      numbers: false,
      symbols: false,
      excludeSimilarCharacters: false,
    },
    onSubmit: (values: any) => {
      const result = {
        ...values,
        length: parseInt(values.length),
      };
      setPasswordList(generatePassword(result));
    },
  });

  const generatePassword = (option: GenerateOptions | undefined) => {
    const passwords = generateMultiple(5, option);
    return passwords;
  };

  const copyTextToClipboard = async (text:string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Текст успешно скопирован в буфер обмена!');
    } catch (err) {
      toast.error(`Ошибка: ${err}`);
    }
  };

  const renderPassword = (items: string[]) => {
    return (
      <ul>
        {items.map((item) => (
          <li key={item}>
            {item}
            <FontAwesomeIcon icon={faClone} onClick={() => copyTextToClipboard(item)} />
          </li>
        ))}
      </ul>
    );
  };
  return (
    <>
      <Header />
      <main className={password.wrapper}>
        <div className={password.leftSide}>
          <h1 className={password.title}>Генератор паролей</h1>
          <form className={password.form} onSubmit={formik.handleSubmit}>
            <div className={password.inputContainer}>
              <label htmlFor="length">Длина пароля:</label>
              <input
                type="number"
                id="length"
                name="length"
                value={formik.values.length}
                onChange={formik.handleChange}
                min="4"
                max="20"
              />
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="uppercase"
                  checked={formik.values.uppercase}
                  onChange={formik.handleChange}
                />{" "}
                Использовать прописные буквы
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="lowercase"
                  checked={formik.values.lowercase}
                  onChange={formik.handleChange}
                />{" "}
                Использовать строчные буквы
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="numbers"
                  checked={formik.values.numbers}
                  onChange={formik.handleChange}
                />{" "}
                Использовать цифры
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="symbols"
                  checked={formik.values.symbols}
                  onChange={formik.handleChange}
                />
                {" Использовать символы: %, *, ), ?, @, #, $, ~"}
              </label>
            </div>
            <div className={password.mb}>
              <label>
                <input
                  type="checkbox"
                  name="excludeSimilarCharacters"
                  checked={formik.values.excludeSimilarCharacters}
                  onChange={formik.handleChange}
                />{" "}
                Избегать повторения символов
              </label>
            </div>

            <button className={password.btn} type="submit">
              Сгенерировать пароль
            </button>
          </form>
        </div>
        <div className={password.rightSide}>{renderPassword(passwordList)}</div>
      </main>
    </>
  );
}
