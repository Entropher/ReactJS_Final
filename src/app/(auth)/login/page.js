"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./page.module.css";

const TOKEN_STORAGE_KEY = "authToken";

const loginSchema = yup.object({
  username: yup.string().trim().required("მომხმარებლის სახელი სავალდებულოა."),
  password: yup.string().required("პაროლი სავალდებულოა."),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(TOKEN_STORAGE_KEY)) {
        router.replace("/");
      }
    } catch {
      throw new Error("შენახული ავტორიზაციის წაკითხვა ვერ მოხერხდა.");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setSubmitMessage("");
    setIsLoginSuccessful(false);

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setSubmitMessage("მომხმარებლის სახელი ან პაროლი არასწორია.");
        } else {
          setSubmitMessage("შესვლა ვერ მოხერხდა. სცადეთ მოგვიანებით.");
        }
        return;
      }

      let result;
      try {
        result = await response.json();
      } catch {
        setSubmitMessage("სერვერის პასუხის წაკითხვა ვერ მოხერხდა. სცადეთ მოგვიანებით.");
        return;
      }

      if (typeof result.token !== "string" || !result.token) {
        setSubmitMessage("სერვერის პასუხი არასწორია. სცადეთ მოგვიანებით.");
        return;
      }

      try {
        if (rememberMe) {
          localStorage.setItem(TOKEN_STORAGE_KEY, result.token);
        } else {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
      } catch {
        setSubmitMessage(
          "ავტორიზაცია შესრულდა, მაგრამ ტოკენის შენახვა ვერ მოხერხდა.",
        );
        return;
      }

      setIsLoginSuccessful(true);
      setSubmitMessage("შესვლა წარმატებით შესრულდა.");
    } catch {
      setSubmitMessage(
        "სერვერთან დაკავშირება ვერ მოხერხდა. შეამოწმეთ ინტერნეტკავშირი და სცადეთ ხელახლა.",
      );
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <h1 id="login-title">შესვლა</h1>
        <p className={styles.eyebrow}>კეთილი იყოს თქვენი დაბრუნება</p>
        <p className={styles.description}>
          შედით ანგარიშზე, რომ მაღაზიით ისარგებლოთ
        </p>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <label className={styles.visuallyHidden} htmlFor="username">
            მომხმარებლის სახელი
          </label>
          <input
            id="username"
            type="text"
            placeholder="მომხმარებლის სახელი"
            autoComplete="username"
            aria-invalid={Boolean(errors.username)}
            aria-describedby={errors.username ? "username-error" : undefined}
            {...register("username")}
          />
          {errors.username && (
            <p className={styles.fieldError} id="username-error" role="alert">
              {errors.username.message}
            </p>
          )}
          <label className={styles.visuallyHidden} htmlFor="password">
            პაროლი
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="პაროლი"
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.fieldError} id="password-error" role="alert">
              {errors.password.message}
            </p>
          )}
          <button
            className={styles.passwordToggle}
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-pressed={showPassword}
          >
            {showPassword ? "პაროლის დამალვა" : "პაროლის ნახვა"}
          </button>
          <label className={styles.rememberMe}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            <span>Remember me</span>
          </label>
          {submitMessage && (
            <p
              className={`${styles.submitMessage} ${
                isLoginSuccessful ? styles.submitSuccess : ""
              }`}
              role={isLoginSuccessful ? "status" : "alert"}
            >
              {submitMessage}
            </p>
          )}
          <button
            className={styles.submitButton}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "მიმდინარეობს..." : "შესვლა"}
          </button>
        </form>
      </section>
      <p className={styles.accountPrompt}>
        არ გაქვთ ანგარიში? <Link href="/register">რეგისტრაცია</Link>
      </p>
    </main>
  );
}
