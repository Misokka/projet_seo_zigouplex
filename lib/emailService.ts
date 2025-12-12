import nodemailer from 'nodemailer'

// Configuration du transporteur Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

interface RendezVousData {
  nom: string
  telephone: string
  email?: string
  service: string
  date: string
  heure: string
  message?: string
}

/**
 * Envoie un email de notification à Patricia
 */
/**
 * Envía un correo de notificación a Patricia (en español)
 */
export async function sendEmailToPatricia(data: RendezVousData) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const adminUrl = `${siteUrl}/admin/rendezvous`

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Patricia recibe en su propia dirección
    subject: `Nueva solicitud de cita — ${data.nom}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #c4a447; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0;">Nueva solicitud de cita</h2>
        </div>
        
        <div style="background-color: #f6f2ec; padding: 30px; border-radius: 0 0 8px 8px;">
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 8px 0;"><strong>Nombre:</strong> ${data.nom}</p>
            <p style="margin: 8px 0;"><strong>Teléfono:</strong> <a href="tel:${data.telephone}">${data.telephone}</a></p>
            <p style="margin: 8px 0;"><strong>Email:</strong> ${data.email || 'No indicado'}</p>
            <p style="margin: 8px 0;"><strong>Servicio:</strong> ${data.service}</p>
            <p style="margin: 8px 0;"><strong>Fecha:</strong> ${data.date}</p>
            <p style="margin: 8px 0;"><strong>Hora:</strong> ${data.heure}</p>
            ${data.message ? `<p style="margin: 8px 0;"><strong>Mensaje:</strong> ${data.message}</p>` : ''}
          </div>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <p style="margin: 0; font-size: 14px;">
              <strong>Acción requerida:</strong><br/>
              Esta solicitud está pendiente de tu validación.<br/>
              El cliente será notificado por correo electrónico una vez que aceptes o rechaces la cita.
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${adminUrl}" style="display: inline-block; background-color: #c4a447; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Acceder al panel de administración
            </a>
          </div>
          
          <p style="font-size: 13px; color: #666; text-align: center;">
            Haz clic en el botón de arriba para iniciar sesión y gestionar esta solicitud.
          </p>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}


/**
 * Envoie un email de confirmation au client
 */
export async function sendConfirmationToClient(data: RendezVousData) {
  // Ne pas envoyer si pas d'email
  if (!data.email) return

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: 'Demande de rendez-vous reçue - Salon Patricia Osores',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #c4a447; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0;">Salon Patricia Osores</h2>
        </div>
        
        <div style="background-color: #f6f2ec; padding: 30px; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px;">Bonjour <strong>${data.nom}</strong>,</p>
          
          <p style="font-size: 16px;">
            Votre demande de rendez-vous au <strong>Salon Patricia Osores</strong> a bien été reçue.
          </p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #c4a447;">
            <p style="margin: 8px 0;"><strong>Service :</strong> ${data.service}</p>
            <p style="margin: 8px 0;"><strong>Date souhaitée :</strong> ${data.date}</p>
            <p style="margin: 8px 0;"><strong>Heure souhaitée :</strong> ${data.heure}</p>
          </div>

          <div style="background-color: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196F3;">
            <p style="margin: 0; font-size: 14px;">
              <strong>Important :</strong><br/>
              Votre rendez-vous sera confirmé une fois que Patricia l'aura validé.<br/>
              Vous recevrez un email de confirmation définitive sous peu.
            </p>
          </div>

          <p style="font-size: 16px;">
            Merci pour votre confiance ! Nous avons hâte de vous accueillir.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="font-size: 13px; color: #666; margin: 5px 0;">
              <strong>Salon Patricia Osores</strong><br/>
              Rue de la Station 117, 4450 Juprelle (Liège)<br/>
              Belgique<br/>
              <a href="tel:+32470123456" style="color: #c4a447; text-decoration: none;">Tél: +32 470 12 34 56</a>
            </p>
          </div>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

interface AcceptanceEmailData {
  nom: string
  email: string
  service: string
  date: string
  heure: string
}

/**
 * Envoie un email d'acceptation au client
 */
export async function sendAcceptanceEmail(data: AcceptanceEmailData) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: 'Votre rendez-vous est confirmé !',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #c4a447; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0;">Rendez-vous confirmé</h2>
        </div>
        
        <div style="background-color: #f6f2ec; padding: 30px; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px;">Bonjour <strong>${data.nom}</strong>,</p>
          
          <p style="font-size: 16px;">
            Excellente nouvelle ! Votre rendez-vous au <strong>Salon Patricia Osores</strong> est confirmé.
          </p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #c4a447;">
            <p style="margin: 8px 0;"><strong>Date :</strong> ${data.date}</p>
            <p style="margin: 8px 0;"><strong>Heure :</strong> ${data.heure}</p>
            <p style="margin: 8px 0;"><strong>Service :</strong> ${data.service}</p>
          </div>
          
          <p style="font-size: 14px; color: #666;">
            Nous vous attendons avec plaisir ! En cas d'empêchement, merci de nous prévenir au plus tôt.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="font-size: 13px; color: #666; margin: 5px 0;">
              <strong>Salon Patricia Osores</strong><br/>
              Rue de la Station 117, 4450 Juprelle (Liège)<br/>
              Belgique<br/>
              <a href="tel:+32470123456" style="color: #c4a447; text-decoration: none;">Tél: +32 470 12 34 56</a>
            </p>
          </div>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

interface RejectionEmailData {
  nom: string
  email: string
}

/**
 * Envoie un email de refus au client
 */
export async function sendRejectionEmail(data: RejectionEmailData) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: 'Votre demande de rendez-vous',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #666; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0;">Salon Patricia Osores</h2>
        </div>
        
        <div style="background-color: #f6f2ec; padding: 30px; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px;">Bonjour <strong>${data.nom}</strong>,</p>
          
          <p style="font-size: 16px;">
            Merci pour votre demande de rendez-vous au Salon Patricia Osores.
          </p>
          
          <p style="font-size: 16px;">
            Malheureusement, le créneau horaire que vous avez demandé n'est pas disponible.
          </p>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <p style="margin: 0; font-size: 14px;">
              <strong>Nous vous invitons à :</strong><br/>
              • Proposer un autre créneau via notre site<br/>
              • Nous contacter directement par téléphone
            </p>
          </div>
          
          <p style="font-size: 14px; color: #666;">
            Nous espérons pouvoir vous accueillir très prochainement dans notre salon.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="font-size: 13px; color: #666; margin: 5px 0;">
              <strong>Salon Patricia Osores</strong><br/>
              Rue de la Station 117, 4450 Juprelle (Liège)<br/>
              Belgique<br/>
              <a href="tel:+32470123456" style="color: #c4a447; text-decoration: none;">Tél: +32 470 12 34 56</a>
            </p>
          </div>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

interface ReviewRequestData {
  nom: string
  email: string
  service: string
  date: string
}

/**
 * Envoie un email de demande d'avis Google après le rendez-vous
 */
export async function sendReviewRequestEmail(data: ReviewRequestData) {
  // Lien fixe vers le formulaire d'avis Google du salon
  const googleReviewUrl = 'https://share.google/orvP22h0LHKZV0HzL'

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: 'Comment s\'est passé votre rendez-vous ?',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #c4a447; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0;">Merci pour votre visite !</h2>
        </div>
        
        <div style="background-color: #f6f2ec; padding: 30px; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px;">Bonjour <strong>${data.nom}</strong>,</p>
          
          <p style="font-size: 16px;">
            Nous espérons que votre rendez-vous du <strong>${data.date}</strong> pour <strong>${data.service}</strong> 
            s'est bien passé et que vous êtes satisfait(e) de votre nouvelle coiffure !
          </p>
          
          <div style="background-color: #fff9e6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #c4a447;">
            <p style="margin: 0 0 10px 0; font-size: 16px;">
              <strong>Votre avis compte pour nous !</strong>
            </p>
            <p style="margin: 0; font-size: 14px; color: #666;">
              Si vous avez apprécié notre service, nous serions ravis que vous partagiez votre expérience 
              en laissant un avis sur Google. Cela nous aide énormément à faire découvrir notre salon.
            </p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${googleReviewUrl}" style="display: inline-block; background-color: #4285F4; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Laisser un avis Google
            </a>
          </div>
          
          <p style="font-size: 14px; color: #666; text-align: center;">
            Merci pour votre confiance et à très bientôt au salon !
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="font-size: 13px; color: #666; margin: 5px 0; text-align: center;">
              <strong>Salon Patricia Osores</strong><br/>
              Rue de la Station 117, 4450 Juprelle (Liège)<br/>
              Belgique<br/>
              <a href="tel:+32470123456" style="color: #c4a447; text-decoration: none;">Tél: +32 470 12 34 56</a>
            </p>
          </div>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}
