import { google } from 'googleapis'

interface CalendarEvent {
  nom: string
  service: string
  date: string // YYYY-MM-DD
  heure: string // HH:MM
  message?: string
  email?: string
  telephone: string
}

/**
 * Crée un client OAuth2 pour Google Calendar API
 */
function getOAuth2Client() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground' // Redirect URI pour refresh token
  )

  // Définir le refresh token pour obtenir automatiquement un access token
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  })

  return oauth2Client
}

/**
 * Crée un événement dans Google Calendar de Patricia
 */
export async function createCalendarEvent(eventData: CalendarEvent) {
  try {
    const auth = getOAuth2Client()
    const calendar = google.calendar({ version: 'v3', auth })

    // Construire la date et heure de début (ISO 8601)
    const startDateTime = `${eventData.date}T${eventData.heure}:00`
    
    // Calculer l'heure de fin (1h par défaut, configurable selon le service)
    const duration = getServiceDuration(eventData.service)
    const endDate = new Date(`${eventData.date}T${eventData.heure}:00`)
    endDate.setMinutes(endDate.getMinutes() + duration)
    const endDateTime = endDate.toISOString().slice(0, 16) + ':00'

    // Vérifier si un événement similaire existe déjà
    const existingEvent = await findExistingEvent(calendar, eventData)
    if (existingEvent) {
      console.log('Événement déjà existant dans Google Calendar, pas de duplication')
      return existingEvent
    }

    // Construire la description
    let description = `Service: ${eventData.service}\n`
    description += `Téléphone: ${eventData.telephone}\n`
    if (eventData.email) {
      description += `Email: ${eventData.email}\n`
    }
    if (eventData.message) {
      description += `\nMessage du client:\n${eventData.message}`
    }

    // Créer l'événement
    const event = {
      summary: `Rendez-vous avec ${eventData.nom}`,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: 'Europe/Brussels', // Fuseau horaire de Liège
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'Europe/Brussels',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 60 }, // Rappel 1h avant
          { method: 'popup', minutes: 1440 }, // Rappel 24h avant
        ],
      },
      colorId: '11', // Rouge pour les rendez-vous clients
    }

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      requestBody: event,
    })

    console.log('✅ Événement créé dans Google Calendar:', response.data.htmlLink)
    return response.data
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'événement Google Calendar:', error)
    // On ne bloque pas le processus même si Calendar échoue
    throw error
  }
}

/**
 * Recherche un événement existant pour éviter les doublons
 */
async function findExistingEvent(
  calendar: any,
  eventData: CalendarEvent
): Promise<any> {
  try {
    // Rechercher des événements le même jour
    const startOfDay = `${eventData.date}T00:00:00Z`
    const endOfDay = `${eventData.date}T23:59:59Z`

    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      timeMin: startOfDay,
      timeMax: endOfDay,
      singleEvents: true,
      orderBy: 'startTime',
    })

    const events = response.data.items || []

    // Chercher un événement avec le même nom et heure
    const existing = events.find((event: any) => {
      const eventStart = event.start?.dateTime || event.start?.date
      const isSameTime = eventStart?.includes(eventData.heure)
      const isSameName = event.summary?.includes(eventData.nom)
      return isSameTime && isSameName
    })

    return existing || null
  } catch (error) {
    console.error('Erreur lors de la recherche d\'événements existants:', error)
    return null
  }
}

/**
 * Détermine la durée d'un service en minutes
 */
function getServiceDuration(service: string): number {
  const durations: Record<string, number> = {
    'Coupe femme': 60,
    'Coupe homme': 30,
    'Coupe enfant': 30,
    'Coloration': 120,
    'Mèches': 90,
    'Balayage': 120,
    'Brushing': 45,
    'Permanente': 120,
    'Lissage': 150,
    'Soins capillaires': 60,
  }

  return durations[service] || 60 // 1h par défaut
}

/**
 * Supprime un événement du calendrier (si besoin dans le futur)
 */
export async function deleteCalendarEvent(eventId: string) {
  try {
    const auth = getOAuth2Client()
    const calendar = google.calendar({ version: 'v3', auth })

    await calendar.events.delete({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      eventId,
    })

    console.log('✅ Événement supprimé du Google Calendar')
  } catch (error) {
    console.error('❌ Erreur lors de la suppression de l\'événement:', error)
    throw error
  }
}
