"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import styles from "./register.module.css";
import Link from "next/link";

const registrationSchema = yup.object({
  firstName: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .trim()
    .notRequired()
    .min(4, "სახელი უნდა შეიცავდეს მინიმუმ 4 სიმბოლოს.")
    .max(20, "სახელი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს."),
  lastName: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .trim()
    .notRequired()
    .min(4, "გვარი უნდა შეიცავდეს მინიმუმ 4 სიმბოლოს.")
    .max(20, "გვარი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს."),
  age: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || Number.isNaN(value) ? undefined : value,
    )
    .notRequired()
    .typeError("ასაკი უნდა იყოს რიცხვი.")
    .min(13, "ასაკი უნდა იყოს მინიმუმ 13.")
    .max(120, "ასაკი უნდა იყოს მაქსიმუმ 120."),
  username: yup
    .string()
    .trim()
    .required("მომხმარებლის სახელი სავალდებულოა.")
    .min(4, "მომხმარებლის სახელი უნდა შეიცავდეს მინიმუმ 4 სიმბოლოს.")
    .max(20, "მომხმარებლის სახელი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს."),
  email: yup
    .string()
    .trim()
    .required("ელფოსტა სავალდებულოა.")
    .email("შეიყვანეთ სწორი ელფოსტის მისამართი."),
  password: yup
    .string()
    .required("პაროლი სავალდებულოა.")
    .min(6, "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს.")
    .max(20, "პაროლი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს."),
  phone: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .notRequired()
    .min(10, "ტელეფონის ნომერი უნდა შეიცავდეს მინიმუმ 10 ციფრს.")
    .max(100, "ტელეფონის ნომერი უნდა შეიცავდეს მაქსიმუმ 100 ციფრს.")
    .matches(/^\d+$/, "ტელეფონის ნომერი მხოლოდ ციფრებს უნდა შეიცავდეს."),
});

const fields = [
  { name: "username", label: "მომხმარებლის სახელი", type: "text", autoComplete: "username" },
  { name: "email", label: "ელფოსტა", type: "email", autoComplete: "email" },
  {
    name: "password",
    label: "პაროლი",
    type: "password",
    autoComplete: "new-password",
  },
];

const optionalFields = [
  { name: "firstName", label: "სახელი", type: "text", autoComplete: "given-name" },
  { name: "lastName", label: "გვარი", type: "text", autoComplete: "family-name" },
  { name: "age", label: "ასაკი", type: "number", autoComplete: "off" },
  { name: "phone", label: "ტელეფონი", type: "tel", autoComplete: "tel" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
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
      username: "",
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

    try {
      const response = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(values.firstName && { firstName: values.firstName }),
          ...(values.lastName && { lastName: values.lastName }),
          ...(Number.isFinite(values.age) && { age: values.age }),
          username: values.username,
          email: values.email,
          ...(values.phone && { phone: values.phone }),
        }),
      });

      if (!response.ok) {
        throw new Error("რეგისტრაციის მოთხოვნა ვერ შესრულდა.");
      }

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error("სერვერის პასუხის წაკითხვა ვერ მოხერხდა.");
      }

      if (!result?.id) {
        throw new Error("სერვერის პასუხი არასწორია.");
      }

      reset();
      router.push("/");
    } catch {
      setSubmitError(
        "რეგისტრაცია ვერ შესრულდა. შეამოწმეთ ინტერნეტკავშირი და სცადეთ ხელახლა.",
      );
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="register-title">
        <p className={styles.eyebrow}>ანგარიშის შექმნა</p>
        <h1 id="register-title">რეგისტრაცია</h1>
        <p className={styles.description}>
          შეუერთდით ჩვენს ბაზარს და დაიწყეთ აღმოჩენა.
        </p>
        <p className={styles.securityNote}>
          პაროლი გამოიყენება მხოლოდ ადგილობრივი ვალიდაციისთვის და სატესტო
          endpoint-ზე არ იგზავნება.
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

          <details className={styles.optionalFields}>
            <summary>დამატებითი მონაცემები (არასავალდებულო)</summary>
            <div className={styles.optionalFieldsGrid}>
              {optionalFields.map(({ name, label, type, autoComplete }) => {
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
                    />
                    {error && (
                      <p className={styles.fieldError} id={`${name}-error`} role="alert">
                        {error.message}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </details>

          {submitError && (
            <p className={styles.submitError} role="alert">
              {submitError}
            </p>
          )}

          <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "რეგისტრაცია..." : "რეგისტრაცია"}
          </button>
        </form>
      </section>
      <p className={styles.accountPrompt}>
        უკვე გაქვთ ანგარიში? <Link href="/login">შესვლა</Link>
      </p>
    </main>
  );
}
