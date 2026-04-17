// ---------------------------------------------------------------------------
// Field-Level Technical Specifications
// Validation rules, constraints, formatting, error messages & UX guidelines
// for every common field type — with MENA / GCC regional considerations.
// ---------------------------------------------------------------------------

export interface ValidationRule {
  name: string;
  description: string;
  regex?: string;
  example?: string;
}

export interface FieldSpecification {
  type: string;
  label: string;
  description: string;
  icon: string;
  htmlType: string;
  validations: ValidationRule[];
  constraints: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    accept?: string;
  };
  formatting: {
    placeholder: string;
    mask?: string;
    prefix?: string;
    suffix?: string;
    thousandSeparator?: boolean;
    decimalPlaces?: number;
  };
  errorMessages: {
    required: string;
    invalid: string;
    minLength?: string;
    maxLength?: string;
    pattern?: string;
    custom?: string;
  };
  uxGuidelines: string[];
  accessibility: string[];
  regionalNotes?: string[];
}

// ── Specification data ─────────────────────────────────────────────────────

const FIELD_SPECIFICATIONS: FieldSpecification[] = [
  // 1 ── Email ──────────────────────────────────────────────────────────────
  {
    type: "email",
    label: "Email Address",
    description:
      "Standard email input with RFC 5322 format validation. Supports international domain names.",
    icon: "email",
    htmlType: "email",
    validations: [
      {
        name: "format",
        description: "Must match RFC 5322 email format (local@domain.tld)",
        regex:
          "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
        example: "user@example.com",
      },
      {
        name: "domain",
        description:
          "Domain part must contain at least one dot and a valid TLD. Consider server-side MX-record lookup for critical flows.",
      },
      {
        name: "no-consecutive-dots",
        description: "Local part must not contain consecutive dots (..)",
        regex: "^(?!.*\\.\\.).*$",
      },
    ],
    constraints: {
      required: true,
      minLength: 5,
      maxLength: 254,
      pattern:
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$",
    },
    formatting: {
      placeholder: "name@company.com",
    },
    errorMessages: {
      required: "Email address is required",
      invalid: "Please enter a valid email address (e.g. name@company.com)",
      maxLength: "Email address must not exceed 254 characters",
      pattern: "Email format is invalid — check for typos in the domain",
    },
    uxGuidelines: [
      "Place the label above the input; never use the placeholder as the sole label.",
      "Validate on blur rather than on every keystroke to avoid premature errors.",
      "Show a subtle suggestion if common domain typos are detected (e.g. gmial.com → gmail.com).",
      "Use inputmode='email' on mobile to surface the @ key on the soft keyboard.",
      "Include helper text 'We'll never share your email' for sign-up forms to reduce anxiety.",
    ],
    accessibility: [
      "Associate a visible <label> with the input via htmlFor / for attribute.",
      "Set autocomplete='email' so browsers and password managers can autofill.",
      "Use aria-describedby to link inline error messages to the input.",
      "Ensure error messages are announced via aria-live='polite' region.",
      "Provide aria-invalid='true' when the field is in an error state.",
    ],
    regionalNotes: [
      "Support right-to-left (RTL) layout when the surrounding UI is Arabic, but note that email addresses themselves are always LTR — wrap in a <bdo dir='ltr'> if needed.",
      "International domain names (IDN) with Arabic script are valid but rare; consider normalising to punycode server-side.",
    ],
  },

  // 2 ── Full Name ──────────────────────────────────────────────────────────
  {
    type: "fullName",
    label: "Full Name",
    description:
      "Accepts letters (Latin + Arabic), spaces, hyphens, apostrophes, and common diacritics. Trims leading/trailing whitespace on submit.",
    icon: "user",
    htmlType: "text",
    validations: [
      {
        name: "allowed-chars",
        description:
          "Letters (any script), spaces, hyphens, apostrophes, and periods",
        regex: "^[\\p{L}\\s'\\-\\.]+$",
        example: "عبدالله محمد",
      },
      {
        name: "no-leading-trailing-spaces",
        description: "Value must be trimmed before submission",
      },
      {
        name: "no-consecutive-spaces",
        description: "No more than one consecutive space between name parts",
        regex: "^(?!.*  ).*$",
      },
    ],
    constraints: {
      required: true,
      minLength: 2,
      maxLength: 100,
      pattern: "^[\\p{L}\\s'\\-\\.]{2,100}$",
    },
    formatting: {
      placeholder: "e.g. Ahmed Al-Rashid",
    },
    errorMessages: {
      required: "Full name is required",
      invalid:
        "Name may only contain letters, spaces, hyphens, and apostrophes",
      minLength: "Name must be at least 2 characters",
      maxLength: "Name must not exceed 100 characters",
      pattern: "Please enter a valid name without numbers or special symbols",
    },
    uxGuidelines: [
      "Use a single 'Full Name' field rather than splitting first/last — many cultures have different naming conventions.",
      "Validate on blur and trim whitespace automatically before submission.",
      "Never title-case or force-capitalize input — users know how to spell their own names.",
      "Set inputmode='text' and avoid restricting to ASCII; Arabic, Hindi, Urdu names are common in MENA.",
      "Show character count only when approaching maxLength (e.g. last 20 chars).",
    ],
    accessibility: [
      "Set autocomplete='name' to allow browser autofill.",
      "Provide a visible label 'Full Name' — do not rely solely on placeholder text.",
      "Use aria-required='true' when the field is mandatory.",
      "Announce validation errors with aria-live='polite'.",
      "Ensure the input can be fully operated with keyboard only (Tab, Shift+Tab).",
    ],
    regionalNotes: [
      "Arabic names can include patronymic chains (e.g. محمد بن عبدالله بن سعود) — allow generous maxLength.",
      "Support bidirectional text; the input should respect the document's dir attribute and allow mixing LTR/RTL.",
      "Avoid assumptions about name structure — 'bin', 'bint', 'al-' are integral parts of names, not separators.",
      "In Saudi Arabia, four-part names (الاسم الرباعي) are common on government forms; consider an optional 'as on official ID' hint.",
    ],
  },

  // 3 ── Phone Number ───────────────────────────────────────────────────────
  {
    type: "phone",
    label: "Phone Number",
    description:
      "International phone number with country code. Optimised for GCC formats but supports worldwide numbers via E.164.",
    icon: "phone",
    htmlType: "tel",
    validations: [
      {
        name: "e164-format",
        description: "Must be in E.164 format (+ followed by digits only)",
        regex: "^\\+[1-9]\\d{6,14}$",
        example: "+971501234567",
      },
      {
        name: "gcc-formats",
        description:
          "Common GCC codes: +971 (UAE), +966 (KSA), +973 (Bahrain), +974 (Qatar), +965 (Kuwait), +968 (Oman), +20 (Egypt)",
      },
      {
        name: "digits-only",
        description:
          "After the country code, the number must contain only digits",
        regex: "^\\+\\d+$",
      },
    ],
    constraints: {
      required: true,
      minLength: 7,
      maxLength: 15,
      pattern: "^\\+[1-9]\\d{6,14}$",
    },
    formatting: {
      placeholder: "+971 50 123 4567",
      mask: "+XXX XX XXX XXXX",
      prefix: "+",
    },
    errorMessages: {
      required: "Phone number is required",
      invalid: "Please enter a valid phone number with country code",
      minLength: "Phone number is too short",
      maxLength: "Phone number is too long",
      pattern:
        "Phone number must start with + followed by country code and digits",
    },
    uxGuidelines: [
      "Provide a country-code dropdown pre-filled with the user's locale or the most common GCC codes.",
      "Display the formatted number (e.g. +971 50 123 4567) but store it stripped in E.164 format.",
      "Validate on blur; avoid blocking input of formatting characters (spaces, dashes) — strip them on submit.",
      "Use inputmode='tel' to display the phone-specific keyboard on mobile.",
      "Show a flag icon alongside the country code for quick visual identification.",
    ],
    accessibility: [
      "Set autocomplete='tel' for autofill support.",
      "Label the country-code selector separately (e.g. 'Country Code') and group it with the number input via fieldset.",
      "Use aria-describedby to convey the expected format (e.g. +971 XX XXX XXXX).",
      "Ensure the country-code dropdown is keyboard-navigable with arrow keys and type-ahead.",
      "Announce format changes (e.g. when country changes and mask updates) via aria-live region.",
    ],
    regionalNotes: [
      "UAE mobile numbers: +971 5X XXX XXXX (10 digits after code). Landlines: +971 X XXX XXXX.",
      "Saudi mobile: +966 5X XXX XXXX. Landlines vary by region.",
      "Qatar numbers are 8 digits (no area code): +974 XXXX XXXX.",
      "Kuwait numbers are 8 digits: +965 XXXX XXXX.",
      "Bahrain numbers are 8 digits: +973 XXXX XXXX.",
      "Oman: +968 XXXX XXXX (8 digits). Egypt: +20 then 10 digits for mobile.",
      "Some users enter numbers with Eastern Arabic numerals (٠١٢٣٤٥٦٧٨٩); normalise to Western Arabic on submit.",
    ],
  },

  // 4 ── Date ───────────────────────────────────────────────────────────────
  {
    type: "date",
    label: "Date",
    description:
      "Single-date picker supporting DD/MM/YYYY format (MENA convention). Handles min/max constraints and optional Hijri display.",
    icon: "calendar",
    htmlType: "date",
    validations: [
      {
        name: "format",
        description: "Display as DD/MM/YYYY; store as ISO 8601 (YYYY-MM-DD)",
        regex: "^\\d{4}-\\d{2}-\\d{2}$",
        example: "2024-03-15",
      },
      {
        name: "real-date",
        description:
          "Must be a real calendar date (no 31 February, no 13th month)",
      },
      {
        name: "no-future-dob",
        description:
          "When used for date of birth, the date must not be in the future",
      },
    ],
    constraints: {
      required: true,
      pattern: "^\\d{4}-\\d{2}-\\d{2}$",
    },
    formatting: {
      placeholder: "DD/MM/YYYY",
      mask: "DD/MM/YYYY",
    },
    errorMessages: {
      required: "Date is required",
      invalid: "Please enter a valid date in DD/MM/YYYY format",
      pattern: "Date must follow the DD/MM/YYYY format",
      custom: "Date of birth cannot be in the future",
    },
    uxGuidelines: [
      "Always use a calendar picker; do not rely on the browser's native date input which varies across platforms.",
      "Display the selected date in DD/MM/YYYY format as this is the MENA convention (not MM/DD/YYYY).",
      "For date of birth, provide year/month quick-select to avoid excessive scrolling.",
      "Show the Hijri equivalent alongside the Gregorian date where culturally appropriate.",
      "Validate on blur; show inline error below the field, not in a tooltip.",
    ],
    accessibility: [
      "Ensure the calendar picker is fully keyboard-navigable (arrow keys for days, Page Up/Down for months).",
      "Use role='dialog' for the calendar popup with aria-label='Choose date'.",
      "Announce the selected date via aria-live='assertive' when the user picks a date.",
      "Support manual keyboard entry as an alternative to the picker for screen-reader users.",
      "Set autocomplete='bday' for date-of-birth fields.",
    ],
    regionalNotes: [
      "MENA region uses DD/MM/YYYY format — never default to US-style MM/DD/YYYY.",
      "Offer optional Hijri (Islamic) calendar display using the Umm al-Qura calendar for Saudi Arabia.",
      "Friday–Saturday is the weekend in most GCC countries; reflect this in calendar highlighting.",
      "Consider supporting Eastern Arabic numeral display (٢٠٢٤/٠٣/١٥) as a user preference.",
      "Government and banking forms in the GCC often require both Hijri and Gregorian dates.",
    ],
  },

  // 5 ── Date Range ─────────────────────────────────────────────────────────
  {
    type: "dateRange",
    label: "Date Range",
    description:
      "Start-date and end-date pair with cross-field validation. End date must be equal to or after start date.",
    icon: "calendarRange",
    htmlType: "date",
    validations: [
      {
        name: "start-before-end",
        description: "Start date must be on or before end date",
      },
      {
        name: "max-span",
        description:
          "Optional max range constraint (e.g. max 365 days for reporting)",
      },
      {
        name: "format",
        description: "Both dates follow DD/MM/YYYY display, ISO 8601 storage",
        regex: "^\\d{4}-\\d{2}-\\d{2}$",
        example: "2024-01-01 to 2024-12-31",
      },
    ],
    constraints: {
      required: true,
      pattern: "^\\d{4}-\\d{2}-\\d{2}$",
    },
    formatting: {
      placeholder: "Start date — End date",
      mask: "DD/MM/YYYY — DD/MM/YYYY",
    },
    errorMessages: {
      required: "Both start and end dates are required",
      invalid: "Please select valid start and end dates",
      custom: "End date must be on or after the start date",
    },
    uxGuidelines: [
      "Use a dual-calendar picker showing two months side by side for easy range selection.",
      "Highlight the selected range visually between start and end dates.",
      "Provide quick-select presets: 'Last 7 days', 'Last 30 days', 'This month', 'This quarter'.",
      "Auto-focus the end-date input after the start date is selected.",
      "Validate cross-field (end ≥ start) on blur of the end-date input.",
    ],
    accessibility: [
      "Wrap both inputs in a <fieldset> with a <legend> like 'Select date range'.",
      "Use aria-describedby on the end-date input to reference a hint about the start date.",
      "Announce range presets and their resulting dates when selected.",
      "Ensure both calendar pickers are independently keyboard-navigable.",
      "Use aria-invalid on the end-date field when the range is invalid.",
    ],
    regionalNotes: [
      "Display in DD/MM/YYYY format consistent with single-date fields.",
      "Offer Hijri range display alongside Gregorian where appropriate.",
      "Consider that fiscal years in some GCC countries start in January, others follow the Hijri calendar.",
    ],
  },

  // 6 ── Amount / Currency ──────────────────────────────────────────────────
  {
    type: "currency",
    label: "Amount / Currency",
    description:
      "Monetary value input with locale-aware formatting, thousand separators, and configurable decimal precision.",
    icon: "currency",
    htmlType: "text",
    validations: [
      {
        name: "numeric",
        description: "Must be a valid non-negative number",
        regex: "^\\d{1,15}(\\.\\d{1,3})?$",
        example: "1234.50",
      },
      {
        name: "precision",
        description:
          "Decimal places depend on currency: 2 for USD/EUR/AED/SAR/QAR, 3 for BHD/KWD/OMR",
      },
      {
        name: "no-negative",
        description: "Amount must be zero or positive unless explicitly allowed",
      },
    ],
    constraints: {
      required: true,
      min: 0,
      max: 999999999999.999,
      pattern: "^\\d{1,15}(\\.\\d{1,3})?$",
    },
    formatting: {
      placeholder: "0.00",
      thousandSeparator: true,
      decimalPlaces: 2,
      prefix: "",
    },
    errorMessages: {
      required: "Amount is required",
      invalid: "Please enter a valid monetary amount",
      pattern: "Amount must be a number with up to 3 decimal places",
      custom: "Amount exceeds the maximum allowed value",
    },
    uxGuidelines: [
      "Display the currency code (AED, SAR) or symbol next to the input — before for USD/EUR, after for AED/SAR/QAR.",
      "Format with thousand separators as the user types (e.g. 1,234,567.89) but store the raw number.",
      "Use inputmode='decimal' on mobile to present the numeric keyboard with a decimal point.",
      "Right-align amounts in table cells and form fields for easy comparison.",
      "Show the equivalent in a secondary currency if the app supports multi-currency.",
    ],
    accessibility: [
      "Label the input clearly, e.g. 'Amount (AED)' — include the currency in the label.",
      "Set role='spinbutton' with aria-valuemin, aria-valuemax, and aria-valuenow for screen readers.",
      "Use aria-describedby to explain the format (e.g. 'Enter amount in AED with up to 2 decimal places').",
      "Ensure thousand separators are visual only and stripped from the accessible value.",
      "Support keyboard increment/decrement with Up/Down arrow keys.",
    ],
    regionalNotes: [
      "AED (UAE Dirham) — 2 decimal places (fils), symbol: د.إ, position: after the number (e.g. 1,234.56 د.إ).",
      "SAR (Saudi Riyal) — 2 decimal places (halalas), symbol: ر.س, position: after.",
      "QAR (Qatari Riyal) — 2 decimal places (dirhams), symbol: ر.ق, position: after.",
      "BHD (Bahraini Dinar) — 3 decimal places (fils), symbol: .د.ب, position: after.",
      "KWD (Kuwaiti Dinar) — 3 decimal places (fils), symbol: د.ك, position: after.",
      "OMR (Omani Rial) — 3 decimal places (baisa), symbol: ر.ع., position: after.",
      "Some users prefer Eastern Arabic numerals (١٬٢٣٤٫٥٦) — support toggle or auto-detect from locale.",
      "Arabic locale uses a comma (٫) as decimal separator and a dot or Arabic comma as thousand separator.",
    ],
  },

  // 7 ── Percentage ─────────────────────────────────────────────────────────
  {
    type: "percentage",
    label: "Percentage",
    description:
      "Numeric input constrained to 0–100 with optional decimal precision and a % suffix.",
    icon: "percent",
    htmlType: "number",
    validations: [
      {
        name: "range",
        description: "Value must be between 0 and 100 inclusive",
        regex: "^(100(\\.0{1,2})?|\\d{1,2}(\\.\\d{1,2})?)$",
        example: "75.5",
      },
      {
        name: "decimal-precision",
        description: "Maximum 2 decimal places",
      },
    ],
    constraints: {
      required: true,
      min: 0,
      max: 100,
      pattern: "^(100(\\.0{1,2})?|\\d{1,2}(\\.\\d{1,2})?)$",
    },
    formatting: {
      placeholder: "0",
      suffix: "%",
      decimalPlaces: 2,
    },
    errorMessages: {
      required: "Percentage is required",
      invalid: "Please enter a number between 0 and 100",
      pattern: "Percentage must be 0–100 with up to 2 decimal places",
    },
    uxGuidelines: [
      "Display a '%' suffix inside the input or immediately adjacent — never require the user to type it.",
      "Use inputmode='decimal' on mobile for the numeric keyboard.",
      "Consider a slider alongside the number input for quick approximate entry.",
      "Validate on blur and clamp out-of-range values to nearest bound with a toast notification.",
      "Right-align the value for consistency with other numeric fields.",
    ],
    accessibility: [
      "Set aria-valuemin='0', aria-valuemax='100', and aria-valuenow on the input.",
      "Include '%' in the accessible label or aria-describedby (e.g. 'Discount percentage').",
      "Support Up/Down arrow keys to increment by 1, Shift+Arrow for ±10.",
      "Announce clamped corrections via aria-live='polite'.",
      "Pair with a visible label; the suffix alone is insufficient for screen readers.",
    ],
  },

  // 8 ── Text Input (Short) ─────────────────────────────────────────────────
  {
    type: "textShort",
    label: "Text Input (Short)",
    description:
      "General-purpose single-line text field. Trims whitespace and guards against XSS via server-side sanitisation.",
    icon: "textInput",
    htmlType: "text",
    validations: [
      {
        name: "non-empty",
        description: "Must not be blank after trimming whitespace",
      },
      {
        name: "safe-chars",
        description:
          "Allowed: letters, numbers, spaces, common punctuation. Disallow angle brackets and script tags.",
        regex: "^[^<>]*$",
      },
      {
        name: "xss-sanitisation",
        description:
          "Server-side: strip or encode HTML entities. Client-side: use textContent, never innerHTML.",
      },
    ],
    constraints: {
      required: true,
      minLength: 1,
      maxLength: 255,
    },
    formatting: {
      placeholder: "Enter text…",
    },
    errorMessages: {
      required: "This field is required",
      invalid: "Input contains disallowed characters",
      minLength: "Please enter at least 1 character",
      maxLength: "Must not exceed 255 characters",
    },
    uxGuidelines: [
      "Use concise, specific labels — 'Company Name' not 'Enter your company name here'.",
      "Validate on blur for required/format; validate on submit as a final check.",
      "Placeholder text should be an example, not a repeat of the label.",
      "Trim whitespace automatically on blur so users don't submit accidental spaces.",
      "Show a character counter only when maxLength is relatively short (< 100) or the user is near the limit.",
    ],
    accessibility: [
      "Always pair with a visible <label> element.",
      "Use aria-required='true' for mandatory fields.",
      "Set aria-describedby to reference helper text or character-count elements.",
      "Ensure focus outline is visible and meets WCAG 2.1 contrast requirements (3:1 minimum).",
      "Support standard keyboard shortcuts: Ctrl+A (select all), Ctrl+Z (undo).",
    ],
    regionalNotes: [
      "Support bidirectional input — Arabic text will flow RTL automatically if the input inherits dir='auto'.",
      "Avoid regex patterns that inadvertently block Arabic, Persian, or Urdu characters.",
    ],
  },

  // 9 ── Text Area (Long) ───────────────────────────────────────────────────
  {
    type: "textArea",
    label: "Text Area (Long)",
    description:
      "Multi-line text input for descriptions, comments, and notes. Supports character counting and optional rich-text mode.",
    icon: "textArea",
    htmlType: "textarea",
    validations: [
      {
        name: "non-empty",
        description: "Must not be blank after trimming when required",
      },
      {
        name: "max-length",
        description: "Enforced character limit (default 5000)",
      },
      {
        name: "line-breaks",
        description:
          "Normalise line endings to \\n before storage; strip excessive blank lines (3+ → 2).",
      },
    ],
    constraints: {
      required: false,
      minLength: 0,
      maxLength: 5000,
    },
    formatting: {
      placeholder: "Add a description…",
    },
    errorMessages: {
      required: "This field is required",
      invalid: "Text contains disallowed content",
      minLength: "Please enter at least the minimum required text",
      maxLength: "Text must not exceed 5,000 characters",
    },
    uxGuidelines: [
      "Show a live character counter in the format '142 / 5,000' below the bottom-right corner.",
      "Auto-grow the textarea height as the user types (up to a max height, then scroll).",
      "Decide between plain text and rich text upfront — do not mix modes without a clear toggle.",
      "Use placeholder text sparingly; prefer a short helper sentence below the label.",
      "Validate on blur for required; check maxLength in real-time and prevent further input at the limit.",
    ],
    accessibility: [
      "Use a visible <label> — do not rely on placeholder alone.",
      "Set aria-describedby referencing the character counter element.",
      "Announce when the user is within 10% of the character limit via aria-live='polite'.",
      "Ensure the textarea is resizable via keyboard (or provide explicit resize handles).",
      "For rich-text editors, ensure all toolbar buttons have aria-labels and are keyboard-reachable.",
    ],
    regionalNotes: [
      "Set dir='auto' on the textarea so Arabic text flows RTL automatically.",
      "Rich-text toolbar icons should be mirrored in RTL mode (e.g. left-align becomes right-align).",
      "Avoid character-count discrepancies with Arabic diacritics (harakat) — count Unicode code points, not bytes.",
    ],
  },

  // 10 ── Password ──────────────────────────────────────────────────────────
  {
    type: "password",
    label: "Password",
    description:
      "Secure password input with complexity requirements and optional strength meter.",
    icon: "lock",
    htmlType: "password",
    validations: [
      {
        name: "min-length",
        description: "Minimum 8 characters",
      },
      {
        name: "complexity",
        description:
          "Must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
        regex:
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,128}$",
        example: "P@ssw0rd!",
      },
      {
        name: "no-common-passwords",
        description:
          "Reject passwords found in common-password dictionaries (e.g. 'password123')",
      },
      {
        name: "no-personal-info",
        description:
          "Password should not contain the user's name or email local part",
      },
    ],
    constraints: {
      required: true,
      minLength: 8,
      maxLength: 128,
      pattern:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,128}$",
    },
    formatting: {
      placeholder: "Enter a strong password",
    },
    errorMessages: {
      required: "Password is required",
      invalid: "Password does not meet complexity requirements",
      minLength: "Password must be at least 8 characters",
      maxLength: "Password must not exceed 128 characters",
      pattern:
        "Must include uppercase, lowercase, number, and special character",
      custom: "This password is too common — please choose a stronger one",
    },
    uxGuidelines: [
      "Show a real-time strength indicator (Weak / Fair / Strong / Very Strong) with colour coding.",
      "Provide a show/hide toggle (eye icon) so users can verify their input.",
      "List complexity requirements as a checklist that turns green as each rule is met.",
      "Do not disable paste — password managers rely on pasting.",
      "For 'new password' fields, display requirements upfront; for 'current password' fields, just validate on submit.",
    ],
    accessibility: [
      "Set autocomplete='new-password' for registration forms; autocomplete='current-password' for login.",
      "Use aria-describedby to reference the requirements list.",
      "Announce strength-meter changes via aria-live='polite'.",
      "Ensure the show/hide toggle is keyboard-operable and has an aria-label ('Show password' / 'Hide password').",
      "Do not convey requirements solely by colour — use text labels alongside colour indicators.",
    ],
  },

  // 11 ── URL ───────────────────────────────────────────────────────────────
  {
    type: "url",
    label: "URL",
    description:
      "Web address input requiring http:// or https:// protocol. Validates format and enforces max length.",
    icon: "link",
    htmlType: "url",
    validations: [
      {
        name: "protocol",
        description: "Must start with http:// or https://",
        regex: "^https?://",
        example: "https://example.com",
      },
      {
        name: "format",
        description: "Must be a well-formed URL with valid domain",
        regex:
          "^https?://[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*(/[^\\s]*)?$",
      },
    ],
    constraints: {
      required: false,
      maxLength: 2083,
      pattern: "^https?://.+",
    },
    formatting: {
      placeholder: "https://example.com",
      prefix: "https://",
    },
    errorMessages: {
      required: "URL is required",
      invalid: "Please enter a valid URL starting with http:// or https://",
      maxLength: "URL must not exceed 2,083 characters",
      pattern: "URL must begin with http:// or https://",
    },
    uxGuidelines: [
      "Auto-prepend 'https://' if the user pastes a bare domain (e.g. example.com → https://example.com).",
      "Validate format on blur; optionally verify reachability server-side for critical flows.",
      "Use inputmode='url' on mobile to present the URL-optimised keyboard.",
      "Show a preview/favicon of the linked page after validation succeeds.",
      "Truncate very long URLs in display but keep the full value in the input.",
    ],
    accessibility: [
      "Set autocomplete='url' for autofill support.",
      "Use aria-describedby to explain the expected format.",
      "If a prefix is shown visually inside the input, ensure it's included in the accessible value.",
      "Announce validation success/failure via aria-live region.",
      "Make any 'open in new tab' icon button keyboard-focusable with an aria-label.",
    ],
  },

  // 12 ── National ID / Civil ID ────────────────────────────────────────────
  {
    type: "nationalId",
    label: "National ID / Civil ID",
    description:
      "Government-issued identification number. Format varies by GCC country. Strict pattern matching per country.",
    icon: "idCard",
    htmlType: "text",
    validations: [
      {
        name: "uae-emirates-id",
        description:
          "UAE Emirates ID: 784-YYYY-NNNNNNN-C (15 digits, starts with 784)",
        regex: "^784-?\\d{4}-?\\d{7}-?\\d$",
        example: "784-1990-1234567-1",
      },
      {
        name: "saudi-national-id",
        description:
          "Saudi National ID (Iqama): 10 digits, starts with 1 (citizen) or 2 (resident)",
        regex: "^[12]\\d{9}$",
        example: "1012345678",
      },
      {
        name: "kuwait-civil-id",
        description: "Kuwait Civil ID: 12 digits",
        regex: "^\\d{12}$",
        example: "281234567890",
      },
      {
        name: "bahrain-cpr",
        description: "Bahrain CPR: 9 digits",
        regex: "^\\d{9}$",
        example: "901234567",
      },
      {
        name: "qatar-qid",
        description: "Qatar QID: 11 digits",
        regex: "^\\d{11}$",
        example: "28012345678",
      },
    ],
    constraints: {
      required: true,
      minLength: 9,
      maxLength: 18,
    },
    formatting: {
      placeholder: "e.g. 784-1990-1234567-1",
      mask: "XXX-XXXX-XXXXXXX-X",
    },
    errorMessages: {
      required: "National ID is required",
      invalid: "Please enter a valid ID number for your country",
      pattern: "ID number format does not match the expected pattern",
      custom:
        "If you are unsure of your ID format, check your government-issued card",
    },
    uxGuidelines: [
      "Show the expected format dynamically based on the selected country.",
      "Auto-format with hyphens as the user types for UAE Emirates ID (784-XXXX-XXXXXXX-X).",
      "Validate the check digit (last digit) for Emirates ID using the Luhn algorithm variant.",
      "Provide a visual reference of where to find the ID number on the card.",
      "Use inputmode='numeric' to show the number pad on mobile.",
    ],
    accessibility: [
      "Label clearly: 'Emirates ID Number', 'Saudi National ID (Iqama)', etc.",
      "Use aria-describedby to reference format hint text.",
      "Do not mask the full number — this is not a secret value. Show all digits.",
      "Ensure error messages specify which part of the format is wrong.",
      "Support paste and auto-strip formatting characters (hyphens, spaces).",
    ],
    regionalNotes: [
      "UAE: Emirates ID is 15 digits formatted as 784-YYYY-NNNNNNN-C. The 784 is the country code, YYYY is birth year.",
      "Saudi Arabia: National ID (بطاقة الهوية) for citizens starts with 1; Iqama (إقامة) for residents starts with 2.",
      "Kuwait: Civil ID (البطاقة المدنية) is 12 digits starting with birth-year digits.",
      "Qatar: QID (بطاقة الهوية القطرية) is 11 digits.",
      "Bahrain: CPR (البطاقة الذكية) is 9 digits.",
      "Always store the raw digit string; format only for display.",
    ],
  },

  // 13 ── Postal Code ───────────────────────────────────────────────────────
  {
    type: "postalCode",
    label: "Postal Code",
    description:
      "Postal/ZIP code field. Many GCC countries do not use postal codes; format varies by country.",
    icon: "mapPin",
    htmlType: "text",
    validations: [
      {
        name: "uae-format",
        description: "UAE: No widely used postal code system (optional field)",
      },
      {
        name: "saudi-format",
        description: "Saudi Arabia: 5-digit postal code",
        regex: "^\\d{5}$",
        example: "12345",
      },
      {
        name: "qatar-format",
        description: "Qatar: No postal code system in common use",
      },
      {
        name: "kuwait-format",
        description: "Kuwait: 5-digit postal code",
        regex: "^\\d{5}$",
        example: "13001",
      },
      {
        name: "generic",
        description: "Alphanumeric, 3-10 characters for international support",
        regex: "^[A-Za-z0-9\\s-]{3,10}$",
        example: "SW1A 1AA",
      },
    ],
    constraints: {
      required: false,
      minLength: 3,
      maxLength: 10,
      pattern: "^[A-Za-z0-9\\s-]{3,10}$",
    },
    formatting: {
      placeholder: "e.g. 12345",
    },
    errorMessages: {
      required: "Postal code is required",
      invalid: "Please enter a valid postal code",
      pattern: "Postal code format is not recognised",
    },
    uxGuidelines: [
      "Make the field optional in GCC countries where postal codes are uncommon (UAE, Qatar, Bahrain, Oman).",
      "Auto-detect the expected format based on the selected country.",
      "Use inputmode='text' (not numeric) as some international codes contain letters.",
      "If the country doesn't use postal codes, hide the field entirely rather than showing it as disabled.",
      "Validate format on blur; do not block input while the user is typing.",
    ],
    accessibility: [
      "Set autocomplete='postal-code' for autofill support.",
      "Dynamically update the aria-label when the country changes (e.g. 'Saudi postal code — 5 digits').",
      "Use aria-required conditionally based on the selected country.",
      "Announce format changes via aria-live when the country selection changes.",
      "Provide clear helper text about the expected format.",
    ],
    regionalNotes: [
      "UAE: P.O. Box numbers are used instead of postal codes. Consider offering a P.O. Box field.",
      "Saudi Arabia: 5-digit postal codes were introduced via the National Address system (العنوان الوطني).",
      "Qatar, Bahrain, Oman: No postal codes in common use — zone/block numbers are used instead.",
      "Kuwait: 5-digit postal codes exist but are not universally used.",
      "Egypt: 5-digit postal codes are used.",
      "Never require a postal code for GCC addresses unless the country specifically uses them.",
    ],
  },

  // 14 ── File Upload ───────────────────────────────────────────────────────
  {
    type: "fileUpload",
    label: "File Upload",
    description:
      "File picker supporting drag-and-drop, multiple files, format restrictions, and size limits.",
    icon: "upload",
    htmlType: "file",
    validations: [
      {
        name: "file-type",
        description: "Only allowed MIME types / extensions are accepted",
      },
      {
        name: "file-size",
        description: "Each file must not exceed the configured max size (default 10 MB)",
      },
      {
        name: "file-count",
        description:
          "Total number of uploaded files must not exceed the configured limit",
      },
      {
        name: "virus-scan",
        description:
          "All uploaded files must pass server-side virus/malware scanning before acceptance",
      },
    ],
    constraints: {
      required: false,
      accept: ".pdf,.jpg,.jpeg,.png,.docx,.xlsx",
    },
    formatting: {
      placeholder: "Drag files here or click to browse",
    },
    errorMessages: {
      required: "Please upload at least one file",
      invalid: "One or more files are not in an accepted format",
      custom: "File size exceeds the maximum limit of 10 MB",
    },
    uxGuidelines: [
      "Provide a large drag-and-drop zone with a dashed border and icon; supplement with a 'Browse' button.",
      "Show accepted formats and max size clearly below the drop zone (e.g. 'PDF, JPG, PNG — max 10 MB each').",
      "Display upload progress per file with a progress bar and cancel button.",
      "After upload, show a file list with name, size, thumbnail (for images), and a remove button.",
      "Validate file type and size client-side before uploading to avoid wasted bandwidth.",
    ],
    accessibility: [
      "Use an accessible <label> like 'Upload documents' with a visually-hidden <input type='file'>.",
      "Announce upload progress and completion via aria-live='polite'.",
      "Ensure the drag-and-drop zone is keyboard-activatable (Enter/Space to open file picker).",
      "Provide a text-based alternative to drag-and-drop for keyboard and screen-reader users.",
      "Each uploaded file should have a remove button with aria-label='Remove [filename]'.",
    ],
    regionalNotes: [
      "Support Arabic filenames without breaking the upload or display.",
      "Government documents in GCC may be in Arabic PDF format — ensure the viewer supports Arabic text.",
      "Consider right-to-left layout for the file list and progress indicators in Arabic UI.",
    ],
  },

  // 15 ── Select / Dropdown ─────────────────────────────────────────────────
  {
    type: "select",
    label: "Select / Dropdown",
    description:
      "Single or multi-select dropdown with search, clear, and keyboard navigation.",
    icon: "dropdown",
    htmlType: "select",
    validations: [
      {
        name: "required-selection",
        description: "At least one option must be selected when required",
      },
      {
        name: "valid-option",
        description:
          "Selected value must match one of the provided options (prevent tampering)",
      },
    ],
    constraints: {
      required: true,
    },
    formatting: {
      placeholder: "Select an option…",
    },
    errorMessages: {
      required: "Please select an option",
      invalid: "Selected value is not valid",
    },
    uxGuidelines: [
      "Add a search/filter input when the option list exceeds 8 items.",
      "Use a placeholder 'Select…' as the first option — never pre-select a value unless there's a sensible default.",
      "For multi-select, show selected items as removable chips/tags above or inside the input.",
      "Include a 'Clear selection' action for optional single-select fields.",
      "Group related options with optgroup or visual section headers for long lists.",
    ],
    accessibility: [
      "Use a native <select> for simple lists; for custom dropdowns, use role='listbox' with role='option' children.",
      "Ensure keyboard navigation: arrow keys to move, Enter to select, Escape to close, type-ahead to jump.",
      "Set aria-expanded, aria-haspopup='listbox', and aria-activedescendant on custom selects.",
      "Multi-select: announce selected count (e.g. '3 of 10 selected') via aria-live.",
      "Set autocomplete attributes where applicable (e.g. autocomplete='country-name').",
    ],
    regionalNotes: [
      "Provide bilingual option labels (Arabic + English) for critical selectors like country or emirate.",
      "In RTL mode, the dropdown arrow should appear on the left side.",
      "Consider alphabetical sorting based on the active locale (Arabic collation differs from English).",
    ],
  },

  // 16 ── Checkbox ──────────────────────────────────────────────────────────
  {
    type: "checkbox",
    label: "Checkbox",
    description:
      "Boolean or group checkbox supporting required, group validation, and indeterminate state.",
    icon: "checkbox",
    htmlType: "checkbox",
    validations: [
      {
        name: "required-single",
        description:
          "For terms & conditions style: must be checked to proceed",
      },
      {
        name: "group-min",
        description:
          "For checkbox groups: minimum N must be selected (e.g. 'Select at least 1')",
      },
    ],
    constraints: {
      required: false,
    },
    formatting: {
      placeholder: "",
    },
    errorMessages: {
      required: "You must accept the terms to continue",
      invalid: "Please select at least one option",
      custom: "Please review and check the required items",
    },
    uxGuidelines: [
      "Place the label to the right of the checkbox (or left in RTL).",
      "For terms & conditions, link the relevant text — don't force users to navigate away.",
      "Use indeterminate state for parent checkboxes when only some children are selected.",
      "Validate group-required on form submit, not on individual checkbox change.",
      "Keep checkbox groups to 7 or fewer visible options; use a scrollable list or search for more.",
    ],
    accessibility: [
      "Use native <input type='checkbox'> — avoid div-based custom checkboxes unless role='checkbox' is set.",
      "For groups, wrap in a <fieldset> with <legend> describing the group.",
      "Set aria-checked='mixed' for indeterminate parent checkboxes.",
      "Ensure minimum 24×24px touch target size per WCAG 2.5.8.",
      "Support Space key to toggle and Tab to move between checkboxes.",
    ],
    regionalNotes: [
      "In RTL layouts, the checkbox should appear to the right of its label.",
      "Terms & conditions links should open in the correct language based on locale.",
    ],
  },

  // 17 ── Radio ─────────────────────────────────────────────────────────────
  {
    type: "radio",
    label: "Radio Button",
    description:
      "Single-selection from a group of mutually exclusive options.",
    icon: "radio",
    htmlType: "radio",
    validations: [
      {
        name: "group-required",
        description: "One option must be selected when the group is required",
      },
    ],
    constraints: {
      required: true,
    },
    formatting: {
      placeholder: "",
    },
    errorMessages: {
      required: "Please select one option",
      invalid: "Selected option is not valid",
    },
    uxGuidelines: [
      "Do not pre-select any option by default — let the user make an active choice (unless there is a clear default).",
      "Use radio buttons for 2–6 options; for more, use a select dropdown.",
      "Arrange vertically for readability; horizontal only for 2–3 very short options.",
      "Provide a 'None' or 'Other' option if the list may not cover all cases.",
      "Validate on form submit; do not show error on initial render.",
    ],
    accessibility: [
      "Group radios in a <fieldset> with a <legend> describing the question.",
      "Use native <input type='radio'> with matching name attribute for the group.",
      "Arrow keys should move focus and selection within the group; Tab should move to the next field.",
      "Set aria-required='true' on the fieldset when the group is required.",
      "Ensure each radio has a visible and associated <label>.",
    ],
    regionalNotes: [
      "In RTL mode, radio buttons appear to the right of their labels.",
      "Provide bilingual labels when options are contextually important (e.g. gender: ذكر / Male).",
    ],
  },

  // 18 ── Toggle / Switch ───────────────────────────────────────────────────
  {
    type: "toggle",
    label: "Toggle / Switch",
    description:
      "Binary on/off control for settings. Can apply immediately or require form submission.",
    icon: "toggle",
    htmlType: "checkbox",
    validations: [
      {
        name: "boolean",
        description: "Value is strictly true or false",
      },
    ],
    constraints: {
      required: false,
    },
    formatting: {
      placeholder: "",
    },
    errorMessages: {
      required: "This setting must be configured",
      invalid: "Invalid toggle state",
    },
    uxGuidelines: [
      "Use toggles for settings that take effect immediately (e.g. dark mode); use checkboxes for form-submit flows.",
      "Show the current state clearly with both visual and text label (e.g. 'Notifications: On').",
      "Animate the transition smoothly (150–200ms) to reinforce the state change.",
      "Place the toggle to the right of its label (left in RTL) for consistency with mobile OS patterns.",
      "Document whether changes apply instantly or on save — show a 'Saved' confirmation for instant-apply.",
    ],
    accessibility: [
      "Use role='switch' with aria-checked='true'/'false' for the semantically correct role.",
      "Ensure the toggle is operable via Space key.",
      "Provide a clear visible label — do not rely on the toggle's visual state alone.",
      "Announce state changes (e.g. 'Notifications enabled') via aria-live='polite'.",
      "Ensure sufficient colour contrast between on/off states (do not rely on colour alone).",
    ],
    regionalNotes: [
      "Mirror toggle direction in RTL — the 'on' position should be on the left in Arabic layouts.",
      "Label text should use active phrasing in both English and Arabic (e.g. تفعيل الإشعارات).",
    ],
  },

  // 19 ── Search ────────────────────────────────────────────────────────────
  {
    type: "search",
    label: "Search",
    description:
      "Search input with debounce, autocomplete suggestions, and clear button.",
    icon: "search",
    htmlType: "text",
    validations: [
      {
        name: "min-chars",
        description: "Autocomplete triggers after 2–3 characters",
      },
      {
        name: "safe-input",
        description:
          "Sanitise search queries server-side to prevent injection attacks",
      },
    ],
    constraints: {
      required: false,
      minLength: 1,
      maxLength: 200,
    },
    formatting: {
      placeholder: "Search…",
    },
    errorMessages: {
      required: "Enter a search term",
      invalid: "Search query contains invalid characters",
    },
    uxGuidelines: [
      "Debounce input by 300ms before firing search requests to reduce server load.",
      "Show autocomplete suggestions after 2–3 characters in a dropdown below the input.",
      "Provide a clear (×) button inside the input when text is present.",
      "Support keyboard shortcut ⌘K (macOS) / Ctrl+K (Windows) to focus the search field.",
      "Show recent searches and popular suggestions when the field is focused but empty.",
    ],
    accessibility: [
      "Use role='search' on the containing <form> or <div> landmark.",
      "Set role='combobox' on the input with aria-expanded, aria-controls, and aria-activedescendant.",
      "Announce the number of results (e.g. '5 suggestions available') via aria-live='polite'.",
      "Ensure suggestions are navigable with arrow keys and selectable with Enter.",
      "The clear button must have aria-label='Clear search' and be keyboard-focusable.",
    ],
    regionalNotes: [
      "Support Arabic search queries with proper tokenisation — Arabic doesn't use spaces consistently.",
      "Set dir='auto' on the input so Arabic queries display RTL and English queries display LTR.",
      "Consider supporting transliteration search (e.g. 'dubai' matching 'دبي').",
    ],
  },

  // 20 ── Number / Integer ──────────────────────────────────────────────────
  {
    type: "number",
    label: "Number / Integer",
    description:
      "Numeric input for integers or decimals with min/max range, step control, and locale-aware display.",
    icon: "number",
    htmlType: "number",
    validations: [
      {
        name: "numeric",
        description: "Must be a valid number (integer or decimal as configured)",
        regex: "^-?\\d+(\\.\\d+)?$",
        example: "42",
      },
      {
        name: "no-leading-zeros",
        description: "Strip leading zeros (007 → 7), except for '0' itself",
      },
      {
        name: "range",
        description: "Must fall within the configured min/max range",
      },
      {
        name: "step",
        description: "Value must be a multiple of the configured step if set",
      },
    ],
    constraints: {
      required: true,
      min: 0,
      max: 999999999,
      pattern: "^-?\\d+(\\.\\d+)?$",
    },
    formatting: {
      placeholder: "0",
      thousandSeparator: true,
      decimalPlaces: 0,
    },
    errorMessages: {
      required: "This field is required",
      invalid: "Please enter a valid number",
      pattern: "Only numeric values are accepted",
      custom: "Value is outside the allowed range",
    },
    uxGuidelines: [
      "Use inputmode='numeric' (integers) or inputmode='decimal' (floats) on mobile.",
      "Display thousand separators (1,234,567) for readability but store the raw number.",
      "Provide increment/decrement stepper buttons for fields with a small range.",
      "Strip leading zeros on blur (e.g. 007 → 7).",
      "For negative numbers, clearly indicate whether they're allowed in the label or helper text.",
    ],
    accessibility: [
      "Use type='text' with inputmode='numeric' instead of type='number' to avoid browser spinner inconsistencies.",
      "Set aria-valuemin, aria-valuemax, and aria-valuenow for range-constrained fields.",
      "Support Up/Down arrow keys for increment/decrement.",
      "Announce out-of-range corrections via aria-live='polite'.",
      "Ensure stepper buttons have aria-labels ('Increase value', 'Decrease value').",
    ],
    regionalNotes: [
      "Support Eastern Arabic numeral display (٠١٢٣٤٥٦٧٨٩) as a user preference.",
      "In Arabic locales, the decimal separator may be an Arabic comma (٫) and thousand separator a dot or ٬.",
      "Always normalise to Western Arabic (0-9) and standard decimal point before server submission.",
    ],
  },

  // 21 ── Address ───────────────────────────────────────────────────────────
  {
    type: "address",
    label: "Address",
    description:
      "Multi-field address block: street lines, city, state/emirate, postal code, and country. GCC-aware formatting.",
    icon: "address",
    htmlType: "text",
    validations: [
      {
        name: "line1-required",
        description: "Address line 1 (street) is required",
      },
      {
        name: "city-required",
        description: "City is required",
      },
      {
        name: "country-required",
        description: "Country is required",
      },
      {
        name: "conditional-postal",
        description:
          "Postal code required only for countries that use them",
      },
    ],
    constraints: {
      required: true,
      maxLength: 500,
    },
    formatting: {
      placeholder: "Street address",
    },
    errorMessages: {
      required: "Address is required",
      invalid: "Please enter a complete address",
      custom: "Some address fields are missing",
    },
    uxGuidelines: [
      "Use separate fields: Address Line 1, Address Line 2 (optional), City, State/Emirate, Postal Code, Country.",
      "Pre-select the country based on the user's locale or the application's region setting.",
      "Integrate with a geocoding API (Google Places, HERE) for typeahead auto-completion.",
      "Dynamically show/hide postal code based on the selected country.",
      "Use the country name in the local language alongside English (e.g. الإمارات / UAE).",
    ],
    accessibility: [
      "Wrap all address fields in a <fieldset> with <legend> 'Mailing Address' or similar.",
      "Set autocomplete attributes: address-line1, address-line2, address-level2 (city), address-level1 (state), postal-code, country-name.",
      "Announce auto-completed fields via aria-live when the user selects an address suggestion.",
      "Ensure Tab order follows the logical address flow (line 1 → line 2 → city → state → postal → country).",
      "Label each sub-field explicitly — do not rely on position alone.",
    ],
    regionalNotes: [
      "UAE addresses use Emirate instead of State: Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, Fujairah.",
      "Saudi Arabia uses Region (المنطقة) — e.g. Riyadh Region, Eastern Province, Makkah Region.",
      "UAE and Qatar commonly use P.O. Box instead of street addresses for postal delivery.",
      "Some GCC countries do not use postal codes — hide that field for UAE, Qatar, Bahrain, Oman.",
      "In Arabic, the address order may be reversed (country → city → street); adjust for RTL form layouts.",
      "Building name, floor, and office/apartment number are common additions in the UAE (e.g. 'Office 305, XYZ Tower').",
    ],
  },

  // 22 ── Color Picker ──────────────────────────────────────────────────────
  {
    type: "colorPicker",
    label: "Color Picker",
    description:
      "Visual colour selector with hex input, RGB/HSL alternatives, and optional swatch presets.",
    icon: "palette",
    htmlType: "text",
    validations: [
      {
        name: "hex-format",
        description: "Must be a valid 6-digit hex colour code",
        regex: "^#([0-9A-Fa-f]{6})$",
        example: "#3B82F6",
      },
      {
        name: "rgb-format",
        description: "Alternative: rgb(0-255, 0-255, 0-255)",
        regex: "^rgb\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*\\)$",
        example: "rgb(59, 130, 246)",
      },
      {
        name: "hsl-format",
        description: "Alternative: hsl(0-360, 0-100%, 0-100%)",
        regex:
          "^hsl\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}%\\s*,\\s*\\d{1,3}%\\s*\\)$",
        example: "hsl(217, 91%, 60%)",
      },
    ],
    constraints: {
      required: false,
      pattern: "^#([0-9A-Fa-f]{6})$",
    },
    formatting: {
      placeholder: "#000000",
      prefix: "#",
    },
    errorMessages: {
      required: "Please select a colour",
      invalid: "Please enter a valid hex colour code (e.g. #3B82F6)",
      pattern: "Colour must be in #RRGGBB format",
    },
    uxGuidelines: [
      "Show a colour swatch preview next to the hex input that updates in real time.",
      "Provide preset swatches for the application's brand palette and commonly used colours.",
      "Allow switching between hex, RGB, and HSL input modes via a tab or toggle.",
      "Include an eyedropper tool (browser EyeDropper API) for picking colours from the screen.",
      "Show WCAG contrast ratio against a reference background and warn if it fails AA/AAA standards.",
    ],
    accessibility: [
      "Use an <input type='text'> with a colour preview — native <input type='color'> has inconsistent accessibility.",
      "Label the input clearly (e.g. 'Brand primary colour') and describe the current colour in text.",
      "Announce colour changes and contrast warnings via aria-live region.",
      "Ensure the colour picker dialog (spectrum/hue slider) is keyboard-navigable with arrow keys.",
      "Do not rely on colour preview alone — always show the hex value as text.",
    ],
  },

  // 23 ── Rating / Stars ────────────────────────────────────────────────────
  {
    type: "rating",
    label: "Rating / Stars",
    description:
      "Star-based rating input (1–5 scale) with optional half-star precision and hover preview.",
    icon: "star",
    htmlType: "radio",
    validations: [
      {
        name: "range",
        description: "Value must be between 1 and 5 (or 0.5 to 5 for half-stars)",
      },
      {
        name: "required",
        description: "Rating is required when the field is mandatory",
      },
    ],
    constraints: {
      required: false,
      min: 1,
      max: 5,
    },
    formatting: {
      placeholder: "Select a rating",
    },
    errorMessages: {
      required: "Please provide a rating",
      invalid: "Rating must be between 1 and 5",
    },
    uxGuidelines: [
      "Use 5 stars as the default scale — it's universally understood.",
      "Show filled vs outlined stars clearly with sufficient colour contrast.",
      "Highlight stars on hover to preview the selection before clicking.",
      "For half-star support, allow clicking the left/right half of each star or use a radio-group approach.",
      "Consider adding a text label alongside the stars (e.g. '4 out of 5 — Very Good').",
    ],
    accessibility: [
      "Implement as a radio group with role='radiogroup' and individual role='radio' for each star.",
      "Set aria-label='Rating: X out of 5 stars' on the group.",
      "Support keyboard navigation: arrow keys to move between ratings, Enter/Space to confirm.",
      "Announce the hovered/selected value via aria-live (e.g. '4 stars').",
      "Ensure the clickable area is at least 24×24px per star for touch targets.",
    ],
  },

  // 24 ── Slider / Range ────────────────────────────────────────────────────
  {
    type: "slider",
    label: "Slider / Range",
    description:
      "Draggable range control with min/max, step, value label, and optional dual-handle for range selection.",
    icon: "slider",
    htmlType: "text",
    validations: [
      {
        name: "range",
        description: "Value must be within configured min/max bounds",
      },
      {
        name: "step",
        description: "Value must align to the configured step increment",
      },
      {
        name: "dual-range",
        description:
          "For dual-handle sliders: min handle must be less than or equal to max handle",
      },
    ],
    constraints: {
      required: true,
      min: 0,
      max: 100,
    },
    formatting: {
      placeholder: "",
    },
    errorMessages: {
      required: "Please select a value",
      invalid: "Value is outside the allowed range",
      custom: "Minimum value must be less than maximum value",
    },
    uxGuidelines: [
      "Show the current value in a tooltip above the thumb or in a label beside the slider.",
      "Display min and max labels at the ends of the track.",
      "Use tick marks for sliders with discrete steps (e.g. every 10%).",
      "For dual-handle range sliders, colour the track between the two handles.",
      "Pair with a numeric input for precise entry — let the slider and input stay in sync.",
    ],
    accessibility: [
      "Use <input type='range'> or role='slider' with aria-valuemin, aria-valuemax, aria-valuenow.",
      "Support keyboard: arrow keys for step increments, Home/End for min/max.",
      "For dual-range, use two linked range inputs with aria-label='Minimum' and 'Maximum'.",
      "Announce value changes via aria-valuetext (e.g. 'Price: 25 to 75 AED').",
      "Ensure the slider thumb has a minimum 24×24px touch target.",
    ],
  },

  // 25 ── Time ──────────────────────────────────────────────────────────────
  {
    type: "time",
    label: "Time",
    description:
      "Time picker supporting 12-hour and 24-hour formats with timezone awareness and configurable minute steps.",
    icon: "clock",
    htmlType: "text",
    validations: [
      {
        name: "format-24h",
        description: "24-hour format: HH:MM",
        regex: "^([01]\\d|2[0-3]):[0-5]\\d$",
        example: "14:30",
      },
      {
        name: "format-12h",
        description: "12-hour format: h:MM AM/PM",
        regex: "^(0?[1-9]|1[0-2]):[0-5]\\d\\s?(AM|PM)$",
        example: "2:30 PM",
      },
      {
        name: "minute-step",
        description:
          "Minutes may be constrained to steps of 15, 30, or 60",
      },
    ],
    constraints: {
      required: true,
      pattern: "^([01]\\d|2[0-3]):[0-5]\\d$",
    },
    formatting: {
      placeholder: "HH:MM",
      mask: "HH:MM",
    },
    errorMessages: {
      required: "Time is required",
      invalid: "Please enter a valid time",
      pattern: "Time must be in HH:MM format",
    },
    uxGuidelines: [
      "Default to the region's preferred format: 12-hour (AM/PM) for general users, 24-hour for technical/military contexts.",
      "Use a scrollable time picker or dropdown rather than forcing manual typing.",
      "Show minute steps in the picker to prevent invalid selections (e.g. only 00, 15, 30, 45).",
      "Display the timezone abbreviation (e.g. GST, AST) next to the input when timezone matters.",
      "Allow keyboard entry as an alternative to the picker for power users.",
    ],
    accessibility: [
      "Use role='group' with aria-label='Select time' for composite time pickers.",
      "Ensure hour and minute spinners are keyboard-navigable with Up/Down arrows.",
      "For the AM/PM toggle, use role='radio' and arrow keys to switch.",
      "Announce the complete time value (e.g. '2:30 PM Gulf Standard Time') on selection.",
      "Set autocomplete='off' as time values are rarely auto-filled.",
    ],
    regionalNotes: [
      "Most GCC countries display time in 12-hour format with AM/PM (ص/م in Arabic).",
      "Gulf Standard Time (GST, UTC+4) is used in UAE and Oman. Arabia Standard Time (AST, UTC+3) in Saudi, Kuwait, Bahrain, Qatar.",
      "GCC countries do not observe daylight saving time — simplify timezone logic accordingly.",
      "Friday/Saturday are weekend days in the GCC — reflect this in scheduling UIs.",
      "In Arabic UI, time may display with Eastern Arabic numerals (٢:٣٠ م).",
    ],
  },

  // 26 ── OTP / Verification Code ───────────────────────────────────────────
  {
    type: "otp",
    label: "OTP / Verification Code",
    description:
      "One-time password input (4–6 digits) with auto-focus, paste support, and resend timer.",
    icon: "key",
    htmlType: "text",
    validations: [
      {
        name: "digits-only",
        description: "Must contain only digits",
        regex: "^\\d{4,6}$",
        example: "123456",
      },
      {
        name: "exact-length",
        description:
          "Must be exactly the configured length (4 or 6 digits typically)",
      },
      {
        name: "expiry",
        description:
          "Code is valid for a limited time (e.g. 5 minutes) — enforce server-side",
      },
    ],
    constraints: {
      required: true,
      minLength: 4,
      maxLength: 6,
      pattern: "^\\d{4,6}$",
    },
    formatting: {
      placeholder: "------",
      mask: "X X X X X X",
    },
    errorMessages: {
      required: "Verification code is required",
      invalid: "Please enter a valid verification code",
      pattern: "Code must be digits only",
      custom: "This code has expired — please request a new one",
    },
    uxGuidelines: [
      "Display as separate single-character input boxes (one per digit) for clear visual segmentation.",
      "Auto-focus the next input box after each digit is entered.",
      "Support full-code paste: when the user pastes all digits, distribute them across all boxes.",
      "Show a countdown timer for when the code can be re-sent (e.g. 'Resend code in 0:45').",
      "Auto-submit the form when the last digit is entered to reduce friction.",
    ],
    accessibility: [
      "Use a single <input> with inputmode='numeric' and autocomplete='one-time-code' for the best autofill support.",
      "If using separate inputs, group them with role='group' and aria-label='Verification code'.",
      "Announce the resend timer countdown via aria-live='polite' at intervals (e.g. every 15 seconds).",
      "Ensure Backspace moves focus to the previous box and clears the digit.",
      "Label the input group clearly: 'Enter the 6-digit code sent to your phone'.",
    ],
    regionalNotes: [
      "SMS OTP delivery in the GCC is standard; WhatsApp-based OTP is increasingly popular as an alternative.",
      "Support autofill from SMS via the WebOTP API (autocomplete='one-time-code').",
      "Normalise Eastern Arabic numerals (٠-٩) to Western Arabic (0-9) before validation.",
    ],
  },
  // 27 ── IBAN ──────────────────────────────────────────────────────────────
  {
    type: "iban",
    label: "IBAN (Bank Account)",
    description:
      "International Bank Account Number — the standard identifier for cross-border and domestic payments across the GCC.",
    icon: "iban",
    htmlType: "text",
    validations: [
      {
        name: "format",
        description:
          "Must start with a 2-letter country code, 2 check digits, then up to 30 alphanumeric characters",
        regex: "^[A-Z]{2}\\d{2}[A-Z0-9]{11,30}$",
        example: "SA0380000000608010167519",
      },
      {
        name: "mod97",
        description:
          "IBAN must pass the ISO 13616 MOD-97-10 check-digit algorithm (server-side)",
      },
      {
        name: "country-length",
        description:
          "Length varies by country: SA = 24, AE = 23, BH = 22, KW = 30, QA = 29, OM = 23",
      },
    ],
    constraints: {
      required: true,
      minLength: 15,
      maxLength: 34,
      pattern: "^[A-Z]{2}\\d{2}[A-Z0-9]+$",
    },
    formatting: {
      placeholder: "SA03 8000 0000 6080 1016 7519",
      mask: "XXXX XXXX XXXX XXXX XXXX XXXX",
    },
    errorMessages: {
      required: "IBAN is required",
      invalid: "Please enter a valid IBAN",
      pattern: "IBAN must start with a country code followed by digits",
      custom: "The check digits do not match — please verify the number",
    },
    uxGuidelines: [
      "Display in groups of 4 characters separated by spaces for readability.",
      "Auto-detect the country from the first two letters and validate length accordingly.",
      "Show the associated bank name once the BBAN portion is long enough to identify it.",
      "Accept both uppercase and lowercase input — normalise to uppercase on blur.",
      "Provide a paste-friendly field that strips spaces and dashes automatically.",
    ],
    accessibility: [
      "Label clearly as 'IBAN' — spell out 'International Bank Account Number' in help text.",
      "Use inputmode='text' (not numeric) since IBAN contains letters and digits.",
      "Announce validation errors (e.g. wrong length) via aria-live.",
      "Group the input with its associated bank-name display for screen readers.",
    ],
    regionalNotes: [
      "Saudi IBAN (SA) is 24 characters; UAE (AE) is 23. Validate per-country length.",
      "The Saudi SAMA bank code is embedded in positions 5-6 of the IBAN — use this to auto-display the bank name.",
      "Mada debit cards are linked to local IBANs — consider cross-referencing in payment flows.",
      "Arabic users may enter Eastern Arabic digits (٠-٩); normalise to Western before validation.",
    ],
  },

  // 28 ── Credit Card ──────────────────────────────────────────────────────
  {
    type: "creditCard",
    label: "Credit / Debit Card",
    description:
      "Card number input with Luhn validation, card type detection (Visa, Mastercard, Mada), and real-time formatting.",
    icon: "creditCard",
    htmlType: "text",
    validations: [
      {
        name: "luhn",
        description:
          "Must pass the Luhn (modulus 10) algorithm for checksum verification",
      },
      {
        name: "card-type",
        description:
          "Detect card network from BIN prefix: Visa (4xxx), Mastercard (51-55, 2221-2720), Mada (various Saudi BINs)",
      },
      {
        name: "length",
        description: "Visa/MC = 16 digits, Amex = 15 digits, others vary",
      },
    ],
    constraints: {
      required: true,
      minLength: 13,
      maxLength: 19,
      pattern: "^\\d{13,19}$",
    },
    formatting: {
      placeholder: "4111 1111 1111 1111",
      mask: "XXXX XXXX XXXX XXXX",
    },
    errorMessages: {
      required: "Card number is required",
      invalid: "This card number is not valid",
      pattern: "Card number must contain only digits",
      custom: "This card type is not accepted",
    },
    uxGuidelines: [
      "Format in groups of 4 digits as the user types. Amex uses 4-6-5 grouping.",
      "Show the detected card brand icon (Visa, MC, Mada, Amex) in real time as the user types the first digits.",
      "Pair with expiry date (MM/YY) and CVV fields in a single visual row.",
      "Never store or log full card numbers client-side — mask all but the last 4 digits after entry.",
      "Provide a card-scanner/camera option on mobile for faster entry.",
    ],
    accessibility: [
      "Use autocomplete='cc-number' so browsers and password managers can autofill.",
      "Use inputmode='numeric' for a numeric keyboard on mobile.",
      "Do not use aria-label for the detected card brand — display it visually and describe in sr-only text.",
      "Announce card type detection to screen readers via aria-live='polite'.",
    ],
    regionalNotes: [
      "Mada is the Saudi national debit network — detect Mada BIN ranges and show the Mada logo alongside Visa/MC.",
      "Some GCC banks issue co-branded Mada + Visa/MC cards; accept both network logos.",
      "Apple Pay and STCPay are widespread in KSA — offer as payment alternatives alongside manual card entry.",
      "Ensure RTL layout mirrors the card-number / expiry / CVV row correctly.",
    ],
  },

  // 29 ── VAT Number ───────────────────────────────────────────────────────
  {
    type: "vatNumber",
    label: "VAT / Tax Number",
    description:
      "Tax registration number for businesses. GCC countries implemented VAT in 2018+ with country-specific formats.",
    icon: "vat",
    htmlType: "text",
    validations: [
      {
        name: "format",
        description:
          "Must match country-specific VAT format. Saudi: 15-digit TRN starting with 3. UAE: TRN-1234567890123-1",
        regex: "^3\\d{14}$",
        example: "310123456700003",
      },
      {
        name: "check-digit",
        description:
          "Many VAT numbers include a check digit — validate server-side against ZATCA/FTA registries",
      },
    ],
    constraints: {
      required: true,
      minLength: 9,
      maxLength: 20,
    },
    formatting: {
      placeholder: "3XX XXX XXX XXX XX (KSA)",
      prefix: "VAT",
    },
    errorMessages: {
      required: "VAT registration number is required",
      invalid: "Please enter a valid VAT number for your country",
      pattern: "Saudi VAT numbers must be 15 digits starting with 3",
      custom: "This VAT number is not found in the tax authority registry",
    },
    uxGuidelines: [
      "Allow the user to select their country first, then validate format accordingly.",
      "Show the country-specific format hint below the field (e.g. 'Saudi: 15 digits starting with 3').",
      "Offer a 'Verify' button that checks the number against ZATCA (KSA) or FTA (UAE) APIs.",
      "Display the registered company name upon successful verification for user confirmation.",
    ],
    accessibility: [
      "Label as 'VAT Number' or 'Tax Registration Number (TRN)' depending on country context.",
      "Provide format hints as part of the accessible description, not just placeholder text.",
      "Announce verification results (success/failure) via aria-live.",
    ],
    regionalNotes: [
      "Saudi Arabia (ZATCA): 15-digit TRN, always starts with 3. Mandatory on all B2B invoices since Phase 2 (Fatoorah).",
      "UAE (FTA): TRN format is a 15-digit number. Required for businesses with taxable supplies over AED 375,000.",
      "Bahrain (NBR): 13-digit TIN. Oman (OTA): 8-digit number. Kuwait does not yet have VAT.",
      "E-invoicing integration (ZATCA Phase 2) requires the VAT number in XML invoice format.",
    ],
  },

  // 30 ── Commercial Registration ──────────────────────────────────────────
  {
    type: "commercialRegistration",
    label: "Commercial Registration (CR)",
    description:
      "Official business license number issued by the Ministry of Commerce. Required for all business entities in the GCC.",
    icon: "cr",
    htmlType: "text",
    validations: [
      {
        name: "format",
        description:
          "Saudi CR is a 10-digit number. UAE Trade License varies by emirate.",
        regex: "^\\d{10}$",
        example: "1010123456",
      },
      {
        name: "active-status",
        description:
          "Validate against MoC (Ministry of Commerce) registry to ensure the CR is active and not expired",
      },
    ],
    constraints: {
      required: true,
      minLength: 7,
      maxLength: 15,
      pattern: "^\\d{7,15}$",
    },
    formatting: {
      placeholder: "1010XXXXXX (KSA)",
    },
    errorMessages: {
      required: "Commercial Registration number is required",
      invalid: "Please enter a valid CR number",
      pattern: "CR number must contain only digits",
      custom: "This CR number is expired or inactive",
    },
    uxGuidelines: [
      "Pre-select the country (KSA, UAE, BH, etc.) to apply the correct format validation.",
      "Offer integration with Ministry of Commerce APIs to auto-fill company name and activity.",
      "Show the CR expiry date and renewal status if available from the registry.",
      "For UAE, allow selection of emirate first as trade license formats differ (Dubai DED vs Abu Dhabi DED).",
    ],
    accessibility: [
      "Label clearly: 'Commercial Registration Number (CR)' with the full term in help text.",
      "Describe the expected format in aria-describedby.",
      "Announce API lookup results to screen readers.",
    ],
    regionalNotes: [
      "Saudi CR numbers (سجل تجاري) are 10 digits issued by MoC. The first 4 digits indicate the city (1010 = Riyadh).",
      "UAE uses 'Trade License' numbers that vary by emirate and free zone.",
      "Bahrain uses a CR number from MOIC. Oman uses a CR from MOCIIP.",
      "Absher and Muqeem platforms in KSA integrate CR validation — consider API hooks.",
    ],
  },

  // 31 ── Passport Number ──────────────────────────────────────────────────
  {
    type: "passport",
    label: "Passport Number",
    description:
      "Travel document identifier. Formats vary by issuing country. Critical for travel, visa, and identity verification flows.",
    icon: "passport",
    htmlType: "text",
    validations: [
      {
        name: "format",
        description:
          "Alphanumeric, typically 6-9 characters. Format varies by issuing country.",
        regex: "^[A-Z0-9]{6,9}$",
        example: "A12345678",
      },
      {
        name: "mrz-compatible",
        description:
          "Should be compatible with Machine Readable Zone (MRZ) format for automated scanning",
      },
    ],
    constraints: {
      required: true,
      minLength: 5,
      maxLength: 12,
      pattern: "^[A-Za-z0-9]+$",
    },
    formatting: {
      placeholder: "A12345678",
    },
    errorMessages: {
      required: "Passport number is required",
      invalid: "Please enter a valid passport number",
      pattern: "Passport numbers contain only letters and digits",
    },
    uxGuidelines: [
      "Allow the user to select the issuing country first, then adjust validation length/format.",
      "Pair with 'Issuing Country', 'Issue Date', and 'Expiry Date' fields in a grouped passport section.",
      "Normalise to uppercase on blur.",
      "Consider offering NFC/camera scanning of the passport MRZ on mobile devices.",
      "Display a visual indicator of passport validity based on expiry date.",
    ],
    accessibility: [
      "Label as 'Passport Number' with the issuing country context.",
      "Use autocomplete='off' to prevent browsers from autofilling with incorrect data.",
      "Announce format requirements via aria-describedby.",
    ],
    regionalNotes: [
      "GCC national passports have specific formats: KSA (1 letter + 8 digits), UAE (various), BH/KW/QA/OM (varies).",
      "Many GCC residents hold passports from South Asia, Philippines, or Arab countries — support all formats.",
      "For Hajj/Umrah systems, pair passport with visa number and Muqeem reference.",
      "Arabic transliteration of names on passports may differ from English — allow for name matching flexibility.",
    ],
  },

  // 32 ── Date of Birth ────────────────────────────────────────────────────
  {
    type: "dateOfBirth",
    label: "Date of Birth",
    description:
      "Specialised date input for birth dates with age calculation, minors detection, and Hijri calendar support.",
    icon: "birthday",
    htmlType: "date",
    validations: [
      {
        name: "past-date",
        description: "Must be a date in the past — cannot be today or future",
      },
      {
        name: "age-range",
        description:
          "Typically restricted to a reasonable range: not before 1900, not less than minimum age (13/18/21 depending on context)",
      },
      {
        name: "real-date",
        description: "Must be a valid calendar date (no Feb 30, etc.)",
      },
    ],
    constraints: {
      required: true,
    },
    formatting: {
      placeholder: "DD / MM / YYYY",
      mask: "XX / XX / XXXX",
    },
    errorMessages: {
      required: "Date of birth is required",
      invalid: "Please enter a valid date of birth",
      custom: "You must be at least 18 years old to proceed",
    },
    uxGuidelines: [
      "Use three separate dropdowns (day/month/year) or a date picker — avoid free-text entry for DOB.",
      "Default the year picker to ~25 years ago, not the current year, to reduce scrolling.",
      "Calculate and display the user's age in real-time as they enter their DOB.",
      "Clearly indicate the minimum age requirement if applicable (e.g. '18+').",
      "Consider offering Hijri (Islamic) calendar as an input option in GCC apps.",
    ],
    accessibility: [
      "Label each dropdown (Day, Month, Year) separately for screen readers.",
      "Use aria-describedby to explain the minimum age requirement.",
      "Announce the calculated age via aria-live when the date is complete.",
      "Ensure date pickers are fully keyboard navigable with year/decade jumps.",
    ],
    regionalNotes: [
      "Support both Gregorian and Hijri (هجري) dates — many GCC citizens know their Hijri DOB from national IDs.",
      "Provide Hijri-to-Gregorian conversion as a helper utility.",
      "DD/MM/YYYY is the standard date format in all GCC countries — never use MM/DD/YYYY.",
      "National ID cards in Saudi Arabia display the Hijri date of birth — match this in government integrations.",
    ],
  },

  // 33 ── Gender ───────────────────────────────────────────────────────────
  {
    type: "gender",
    label: "Gender",
    description:
      "Gender selection field with culturally appropriate options. Commonly required in HR, healthcare, and government forms.",
    icon: "gender",
    htmlType: "select",
    validations: [
      {
        name: "valid-option",
        description:
          "Must select from the provided options — no free text unless 'Other / Prefer to self-describe' is offered",
      },
    ],
    constraints: {
      required: true,
    },
    formatting: {
      placeholder: "Select gender",
    },
    errorMessages: {
      required: "Gender selection is required",
      invalid: "Please select a valid option",
    },
    uxGuidelines: [
      "Use radio buttons or a short dropdown — avoid toggle (implies binary).",
      "For government/legal forms: 'Male' and 'Female' only (matching passport/ID standards).",
      "For consumer apps: consider adding 'Prefer not to say' as an option.",
      "Only ask for gender when genuinely necessary for the business logic (e.g. healthcare, HR, legal docs).",
      "When gender determines UI/UX (salutations like Mr./Mrs.), use it contextually without over-collecting.",
    ],
    accessibility: [
      "Use fieldset + legend to group radio buttons: <fieldset><legend>Gender</legend>...</fieldset>.",
      "Each radio option needs a clear label. Avoid abbreviations (M/F).",
      "Do not auto-select a default gender option.",
    ],
    regionalNotes: [
      "GCC government systems use binary gender (Male/Female) as per national ID and passport standards.",
      "Arabic labels: ذكر (Male), أنثى (Female).",
      "Gender-segregated facilities are common in GCC — gender may determine access/permissions in booking systems.",
      "Healthcare forms may need biological sex separately from social gender — clarify context.",
    ],
  },

  // 34 ── Nationality ──────────────────────────────────────────────────────
  {
    type: "nationality",
    label: "Nationality / Country",
    description:
      "Country or nationality picker with search, flags, and optimised ordering for regional usage patterns.",
    icon: "nationality",
    htmlType: "select",
    validations: [
      {
        name: "valid-iso",
        description:
          "Must be a valid ISO 3166-1 alpha-2 country code (e.g. SA, AE, BH)",
      },
    ],
    constraints: {
      required: true,
    },
    formatting: {
      placeholder: "Select nationality",
    },
    errorMessages: {
      required: "Nationality is required",
      invalid: "Please select a valid nationality",
    },
    uxGuidelines: [
      "Use a searchable dropdown with country flags for visual recognition.",
      "Place GCC countries (SA, AE, BH, KW, QA, OM) at the top of the list, followed by common expat nationalities.",
      "Support search by both English and Arabic country names.",
      "Show the country flag emoji or icon alongside each option.",
      "For 'Country of Residence' vs 'Nationality', use separate fields — they differ often in the GCC.",
    ],
    accessibility: [
      "Use a combobox pattern with typeahead search for keyboard users.",
      "Announce the number of matching results as the user types.",
      "Country flags should be decorative (aria-hidden) — rely on text labels for screen readers.",
      "Support full keyboard navigation through the dropdown list.",
    ],
    regionalNotes: [
      "GCC has a large expat population — top nationalities after GCC include Indian, Pakistani, Filipino, Egyptian, Bangladeshi.",
      "Differentiate between nationality (جنسية) and country of residence (بلد الإقامة) — these are often different in GCC.",
      "Some users hold dual nationality — consider if multi-select is needed.",
      "Palestinian nationality should be included despite not having an ISO-recognised state (use PS code).",
    ],
  },

  // 35 ── Emergency Contact ────────────────────────────────────────────────
  {
    type: "emergencyContact",
    label: "Emergency Contact",
    description:
      "Composite field for emergency contact details: name, relationship, phone number. Standard in HR and healthcare.",
    icon: "emergency",
    htmlType: "text",
    validations: [
      {
        name: "name-required",
        description: "Contact name must be provided",
      },
      {
        name: "relationship-required",
        description:
          "Relationship to the user must be specified (spouse, parent, sibling, etc.)",
      },
      {
        name: "phone-valid",
        description:
          "At least one phone number must be provided and must be a valid mobile number",
      },
    ],
    constraints: {
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    formatting: {
      placeholder: "Full name of emergency contact",
    },
    errorMessages: {
      required: "Emergency contact information is required",
      invalid: "Please provide complete emergency contact details",
      custom: "Emergency contact phone number must be reachable",
    },
    uxGuidelines: [
      "Present as a grouped card with sub-fields: Name, Relationship (dropdown), Phone, and optional Email.",
      "Offer common relationship options: Spouse, Parent, Sibling, Child, Friend, Colleague.",
      "Allow adding multiple emergency contacts with a primary/secondary designation.",
      "Pre-fill the country code from the user's own phone number.",
      "Clearly separate from the user's own contact information to avoid confusion.",
    ],
    accessibility: [
      "Use fieldset with legend 'Emergency Contact' to group all sub-fields.",
      "Each sub-field needs its own label (Name, Relationship, Phone).",
      "Announce when a new contact is added or removed via aria-live.",
    ],
    regionalNotes: [
      "In GCC workplaces, emergency contacts are legally required under labour law for all employees.",
      "Include country code selector defaulting to the local GCC code (+966, +971, etc.).",
      "Relationship labels in Arabic: زوج/زوجة (Spouse), والد/والدة (Parent), أخ/أخت (Sibling).",
      "For Hajj/Umrah systems, emergency contact is mandatory — include Makkah/Madinah local contacts.",
    ],
  },

  // 36 ── Social Media Handle ──────────────────────────────────────────────
  {
    type: "socialMedia",
    label: "Social Media Handle",
    description:
      "Social media profile input supporting multiple platforms: X/Twitter, Instagram, LinkedIn, Snapchat, and TikTok.",
    icon: "social",
    htmlType: "text",
    validations: [
      {
        name: "platform-format",
        description:
          "Validate based on selected platform. Twitter/X: @handle (1-15 alphanumeric + underscore). Instagram: 1-30 chars.",
        regex: "^@?[a-zA-Z0-9_.]{1,30}$",
        example: "@username",
      },
      {
        name: "no-spaces",
        description: "Social handles cannot contain spaces",
      },
    ],
    constraints: {
      minLength: 1,
      maxLength: 50,
    },
    formatting: {
      placeholder: "@username",
      prefix: "@",
    },
    errorMessages: {
      required: "Social media handle is required",
      invalid: "Please enter a valid social media handle",
      pattern: "Handles can only contain letters, numbers, dots, and underscores",
    },
    uxGuidelines: [
      "Provide a platform selector (X, Instagram, LinkedIn, Snapchat, TikTok) before the handle input.",
      "Auto-prepend '@' where applicable (Twitter, Instagram) and strip URLs if the user pastes a full profile link.",
      "Show the platform icon alongside the input for visual context.",
      "Validate platform-specific rules: Twitter max 15 chars, Instagram max 30, LinkedIn accepts profile URLs.",
      "Support pasting full URLs (e.g. twitter.com/user) and auto-extract the handle.",
    ],
    accessibility: [
      "Label both the platform selector and handle input clearly.",
      "Use aria-describedby to explain the format requirements per platform.",
      "Announce platform-specific validation rules when the platform changes.",
    ],
    regionalNotes: [
      "Snapchat and Instagram have the highest penetration in the GCC (especially KSA and UAE).",
      "X/Twitter is heavily used for news and business in the GCC.",
      "LinkedIn is standard for professional/B2B contexts in the region.",
      "TikTok usage is growing rapidly in the GCC — include it as a platform option.",
    ],
  },

  // 37 ── Rich Text Editor ─────────────────────────────────────────────────
  {
    type: "richText",
    label: "Rich Text / WYSIWYG",
    description:
      "Rich text editor with formatting controls: bold, italic, lists, headings, links, and image embedding.",
    icon: "richText",
    htmlType: "textarea",
    validations: [
      {
        name: "html-sanitise",
        description:
          "Sanitise output HTML to prevent XSS. Allow only safe tags: p, br, strong, em, ul, ol, li, a, h2-h4, img.",
      },
      {
        name: "max-length",
        description:
          "Enforce character or word limit on the plain-text content (excluding HTML tags)",
      },
    ],
    constraints: {
      maxLength: 50000,
    },
    formatting: {
      placeholder: "Start typing or paste content...",
    },
    errorMessages: {
      required: "This field cannot be empty",
      invalid: "Content contains unsupported formatting",
      maxLength: "Content exceeds the maximum allowed length",
    },
    uxGuidelines: [
      "Provide a clean toolbar with common formatting: Bold, Italic, Lists, Headings, Links, Image upload.",
      "Support drag-and-drop image insertion and pasting from clipboard.",
      "Show a live character/word count at the bottom of the editor.",
      "Implement autosave to prevent data loss on long-form content.",
      "Keep the toolbar sticky at the top when the editor content scrolls.",
    ],
    accessibility: [
      "Ensure the editor is fully operable with keyboard shortcuts (Ctrl+B, Ctrl+I, etc.).",
      "Use role='textbox' with aria-multiline='true' on the editable region.",
      "Toolbar buttons must have accessible labels (aria-label='Bold', not just an icon).",
      "Announce formatting changes (e.g. 'Bold applied') via aria-live.",
      "Support content navigation via heading structure in the edited content.",
    ],
    regionalNotes: [
      "Must support RTL text direction for Arabic content — auto-detect direction from input.",
      "Support mixed LTR+RTL content within the same document (BiDi).",
      "Arabic text should render with proper ligatures and diacritics (tashkeel).",
      "Consider supporting Arabic Markdown conventions alongside WYSIWYG for power users.",
    ],
  },

  // 38 ── Multi-Select / Tags ──────────────────────────────────────────────
  {
    type: "multiSelect",
    label: "Multi-Select / Tags",
    description:
      "Multi-selection input with chip/tag display. Supports typeahead filtering and custom tag creation.",
    icon: "multiSelect",
    htmlType: "text",
    validations: [
      {
        name: "min-selection",
        description: "Enforce a minimum number of selected items if required",
      },
      {
        name: "max-selection",
        description:
          "Enforce a maximum selection limit (e.g. 'Choose up to 5 tags')",
      },
      {
        name: "valid-options",
        description:
          "Each selection must be from the allowed list (unless free-form tags are enabled)",
      },
    ],
    constraints: {
      min: 1,
      max: 20,
    },
    formatting: {
      placeholder: "Type to search or select...",
    },
    errorMessages: {
      required: "Please select at least one option",
      invalid: "One or more selected items are not valid",
      custom: "You can select a maximum of {max} items",
    },
    uxGuidelines: [
      "Display selected items as removable chips/tags with an × button.",
      "Provide typeahead search that filters the dropdown as the user types.",
      "Allow keyboard navigation: arrow keys to browse, Enter to select, Backspace to remove last chip.",
      "Show a 'Select all' option when the list is manageable (< 20 items).",
      "Clearly indicate the selection limit if applicable (e.g. '3 of 5 selected').",
    ],
    accessibility: [
      "Use role='listbox' with aria-multiselectable='true' for the dropdown.",
      "Each chip needs role='option' with aria-selected='true' and a remove button with aria-label.",
      "Announce additions ('Tag added') and removals ('Tag removed') via aria-live.",
      "Ensure the remove × button on each chip is keyboard-focusable.",
    ],
    regionalNotes: [
      "Support Arabic tag text with proper BiDi rendering in chips.",
      "Chip close (×) button position should flip to the left side in RTL layout.",
      "Search/filter should support Arabic fuzzy matching (e.g. ignore tashkeel/diacritics).",
    ],
  },

  // 39 ── Autocomplete / Typeahead ─────────────────────────────────────────
  {
    type: "autocomplete",
    label: "Autocomplete / Typeahead",
    description:
      "Search input with real-time suggestions from a local or remote data source. Reduces input errors and speeds up data entry.",
    icon: "autocomplete",
    htmlType: "text",
    validations: [
      {
        name: "valid-selection",
        description:
          "Final value must match an option from the suggestion list (unless free-text is allowed)",
      },
      {
        name: "min-query",
        description:
          "Require a minimum number of characters (e.g. 2-3) before triggering suggestions",
      },
    ],
    constraints: {
      minLength: 1,
      maxLength: 200,
    },
    formatting: {
      placeholder: "Start typing to search...",
    },
    errorMessages: {
      required: "Please select an option from the list",
      invalid: "The entered value does not match any available option",
      custom: "No results found for your search — try different keywords",
    },
    uxGuidelines: [
      "Show suggestions after 2-3 characters of input with a short debounce (150-300ms).",
      "Highlight the matching portion of each suggestion in bold.",
      "Show recent/popular selections at the top when the field is focused but empty.",
      "Support both mouse clicks and keyboard selection (Enter/Tab to confirm).",
      "Display a loading spinner during API calls for remote data sources.",
    ],
    accessibility: [
      "Use the ARIA combobox pattern: role='combobox' with aria-autocomplete='list'.",
      "Announce the number of suggestions to screen readers: 'X results available'.",
      "Ensure aria-activedescendant updates as the user arrows through suggestions.",
      "Announce when results are loading and when no results are found.",
    ],
    regionalNotes: [
      "Support Arabic text search with diacritic-insensitive matching.",
      "Suggestion dropdown should respect RTL layout — text right-aligned, icons on the right.",
      "For address autocomplete in GCC, consider using Google Maps or Absher API for Saudi addresses.",
    ],
  },

  // 40 ── Date + Time ──────────────────────────────────────────────────────
  {
    type: "dateTime",
    label: "Date & Time",
    description:
      "Combined date and time picker for scheduling, appointments, and event timestamps with timezone awareness.",
    icon: "dateTime",
    htmlType: "datetime-local",
    validations: [
      {
        name: "valid-datetime",
        description: "Must be a valid date-time combination",
      },
      {
        name: "future-or-past",
        description:
          "May be restricted to future dates only (bookings) or past dates only (records)",
      },
      {
        name: "business-hours",
        description:
          "Optional: restrict to business hours (e.g. 8am-6pm, Sun-Thu in GCC)",
      },
    ],
    constraints: {
      required: true,
    },
    formatting: {
      placeholder: "DD/MM/YYYY  HH:MM",
      mask: "XX/XX/XXXX  XX:XX",
    },
    errorMessages: {
      required: "Date and time are required",
      invalid: "Please select a valid date and time",
      custom: "Selected time is outside of business hours",
    },
    uxGuidelines: [
      "Split into two visual sections: a date picker (calendar) and a time picker (dropdown or scroll wheel).",
      "For the time picker, offer 15 or 30-minute intervals unless exact time is needed.",
      "Show the selected timezone prominently — especially important for GCC (GST/AST).",
      "Provide quick actions: 'Now', 'Tomorrow 9am', 'Next week' for common scheduling scenarios.",
      "Disable past dates/times for booking flows to prevent invalid selections.",
    ],
    accessibility: [
      "Group date and time inputs within a fieldset with a descriptive legend.",
      "Ensure the calendar popup is keyboard navigable with clear day/month/year controls.",
      "Announce the selected date and time combination to screen readers on change.",
      "Time picker should support manual text entry in addition to dropdown selection.",
    ],
    regionalNotes: [
      "GCC business hours are typically Sunday-Thursday, 8am-6pm. Friday-Saturday is the weekend.",
      "Show time in 12-hour format with AM/PM by default (standard in GCC), with optional 24-hour.",
      "GCC does not observe daylight saving time — simplify timezone handling.",
      "Arabic time display: ٢:٣٠ م (2:30 PM) — support Eastern Arabic numerals in Arabic UI.",
    ],
  },

  // 41 ── Map / Location Picker ────────────────────────────────────────────
  {
    type: "mapLocation",
    label: "Map / Location Picker",
    description:
      "GPS coordinate picker with interactive map, address search, and 'use my location' for delivery and service areas.",
    icon: "mapLocation",
    htmlType: "text",
    validations: [
      {
        name: "valid-coordinates",
        description:
          "Latitude must be -90 to 90, Longitude must be -180 to 180",
        regex: "^-?\\d{1,3}\\.\\d+,\\s*-?\\d{1,3}\\.\\d+$",
        example: "24.7136, 46.6753",
      },
      {
        name: "within-bounds",
        description:
          "Optionally restrict to a service area polygon (e.g. delivery zone)",
      },
    ],
    constraints: {
      required: true,
    },
    formatting: {
      placeholder: "Search for an address or drop a pin on the map",
    },
    errorMessages: {
      required: "Location is required",
      invalid: "Please select a valid location on the map",
      custom: "This location is outside our service area",
    },
    uxGuidelines: [
      "Show an interactive map (Google Maps, Mapbox, or Apple Maps) with a draggable pin.",
      "Include a search bar above the map with address autocomplete.",
      "Offer a 'Use my current location' button with GPS permission prompt.",
      "Display the resolved address below the map after pin placement.",
      "Support zooming and panning. Show the service area boundary if applicable.",
    ],
    accessibility: [
      "Provide a text-based address input as an alternative to the visual map.",
      "The map component should have role='application' with keyboard controls described in aria-roledescription.",
      "Announce address resolution results via aria-live.",
      "Ensure the 'Use my location' button describes the GPS permission requirement.",
    ],
    regionalNotes: [
      "GCC address systems are still evolving — many locations rely on landmarks rather than street addresses.",
      "Saudi Arabia's National Address system (العنوان الوطني) uses short codes — support this format.",
      "What3Words is gaining traction in GCC for precise delivery locations — consider integration.",
      "Default the map center to the user's GCC country capital (Riyadh: 24.71, 46.67; Dubai: 25.20, 55.27).",
    ],
  },

  // 42 ── Digital Signature ────────────────────────────────────────────────
  {
    type: "signature",
    label: "Digital Signature",
    description:
      "Signature capture via touch/stylus drawing or typed signature. Common in contracts, legal docs, and delivery confirmation.",
    icon: "signature",
    htmlType: "text",
    validations: [
      {
        name: "not-empty",
        description:
          "Signature canvas must contain drawn strokes — cannot submit a blank canvas",
      },
      {
        name: "min-strokes",
        description:
          "Require a minimum complexity (e.g. at least 3 distinct strokes) to prevent random marks",
      },
    ],
    constraints: {
      required: true,
    },
    formatting: {
      placeholder: "Draw your signature above or type your full name",
    },
    errorMessages: {
      required: "Signature is required to proceed",
      invalid: "Please provide a valid signature",
      custom: "Signature appears too simple — please draw your full signature",
    },
    uxGuidelines: [
      "Provide two modes: 'Draw' (canvas with touch/mouse) and 'Type' (generate signature from typed name).",
      "Include 'Clear' and 'Undo last stroke' buttons below the canvas.",
      "Show a dotted line at the bottom of the canvas as a visual baseline guide.",
      "On mobile, expand the canvas to full width and offer landscape mode for easier signing.",
      "Save as SVG or PNG with transparent background for document embedding.",
    ],
    accessibility: [
      "For the draw mode, provide the typed-name alternative as a fully accessible fallback.",
      "Label the canvas area clearly: 'Signature drawing area'.",
      "Include instructions for screen reader users: 'Use the Type tab to enter your name as a signature'.",
      "Announce when the signature is cleared or confirmed.",
    ],
    regionalNotes: [
      "Arabic signatures may flow RTL — ensure the canvas does not impose directional constraints.",
      "In Saudi Arabia, digital signatures are legally recognised under the Electronic Transactions Law.",
      "Government platforms (Absher, Nafath) use digital identity verification — consider integration as an alternative to drawn signatures.",
      "For bilingual contracts, capture the signature once and apply it to both Arabic and English versions.",
    ],
  },

  // 43 ── Avatar / Profile Photo ───────────────────────────────────────────
  {
    type: "avatar",
    label: "Avatar / Profile Photo",
    description:
      "Profile image upload with cropping, resizing, and format validation. Circular preview with fallback initials.",
    icon: "avatar",
    htmlType: "file",
    validations: [
      {
        name: "file-type",
        description: "Must be JPEG, PNG, or WebP image format",
        regex: "\\.(jpe?g|png|webp)$",
      },
      {
        name: "file-size",
        description: "Maximum file size 5MB (before compression)",
      },
      {
        name: "dimensions",
        description:
          "Minimum 200×200px for quality. Maximum 4000×4000px to prevent processing issues.",
      },
    ],
    constraints: {
      accept: "image/jpeg,image/png,image/webp",
    },
    formatting: {
      placeholder: "Upload a profile photo",
    },
    errorMessages: {
      required: "Profile photo is required",
      invalid: "Please upload a valid image file (JPEG, PNG, or WebP)",
      custom: "Image is too small — minimum 200×200 pixels required",
    },
    uxGuidelines: [
      "Show a circular crop preview that the user can pan and zoom.",
      "Display initials as a default avatar when no photo is uploaded.",
      "Accept drag-and-drop, click-to-upload, and camera capture on mobile.",
      "Compress and resize client-side before upload to save bandwidth.",
      "Show a progress bar during upload with option to cancel.",
    ],
    accessibility: [
      "Label the upload button clearly: 'Upload profile photo'.",
      "Provide alt text for the preview image: 'Profile photo preview'.",
      "Announce upload progress and completion via aria-live.",
      "Ensure the crop interface is operable with keyboard (arrow keys to pan, +/- to zoom).",
    ],
    regionalNotes: [
      "Some users may prefer not to upload a personal photo for cultural reasons — always provide a non-photo fallback (initials, icon).",
      "Profile photos in government platforms may need to meet passport-photo standards (white background, front-facing).",
      "Consider gender-sensitive defaults for the fallback avatar icon.",
    ],
  },

  // 44 ── PIN Code ─────────────────────────────────────────────────────────
  {
    type: "pinCode",
    label: "PIN Code",
    description:
      "Secure numeric PIN entry (4-6 digits) for transaction authorisation, app locks, and parental controls.",
    icon: "pin",
    htmlType: "password",
    validations: [
      {
        name: "digits-only",
        description: "Must contain only digits (0-9)",
        regex: "^\\d{4,6}$",
      },
      {
        name: "no-sequential",
        description:
          "Should not be a sequential number (1234, 4321) for security",
      },
      {
        name: "no-repeated",
        description:
          "Should not be all same digits (0000, 1111) for security",
      },
    ],
    constraints: {
      required: true,
      minLength: 4,
      maxLength: 6,
      pattern: "^\\d{4,6}$",
    },
    formatting: {
      placeholder: "● ● ● ●",
      mask: "X X X X",
    },
    errorMessages: {
      required: "PIN is required",
      invalid: "PIN must be 4-6 digits",
      pattern: "PIN must contain only numbers",
      custom: "PIN is too simple — avoid sequential or repeated digits",
    },
    uxGuidelines: [
      "Display as separate masked input boxes (dots/asterisks) — one per digit.",
      "Offer a 'Show PIN' toggle eye icon for verification before submission.",
      "Auto-advance focus to the next box after each digit entry.",
      "For PIN creation, require the user to enter the PIN twice for confirmation.",
      "Implement rate limiting and account lock after multiple failed PIN attempts.",
    ],
    accessibility: [
      "Use inputmode='numeric' and autocomplete='off' to prevent autofill.",
      "Label as 'Enter your PIN' or 'Create a new PIN' depending on context.",
      "Announce masking state: 'PIN hidden' / 'PIN visible' when toggling visibility.",
      "If using separate input boxes, group them with role='group' and aria-label.",
    ],
    regionalNotes: [
      "Banking PINs in the GCC are typically 4 digits — match the user's bank standard.",
      "Normalise Eastern Arabic numerals (٠-٩) to Western (0-9) before validation.",
      "Mada/ATM PINs use 4 digits; in-app PINs may use 4-6 — be context-aware.",
    ],
  },

  // 45 ── License / Permit Number ──────────────────────────────────────────
  {
    type: "licenseNumber",
    label: "License / Permit Number",
    description:
      "Generic identifier for professional licenses, driving permits, and regulatory certifications.",
    icon: "license",
    htmlType: "text",
    validations: [
      {
        name: "format",
        description:
          "Format depends on license type: driving license, professional license, municipality permit, etc.",
      },
      {
        name: "not-expired",
        description:
          "Pair with an expiry date field to validate the license is currently active",
      },
    ],
    constraints: {
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    formatting: {
      placeholder: "Enter license or permit number",
    },
    errorMessages: {
      required: "License number is required",
      invalid: "Please enter a valid license number",
      custom: "This license number appears to be expired",
    },
    uxGuidelines: [
      "Provide a license type selector (Driving, Professional, Trade, Municipal) to adjust validation.",
      "Pair with 'Issuing Authority', 'Issue Date', and 'Expiry Date' fields.",
      "Offer integration with verification APIs (e.g. Saudi DL verification via Absher).",
      "Show a visual status indicator: Active (green), Expiring Soon (amber), Expired (red).",
    ],
    accessibility: [
      "Label with the specific license type context: 'Driving License Number' not just 'License'.",
      "Describe the expected format in aria-describedby.",
      "Announce verification status changes via aria-live.",
    ],
    regionalNotes: [
      "Saudi driving licenses are 10-digit numbers verifiable through Absher.",
      "UAE driving licenses are issued by the Traffic Department of each emirate.",
      "Professional licenses (e.g. engineering, medical) in KSA are issued by the Saudi Council of Engineers / SCFHS.",
      "Municipality trade licenses in the GCC vary significantly by city and zone.",
    ],
  },

  // 46 ── Invoice / Reference Number ───────────────────────────────────────
  {
    type: "invoiceNumber",
    label: "Invoice / Reference Number",
    description:
      "Business document identifier for invoices, purchase orders, quotes, and transaction references.",
    icon: "invoice",
    htmlType: "text",
    validations: [
      {
        name: "format",
        description:
          "Typically alphanumeric with optional prefixes (INV-, PO-, QT-). Pattern depends on business rules.",
        regex: "^[A-Z]{2,4}-\\d{4,10}$",
        example: "INV-20240001",
      },
      {
        name: "unique",
        description:
          "Invoice numbers must be unique within the system — validate server-side",
      },
    ],
    constraints: {
      required: true,
      minLength: 4,
      maxLength: 30,
    },
    formatting: {
      placeholder: "INV-20240001",
      prefix: "INV-",
    },
    errorMessages: {
      required: "Invoice number is required",
      invalid: "Please enter a valid invoice number",
      pattern: "Must follow the format: PREFIX-NUMBER (e.g. INV-20240001)",
      custom: "This invoice number already exists in the system",
    },
    uxGuidelines: [
      "Auto-generate the next sequential number with the correct prefix.",
      "Allow customisation of the prefix per document type (INV, PO, QT, CR, DN).",
      "Show the document type icon alongside the number for visual context.",
      "Include a search/lookup feature to find existing invoices by number.",
      "Display the creation date and status alongside the reference number.",
    ],
    accessibility: [
      "Label with the document type: 'Invoice Number' or 'Purchase Order Number'.",
      "Use aria-describedby to explain the auto-generation pattern.",
      "Announce auto-generated values via aria-live when the field is populated.",
    ],
    regionalNotes: [
      "ZATCA e-invoicing (Fatoorah) Phase 2 requires specific invoice numbering formats — validate compliance.",
      "Arabic invoice numbers may use the same Western digits but should support Arabic labels (فاتورة رقم).",
      "Multi-currency invoicing is common in GCC — pair invoice number with currency code.",
      "VAT invoice requirements differ between simplified and standard invoices in the GCC.",
    ],
  },

  // 47 ── Barcode / QR Code ────────────────────────────────────────────────
  {
    type: "barcode",
    label: "Barcode / QR Code",
    description:
      "Barcode or QR code scanner input with camera-based scanning and manual entry fallback.",
    icon: "barcode",
    htmlType: "text",
    validations: [
      {
        name: "format",
        description:
          "Validate based on barcode type: EAN-13 (13 digits), UPC-A (12 digits), Code 128, or QR (freeform)",
      },
      {
        name: "checksum",
        description: "EAN/UPC barcodes include a check digit — validate it",
      },
    ],
    constraints: {
      minLength: 4,
      maxLength: 4096,
    },
    formatting: {
      placeholder: "Scan or enter barcode manually",
    },
    errorMessages: {
      required: "Barcode is required",
      invalid: "The scanned barcode is not in a valid format",
      custom: "This barcode is not found in the product database",
    },
    uxGuidelines: [
      "Offer a 'Scan' button that opens the device camera for barcode/QR scanning.",
      "Support multiple barcode formats: EAN-13, UPC-A, Code 128, QR Code, Data Matrix.",
      "Show a live camera preview with a targeting rectangle/frame for alignment.",
      "Provide haptic feedback and a sound on successful scan.",
      "Always include a manual text entry fallback for damaged or unreadable barcodes.",
    ],
    accessibility: [
      "Label the scan button clearly: 'Open camera to scan barcode'.",
      "Announce successful scan results via aria-live with the decoded value.",
      "Ensure the manual entry field is equally accessible to the scan option.",
      "Describe camera permission requirements when the scan button is activated.",
    ],
    regionalNotes: [
      "GS1 Saudi Arabia manages barcode standards in KSA — EAN-13 barcodes starting with 628 are Saudi.",
      "QR codes are used in ZATCA e-invoicing — the QR encodes seller TRN, timestamp, and VAT amount.",
      "Saudi Food and Drug Authority (SFDA) requires barcode scanning for pharmaceutical tracking.",
      "Emirates ID (UAE) and Iqama (KSA) cards contain barcodes — support ID document scanning.",
    ],
  },

  // 48 ── Priority Selector ────────────────────────────────────────────────
  {
    type: "priority",
    label: "Priority Level",
    description:
      "Task or ticket priority selector with colour-coded levels: Critical, High, Medium, Low, None.",
    icon: "priority",
    htmlType: "select",
    validations: [
      {
        name: "valid-level",
        description:
          "Must be one of the defined priority levels (Critical, High, Medium, Low, None)",
      },
    ],
    constraints: {
      required: true,
    },
    formatting: {
      placeholder: "Select priority",
    },
    errorMessages: {
      required: "Priority level is required",
      invalid: "Please select a valid priority level",
    },
    uxGuidelines: [
      "Use colour-coded badges: Critical (red), High (orange), Medium (yellow), Low (blue), None (grey).",
      "Display as a dropdown with coloured dot indicators next to each option.",
      "Default to 'Medium' for new items — require explicit selection for 'Critical'.",
      "Show a priority distribution chart in list views for team awareness.",
      "Consider using icons (🔴🟠🟡🔵⚪) alongside text for quick visual scanning.",
    ],
    accessibility: [
      "Convey priority through text labels, not just colour (e.g. 'High priority' not just an orange dot).",
      "Use aria-label to describe the full priority level on compact badge displays.",
      "In list views, ensure the priority indicator is part of the accessible row description.",
    ],
    regionalNotes: [
      "Arabic priority labels: حرج (Critical), عالي (High), متوسط (Medium), منخفض (Low).",
      "Colour associations are generally universal — red for urgent, green for low priority.",
      "In government contexts, priority may map to SLA tiers (e.g. 24h, 48h, 1 week).",
    ],
  },

  // 49 ── Status / Workflow State ──────────────────────────────────────────
  {
    type: "status",
    label: "Status / Workflow",
    description:
      "Workflow state selector for tickets, orders, and project items. Configurable stages with colour coding.",
    icon: "status",
    htmlType: "select",
    validations: [
      {
        name: "valid-transition",
        description:
          "Status changes must follow allowed transitions (e.g. Draft → Submitted, not Draft → Completed)",
      },
      {
        name: "valid-state",
        description: "Must be one of the defined workflow states",
      },
    ],
    constraints: {
      required: true,
    },
    formatting: {
      placeholder: "Select status",
    },
    errorMessages: {
      required: "Status is required",
      invalid: "This status transition is not allowed",
      custom: "Cannot move to '{status}' from the current state",
    },
    uxGuidelines: [
      "Display as a coloured badge/pill that opens a dropdown of valid next states on click.",
      "Only show valid transitions from the current state — grey out or hide invalid transitions.",
      "Use a consistent colour scheme: Draft (grey), Active (blue), In Review (amber), Approved (green), Rejected (red), Archived (slate).",
      "Show a visual workflow timeline/stepper above the selector for linear processes.",
      "Include a status history log showing who changed what and when.",
    ],
    accessibility: [
      "Label the current status and available transitions clearly for screen readers.",
      "Use aria-live to announce status changes.",
      "In Kanban/board views, ensure drag-and-drop status changes have keyboard alternatives.",
      "Describe the transition rules in aria-describedby: 'Can move to: In Review, Cancelled'.",
    ],
    regionalNotes: [
      "Arabic workflow labels: مسودة (Draft), نشط (Active), قيد المراجعة (In Review), معتمد (Approved), مرفوض (Rejected).",
      "Government workflows (Absher, Muqeem, Balady) use specific status terminology — match their conventions.",
      "GCC business culture values clear approval hierarchies — reflect multi-level approvals in the workflow.",
    ],
  },

  // 50 ── IP Address ───────────────────────────────────────────────────────
  {
    type: "ipAddress",
    label: "IP Address",
    description:
      "IPv4 or IPv6 address input with octet-based entry, CIDR notation support, and format validation.",
    icon: "ipAddress",
    htmlType: "text",
    validations: [
      {
        name: "ipv4-format",
        description:
          "Four octets (0-255) separated by dots",
        regex:
          "^(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$",
        example: "192.168.1.1",
      },
      {
        name: "ipv6-format",
        description:
          "Eight groups of four hex digits separated by colons, with :: shorthand support",
        example: "2001:0db8:85a3::8a2e:0370:7334",
      },
      {
        name: "cidr",
        description:
          "Optional CIDR notation (/8 to /32 for IPv4, /0 to /128 for IPv6)",
      },
    ],
    constraints: {
      required: true,
      minLength: 7,
      maxLength: 45,
    },
    formatting: {
      placeholder: "192.168.1.1 or 2001:db8::1",
    },
    errorMessages: {
      required: "IP address is required",
      invalid: "Please enter a valid IPv4 or IPv6 address",
      pattern: "Each octet must be 0-255 for IPv4",
    },
    uxGuidelines: [
      "Provide separate input boxes for each octet (IPv4) with auto-advance on dot or 3 digits.",
      "Auto-detect IPv4 vs IPv6 format from the input.",
      "Offer a toggle between IPv4 and IPv6 modes.",
      "Support CIDR notation for subnet configuration: show a separate subnet mask field.",
      "Highlight private vs public IP ranges visually (private: grey badge, public: blue badge).",
    ],
    accessibility: [
      "If using separate octet inputs, group with role='group' and aria-label='IP Address'.",
      "Label each octet input: 'Octet 1', 'Octet 2', etc.",
      "Announce format detection ('IPv4 detected' / 'IPv6 detected') via aria-live.",
    ],
    regionalNotes: [
      "GCC IT infrastructure commonly uses private subnets (10.x.x.x, 172.16-31.x.x) — validate accordingly.",
      "Cloud hosting in GCC typically uses AWS (Bahrain region), Azure (UAE), or local providers — IP ranges vary.",
      "Some GCC ISPs assign dynamic IPs — consider this in whitelisting UIs.",
    ],
  },

  // 51 ── Quantity Stepper ─────────────────────────────────────────────────
  {
    type: "quantityStepper",
    label: "Quantity Stepper",
    description:
      "Numeric increment/decrement control with +/- buttons. Common in e-commerce carts, inventory, and ordering.",
    icon: "quantity",
    htmlType: "number",
    validations: [
      {
        name: "integer",
        description: "Must be a whole number (no decimals)",
      },
      {
        name: "range",
        description:
          "Must be within the defined min/max range (e.g. 1-99 for cart items)",
      },
      {
        name: "step",
        description:
          "May enforce step intervals (e.g. step of 5 for bulk ordering)",
      },
    ],
    constraints: {
      required: true,
      min: 0,
      max: 9999,
    },
    formatting: {
      placeholder: "1",
    },
    errorMessages: {
      required: "Quantity is required",
      invalid: "Please enter a valid number",
      custom: "Only {max} items available in stock",
    },
    uxGuidelines: [
      "Display as a compact control: [ − ] number [ + ] in a single row.",
      "Disable the − button at minimum (0 or 1) and + at maximum (stock limit).",
      "Allow direct number entry by tapping/clicking the number display.",
      "Support press-and-hold on +/- for rapid increment/decrement.",
      "Show stock availability when approaching the maximum: 'Only 3 left in stock'.",
    ],
    accessibility: [
      "Use role='spinbutton' with aria-valuemin, aria-valuemax, and aria-valuenow.",
      "Label +/- buttons with aria-label: 'Increase quantity' / 'Decrease quantity'.",
      "Announce the new value after each increment/decrement via aria-live.",
      "Ensure the direct-entry mode is keyboard accessible.",
    ],
    regionalNotes: [
      "In RTL layout, the − button should be on the right and + on the left (mirrored).",
      "E-commerce in GCC often requires minimum order quantities (MOQ) — support and display this.",
      "Eastern Arabic numerals (٣) should be accepted and displayed in Arabic UI.",
    ],
  },

  // 52 ── WhatsApp Number ──────────────────────────────────────────────────
  {
    type: "whatsapp",
    label: "WhatsApp Number",
    description:
      "WhatsApp contact number with country code. The dominant messaging platform in GCC with 90%+ penetration.",
    icon: "whatsapp",
    htmlType: "tel",
    validations: [
      {
        name: "phone-format",
        description: "Must be a valid mobile number with country code",
        regex: "^\\+\\d{10,15}$",
        example: "+966501234567",
      },
      {
        name: "whatsapp-registered",
        description:
          "Optionally verify the number is registered on WhatsApp via the WhatsApp Business API",
      },
    ],
    constraints: {
      required: false,
      minLength: 10,
      maxLength: 16,
    },
    formatting: {
      placeholder: "+966 5X XXX XXXX",
      prefix: "+",
    },
    errorMessages: {
      required: "WhatsApp number is required",
      invalid: "Please enter a valid WhatsApp number",
      pattern: "Include the country code (e.g. +966 for Saudi Arabia)",
    },
    uxGuidelines: [
      "Pre-fill the country code based on the user's location or phone number field.",
      "Show the WhatsApp icon prominently to differentiate from a regular phone field.",
      "Offer a 'Same as phone number' checkbox to auto-copy from the phone field.",
      "Validate the number format matches mobile patterns (not landlines — WhatsApp requires mobile).",
      "Provide a 'Message on WhatsApp' action button after the number is entered.",
    ],
    accessibility: [
      "Label as 'WhatsApp Number' not just 'WhatsApp' for clarity.",
      "Use inputmode='tel' for the numeric keyboard on mobile.",
      "Describe the country code requirement in aria-describedby.",
    ],
    regionalNotes: [
      "WhatsApp is the primary business communication channel in the GCC — more important than email for many users.",
      "Saudi mobile numbers: +966 5X XXX XXXX. UAE: +971 5X XXX XXXX.",
      "WhatsApp Business API is used by most GCC companies for customer service — consider integration.",
      "Many GCC businesses use WhatsApp for OTP delivery as an alternative to SMS.",
    ],
  },

  // 53 ── @Mention ─────────────────────────────────────────────────────────
  {
    type: "mention",
    label: "@Mention / User Tag",
    description:
      "Inline user mention input that triggers a dropdown of team members when @ is typed. Common in comments and collaboration.",
    icon: "mention",
    htmlType: "text",
    validations: [
      {
        name: "valid-user",
        description:
          "Each @mention must resolve to a valid user in the system",
      },
      {
        name: "max-mentions",
        description:
          "Optionally limit the number of mentions per message (e.g. max 10)",
      },
    ],
    constraints: {
      maxLength: 5000,
    },
    formatting: {
      placeholder: "Type @ to mention someone...",
    },
    errorMessages: {
      required: "This field is required",
      invalid: "One or more mentioned users could not be found",
      custom: "You can mention a maximum of {max} users per message",
    },
    uxGuidelines: [
      "Trigger the user dropdown when @ is typed, filtering as the user continues typing.",
      "Display user avatar, name, and role in the dropdown for easy identification.",
      "Highlight mentioned users with a coloured background in the text.",
      "Support @all or @team shortcuts for group mentions.",
      "Send notifications to mentioned users when the content is submitted.",
    ],
    accessibility: [
      "Use the ARIA combobox pattern for the inline mention dropdown.",
      "Announce the number of matching users as the search narrows.",
      "Mentioned names should be focusable and removable via keyboard.",
      "Announce 'Mention added: [Name]' via aria-live when a user is selected.",
    ],
    regionalNotes: [
      "Support Arabic names in the mention search (diacritic-insensitive matching).",
      "Display names in the user's preferred language (EN or AR) based on locale.",
      "In RTL text, mentions should flow naturally within the BiDi text direction.",
    ],
  },

  // 54 ── Markdown Editor ──────────────────────────────────────────────────
  {
    type: "markdown",
    label: "Markdown Editor",
    description:
      "Markdown text editor with live preview, syntax highlighting, and common formatting shortcuts.",
    icon: "markdown",
    htmlType: "textarea",
    validations: [
      {
        name: "valid-markdown",
        description:
          "Must be parseable Markdown. Sanitise rendered HTML output to prevent XSS.",
      },
      {
        name: "max-length",
        description: "Enforce character or word limit on raw Markdown content",
      },
    ],
    constraints: {
      maxLength: 100000,
    },
    formatting: {
      placeholder: "# Heading\n\nWrite in **Markdown**...",
    },
    errorMessages: {
      required: "Content is required",
      invalid: "Content contains unsupported formatting or syntax",
      maxLength: "Content exceeds the maximum allowed length",
    },
    uxGuidelines: [
      "Provide a split-pane view: raw Markdown on the left, rendered preview on the right.",
      "Include a toolbar with common formatting buttons: Bold, Italic, Link, Image, Code, List.",
      "Support keyboard shortcuts: Ctrl+B (bold), Ctrl+I (italic), Ctrl+K (link).",
      "Show a live character/word count below the editor.",
      "Support drag-and-drop image upload that auto-generates ![alt](url) syntax.",
    ],
    accessibility: [
      "The editor area should have role='textbox' with aria-multiline='true'.",
      "Toolbar buttons need accessible labels (aria-label='Insert bold text').",
      "Ensure keyboard shortcuts don't conflict with screen reader shortcuts — provide alternatives.",
      "The preview pane should be labelled as 'Preview' with aria-live='polite' for updates.",
    ],
    regionalNotes: [
      "Support RTL Markdown content — Arabic text should render correctly in both editor and preview.",
      "Markdown is less common in Arabic technical writing — provide visual formatting as a more accessible alternative.",
      "Code blocks should always render LTR regardless of the document's text direction.",
    ],
  },

  // 55 ── Code / JSON Editor ───────────────────────────────────────────────
  {
    type: "codeEditor",
    label: "Code / JSON Editor",
    description:
      "Syntax-highlighted code input for JSON, SQL, CSS, and other structured formats with validation and auto-formatting.",
    icon: "codeEditor",
    htmlType: "textarea",
    validations: [
      {
        name: "syntax-valid",
        description:
          "Must be syntactically valid for the selected language (e.g. valid JSON, valid SQL)",
      },
      {
        name: "schema-valid",
        description:
          "For JSON: optionally validate against a JSON Schema definition",
      },
    ],
    constraints: {
      maxLength: 500000,
    },
    formatting: {
      placeholder: "{\n  \"key\": \"value\"\n}",
    },
    errorMessages: {
      required: "Code input is required",
      invalid: "Syntax error detected",
      custom: "JSON does not match the expected schema",
    },
    uxGuidelines: [
      "Use a monospaced font (JetBrains Mono, Fira Code) with syntax highlighting.",
      "Provide auto-indent, bracket matching, and line numbers.",
      "Offer a 'Format / Prettify' button for JSON and code formatting.",
      "Show syntax errors inline with red underlines and error descriptions on hover.",
      "Support dark and light editor themes to match the application palette.",
    ],
    accessibility: [
      "Use a proper code editor component (CodeMirror, Monaco) with built-in accessibility.",
      "Ensure line numbers are available to screen readers.",
      "Announce syntax errors via aria-live when the user pauses typing.",
      "Support standard keyboard shortcuts (Ctrl+Z undo, Ctrl+Shift+F format).",
    ],
    regionalNotes: [
      "Code editors should always use LTR direction, even in Arabic-language applications.",
      "JSON keys may contain Arabic text — ensure the editor handles Unicode correctly.",
      "Comments in code may be in Arabic — syntax highlighting should handle this.",
    ],
  },

  // 56 ── Bank Account ─────────────────────────────────────────────────────
  {
    type: "bankAccount",
    label: "Bank Account Details",
    description:
      "Composite field for bank details: bank name, account number, IBAN, and SWIFT/BIC code. Used in payroll and vendor payments.",
    icon: "bankAccount",
    htmlType: "text",
    validations: [
      {
        name: "bank-name",
        description: "Bank must be selected from the approved list of local and international banks",
      },
      {
        name: "account-number",
        description: "Account number must match the selected bank's format",
      },
      {
        name: "swift-code",
        description:
          "SWIFT/BIC must be 8 or 11 alphanumeric characters",
        regex: "^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$",
        example: "RIBLSARI",
      },
    ],
    constraints: {
      required: true,
    },
    formatting: {
      placeholder: "Select your bank",
    },
    errorMessages: {
      required: "Bank account details are required",
      invalid: "Please provide valid bank details",
      custom: "Account number format doesn't match the selected bank",
    },
    uxGuidelines: [
      "Present as a grouped card: Bank Name (searchable dropdown), Account Number, IBAN, SWIFT code.",
      "Auto-populate the SWIFT code when the bank is selected.",
      "If IBAN is provided, auto-detect the bank from the BBAN portion and pre-fill the bank name.",
      "Show the bank logo alongside the bank name for visual confirmation.",
      "Validate IBAN and account number consistency — they should match.",
    ],
    accessibility: [
      "Group all sub-fields within a fieldset with legend 'Bank Account Details'.",
      "Each sub-field (Bank, Account #, IBAN, SWIFT) needs its own label.",
      "Announce auto-populated fields (bank name from IBAN) via aria-live.",
    ],
    regionalNotes: [
      "Saudi banks: Al Rajhi (RJHISARI), SNB (NCBKSAJE), Riyad Bank (RIBLSARI), Al Inma (INMASARI).",
      "UAE banks: ENBD (EABORAM), FAB (NBADAEAA), ADCB (ADCBAEAA).",
      "Bank transfers are the primary payment method for salaries in the GCC (WPS — Wage Protection System).",
      "Include an option for international wire transfer details (correspondent bank, intermediary bank).",
    ],
  },

  // 57 ── Salary / Compensation ────────────────────────────────────────────
  {
    type: "salary",
    label: "Salary / Compensation",
    description:
      "Monetary compensation input with currency, frequency (monthly/annual), and allowance breakdowns common in GCC employment.",
    icon: "salary",
    htmlType: "number",
    validations: [
      {
        name: "positive",
        description: "Salary must be a positive number",
      },
      {
        name: "range",
        description:
          "Must be within a reasonable range for the position and market (configurable)",
      },
      {
        name: "currency-valid",
        description: "Selected currency must be valid (SAR, AED, BHD, KWD, QAR, OMR)",
      },
    ],
    constraints: {
      required: true,
      min: 0,
    },
    formatting: {
      placeholder: "0.00",
      thousandSeparator: true,
      decimalPlaces: 2,
    },
    errorMessages: {
      required: "Salary amount is required",
      invalid: "Please enter a valid salary amount",
      custom: "Amount is outside the approved range for this position",
    },
    uxGuidelines: [
      "Provide a currency selector (default to local GCC currency) with the amount input.",
      "Include a frequency toggle: Monthly / Annual with auto-conversion between them.",
      "For GCC employment, break down into components: Basic, Housing, Transport, Other Allowances.",
      "Show the total package calculation in real-time as components are filled.",
      "Format with thousand separators and the currency symbol/code.",
    ],
    accessibility: [
      "Label the amount field with the currency context: 'Monthly salary in SAR'.",
      "Use inputmode='decimal' for mobile numeric keyboard with decimal point.",
      "Announce the total calculation when component values change.",
      "Ensure the frequency toggle is clearly labelled: 'Salary period: Monthly / Annual'.",
    ],
    regionalNotes: [
      "GCC salary structures typically include Basic + Housing (25%) + Transport (10%) + Other Allowances.",
      "Saudi Nitaqat program may require salary to meet minimum thresholds per nationality tier.",
      "UAE salaries are typically quoted monthly. Kuwait dinar (KWD) is the highest-value GCC currency.",
      "End-of-service gratuity calculations are based on Basic salary — highlight this in the UI.",
    ],
  },

  // 58 ── Payment Method ───────────────────────────────────────────────────
  {
    type: "paymentMethod",
    label: "Payment Method",
    description:
      "Payment method selector supporting cards, bank transfer, digital wallets (Apple Pay, STCPay, Mada), and cash on delivery.",
    icon: "payment",
    htmlType: "select",
    validations: [
      {
        name: "valid-method",
        description: "Must select a supported payment method",
      },
      {
        name: "method-details",
        description:
          "Additional details (card number, bank account) must be valid for the selected method",
      },
    ],
    constraints: {
      required: true,
    },
    formatting: {
      placeholder: "Select payment method",
    },
    errorMessages: {
      required: "Payment method is required",
      invalid: "Selected payment method is not available",
    },
    uxGuidelines: [
      "Display payment methods as visual cards/tiles with brand logos (Visa, MC, Mada, Apple Pay, STCPay).",
      "Show saved payment methods first with the ability to add new ones.",
      "Reveal additional fields (card details, bank info) based on the selected method.",
      "Indicate which methods support installments (Tabby, Tamara) for e-commerce.",
      "Show security badges (PCI DSS, 3D Secure) to build trust.",
    ],
    accessibility: [
      "Use radio group for payment method selection with visual card layout.",
      "Each method needs a clear label including the brand name.",
      "Announce method selection and any additional fields that appear.",
      "Ensure saved card display shows only last 4 digits with card type.",
    ],
    regionalNotes: [
      "Mada is the dominant debit network in Saudi Arabia — always list first in KSA.",
      "STCPay (stc pay) is a major digital wallet in Saudi Arabia.",
      "Apple Pay has high adoption in UAE and KSA — prioritise in mobile apps.",
      "Cash on Delivery (COD) is still significant in GCC e-commerce — don't remove it.",
      "BNPL (Buy Now Pay Later): Tabby and Tamara are the leading BNPL providers in GCC.",
    ],
  },

  // 59 ── Duration ─────────────────────────────────────────────────────────
  {
    type: "duration",
    label: "Duration / Time Span",
    description:
      "Duration picker for hours, minutes, and optionally days. Used in scheduling, timesheets, and project management.",
    icon: "duration",
    htmlType: "text",
    validations: [
      {
        name: "non-negative",
        description: "Duration must be zero or positive",
      },
      {
        name: "max-duration",
        description:
          "May have a maximum limit (e.g. 24h for daily timesheet, 90 days for project phase)",
      },
      {
        name: "format",
        description:
          "Must match expected format: HH:MM, or days + hours + minutes",
      },
    ],
    constraints: {
      min: 0,
    },
    formatting: {
      placeholder: "0h 0m",
      mask: "XXh XXm",
    },
    errorMessages: {
      required: "Duration is required",
      invalid: "Please enter a valid duration",
      custom: "Duration exceeds the maximum allowed ({max})",
    },
    uxGuidelines: [
      "Provide separate inputs for hours and minutes (and optionally days) with spinners.",
      "Support free-text entry that parses natural formats: '2h 30m', '2.5h', '150m'.",
      "Show the total in a human-readable format: '2 hours 30 minutes' or '2.5 hours'.",
      "For timesheets, show a running total of the day's entries.",
      "Provide quick-select buttons for common durations: 15m, 30m, 1h, 2h, 4h, 8h.",
    ],
    accessibility: [
      "Label each unit input separately: 'Hours', 'Minutes' (and 'Days' if applicable).",
      "Use role='spinbutton' with appropriate min/max for each unit.",
      "Announce the total duration in a readable format when values change.",
    ],
    regionalNotes: [
      "GCC standard workday is 8 hours (48 hours/week). Ramadan reduces to 6 hours/day.",
      "Friday-Saturday weekend in most GCC countries — reflect in weekly duration calculations.",
      "Arabic duration format: ساعتان و٣٠ دقيقة (2 hours and 30 minutes).",
    ],
  },

  // 60 ── Timezone ─────────────────────────────────────────────────────────
  {
    type: "timezone",
    label: "Timezone",
    description:
      "Timezone selector with UTC offset display, city-based search, and automatic detection from browser.",
    icon: "timezone",
    htmlType: "select",
    validations: [
      {
        name: "valid-timezone",
        description:
          "Must be a valid IANA timezone identifier (e.g. Asia/Riyadh, Asia/Dubai)",
      },
    ],
    constraints: {
      required: true,
    },
    formatting: {
      placeholder: "Select timezone",
    },
    errorMessages: {
      required: "Timezone is required",
      invalid: "Please select a valid timezone",
    },
    uxGuidelines: [
      "Auto-detect the user's timezone from their browser (Intl.DateTimeFormat().resolvedOptions().timeZone).",
      "Display as '(UTC+03:00) Riyadh' format with city names for easy identification.",
      "Support search by city name, country, or UTC offset.",
      "Group common GCC timezones at the top of the list.",
      "Show the current local time in the selected timezone as a preview.",
    ],
    accessibility: [
      "Use a searchable combobox for the timezone list (too many options for a plain dropdown).",
      "Announce the detected timezone and allow the user to confirm or change it.",
      "Include the UTC offset in the accessible label for each option.",
    ],
    regionalNotes: [
      "GCC uses two timezones: Arabia Standard Time (AST, UTC+3: SA, KW, BH, QA) and Gulf Standard Time (GST, UTC+4: AE, OM).",
      "GCC countries do not observe daylight saving — no DST transitions to handle.",
      "Default to Asia/Riyadh for Saudi users, Asia/Dubai for UAE users.",
      "For multi-timezone teams (e.g. Riyadh + Dubai), show both local times in scheduling UIs.",
    ],
  },

  // 61 ── Recurring Schedule ───────────────────────────────────────────────
  {
    type: "schedule",
    label: "Recurring Schedule",
    description:
      "Recurring schedule builder for events, reports, and automated tasks. Supports daily, weekly, monthly, and custom patterns.",
    icon: "schedule",
    htmlType: "text",
    validations: [
      {
        name: "valid-pattern",
        description:
          "Must define a valid recurrence pattern (frequency, interval, days, end condition)",
      },
      {
        name: "not-past",
        description: "Start date/time must not be in the past",
      },
    ],
    constraints: {
      required: true,
    },
    formatting: {
      placeholder: "Set up a recurring schedule",
    },
    errorMessages: {
      required: "Schedule is required",
      invalid: "Please configure a valid schedule",
      custom: "Schedule conflicts with an existing event",
    },
    uxGuidelines: [
      "Provide preset options: Daily, Weekly (with day picker), Monthly (with date picker), Custom.",
      "For weekly, show a row of day buttons (Sun–Sat) for multi-day selection.",
      "Show a human-readable summary: 'Every Monday and Wednesday at 2:00 PM'.",
      "Include end conditions: Never, After N occurrences, Until date.",
      "Show next 3-5 upcoming occurrences as a preview.",
    ],
    accessibility: [
      "Use fieldset and legend to group schedule configuration controls.",
      "Day-of-week buttons should use role='checkbox' or toggle pattern.",
      "Announce the schedule summary via aria-live when configuration changes.",
      "Ensure all controls are keyboard navigable — especially the day picker grid.",
    ],
    regionalNotes: [
      "GCC work week is Sunday–Thursday. Default weekly schedules should reflect this.",
      "Friday is the holy day in Islam — avoid scheduling business events on Fridays.",
      "Ramadan working hours are reduced (6h/day) — schedule builders should accommodate this.",
      "Hijri calendar events (Eid, National Days) should be available as schedule boundaries.",
    ],
  },

  // 62 ── Weight ───────────────────────────────────────────────────────────
  {
    type: "weight",
    label: "Weight / Mass",
    description:
      "Weight input with unit selection (kg, g, lb, oz). Used in shipping, healthcare, and inventory management.",
    icon: "weight",
    htmlType: "number",
    validations: [
      {
        name: "positive",
        description: "Weight must be a positive number",
      },
      {
        name: "range",
        description:
          "Must be within a reasonable range for the context (e.g. 0-500kg for shipping, 0-300kg for human weight)",
      },
    ],
    constraints: {
      required: true,
      min: 0,
    },
    formatting: {
      placeholder: "0.00",
      suffix: "kg",
      decimalPlaces: 2,
    },
    errorMessages: {
      required: "Weight is required",
      invalid: "Please enter a valid weight",
      custom: "Weight exceeds the maximum limit ({max} kg)",
    },
    uxGuidelines: [
      "Provide a unit selector (kg, g, lb, oz) alongside the numeric input.",
      "Auto-convert between units when the unit is changed (e.g. 1kg = 2.205lb).",
      "For shipping: show weight tiers and cost implications if available.",
      "For healthcare: display BMI calculation when paired with height.",
      "Use a sensible default unit based on context (kg for GCC).",
    ],
    accessibility: [
      "Label with the unit: 'Weight in kilograms' not just 'Weight'.",
      "Use inputmode='decimal' for numeric input with decimal support.",
      "Announce unit conversions via aria-live when the unit changes.",
    ],
    regionalNotes: [
      "GCC uses the metric system (kg, g) — default to kilograms.",
      "Shipping weights in GCC follow IATA standards for air freight (kg with 0.5kg increments).",
      "Saudi Post (SPL) and Aramex use kg — match their weight tier breakpoints.",
    ],
  },

  // 63 ── Dimensions ───────────────────────────────────────────────────────
  {
    type: "dimensions",
    label: "Dimensions (L × W × H)",
    description:
      "Three-axis measurement input for length, width, and height. Used in shipping, real estate, and product specifications.",
    icon: "dimensions",
    htmlType: "number",
    validations: [
      {
        name: "positive",
        description: "All dimensions must be positive numbers",
      },
      {
        name: "all-required",
        description:
          "All three dimensions (length, width, height) must be provided",
      },
    ],
    constraints: {
      required: true,
      min: 0,
    },
    formatting: {
      placeholder: "0",
      suffix: "cm",
      decimalPlaces: 1,
    },
    errorMessages: {
      required: "All dimensions are required",
      invalid: "Please enter valid measurements",
      custom: "Dimensions exceed the maximum allowed size",
    },
    uxGuidelines: [
      "Display three inputs in a row: Length × Width × Height with a unit selector.",
      "Show a calculated volume (L×W×H) in real-time below the inputs.",
      "For shipping: show volumetric weight and compare with actual weight.",
      "Provide a unit toggle (cm, m, in, ft) with auto-conversion.",
      "Include a visual 3D box representation that scales with the entered dimensions.",
    ],
    accessibility: [
      "Label each input individually: 'Length', 'Width', 'Height' with the unit.",
      "Group within a fieldset with legend 'Dimensions'.",
      "Announce the calculated volume via aria-live when values change.",
    ],
    regionalNotes: [
      "GCC uses metric (cm, m) — default to centimetres for packages, metres for real estate.",
      "Saudi customs uses metric for import/export declarations.",
      "Real estate in the GCC is measured in square metres (m²) — auto-calculate area for 2D inputs.",
    ],
  },

  // 64 ── Tree / Hierarchy Select ──────────────────────────────────────────
  {
    type: "treeSelect",
    label: "Tree / Hierarchy Select",
    description:
      "Hierarchical selection with expandable tree structure. Used for departments, categories, locations, and org charts.",
    icon: "treeSelect",
    htmlType: "text",
    validations: [
      {
        name: "valid-node",
        description:
          "Selected node must exist in the tree and not be a disabled/non-selectable branch",
      },
      {
        name: "leaf-only",
        description:
          "Optionally require selection of leaf nodes only (not parent categories)",
      },
    ],
    constraints: {
      required: true,
    },
    formatting: {
      placeholder: "Select from hierarchy...",
    },
    errorMessages: {
      required: "Please select an item from the hierarchy",
      invalid: "Selected item is not valid",
      custom: "Please select a specific item, not a parent category",
    },
    uxGuidelines: [
      "Display as a dropdown with expandable/collapsible tree nodes (▶/▼ toggles).",
      "Support search/filter that highlights matching nodes and auto-expands their parents.",
      "Show the full path as breadcrumbs in the input after selection (e.g. 'IT > Development > Frontend').",
      "Support keyboard navigation: arrow keys to traverse, Enter to expand/select, Escape to close.",
      "Lazy-load deep tree levels for performance with large hierarchies.",
    ],
    accessibility: [
      "Use role='tree' with role='treeitem' for nodes and aria-expanded for branches.",
      "Announce the current level depth and node name to screen readers.",
      "Support aria-level to indicate hierarchy depth.",
      "Ensure all expand/collapse and selection actions are keyboard accessible.",
    ],
    regionalNotes: [
      "GCC government org structures are deeply hierarchical — support 5+ levels.",
      "Arabic department names should display in RTL within the tree structure.",
      "Common GCC hierarchies: Ministry > General Department > Department > Section > Unit.",
    ],
  },

  // 65 ── Dynamic List / Repeater ──────────────────────────────────────────
  {
    type: "dynamicList",
    label: "Dynamic List / Repeater",
    description:
      "Repeatable field group that lets users add, remove, and reorder multiple entries. Used for dependents, work history, and line items.",
    icon: "dynamicList",
    htmlType: "text",
    validations: [
      {
        name: "min-entries",
        description: "May require a minimum number of entries",
      },
      {
        name: "max-entries",
        description:
          "Enforce a maximum number of entries to prevent abuse",
      },
      {
        name: "each-valid",
        description: "Every entry in the list must pass its own field-level validations",
      },
    ],
    constraints: {
      min: 0,
      max: 50,
    },
    formatting: {
      placeholder: "Add an entry",
    },
    errorMessages: {
      required: "At least one entry is required",
      invalid: "One or more entries contain errors",
      custom: "Maximum of {max} entries allowed",
    },
    uxGuidelines: [
      "Show each entry as a numbered card with all its sub-fields.",
      "Provide 'Add Entry' button at the bottom with a + icon.",
      "Include 'Remove' (trash icon) and 'Reorder' (drag handle) on each entry.",
      "Collapse completed entries to save space — show a summary line when collapsed.",
      "Show the entry count: '3 of 10 maximum entries'.",
    ],
    accessibility: [
      "Use an ordered list (role='list') for the entries.",
      "Label add/remove buttons with context: 'Add dependent', 'Remove entry 3'.",
      "Announce additions and removals via aria-live.",
      "For drag-and-drop reordering, provide keyboard alternatives (move up/down buttons).",
    ],
    regionalNotes: [
      "Common use in GCC: dependent lists (for insurance/visa), work experience history, education records.",
      "Saudi visa forms require listing all dependents — support 10+ entries.",
      "Insurance forms in GCC require dependent details: name, DOB, relationship, Emirates ID/Iqama.",
    ],
  },

  // 66 ── Consent / Terms ──────────────────────────────────────────────────
  {
    type: "consent",
    label: "Consent / Terms Acceptance",
    description:
      "Legal consent checkbox with linked terms, privacy policy, and regulatory disclosures. Required for compliance.",
    icon: "consent",
    htmlType: "checkbox",
    validations: [
      {
        name: "must-accept",
        description:
          "User must check the consent box to proceed — cannot be pre-checked",
      },
      {
        name: "terms-viewed",
        description:
          "Optionally require the user to open/scroll through the terms before the checkbox becomes active",
      },
    ],
    constraints: {
      required: true,
    },
    formatting: {
      placeholder: "I agree to the Terms of Service and Privacy Policy",
    },
    errorMessages: {
      required: "You must accept the terms to continue",
      invalid: "Please review and accept the terms",
    },
    uxGuidelines: [
      "Never pre-check consent boxes — this violates GDPR/PDPL principles.",
      "Link to the full Terms of Service and Privacy Policy — open in a modal or new tab.",
      "For multiple consents (terms + marketing + data sharing), use separate checkboxes.",
      "Show the date/time of consent acceptance for audit purposes.",
      "Include a version number on the terms so consent is tied to a specific version.",
    ],
    accessibility: [
      "The checkbox label must include the full consent text, not just 'I agree'.",
      "Linked documents (Terms, Privacy Policy) must be keyboard accessible.",
      "Use aria-required='true' and describe why consent is needed in aria-describedby.",
      "Announce validation errors clearly: 'You must accept the terms to continue'.",
    ],
    regionalNotes: [
      "Saudi Arabia's Personal Data Protection Law (PDPL) became effective in 2023 — requires explicit consent for data processing.",
      "UAE DIFC and ADGM have their own data protection laws — consent wording may vary by jurisdiction.",
      "Terms must be available in both Arabic and English in GCC applications.",
      "Islamic finance products require specific Sharia-compliance disclosures in the consent text.",
    ],
  },

  // 67 ── Arabic Name ──────────────────────────────────────────────────────
  {
    type: "arabicName",
    label: "Arabic Name (الاسم بالعربية)",
    description:
      "Arabic-specific name field with proper RTL input, diacritics support, and Tashkeel-aware validation.",
    icon: "arabicName",
    htmlType: "text",
    validations: [
      {
        name: "arabic-only",
        description:
          "Must contain only Arabic characters, spaces, and optionally diacritics (tashkeel)",
        regex: "^[\\u0600-\\u06FF\\u0750-\\u077F\\uFB50-\\uFDFF\\uFE70-\\uFEFF\\s]+$",
        example: "محمد بن عبدالله",
      },
      {
        name: "min-parts",
        description:
          "GCC names typically have 2-4 parts (first + father's + grandfather's + family name)",
      },
    ],
    constraints: {
      required: true,
      minLength: 4,
      maxLength: 100,
    },
    formatting: {
      placeholder: "الاسم الكامل بالعربية",
    },
    errorMessages: {
      required: "الاسم بالعربية مطلوب",
      invalid: "يرجى إدخال الاسم بالأحرف العربية فقط",
      pattern: "يجب أن يحتوي الاسم على أحرف عربية فقط",
    },
    uxGuidelines: [
      "Set dir='rtl' on the input for proper Arabic text rendering.",
      "Accept tashkeel (diacritics like ّ ً ٌ ٍ) but don't require them.",
      "Provide guidance on name parts: الاسم الأول + اسم الأب + اسم الجد + اسم العائلة.",
      "Consider separate fields for each name part for structured data collection.",
      "Auto-detect Arabic input and switch direction if the form supports both languages.",
    ],
    accessibility: [
      "Set lang='ar' and dir='rtl' on the input element.",
      "Provide labels in Arabic: 'الاسم الكامل بالعربية'.",
      "Error messages should also be in Arabic when the field is in Arabic context.",
      "Screen readers should announce the field in the correct language.",
    ],
    regionalNotes: [
      "GCC names follow the pattern: First + Father's + Grandfather's + Family (القبيلة). Some use 'بن' or 'بنت' between parts.",
      "Saudi national IDs show the name in Arabic — this field should match the ID exactly.",
      "Name transliteration (Arabic ↔ English) is not 1:1. 'محمد' can be Mohammed, Muhammad, Mohamed.",
      "Some GCC nationals have very long names (4-5 parts) — ensure the field accommodates this.",
    ],
  },

  // 68 ── P.O. Box ─────────────────────────────────────────────────────────
  {
    type: "poBox",
    label: "P.O. Box",
    description:
      "Post Office Box number — the standard mailing address format in GCC countries where street addresses are less common.",
    icon: "poBox",
    htmlType: "text",
    validations: [
      {
        name: "numeric",
        description: "P.O. Box numbers are typically numeric",
        regex: "^\\d{1,8}$",
        example: "12345",
      },
    ],
    constraints: {
      required: false,
      minLength: 1,
      maxLength: 8,
      pattern: "^\\d{1,8}$",
    },
    formatting: {
      placeholder: "12345",
      prefix: "P.O. Box",
    },
    errorMessages: {
      required: "P.O. Box number is required",
      invalid: "Please enter a valid P.O. Box number",
      pattern: "P.O. Box must contain only digits",
    },
    uxGuidelines: [
      "Pre-label the field with 'P.O. Box' so the user only enters the number.",
      "Pair with City and Postal/ZIP Code fields for a complete mailing address.",
      "In GCC, P.O. Box is often more reliable than a street address for postal delivery.",
      "Show a note explaining that P.O. Box is the preferred mailing format in the GCC.",
    ],
    accessibility: [
      "Label as 'P.O. Box Number' — don't abbreviate to just 'PO'.",
      "Use inputmode='numeric' for a numeric keyboard.",
      "Describe the format in aria-describedby: 'Enter your post office box number (digits only)'.",
    ],
    regionalNotes: [
      "P.O. Box (صندوق بريد) is the dominant address format for businesses and institutions in the GCC.",
      "Saudi Arabia is transitioning to the National Address system (Short Code) but P.O. Box remains widely used.",
      "UAE uses P.O. Box extensively — nearly all businesses and many residences have one.",
      "Arabic label: صندوق بريد (Sanduq Barid). Format: ص.ب 12345.",
    ],
  },

  // 69 ── Vehicle Plate Number ─────────────────────────────────────────────
  {
    type: "plateNumber",
    label: "Vehicle Plate Number",
    description:
      "Vehicle license plate input with country-specific formatting. Used in parking, fleet management, and government services.",
    icon: "plateNumber",
    htmlType: "text",
    validations: [
      {
        name: "format",
        description:
          "Must match the plate format for the selected country. Saudi: 4 digits + 3 Arabic letters. UAE: varies by emirate.",
        example: "1234 أ ب ج",
      },
      {
        name: "active",
        description:
          "Optionally validate against traffic authority (Absher/RTA) to confirm the plate is active and registered",
      },
    ],
    constraints: {
      required: true,
      minLength: 4,
      maxLength: 12,
    },
    formatting: {
      placeholder: "1234 أ ب ج (KSA)",
    },
    errorMessages: {
      required: "Vehicle plate number is required",
      invalid: "Please enter a valid plate number for your country",
      pattern: "Plate format doesn't match the expected pattern",
    },
    uxGuidelines: [
      "Provide a country/emirate selector first, then adjust the input format accordingly.",
      "For Saudi plates: show separate inputs for 4 digits and 3 Arabic letters.",
      "Display a visual plate mockup that fills in as the user types (like a real plate preview).",
      "Support both Arabic and English letter equivalents (أ = A, ب = B, etc.).",
      "Include an ownership transfer reference for relevant workflows.",
    ],
    accessibility: [
      "If using separate inputs for numbers and letters, group with fieldset and legend.",
      "Label clearly: 'Vehicle plate number' with country context.",
      "Announce format requirements for the selected country.",
    ],
    regionalNotes: [
      "Saudi plates: 4 digits (right) + 3 Arabic letters (left). Plates show both Arabic and English equivalents.",
      "UAE plates vary by emirate: Dubai (5 digits + letter code), Abu Dhabi (1-6 digits + category number).",
      "Saudi Absher platform API can verify plate ownership — consider integration.",
      "Salik (Dubai) and Darb (Abu Dhabi) toll systems use plate numbers — relevant for fleet management.",
    ],
  },

  // 70 ── Hijri Date ───────────────────────────────────────────────────────
  {
    type: "hijriDate",
    label: "Hijri (Islamic) Date",
    description:
      "Hijri calendar date picker (هجري) with Gregorian conversion. Essential for government, legal, and religious contexts in the GCC.",
    icon: "hijri",
    htmlType: "date",
    validations: [
      {
        name: "valid-hijri",
        description:
          "Must be a valid Hijri calendar date (month 1-12, day 1-29/30)",
      },
      {
        name: "range",
        description:
          "Must be within a supported range (typically 1300-1500 AH)",
      },
    ],
    constraints: {
      required: true,
    },
    formatting: {
      placeholder: "DD / MM / YYYY هـ",
      mask: "XX / XX / XXXX",
    },
    errorMessages: {
      required: "Hijri date is required",
      invalid: "Please enter a valid Hijri date",
      custom: "Date is outside the supported range",
    },
    uxGuidelines: [
      "Show a Hijri calendar grid with Arabic month names (محرم, صفر, ربيع الأول, ...).",
      "Display the Gregorian equivalent below/beside the Hijri date for cross-reference.",
      "Support bidirectional conversion: pick Hijri → show Gregorian, or pick Gregorian → show Hijri.",
      "Month names in Arabic: محرّم, صفر, ربيع الأول, ربيع الآخر, جمادى الأولى, جمادى الآخرة, رجب, شعبان, رمضان, شوال, ذو القعدة, ذو الحجة.",
      "Highlight Islamic holidays (Ramadan, Eids) on the calendar.",
    ],
    accessibility: [
      "Label the calendar as 'Hijri Calendar' with lang='ar' for Arabic month names.",
      "Provide both Hijri and Gregorian dates in the accessible value.",
      "Ensure the calendar grid follows ARIA grid pattern for keyboard navigation.",
      "Announce month names in Arabic with their Gregorian equivalent.",
    ],
    regionalNotes: [
      "Saudi government documents primarily use Hijri dates — this is essential for KSA applications.",
      "Hijri months are lunar-based (29-30 days). The Islamic year is ~354 days, ~11 days shorter than Gregorian.",
      "The Umm al-Qura calendar is the official Hijri calendar in Saudi Arabia — use this for calculations.",
      "Important Hijri dates: Ramadan (9th month), Eid al-Fitr (1 Shawwal), Eid al-Adha (10 Dhul Hijjah), Saudi National Day (not Hijri but linked to cultural calendar).",
    ],
  },
];

// ── Public API ─────────────────────────────────────────────────────────────

export function getFieldSpecifications(): FieldSpecification[] {
  return FIELD_SPECIFICATIONS;
}

export function getFieldSpecByType(
  type: string,
): FieldSpecification | undefined {
  return FIELD_SPECIFICATIONS.find((spec) => spec.type === type);
}
