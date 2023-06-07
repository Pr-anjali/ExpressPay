import React, { useState } from 'react';

const Referral = () => {
  const [referralCode, setReferralCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setIsCopied(true);
  };

  return (
    <div>
      <h1>Referral Page</h1>
      <p>Share your referral code with friends:</p>
      <input
        type="text"
        value={referralCode}
        onChange={(e) => setReferralCode(e.target.value)}
      />
      <button onClick={handleCopy}>{isCopied ? 'Copied!' : 'Copy'}</button>
      <p>Or share this link:</p>
      <a href={`https://example.com/referral/${referralCode}`}>
        {`https://example.com/referral/${referralCode}`}
      </a>
    </div>
  );
};

export default Referral;