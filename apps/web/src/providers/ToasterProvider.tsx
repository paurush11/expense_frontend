import { Toaster } from "react-hot-toast"

const ToasterProvider = () => {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 5000,
                style: {
                    background: '#363636',
                    color: '#fff',
                },
                success: {
                    duration: 3000,
                    style: {
                        background: 'green',
                        color: 'black',
                    },
                },
                error: {
                    duration: 5000,
                    style: {
                        background: 'red',
                        color: 'black',
                    },
                },
            }}
        />
    )
}

export default ToasterProvider