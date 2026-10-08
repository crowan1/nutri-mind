export const capitalize = (str) => {
    if (!str || typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Formate un nombre de minutes en chaîne de caractères au format "HHhMM" (ex: 90 -> "01h30", 45 -> "45 min").
 *
 * @param {number|string} totalMinutes - Le nombre de minutes à formater.
 * @returns {string} Le temps formaté.
 */
export const formatDuration = (totalMinutes) => {
    const minutes = parseInt(totalMinutes, 10);

    if (isNaN(minutes) || minutes <= 0) return '0 min';

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    // moins d'une heure
    if (hours === 0) {
        return `${remainingMinutes} min`;
    }

    // plus d'une heure
    if (remainingMinutes === 0) {
        return `${hours} h`;
    }

    // Format complet "XhYY" avec padding sur les minutes (ex: 1h05, 2h30)
    const formattedMinutes = String(remainingMinutes).padStart(2, '0');

    return `${hours}h${formattedMinutes}`;
};