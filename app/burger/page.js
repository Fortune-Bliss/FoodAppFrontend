"use client";
import React, { useState } from "react";
import axios from "axios";

const AddBurgerForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // State to hold the selected image file
  const [demoMedia, setDemoMedia] = useState([]); // State to hold selected demo media files
  const [preparation, setPreparation] = useState(""); // State to hold preparation details as a list
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("preparation", preparation); // Append preparation details as a string

      if (image) {
        formData.append("image", image); // Append the main image file
      }

      if (demoMedia.length > 0) {
        demoMedia.forEach((file) => {
          formData.append("demoMedia", file); // Append each demo media file
        });
      }

      const response = await axios.post(
        "http://192.168.196.238:2000/api/burger/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data for file upload
          },
        }
      );

      console.log("Burger added:", response.data);
      setSuccessMessage("Burger added successfully!");
      // Optionally, clear form fields
      setName("");
      setDescription("");
      setPrice("");
      setImage(null);
      setDemoMedia([]);
      setPreparation("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error adding burger:", error);
      setErrorMessage("Failed to add burger. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Capture the selected image file
  };

  const handleDemoMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setDemoMedia(files); // Capture the selected demo media files
  };

  return (
    <div className="container mx-auto mt-3">
      <h2 className="text-2xl font-semibold mb-4">Add Burger</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 border border-gray-300 rounded-md">
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
            {errorMessage}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 border rounded-md w-full"
            placeholder="Enter name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-3 py-2 border rounded-md w-full h-20"
            placeholder="Enter description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-3 py-2 border rounded-md w-full"
            placeholder="Enter price"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Preparation:
          </label>
          <textarea
            value={preparation}
            onChange={(e) => setPreparation(e.target.value)}
            className="px-3 py-2 border rounded-md w-full h-20"
            placeholder="Enter preparation steps, each on a new line"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Main Image:
          </label>
          <input type="file" onChange={handleImageChange} className="mb-2" />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Selected"
              className="max-h-40 mb-2"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Demo Media:
          </label>
          <input
            type="file"
            multiple
            onChange={handleDemoMediaChange}
            className="mb-2"
          />
          {demoMedia.length > 0 && (
            <div>
              {demoMedia.map((file, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span className="text-sm truncate">{file.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Add Burger
        </button>
      </form>
    </div>
  );
};

export default AddBurgerForm;
