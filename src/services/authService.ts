// User authentication service
export interface UserData {
  name: {
    first: string;
    last: string;
    title: string;
  };
  email: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  location: {
    city: string;
    country: string;
    state: string;
  };
  loginTime: string;
  gender: string;
  dob: {
    date: string;
    age: number;
  };
}

export interface RandomUserResponse {
  results: Array<UserData>;
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

const API_URL = "https://randomuser.me/api/?results=1&nat=us";
const STORAGE_KEY = "userData";

/**
 * Fetch random user data from RandomUser.me API
 */
export async function fetchRandomUser(): Promise<UserData> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RandomUserResponse = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("No user data received from API");
    }

    const user = data.results[0];

    return {
      ...user,
      loginTime: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw new Error("خطا در دریافت اطلاعات کاربر از سرور");
  }
}

/**
 * Login user with phone number
 */
export async function login(phoneNumber: string): Promise<UserData> {
  try {
    // Fetch random user data
    const userData = await fetchRandomUser();

    // Add the entered phone number to user data
    userData.phone = phoneNumber;

    // Save to localStorage
    saveUserData(userData);

    return userData;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

/**
 * Save user data to localStorage
 */
export function saveUserData(userData: UserData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error("Failed to save user data:", error);
    throw new Error("خطا در ذخیره اطلاعات کاربر");
  }
}

/**
 * Get user data from localStorage
 */
export function getUserData(): UserData | null {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) {
      return null;
    }
    return JSON.parse(storedData) as UserData;
  } catch (error) {
    console.error("Failed to parse user data:", error);
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getUserData() !== null;
}

/**
 * Logout user
 */
export function logout(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to logout:", error);
  }
}

/**
 * Clear all stored data
 */
export function clearStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Failed to clear storage:", error);
  }
}
