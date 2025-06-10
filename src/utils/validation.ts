import * as Yup from "yup";

// Iranian phone number validation regex
const IRANIAN_PHONE_REGEX = /^(?:0|98|\+98)?9\d{9}$/;

/**
 * Validation schema for Iranian phone numbers
 */
export const iranianPhoneValidation = Yup.string()
  .required("شماره تلفن الزامی است")
  .test(
    "iranian-phone",
    "شماره تلفن معتبر نیست (مثال: 09123456789)",
    function (value) {
      if (!value) return false;
      // تبدیل اعداد فارسی/عربی به انگلیسی
      const englishValue = toEnglishDigits(value);
      // Remove all non-digit characters
      const cleanPhone = englishValue.replace(/\D/g, "");

      // Test against Iranian phone patterns
      return IRANIAN_PHONE_REGEX.test(cleanPhone);
    }
  );

/**
 * Auth form validation schema
 */
export const authValidationSchema = Yup.object({
  phone: iranianPhoneValidation,
});

/**
 * Form values interface
 */
export interface AuthFormValues {
  phone: string;
}

/**
 * Initial form values
 */
export const initialAuthValues: AuthFormValues = {
  phone: "",
};

/**
 * Helper function to convert Persian/Arabic digits to English digits
 */
const toEnglishDigits = (input: string): string => {
  return input
    .replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728))
    .replace(/[٠-٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1632));
};

/**
 * Helper function to format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  // تبدیل اعداد فارسی/عربی به انگلیسی
  const englishPhone = toEnglishDigits(phone);
  // Remove all non-digit characters
  const cleaned = englishPhone.replace(/\D/g, "");

  // Format as 09XX XXX XXXX if it's 11 digits starting with 09
  if (cleaned.length === 11 && cleaned.startsWith("09")) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }

  return englishPhone;
};

/**
 * Helper function to clean phone number (remove formatting)
 */
export const cleanPhoneNumber = (phone: string): string => {
  // تبدیل اعداد فارسی/عربی به انگلیسی
  return toEnglishDigits(phone).replace(/\D/g, "");
};

/**
 * Validate Iranian phone number
 */
export const validateIranianPhone = (phone: string): boolean => {
  if (!phone) return false;
  const cleanPhone = cleanPhoneNumber(phone);
  return IRANIAN_PHONE_REGEX.test(cleanPhone);
};

/**
 * Helper function to display phone number without spaces (for dashboard)
 */
export const displayPhoneNumber = (phone: string): string => {
  // تبدیل اعداد فارسی/عربی به انگلیسی، حذف همه کاراکترهای غیرعددی و trim کردن
  return toEnglishDigits(phone).replace(/\D+/g, "").trim();
};
