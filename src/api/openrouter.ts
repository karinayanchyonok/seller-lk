const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Функция для получения рыночной цены
export const getMarketPriceFromAI = async (
    title: string,
    category: string,
    currentPrice: number
): Promise<string> => {
    // Проверка API ключа
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
        return 'API ключ не настроен. Добавьте VITE_OPENROUTER_API_KEY в файл .env';
    }

    const categoryMap: Record<string, string> = {
        electronics: 'Электроника',
        auto: 'Авто',
        real_estate: 'Недвижимость',
    };
    const categoryName = categoryMap[category] || category;

    const prompt = `Определи рыночную цену для товара. Категория: ${categoryName}. Текущая цена: ${currentPrice} рублей.
    
    Ответ дай в формате:
    Средняя цена: [диапазон] рублей - [состояние]`;

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
                        content: 'Ты эксперт по оценке товаров на вторичном рынке. Отвечай только на русском языке. Дай конкретные цифры в рублях.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 300,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error Details:', errorData);
            
            // Обработка конкретных ошибок
            if (response.status === 401) {
                return 'Ошибка авторизации. Проверьте API ключ OpenRouter.';
            }
            if (response.status === 402) {
                return 'Недостаточно средств или требуется оплата. Используйте бесплатную модель или пополните баланс.';
            }
            if (response.status === 429) {
                return 'Превышен лимит запросов. Попробуйте позже.';
            }
            
            return `Ошибка API: ${errorData.error?.message || 'Неизвестная ошибка'}`;
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Ошибка получения рыночной цены:', error);
        return 'Не удалось получить информацию о рыночной цене. Проверьте подключение к интернету.';
    }
};

// Функция для улучшения описания
export const improveDescriptionFromAI = async (
    title: string,
    category: string,
    currentDescription: string,
    price: number
): Promise<string> => {
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
        return 'API ключ не настроен. Добавьте VITE_OPENROUTER_API_KEY в файл .env';
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
    
    Требования:
    1. Напиши привлекательное, информативное описание
    2. Добавь важные характеристики
    3. Длина: 200-400 символов
    4. Только текст, без маркдауна
    5. Используй переносы строк для читаемости`;

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
                        content: 'Ты профессиональный копирайтер. Пиши привлекательные описания для объявлений на русском языке. Отвечай только текстом без маркдауна.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.8,
                max_tokens: 500,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error Details:', errorData);
            
            if (response.status === 401) {
                return 'Ошибка авторизации. Проверьте API ключ OpenRouter.';
            }
            if (response.status === 402) {
                return 'Недостаточно средств или требуется оплата. Используйте бесплатную модель или пополните баланс.';
            }
            if (response.status === 429) {
                return 'Превышен лимит запросов. Попробуйте позже.';
            }
            
            return `Ошибка API: ${errorData.error?.message || 'Неизвестная ошибка'}`;
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Ошибка улучшения описания:', error);
        return 'Не удалось улучшить описание. Проверьте подключение к интернету.';
    }
};