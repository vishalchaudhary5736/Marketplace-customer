export function getPasswordStrength(pw: string) {
  if (pw.length < 8) return 0;
  let score = 1;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0–4
}

export function userNameExtractFirstLetter(
  firstName: string | undefined,
  lastName?: string,
) {
  let identifier: string[] = [];
  if (firstName) identifier.push(firstName.charAt(0).toUpperCase());
  if (lastName) identifier.push(lastName.charAt(0).toUpperCase());
  return identifier.join("");
}

export function formatDate(iso?: string) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
