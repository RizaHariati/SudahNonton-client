const GetFormData = (objectData) => {
  const formData = new FormData();
  if (objectData) {
    Object.entries(objectData).forEach(([key, value]) => {
      if (!value) return formData.append(key, "");
      formData.append(key, value);
    });
  }
  return formData;
};

export default GetFormData;
