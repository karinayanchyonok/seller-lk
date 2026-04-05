const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Функция для парсинга цены из текста
const parsePriceFromText = (text: string): string | null => {
    // Ищем числа в тексте (с учетом пробелов как разделителей тысяч)
    const patterns = [
        /(\d{1,3}(?:[\s]?\d{3})*)\s*[-–—]\s*(\d{1,3}(?:[\s]?\d{3})*)/, // диапазон: 100 000 - 120 000
        /от\s*(\d{1,3}(?:[\s]?\d{3})*)/i, // от 100 000
        /до\s*(\d{1,3}(?:[\s]?\d{3})*)/i, // до 120 000
        /(\d{1,3}(?:[\s]?\d{3})*)\s*руб/i, // 100 000 руб
        /(\d{1,3}(?:[\s]?\d{3})*)/, // просто число
    ];
    
    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) {
            // Если найден диапазон, берем среднее значение
            if (match[1] && match[2]) {
                const low = parseInt(match[1].replace(/\s/g, ''));
                const high = parseInt(match[2].replace(/\s/g, ''));
                const average = Math.floor((low + high) / 2);
                return average.toString();
            }
            // Если найдено одно число
            if (match[1]) {
                return match[1].replace(/\s/g, '');
            }
        }
    }
    return null;
};

// Функция для получения рыночной цены
export const getMarketPriceFromAI = async (
    title: string,
    category: string,
    currentPrice: number
): Promise<{ success: boolean; message: string; price?: string }> => {
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
        return { 
            success: false, 
            message: 'API ключ не настроен. Добавьте VITE_OPENROUTER_API_KEY в файл .env' 
        };
    }

    const categoryMap: Record<string, string> = {
        electronics: 'Электроника',
        auto: 'Авто',
        real_estate: 'Недвижимость',
    };
    const categoryName = categoryMap[category] || category;

    const prompt = `Определи рыночную цену для товара. Категория: ${categoryName}. Текущая цена: ${currentPrice} рублей.
    
    Ответ дай строго в одном из следующих форматов:
    - Если диапазон: "100000 - 120000 рублей"
    - Если от: "от 100000 рублей"
    - Если конкретная цена: "100000 рублей"
    
    Только цифры и слова "от", "до", "рублей". Без лишнего текста.`;

    try {
        const response = await fetch(OPENROUTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': window.location.origin,
                'X-Title': 'Seller LK App',
            },
            body: JSON.stringify({
                model: 'openrouter/auto',
                messages: [
                    {
                        role: 'system',
                        content: 'Ты эксперт по оценке товаров. Отвечай коротко, только ценой в рублях. Пример: "100000 - 120000 рублей"'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.5,
                max_tokens: 100,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error Details:', errorData);
            
            if (response.status === 401) {
                return { success: false, message: 'Ошибка авторизации. Проверьте API ключ OpenRouter.' };
            }
            if (response.status === 402) {
                return { success: false, message: 'Недостаточно средств или требуется оплата.' };
            }
            if (response.status === 429) {
                return { success: false, message: 'Превышен лимит запросов. Попробуйте позже.' };
            }
            
            return { success: false, message: `Ошибка API: ${errorData.error?.message || 'Неизвестная ошибка'}` };
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        // Парсим цену из ответа
        const parsedPrice = parsePriceFromText(aiResponse);
        
        if (parsedPrice) {
            return { 
                success: true, 
                message: aiResponse,
                price: parsedPrice
            };
        } else {
            return { 
                success: true, 
                message: aiResponse,
                price: undefined
            };
        }
    } catch (error) {
        console.error('Ошибка получения рыночной цены:', error);
        return { 
            success: false, 
            message: 'Не удалось получить информацию о рыночной цене. Проверьте подключение к интернету.' 
        };
    }
};

// Функция для улучшения описания
export const improveDescriptionFromAI = async (
    title: string,
    category: string,
    currentDescription: string,
    price: number
): Promise<{ success: boolean; message: string; description?: string }> => {
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
        return { 
            success: false, 
            message: 'API ключ не настроен. Добавьте VITE_OPENROUTER_API_KEY в файл .env' 
        };
    }

    const categoryMap: Record<string, string> = {
        electronics: 'Электроники',
        auto: 'Авто',
        real_estate: 'Недвижимости',
    };
    const categoryName = categoryMap[category] || category;

    const prompt = `Улучши описание товара для объявления на Avito.
    
    Информация о товаре:
    - Название: ${title}
    - Категория: ${categoryName}
    - Цена: ${price} рублей
    - Текущее описание: ${currentDescription || 'Отсутствует'}
    
    Напиши только улучшенное описание, без лишних слов и пояснений. Длина: 200-400 символов.`;

    try {
        const response = await fetch(OPENROUTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': window.location.origin,
                'X-Title': 'Seller LK App',
            },
            body: JSON.stringify({
                model: 'openrouter/auto',
                messages: [
                    {
                        role: 'system',
                        content: 'Ты профессиональный копирайтер. Пиши только описание товара, без лишних слов и пояснений.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 500,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error Details:', errorData);
            
            if (response.status === 401) {
                return { success: false, message: 'Ошибка авторизации. Проверьте API ключ OpenRouter.' };
            }
            if (response.status === 402) {
                return { success: false, message: 'Недостаточно средств или требуется оплата.' };
            }
            if (response.status === 429) {
                return { success: false, message: 'Превышен лимит запросов. Попробуйте позже.' };
            }
            
            return { success: false, message: `Ошибка API: ${errorData.error?.message || 'Неизвестная ошибка'}` };
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        return { 
            success: true, 
            message: aiResponse,
            description: aiResponse
        };
    } catch (error) {
        console.error('Ошибка улучшения описания:', error);
        return { 
            success: false, 
            message: 'Не удалось улучшить описание. Проверьте подключение к интернету.' 
        };
    }
};