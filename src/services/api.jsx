

// // Upload a CV
// export const uploadCV = async (token, formData) => {
//   try {
//     const response = await api.post('/users/cvs', formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data',
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'CV upload failed');
//   }
// };


// // 