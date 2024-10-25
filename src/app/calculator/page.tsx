"use client";

import Header from "@/components/header";
import calculate from "./calculate.module.scss";
import { useState } from "react";

import Wrapper from "../../components/Wrapper";
import Screen from "../../components/Screen";
import ButtonBox from "../../components/ButtonBox";
import Button from "../../components/Button";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "<", "="],
];

const tools = ["C", "+-", "%"];

const symbols = ["/", "X", "-", "+", "="];

const toLocaleString = (num: number) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1,");

export default function Calculator() {
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const [mathExpression, setMathExpression] = useState("");

  const numClickHandler = (value: string | number) => {
    if (calc.num.toString().length < 4) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? 0
            : Number(calc.num.toString().concat(value.toString())),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const commaClickHandler = (e: {
    preventDefault: () => void;
    target: { textContent: string };
  }) => {
    e.preventDefault();
    const value = e.target.textContent;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (value: string) => {
    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      setMathExpression(
        `${toLocaleString(calc.res)}${calc.sign}${toLocaleString(calc.num)}`
      );
      const math = (a: number, b: number, sign: string) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === 0 && calc.sign === "/"
            ? "Can't divide with 0"
            : math(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? calc.num : 0;
    let res = calc.res ? calc.res : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
    setMathExpression("");
  };

  const deleteLastNum = () => {
    setCalc({
      ...calc,
      num: Math.floor(calc.num / 10),
    });
  };


  return (
    <>
      <Header />
      <main className={calculate.main}>
        <Wrapper>
          <Screen
            value={calc.num ? calc.num : calc.res}
            expression={mathExpression}
          />
          <ButtonBox>
            {btnValues.flat().map((btn, i) => {
              return (
                <Button
                  key={i}
                  className={
                    tools.includes(btn)
                      ? "tools"
                      : symbols.includes(btn)
                      ? "symbols"
                      : "simple"
                  }
                  value={btn}
                  onClick={
                    btn === "C"
                      ? resetClickHandler
                      : btn === "+-"
                      ? invertClickHandler
                      : btn === "%"
                      ? percentClickHandler
                      : btn === "="
                      ? equalsClickHandler
                      : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                      ? signClickHandler
                      : btn === "."
                      ? commaClickHandler
                      : btn === "<"
                      ? deleteLastNum
                      : numClickHandler
                  }
                />
              );
            })}
          </ButtonBox>
        </Wrapper>
      </main>
    </>
  );
}
