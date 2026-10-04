export function whatsappLink(horseName?: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "330618313530";
  const message = horseName
    ? `Hello, I am interested in ${horseName}. I would like to receive more information.`
    : "Hello, I would like more information about your horses.";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
