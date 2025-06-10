"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { login } from "../../services/authService";
import {
  authValidationSchema,
  initialAuthValues,
  type AuthFormValues,
} from "../../utils/validation";
import styles from "./page.module.scss";

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const handleSubmit = async (values: AuthFormValues) => {
    setIsLoading(true);
    setSubmitError("");

    try {
      // Login user with phone number
      await login(values.phone);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("خطا در ورود، لطفاً دوباره تلاش کنید");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1 className={styles.title}>ورود به سیستم</h1>
          <p className={styles.subtitle}>شماره تلفن خود را وارد کنید</p>
        </div>

        <Formik
          initialValues={initialAuthValues}
          validationSchema={authValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleBlur, setFieldValue }) => (
            <Form className={styles.authForm}>
              <Input
                name="phone"
                type="tel"
                placeholder="شماره تلفن (09123456789)"
                value={values.phone}
                onChange={(value) => setFieldValue("phone", value)}
                onBlur={handleBlur}
                error={errors.phone}
                touched={touched.phone}
                required
                disabled={isLoading}
                autoComplete="tel"
              />

              {submitError && (
                <div className={styles.submitError}>{submitError}</div>
              )}

              <Button
                type="submit"
                loading={isLoading}
                disabled={!values.phone.trim() || isLoading || !!errors.phone}
              >
                ورود
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthPage;
