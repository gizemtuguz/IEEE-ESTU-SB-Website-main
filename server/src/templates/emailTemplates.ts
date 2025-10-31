const IEEE_BLUE = "#00629B";
const IEEE_DARK = "#003A63";

function layout(content: string, title: string) {
  return `<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f6f8;">
      <tr>
        <td align="center" style="padding: 32px 16px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid rgba(0,0,0,0.05);">
            <tr>
              <td style="background: linear-gradient(135deg, ${IEEE_BLUE}, ${IEEE_DARK}); color: #ffffff; padding: 32px;">
                <h1 style="margin: 0; font-size: 24px;">IEEE ESTU Öğrenci Kolu</h1>
                <p style="margin: 4px 0 0 0; font-size: 14px;">Elektriğin, Bilginin ve Teknolojinin Geleceği</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px; color: #202124; font-size: 16px; line-height: 1.6;">
                ${content}
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 32px; background-color: #f0f4f8; font-size: 12px; color: #5f6368;">
                <p style="margin: 0;">IEEE ESTU Öğrenci Kolu · Eskişehir Teknik Üniversitesi</p>
                <p style="margin: 4px 0 0 0;">
                  Bize ulaşın: <a href="mailto:ieee@estu.edu.tr" style="color: ${IEEE_BLUE};">ieee@estu.edu.tr</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function eventApplicationConfirmation(eventName: string, answers: Array<{ question: string; value: string | string[] }>) {
  const rows = answers
    .map(
      (answer) => `<tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e0e0e0; font-weight: 600;">${answer.question}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e0e0e0;">${
          Array.isArray(answer.value) ? answer.value.join(", ") : answer.value
        }</td>
      </tr>`
    )
    .join("");

  const content = `
    <p>Merhaba,</p>
    <p><strong>${eventName}</strong> etkinliği için başvurunuzu aldık.</p>
    <p>Başvuru bilgileriniz aşağıdaki gibidir:</p>
    <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; margin-top: 16px;">${rows}</table>
    <p style="margin-top: 24px;">IEEE ESTU ekibi olarak etkinlikte görüşmek için sabırsızlanıyoruz!</p>
  `;
  return layout(content, `${eventName} Başvuru Onayı`);
}

export function membershipWelcome(fullName: string) {
  const content = `
    <p>Merhaba ${fullName},</p>
    <p>IEEE ESTU ailesine hoş geldin! Üyelik başvurun başarıyla tamamlandı.</p>
    <p>Bir sonraki adımda ilgini çeken komiteyi seçerek aramıza katılabilirsin. Sana gönderdiğimiz bağlantı üzerinden komite tercihlerini paylaşmayı unutma.</p>
    <p>Herhangi bir sorunda bizimle iletişime geçebilirsin.</p>
  `;
  return layout(content, "IEEE ESTU Üyeliğine Hoş Geldin");
}

export function committeeSelectionConfirmation(fullName: string, primary: string, secondary?: string) {
  const content = `
    <p>Merhaba ${fullName},</p>
    <p>Komite tercihlerinizi aldık. Birincil tercihiniz <strong>${primary}</strong>${
      secondary ? `, ikinci tercihiniz ise <strong>${secondary}</strong>` : ""
    } olarak kaydedildi.</p>
    <p>Kısa süre içerisinde komite liderlerimiz seninle iletişime geçecek.</p>
  `;
  return layout(content, "Komite Tercihin Alındı");
}

export function contactMessageNotification(fullName: string, email: string, message: string) {
  const content = `
    <p><strong>${fullName}</strong> adlı üyeden yeni bir mesaj var.</p>
    <p>E-posta: <a href="mailto:${email}">${email}</a></p>
    <p>Mesaj:</p>
    <blockquote style="border-left: 4px solid ${IEEE_BLUE}; margin: 16px 0; padding-left: 16px;">${message}</blockquote>
  `;
  return layout(content, "Yeni İletişim Mesajı");
}

export function newsletterWelcome() {
  const content = `
    <p>IEEE ESTU e-bültenine abone olduğun için teşekkür ederiz.</p>
    <p>Yakında etkinlik, eğitim ve fırsatlardan haberdar olacaksın.</p>
  `;
  return layout(content, "IEEE ESTU Bültenine Hoş Geldin");
}

export function sponsorshipIntro(fullName: string | undefined, calendarLink?: string) {
  const content = `
    <p>Merhaba ${fullName ?? "Değerli İş Ortağımız"},</p>
    <p>IEEE ESTU Öğrenci Kolu ile iş birliği yapmak istediğiniz için teşekkür ederiz.</p>
    ${
      calendarLink
        ? `<p>Sizinle daha detaylı konuşmak için uygun bir zaman dilimi seçebilirsiniz:</p>
    <p><a href="${calendarLink}" style="display:inline-block;padding:12px 24px;background:${IEEE_BLUE};color:#ffffff;text-decoration:none;border-radius:6px;">Toplantı Saati Seç</a></p>`
        : ""
    }
    <p>Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
  `;
  return layout(content, "IEEE ESTU Sponsorluk Ekibi");
}
