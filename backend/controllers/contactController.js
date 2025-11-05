const { sendEmail } = require('../config/email');

// @desc    Send contact form email
// @route   POST /api/contact
// @access  Public
exports.sendContactEmail = async (req, res) => {
  try {
    const { nom, email, sujet, message } = req.body;

    // Validation
    if (!nom || !email || !sujet || !message) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont requis'
      });
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Format d\'email invalide'
      });
    }

    // Email content to admin
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f59e0b; padding: 20px; text-align: center;">
          <h1 style="color: #000; margin: 0;">BestLife - Nouveau Message</h1>
        </div>
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #1f2937;">Nouveau message de contact</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nom:</strong> ${nom}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Sujet:</strong> ${sujet}</p>
          </div>
          <div style="margin-top: 20px;">
            <h3 style="color: #1f2937;">Message:</h3>
            <p style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #f59e0b; border-radius: 4px;">
              ${message}
            </p>
          </div>
        </div>
        <div style="background-color: #1f2937; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
            Ce message a été envoyé depuis le formulaire de contact de BestLife
          </p>
        </div>
      </div>
    `;

    // Email confirmation to sender
    const userEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f59e0b; padding: 20px; text-align: center;">
          <h1 style="color: #000; margin: 0;">BestLife</h1>
        </div>
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #1f2937;">Merci de nous avoir contacté!</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Bonjour <strong>${nom}</strong>,
          </p>
          <p style="color: #4b5563; line-height: 1.6;">
            Nous avons bien reçu votre message concernant "<strong>${sujet}</strong>".
            Notre équipe vous répondra dans les plus brefs délais.
          </p>
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>⏱️ Temps de réponse habituel:</strong> 24-48 heures
            </p>
          </div>
          <p style="color: #4b5563; line-height: 1.6;">
            Votre message:
          </p>
          <div style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #f59e0b; border-radius: 4px; margin: 15px 0;">
            <p style="margin: 0; color: #4b5563;">${message}</p>
          </div>
        </div>
        <div style="background-color: #1f2937; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; margin: 0;">
            BestLife - Change Life, Change Future
          </p>
          <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 12px;">
            Email: support@bestlife.com | Tél: +237 xxx xxx xxx
          </p>
        </div>
      </div>
    `;

    // Send email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_FROM,
      subject: `[BestLife Contact] ${sujet}`,
      html: adminEmailContent,
      text: `Nouveau message de ${nom} (${email})\n\nSujet: ${sujet}\n\nMessage:\n${message}`
    });

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: 'Nous avons bien reçu votre message - BestLife',
      html: userEmailContent,
      text: `Bonjour ${nom},\n\nNous avons bien reçu votre message concernant "${sujet}". Notre équipe vous répondra dans les plus brefs délais.\n\nMerci,\nL'équipe BestLife`
    });

    res.status(200).json({
      success: true,
      message: 'Message envoyé avec succès! Nous vous répondrons bientôt.'
    });

  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
    });
  }
};

// @desc    Send newsletter subscription email
// @route   POST /api/contact/newsletter
// @access  Public
exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email requis'
      });
    }

    // Validate email
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Format d\'email invalide'
      });
    }

    // Send welcome email
    const welcomeEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f59e0b; padding: 30px; text-align: center;">
          <h1 style="color: #000; margin: 0;">Bienvenue chez BestLife! 🎉</h1>
        </div>
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #1f2937;">Merci de vous être abonné à notre newsletter!</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Vous recevrez désormais nos dernières offres, nouveaux produits et actualités exclusives directement dans votre boîte mail.
          </p>
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h3 style="color: #92400e; margin-top: 0;">🎁 Offre de bienvenue</h3>
            <p style="color: #92400e; margin: 0;">
              <strong>-10% sur votre première commande</strong><br>
              Code: <span style="background-color: #fff; padding: 5px 10px; border-radius: 4px; font-weight: bold;">WELCOME10</span>
            </p>
          </div>
          <p style="color: #4b5563; line-height: 1.6;">
            À très bientôt sur BestLife!
          </p>
        </div>
        <div style="background-color: #1f2937; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; margin: 0;">
            BestLife - Change Life, Change Future
          </p>
        </div>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: 'Bienvenue dans la communauté BestLife! 🎉',
      html: welcomeEmailContent,
      text: `Bienvenue!\n\nMerci de vous être abonné à notre newsletter. Profitez de -10% sur votre première commande avec le code WELCOME10.\n\nÀ bientôt,\nL'équipe BestLife`
    });

    // Notify admin of new subscriber
    await sendEmail({
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_FROM,
      subject: '[BestLife] Nouveau abonné newsletter',
      html: `<p>Nouvel abonné à la newsletter: <strong>${email}</strong></p>`,
      text: `Nouvel abonné à la newsletter: ${email}`
    });

    res.status(200).json({
      success: true,
      message: 'Abonnement réussi! Vérifiez votre email.'
    });

  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'abonnement. Veuillez réessayer.'
    });
  }
};
