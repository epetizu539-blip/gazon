import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser middleware
  app.use(express.json());

  // API route to submit leads and send to Telegram Bot
  app.post("/api/leads", async (req, res) => {
    try {
      const { name, phone, address, source, additionalData } = req.body;

      if (!name || !phone) {
        return res.status(400).json({ error: "Name and phone are required fields." });
      }

      console.log("Received new lead:", { name, phone, address, source, additionalData });

      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      // Beautifully formatted message for Telegram
      let message = `🔔 <b>Новая заявка с сайта Газонов!</b>\n\n`;
      message += `👤 <b>Имя:</b> ${name}\n`;
      message += `📞 <b>Телефон:</b> <code>${phone}</code>\n`;
      message += `📍 <b>Адрес:</b> ${address || "Не указан"}\n`;
      message += `🌐 <b>Источник:</b> ${source || "Форма на сайте"}\n`;

      if (additionalData && Object.keys(additionalData).length > 0) {
        message += `\n📋 <b>Детали заявки:</b>\n`;
        
        const printedKeys = new Set<string>();

        if (additionalData.recommendedLawn) {
          message += `• Рекомендованный сорт: <b>${additionalData.recommendedLawn}</b>\n`;
          printedKeys.add("recommendedLawn");
        }
        if (additionalData.area) {
          message += `• Площадь участка: <b>${additionalData.area} м²</b>\n`;
          printedKeys.add("area");
        }
        if (additionalData.lawnTypeRu) {
          message += `• Выбранный сорт: <b>${additionalData.lawnTypeRu}</b>\n`;
          printedKeys.add("lawnTypeRu");
        }
        if (additionalData.pricePerSqm) {
          message += `• Цена: <b>${additionalData.pricePerSqm} ₽/м²</b>\n`;
          printedKeys.add("pricePerSqm");
        }
        
        if (additionalData.answers) {
          const answers = additionalData.answers;
          message += `\n📝 <b>Ответы на квиз:</b>\n`;
          
          const quizTranslations: Record<string, string> = {
            'elite': 'Для активных игр, детей и животных',
            'premium': 'Красивый парадный вид возле дома',
            'standard': 'Озеленение большого участка, минимум ухода',
            'shadow': 'Будет расти в тени деревьев и забора',
            
            'prepared': 'Чистая подготовленная земля/вспахано',
            'weedy': 'Заросший участок (бурьян, сорняки, пни)',
            'uneven': 'Неровный рельеф (нужен ввоз песка/грунта)',
            'old_lawn': 'Лежит старый испорченный газон/целина',
            
            'autoWatering': 'Автоматический полив (рекомендуется)',
            'molesMesh': 'Сетка от кротов (спасет газон от холмиков)',
            'drainage': 'Дренаж участка (от застоя воды)',
            'none': 'Только укладка газона, без доп систем'
          };

          const getVal = (val: string) => quizTranslations[val] || val || "Не выбрано";

          if (answers.purpose) message += ` • <b>Назначение:</b> ${getVal(answers.purpose)}\n`;
          if (answers.soil) message += ` • <b>Грунт:</b> ${getVal(answers.soil)}\n`;
          if (answers.infrastructure) message += ` • <b>Системы:</b> ${getVal(answers.infrastructure)}\n`;
          
          printedKeys.add("answers");
        }

        // Dynamically print all other custom fields! (e.g. from the calculator or other forms)
        for (const [key, value] of Object.entries(additionalData)) {
          if (printedKeys.has(key)) continue;

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

      if (botToken && chatId) {
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

        if (!response.ok) {
          const errText = await response.text();
          console.error("Telegram API error response:", errText);
          return res.status(502).json({ 
            success: false, 
            error: "Failed to send message to Telegram API", 
            details: errText 
          });
        }

        console.log("Successfully sent lead notification to Telegram!");
        return res.json({ success: true, message: "Lead sent to Telegram successfully!" });
      } else {
        // If credentials are not configured, log it clearly for the user
        const warningMsg = "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables are not set. Logging lead to console.";
        console.warn(warningMsg);
        return res.json({
          success: true,
          mocked: true,
          message: "Lead processed successfully on server (Telegram credentials not configured).",
          lead: { name, phone, address, source, additionalData }
        });
      }
    } catch (error: any) {
      console.error("Error in /api/leads handler:", error);
      return res.status(500).json({ error: "Internal server error", details: error.message });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
