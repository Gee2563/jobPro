import React from 'react';

const ApplicationDetail = ({ label, value, name, isEditing, onChange, type = 'text', ...props }) => (
  <label>
    {label}:
    {isEditing ? (
      type === 'textarea' ? (
        <textarea name={name} value={value} onChange={onChange} {...props} />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} {...props} />
      )
    ) : (
      type === 'textarea' ? (
        <span>{value}</span>
      ) : (
        <span>{value}</span>
      )
    )}
  </label>
);

export default ApplicationDetail;
