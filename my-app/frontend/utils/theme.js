// Color Theme Configuration
export const colors = {
  // Primary Colors
  primary: "#A78BFA", // Lavender
  secondary: "#FF9F80", // Peach
  accent: "#A8E6CF", // Mint

  // Neutral Colors
  white: "#FFFFFF", // Pure White
  slate: "#6B7280", // Warm Gray

  // Semantic Colors
  background: "#F7F7F7", // Off-White
  surface: "#FFFFFF", // Card/surface background
  text: {
    primary: "#6B7280", // Main text color
    secondary: "#9CA3AF", // Secondary text
    light: "#FFFFFF", // Text on dark backgrounds
  },

  // Status Colors
  success: "#A8E6CF", // Using accent mint
  warning: "#FF9F80", // Using secondary peach
  error: "#FF5252", // Error red
  info: "#A78BFA", // Using primary lavender

  // Border Colors
  border: "#E5E7EB",
  borderLight: "#F3F4F6",

  // Shadow Colors
  shadow: "rgba(107, 114, 128, 0.1)", // Warm Gray with opacity
};

// Common styles that can be reused
export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    primary: {
      backgroundColor: colors.primary,
      borderRadius: 25,
      paddingVertical: 14,
      paddingHorizontal: 32,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    secondary: {
      backgroundColor: colors.secondary,
      borderRadius: 25,
      paddingVertical: 14,
      paddingHorizontal: 32,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    accent: {
      backgroundColor: colors.accent,
      borderRadius: 25,
      paddingVertical: 14,
      paddingHorizontal: 32,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    backgroundColor: colors.white,
    fontSize: 16,
    color: colors.text.primary,
  },
  text: {
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text.primary,
      marginBottom: 8,
    },
    subheading: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text.primary,
      marginBottom: 4,
    },
    body: {
      fontSize: 16,
      color: colors.text.primary,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      color: colors.text.secondary,
    },
  },
};
