import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGenLetters, addGenLetter } from "../../services/genLetterApi";
import { getUploadedCvs } from "../../services/uploadedCvsApi";


const GenLetter = () => {
  const [allCv, setAllCv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    originalCvContent: "",
    companyWebsite: "",
    jobDescriptionUrl: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const cvResponse = await getUploadedCvs();
        setAllCv(cvResponse || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.originalCvContent)
      newErrors.originalCvContent = "Original CV content is required";
    if (!formData.companyWebsite)
      newErrors.companyWebsite = "Company website is required";
    if (!formData.jobDescriptionUrl)
      newErrors.jobDescriptionUrl = "Job description URL is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
        setLoading(true);
      const response = await addGenLetter(formData);
      if (response.status === 201) {
        setLoading(false);
        alert("Cover Letter added successfully");
        navigate("/genLetter/" + response.data._id);
      }
    } catch (error) {
        setLoading(false);
      console.error("Failed to add Cover Letter:", error);
      alert("Failed to add Cover Letter");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Can this be refactored?
  return (
    <main>
      <h1>Generate Cover Letter</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Original CV Content:
          <select
            name="originalCvContent"
            value={formData.originalCvContent}
            onChange={handleChange}
            required
          >
            <option value="">Select a CV</option>
            {allCv.map((cv) => (
              <option key={cv._id} value={cv.cvContent}>
                {cv.cvComments}
              </option>
            ))}
          </select>
        </label>
        <label>
          Company Website:
          <input
            type="text"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
            placeholder="Company Website"
            required
          />
        </label>
        <label>
          Job Description URL:
          <input
            type="text"
            name="jobDescriptionUrl"
            value={formData.jobDescriptionUrl}
            onChange={handleChange}
            placeholder="Job Description URL"
            required
          />
        </label>
        <button type="submit">Generate</button>
      </form>
    
      {Object.keys(errors).length > 0 && (
        <div>
          <ul>
            {Object.keys(errors).map((key) => (
              <li key={key}>{errors[key]}</li>
            ))}
          </ul>
        </div>

      )}
    </main>
  );
};

export default GenLetter;
