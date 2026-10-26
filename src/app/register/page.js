"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./register.module.css";

const registrationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required("სახელი სავალდებულოა.")
    .min(4, "სახელი უნდა შეიცავდეს მინიმუმ 4 სიმბოლოს.")
    .max(20, "სახელი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს."),
  lastName: yup
    .string()
    .trim()
    .required("გვარი სავალდებულოა.")
    .min(4, "გვარი უნდა შეიცავდეს მინიმუმ 4 სიმბოლოს.")
    .max(20, "გვარი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს."),
  age: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || Number.isNaN(value) ? undefined : value,
    )
    .typeError("ასაკი უნდა იყოს რიცხვი.")
    .required("ასაკი სავალდებულოა.")
    .min(13, "ასაკი უნდა იყოს მინიმუმ 13.")
    .max(120, "ასაკი უნდა იყოს მაქსიმუმ 120."),
  email: yup
    .string()
    .trim()
    .required("ელფოსტა სავალდებულოა.")
    .email("შეიყვანეთ სწორი ელფოსტის მისამართი."),
  password: yup
    .string()
    .required("პაროლი სავალდებულოა.")
    .min(6, "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს.")
    .max(12, "პაროლი უნდა შეიცავდეს მაქსიმუმ 12 სიმბოლოს.")
    .matches(/[A-Z]/, "პაროლი უნდა შეიცავდეს მინიმუმ ერთ დიდ ლათინურ ასოს.")
    .matches(/[a-z]/, "პაროლი უნდა შეიცავდეს მინიმუმ ერთ პატარა ლათინურ ასოს.")
    .matches(/\d/, "პაროლი უნდა შეიცავდეს მინიმუმ ერთ ციფრს."),
  phone: yup
    .string()
    .required("ტელეფონი სავალდებულოა.")
    .min(10, "ტელეფონის ნომერი უნდა შეიცავდეს მინიმუმ 10 ციფრს.")
    .max(100, "ტელეფონის ნომერი უნდა შეიცავდეს მაქსიმუმ 100 ციფრს.")
    .matches(/^\d+$/, "ტელეფონის ნომერი მხოლოდ ციფრებს უნდა შეიცავდეს."),
});

const fields = [
  { name: "firstName", label: "სახელი", type: "text", autoComplete: "given-name" },
  { name: "lastName", label: "გვარი", type: "text", autoComplete: "family-name" },
  { name: "age", label: "ასაკი", type: "number", autoComplete: "off" },
  { name: "email", label: "ელფოსტა", type: "email", autoComplete: "email" },
  {
    name: "password",
    label: "პაროლი",
    type: "password",
    autoComplete: "new-password",
  },
  { name: "phone", label: "ტელეფონი", type: "tel", autoComplete: "tel" },
];

export default function RegisterPage() {
  const [submitError, setSubmitError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const nameInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const onSubmit = async (values) => {
    setSubmitError("");
    setIsRegistered(false);

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          age: values.age,
          email: values.email,
          phone: values.phone,
        }),
      });

      if (!response.ok) {
        throw new Error("რეგისტრაციის მოთხოვნა ვერ შესრულდა.");
      }

      reset();
      setIsRegistered(true);
    } catch {
      setSubmitError(
        "რეგისტრაცია ვერ შესრულდა. შეამოწმეთ ინტერნეტკავშირი და სცადეთ ხელახლა.",
      );
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="register-title">
        <p className={styles.eyebrow}>მომხმარებლის პროფილი</p>
        <h1 id="register-title">Login</h1>
        <p className={styles.description}>
          შეავსეთ ველები ახალი მომხმარებლის დასარეგისტრირებლად.
        </p>
        <p className={styles.securityNote}>
          პაროლი გამოიყენება მხოლოდ ვალიდაციისთვის და სატესტო endpoint-ზე არ
          იგზავნება. JSONPlaceholder მონაცემებს არ ინახავს.
        </p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          {fields.map(({ name, label, type, autoComplete }) => {
            const error = errors[name];
            const fieldRegistration = register(
              name,
              name === "age" ? { valueAsNumber: true } : {},
            );

            return (
              <div className={styles.field} key={name}>
                <label htmlFor={name}>{label}</label>
                <input
                  id={name}
                  type={type}
                  autoComplete={autoComplete}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${name}-error` : undefined}
                  {...fieldRegistration}
                  ref={(element) => {
                    fieldRegistration.ref(element);
                    if (name === "firstName") {
                      nameInputRef.current = element;
                    }
                  }}
                />
                {error && (
                  <p className={styles.fieldError} id={`${name}-error`} role="alert">
                    {error.message}
                  </p>
                )}
              </div>
            );
          })}

          {submitError && (
            <p className={styles.submitError} role="alert">
              {submitError}
            </p>
          )}
          {isRegistered && (
            <p className={styles.success} role="status">
              მოთხოვნა წარმატებით გაიგზავნა. ეს სატესტო endpoint-ია და
              მომხმარებლის მონაცემებს არ ინახავს.
            </p>
          )}

          <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "იგზავნება..." : "რეგისტრაცია"}
          </button>
        </form>
      </section>
    </main>
  );
}
