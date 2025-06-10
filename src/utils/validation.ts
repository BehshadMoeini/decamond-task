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

      // Remove all non-digit characters
      const cleanPhone = value.replace(/\D/g, "");

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
 * Helper function to format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Format as 09XX XXX XXXX if it's 11 digits starting with 09
  if (cleaned.length === 11 && cleaned.startsWith("09")) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }

  return phone;
};

/**
 * Helper function to clean phone number (remove formatting)
 */
export const cleanPhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, "");
};

/**
 * Validate Iranian phone number
 */
export const validateIranianPhone = (phone: string): boolean => {
  if (!phone) return false;
  const cleanPhone = cleanPhoneNumber(phone);
  return IRANIAN_PHONE_REGEX.test(cleanPhone);
};
