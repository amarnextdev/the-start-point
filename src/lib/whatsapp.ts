/**
 * Build a WhatsApp click-to-chat link with a pre-filled message.
 * Accepts numbers with spaces, dashes or a leading "+".
 */
export function buildWhatsAppLink(phone: string, message?: string) {
  const digits = phone.replace(/\D/g, "")
  if (!digits) return null
  const url = new URL(`https://wa.me/${digits}`)
  if (message) url.searchParams.set("text", message)
  return url.toString()
}

export function enquiryWhatsAppMessage(instituteName: string, batchName?: string) {
  return batchName
    ? `Hi ${instituteName}, I'd like to know more about the ${batchName} batch.`
    : `Hi ${instituteName}, I'd like to know more about your English classes.`
}
