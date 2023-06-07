import React, { useState } from 'react';
import logo from "../images/expressPayLogo.jpg";
import emailIcon from '../images/email-icon.jpg';
import whatsappIcon from '../images/whatsapp-icon.jpg';
import facebookIcon from '../images/facebook-icon.jpg';
import telegramIcon from '../images/telegram-icon.jpg';

const Referral = () => {
  const [referralCode, setReferralCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [email, setEmail] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setIsCopied(true);
  };

  const handleEmailShare = () => {
    const subject = 'Check out this referral';
    const body = `Use my referral code: ${referralCode} when signing up at https://example.com`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleWhatsAppShare = () => {
    const text = `Use my referral code: ${referralCode} when signing up at https://example.com`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  };

  const handleFacebookShare = () => {
    const url = `https://example.com/referral/${referralCode}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
  };

  const handleTelegramShare = () => {
    const text = `Use my referral code: ${referralCode} when signing up at https://example.com`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(text)}`);
  };

  return (
    <div>
      <h1>Referral Page</h1>
      <img src={logo} alt="Referral" />
      <p>Share your referral code with friends:</p>
      <input
        type="text"
        value={referralCode}
        onChange={(e) => setReferralCode(e.target.value)}
      />
      <button onClick={handleCopy}>{isCopied ? 'Copied!' : 'Copy'}</button>
      <p>Or share via:</p>
      <div className="share-buttons">
        <button onClick={handleEmailShare}>
          <img src={emailIcon} alt="Email" width="20" height="20" />
        </button>
        <button onClick={handleWhatsAppShare}>
          <img src={whatsappIcon} alt="WhatsApp" width="20" height="20" />
        </button>
        <button onClick={handleFacebookShare}>
          <img src={facebookIcon} alt="Facebook" width="20" height="20" />
        </button>
        <button onClick={handleTelegramShare}>
          <img src={telegramIcon} alt="Telegram" width="20" height="20" />
        </button>
      </div>
      <p>Or share this link:</p>
      <a href={`https://example.com/referral/${referralCode}`}>
        {`https://example.com/referral/${referralCode}`}
      </a>
    </div>
  );
};

export default Referral;
