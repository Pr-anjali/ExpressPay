import React, { useState } from 'react';

const Cashback = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);
  const [offerFeedback, setOfferFeedback] = useState({});

  // Function to handle search term change
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle sort option change
  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  };

  // Function to handle filter options change
  const handleFilterOptionsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFilterOptions(selectedOptions);
  };

  // Function to handle user experience change
  const handleUserExperienceChange = (e, offerId) => {
    const { value } = e.target;
    setOfferFeedback((prevFeedback) => ({
      ...prevFeedback,
      [offerId]: {
        ...prevFeedback[offerId],
        experience: value,
      },
    }));
  };

  // Function to handle user rating change
  const handleUserRatingChange = (e, offerId) => {
    const { value } = e.target;
    setOfferFeedback((prevFeedback) => ({
      ...prevFeedback,
      [offerId]: {
        ...prevFeedback[offerId],
        rating: parseInt(value),
      },
    }));
  };

  // Placeholder data for cashback offers
  const cashbackOffers = [
    { id: 1, title: 'Offer 1', expirationDate: '2023-06-30', cashbackPercentage: 10, category: 'Category A' },
    { id: 2, title: 'Offer 2', expirationDate: '2023-07-15', cashbackPercentage: 15, category: 'Category B' },
    { id: 3, title: 'Offer 3', expirationDate: '2023-06-25', cashbackPercentage: 12, category: 'Category A' },
    { id: 4, title: 'Offer 4', expirationDate: '2023-06-28', cashbackPercentage: 8, category: 'Category C' },
    // Add more offers here...
  ];

  // Filtered and sorted cashback offers based on search term, sort option, and filter options
  const filteredOffers = cashbackOffers
    .filter((offer) =>
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterOptions.length === 0 || filterOptions.includes(offer.category))
    )
    .sort((a, b) => {
      if (sortOption === 'expiration') {
        return new Date(a.expirationDate) - new Date(b.expirationDate);
      } else if (sortOption === 'cashback') {
        return b.cashbackPercentage - a.cashbackPercentage;
      } else {
        return 0;
      }
    });

  // Function to submit user feedback for a specific offer
  const submitUserFeedback = (offerId) => {
    const { experience, rating } = offerFeedback[offerId];
    // Implement your logic to submit the user's experience and rating for the offer with the given offerId
    console.log(`Submitted feedback for offer ${offerId}: Experience: ${experience}, Rating: ${rating}`);
  };

  // Card component for each cashback offer
  const OfferCard = ({ offer }) => {
    return (
      <div className="offer-card">
        <h2>{offer.title}</h2>
        <p>Expiration Date: {offer.expirationDate}</p>
        <p>Cashback Percentage: {offer.cashbackPercentage}%</p>
        <p>Category: {offer.category}</p>

        <div className="user-feedback">
          <input
            type="text"
            placeholder="Share your experience..."
            value={offerFeedback[offer.id]?.experience || ''}
            onChange={(e) => handleUserExperienceChange(e, offer.id)}
          />
          <input
            type="number"
            min="0"
            max="5"
            step="0.5"
            placeholder="Rate the offer (0-5)"
            value={offerFeedback[offer.id]?.rating || ''}
            onChange={(e) => handleUserRatingChange(e, offer.id)}
          />
          <button onClick={() => submitUserFeedback(offer.id)}>Submit</button>
        </div>
      </div>
    );
  };

  return (
    <div className="cashback-page">
      <h1>Welcome to Cashback Page</h1>

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchTermChange}
        />

        <select value={sortOption} onChange={handleSortOptionChange}>
          <option value="">Sort By</option>
          <option value="expiration">Expiration Date</option>
          <option value="cashback">Cashback Percentage</option>
        </select>

        <select multiple value={filterOptions} onChange={handleFilterOptionsChange}>
          <option value="Category A">Category A</option>
          <option value="Category B">Category B</option>
          <option value="Category C">Category C</option>
          {/* Add more filter options here */}
        </select>
      </div>

      <div className="cashback-offers-container">
        {filteredOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
};

export default Cashback;
