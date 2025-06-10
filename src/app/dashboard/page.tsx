"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../../components/Button/Button";
import { getUserData, logout, type UserData } from "../../services/authService";
import { displayPhoneNumber } from "../../utils/validation";
import styles from "./page.module.scss";

const DashboardPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = getUserData();
        if (userData) {
          setUserData(userData);
        } else {
          // If no user data, redirect to auth
          router.push("/auth");
          return;
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // If error checking auth, redirect to auth
        router.push("/auth");
        return;
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  if (!userData) {
    return null; // Will redirect to auth
  }

  const formatLoginTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <Image
            src={userData.picture.large}
            alt="User Avatar"
            className={styles.avatar}
            width={120}
            height={120}
          />
          <div className={styles.userInfo}>
            <h1 className={styles.userName}>
              {userData.name.first} {userData.name.last}
            </h1>
            <Button onClick={handleLogout} variant="secondary">
              خروج
            </Button>
          </div>
        </header>

        <main className={styles.details}>
          <h2>اطلاعات کاربر</h2>
          <div className={styles.detailItem}>
            <span>نام:</span>
            <span>
              {userData.name.first} {userData.name.last}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span>ایمیل:</span>
            <span>{userData.email}</span>
          </div>
          <div className={styles.detailItem}>
            <span>تلفن:</span>
            <span style={{ direction: "ltr", unicodeBidi: "isolate" }}>
              {displayPhoneNumber(userData.phone)}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span>موقعیت:</span>
            <span>
              {userData.location.city}, {userData.location.country}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span>زمان ورود:</span>
            <span>{formatLoginTime(userData.loginTime)}</span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
