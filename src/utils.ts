export function formatPhoneNumber(phone: string): string {
  return `+${phone[0]}-${phone.substring(1, 4)}-${phone.substring(
    4,
    7
  )}-${phone.substring(7, 9)}-${phone.substring(9, 11)}`;
}

export function clearPhoneNumber(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}
