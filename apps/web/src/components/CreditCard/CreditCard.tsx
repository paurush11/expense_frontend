import React, { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
interface CreditCardProps {
    cardNumber: string
    expiryDate: string
    holderName: string
    variant?: 'golden' | 'silver' | 'blue' | 'black'
    cvv?: string
}

export const CreditCard = ({
    cardNumber,
    expiryDate,
    holderName,
    variant = 'golden',
    cvv = '123'
}: CreditCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    // Format card number to show in groups of 4
    const formatCardNumber = (number: string, part: number) => {
        if (part === 1) {
            return number.slice(0, 4).padEnd(4, ' ') || number
        } else if (part === 2) {
            return number.slice(4, 8).padEnd(4, ' ') || number
        } else if (part === 3) {
            return number.slice(8, 12).padEnd(4, ' ') || number
        } else {
            return number.slice(12, 16).padEnd(4, ' ') || number
        }
    }

    const getCardStyle = () => {
        switch (variant) {
            case 'golden':
                return 'bg-gradient-to-l from-[#5D4157] to-[#A8CABA]'
            case 'silver':
                return 'bg-gradient-to-l from-[#757F9A] to-[#D7DDE8]'
            case 'blue':
                return 'bg-gradient-to-l from-[#1e3c72] to-[#2a5298]'
            case 'black':
                return 'bg-gradient-to-l from-[#232526] to-[#414345]'
            default:
                return 'bg-gradient-to-l from-[#5D4157] to-[#A8CABA]'
        }
    }

    const getLogoColor = () => {
        switch (variant) {
            case 'golden':
                return 'bg-[#dc143c]'
            case 'silver':
                return 'bg-[#6B7280]'
            case 'blue':
                return 'bg-[#3B82F6]'
            case 'black':
                return 'bg-[#1F2937]'
            default:
                return 'bg-[#dc143c]'
        }
    }

    return (
        <div
            className="relative w-[450px] h-[285px] cursor-pointer [perspective:1000px] my-4 mx-auto"

        >
            <div
                className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] hover:scale-110 transition-all duration-300"
                style={{ transform: isFlipped ? 'rotateY(180deg)' : '' }}
            >
                {/* Front of the card */}
                <div className={`absolute inset-0 ${getCardStyle()} rounded-[20px] shadow-lg [backface-visibility:hidden]`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 rounded-[20px] overflow-hidden">
                        <div
                            className="w-full h-full opacity-40"
                            style={{
                                background: 'radial-gradient(circle at 0% 50%, rgba(96, 16, 48, 0) 9px, rgba(0, 0, 0, 0.2) 10px, rgba(96, 16, 48, 0) 11px) 0px 10px, radial-gradient(at 100% 100%, rgba(96, 16, 48, 0) 9px, rgba(255, 255, 255, 0.2) 10px, rgba(96, 16, 48, 0) 11px), rgba(0, 0, 0, 0.6)',
                                backgroundSize: '20px 20px'
                            }}
                        />
                    </div>
                    <div className="absolute top-10 right-10 text-white z-10">
                        <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} onClick={() => setIsVisible(!isVisible)} />
                    </div>

                    <div className="relative p-8 w-full h-full flex flex-col justify-between" onClick={() => setIsFlipped(!isFlipped)}>
                        {/* Header */}
                        <div className="flex items-center">
                            <div className={`w-10 h-10 ${getLogoColor()} shadow-[-2px_2px_0_rgba(255,255,255,0.8)] rounded-[40px_0_40px_40px] transform -rotate-45`}>
                                <span className="block w-full h-full text-sm font-medium text-gray-200 leading-10 text-center transform rotate-45">
                                    PB
                                </span>
                            </div>
                            <span className="ml-3 text-2xl font-medium uppercase text-white/80">
                                Batish Public Bank
                            </span>
                        </div>

                        {/* Chip */}
                        <div className="w-14 h-10 bg-[#fdd76f] rounded-lg my-5" />

                        {/* Card Number */}
                        <div className="text-3xl text-white font-['OCR_A_Std',monospace] mb-5 relative ">
                            <div className="flex tracking-wider justify-between">
                                <div className="flex">

                                    {isVisible ? formatCardNumber(cardNumber, 1) : '****'}
                                </div>
                                <div className="flex">
                                    {isVisible ? formatCardNumber(cardNumber, 2) : '****'}
                                </div>
                                <div className="flex">
                                    {isVisible ? formatCardNumber(cardNumber, 3) : '****'}
                                </div>
                                <div className="flex">
                                    {isVisible ? formatCardNumber(cardNumber, 4) : '****'}
                                </div>

                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-end">
                            <div className="w-[70%]">
                                <div className="text-center flex justify-start">
                                    <span className="text-xs text-[#deb887] uppercase mr-2">Expires End</span>
                                    <span className="text-white font-['OCR_A_Std',monospace] relative -top-1">{isVisible ? expiryDate : '****'}</span>
                                </div>
                                <div className="text-white font-['OCR_A_Std',monospace] mt-2 uppercase">
                                    {isVisible ? holderName : '****'}
                                </div>
                            </div>
                            <div className="relative -bottom-2">
                                <img src="/card_logo.png" alt="Card Logo" className="w-24 h-12 object-contain" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back of the card */}
                <div
                    onClick={() => setIsFlipped(!isFlipped)}
                    className={`absolute inset-0 ${getCardStyle()} rounded-[20px] shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]`}
                >
                    {/* Black strip */}
                    <div className="absolute top-10 w-full h-12 bg-black" />

                    {/* CVV strip */}
                    <div className="absolute top-32 right-12 w-16 h-8 bg-white flex items-center justify-center">
                        <span className="text-black font-mono">{cvv}</span>
                    </div>

                    {/* Additional info */}
                    <div className="absolute bottom-12 left-12 right-12 text-white/80 text-xs">
                        <p>This card is property of Public Bank. Misuse is criminal offense.</p>
                        <p className="mt-2">If found, please return to the nearest Public Bank branch.</p>
                    </div>
                </div>
            </div>
        </div>
    )
} 