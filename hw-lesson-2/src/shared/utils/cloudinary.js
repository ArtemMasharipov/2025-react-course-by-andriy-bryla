const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/dvu36nmkx/image/upload'

const TICKET_IMAGES = {
  business: 'business-class_sf4qlo',
  economy: 'economy-class_vov7gl',
}

export const getTicketBackgroundUrl = ticketType => {
  const imageId = TICKET_IMAGES[ticketType]
  if (!imageId) return ''

  return `${CLOUDINARY_BASE_URL}/w_1200,h_800,f_auto,q_auto,c_fill,g_center/${imageId}`
}
