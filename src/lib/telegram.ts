// Client-side and API lead delivery helper

interface LeadData {
  name: string;
  phone: string;
  address?: string;
  source?: string;
  additionalData?: Record<string, any>;
}

export async function sendLead(data: LeadData): Promise<boolean> {
  const { name, phone, address, source, additionalData } = data;

  // 1. Try server API route first (/api/leads)
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      const result = await res.json();
      console.log('Lead sent via server endpoint:', result);
      if (result.success && !result.mocked) {
        return true;
      }
    }
  } catch (err) {
    console.warn('Server endpoint /api/leads failed or unreachable (static host?), trying client-side fallback if available...', err);
  }

  // 2. Fallback: Direct client-side Telegram API if VITE_TELEGRAM_BOT_TOKEN is present
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    try {
      let message = `🔔 <b>Новая заявка с сайта Газонов!</b>\n\n`;
      message += `👤 <b>Имя:</b> ${name}\n`;
      message += `📞 <b>Телефон:</b> <code>${phone}</code>\n`;
      message += `📍 <b>Адрес:</b> ${address || "Не указан"}\n`;
      message += `🌐 <b>Источник:</b> ${source || "Форма на сайте"}\n`;

      if (additionalData && Object.keys(additionalData).length > 0) {
        message += `\n📋 <b>Детали заявки:</b>\n`;
        for (const [key, value] of Object.entries(additionalData)) {
          if (typeof value === "object" && value !== null) {
            message += `• <b>${key}:</b>\n`;
            for (const [subKey, subValue] of Object.entries(value)) {
              message += `   - ${subKey}: <b>${subValue}</b>\n`;
            }
          } else if (value !== undefined && value !== "") {
            message += `• <b>${key}:</b> <b>${value}</b>\n`;
          }
        }
      }

      message += `\n⏱ <b>Время:</b> ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} (МСК)`;

      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      });

      if (response.ok) {
        console.log('Lead sent successfully via direct client Telegram API!');
        return true;
      } else {
        const errText = await response.text();
        console.error('Direct Telegram API error:', errText);
      }
    } catch (clientErr) {
      console.error('Failed to send lead directly via client-side Telegram API:', clientErr);
    }
  }

  return false;
}
