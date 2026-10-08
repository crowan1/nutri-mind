import Toastify from 'toastify-js'

const defaultOptions = {
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
}

export const showToast = (message, type = 'success', customOptions = {}) => {
    let backgroundColor = "#4f46e5"

    switch (type) {
        case 'success':
            backgroundColor = "linear-gradient(to right, #00b09b, #96c93d)"
            break
        case 'error':
            backgroundColor = "linear-gradient(to right, #ff5f6d, #ffc371)"
            break
        case 'info':
            backgroundColor = "linear-gradient(to right, #2193b0, #6dd5ed)"
            break
        case 'warning':
            backgroundColor = "linear-gradient(to right, #f8b500, #fceabb)"
            break
        default:
            break
    }

    Toastify({
        text: message,
        style: {
            background: backgroundColor,
            borderRadius: "8px",
            fontSize: "14px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
        ...defaultOptions,
        ...customOptions,
    }).showToast()
}

export const showSuccessToast = (message, options) => showToast(message, 'success', options)
export const showErrorToast = (message, options) => showToast(message, 'error', options)
export const showInfoToast = (message, options) => showToast(message, 'info', options)