import React, { useState } from 'react';

function CompanySignupForm() {
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform data validation here (optional)

    // Simulate backend call (replace with actual API call)
    console.log(
      'Company:',
      companyName,
      companyEmail,
      companyWebsite,
    );

    // Redirect to confirmation page or handle success/error response
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Company Signup</h2>
      <div className="form-group">
        <label htmlFor="companyName">Company Name:</label>
        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Your company name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="companyEmail">Company Email:</label>
        <input
          type="email"
          id="companyEmail"
          value={companyEmail}
          onChange={(e) => setCompanyEmail(e.target.value)}
          placeholder="Your company email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="companyWebsite">Company Website (Optional):</label>
        <input
          type="url"
          id="companyWebsite"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
          placeholder="Your company website"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default CompanySignupForm;
