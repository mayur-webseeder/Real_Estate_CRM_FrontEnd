import React, { useState } from "react";
import CommonInput from "../../../components/input/CommonInput";
import CommonSelect from "../../../components/input/CommonSelect";
import { useSelector } from "react-redux";
import useIcon from "../../../hooks/useIcon";

function PropertyFormModel({
  data,
  setData,
  handleChange,
  handleFileChange,
  removeImage,
  handleSubmit,
}) {
  const [dragActive, setDragActive] = useState(false);
  const { isSubmitting } = useSelector((state) => state.properties);
  const icons = useIcon();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setData((prev) => ({
        ...prev,
        images: files,
      }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen border-inherit">
      {/* Header Card */}
      <div className=" rounded-xl shadow-sm border border-inherit p-6 mb-8">
        <div className="flex items-center justify-between text-start border-inherit">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Add New Property
            </h1>
            <p className="text-gray-600">
              Fill in the details below to list a new property
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              {icons["property"]}
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-xl shadow-sm border border-inherit">
        <form onSubmit={handleSubmit} className="p-8 border-inherit">
          {/* Basic Information Section */}
          <div className="mb-8 border-inherit">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-inherit">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-inherit">
              <div className="lg:col-span-2 border-inherit">
                <CommonInput
                  label="Property Title"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                  placeholder="Enter a descriptive title for your property"
                  required
                />
              </div>

              <CommonSelect
                label="Listing Type"
                name="listingType"
                value={data.listingType}
                onChange={handleChange}
                required
                options={[
                  { label: "For Sale", value: "sale" },
                  { label: "For Rent", value: "rent" },
                ]}
              />

              <CommonInput
                label="Property Category"
                name="category"
                value={data.category}
                onChange={handleChange}
                placeholder="e.g., Apartment, House, Commercial"
                required
              />

              <CommonInput
                label="Location"
                name="location"
                value={data.location}
                onChange={handleChange}
                placeholder="City, State, or Full Address"
                required
              />

              <CommonSelect
                label="Status"
                name="status"
                value={data.status}
                onChange={handleChange}
                options={[
                  { label: "Available", value: "available" },
                  { label: "Booked", value: "booked" },
                  { label: "Sold", value: "sold" },
                ]}
              />

              <div className="lg:col-span-3 border-inherit">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  placeholder="Provide a detailed description of the property..."
                  required
                  rows={4}
                  className="w-full border border-inherit rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Property Details Section */}
          <div className="mb-8 border-inherit">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-inherit">
              Property Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border-inherit">
              <CommonInput
                label="Price"
                name="price"
                type="number"
                value={data.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
              />

              <CommonInput
                label="Area"
                name="area"
                type="number"
                value={data.area}
                onChange={handleChange}
                placeholder="Enter area"
                required
              />

              <CommonInput
                label="Unit"
                name="unit"
                value={data.unit}
                onChange={handleChange}
                placeholder="sq ft, sq m, acres"
              />

              <div className="lg:col-span-1">
                {/* This maintains the 4-column layout */}
              </div>

              <div className="lg:col-span-4 border-inherit">
                <CommonInput
                  label="Amenities"
                  name="amenities"
                  value={data.amenities}
                  onChange={handleChange}
                  placeholder="Swimming pool, Parking, Garden, Security (comma separated)"
                />
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="mb-8 border-inherit">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-inherit">
              Property Images
            </h2>

            <div
              className={`relative border-2 border-dashed border-inherit rounded-xl p-8 text-center transition-colors ${
                dragActive
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="space-y-4">
                <div className="flex justify-center text-5xl text-gray-400">
                  {icons["upload"]}
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Drag and drop images here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Upload multiple images to showcase your property
                  </p>
                </div>
              </div>
            </div>

            {/* Image Preview  */}
            {data.images.length > 0 && (
              <div className="mt-6 border-inherit">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Selected Images ({data.images.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 border-inherit">
                  {data.images.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={
                            typeof file === "object"
                              ? URL.createObjectURL(file)
                              : file
                          }
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        {icons["close"]}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-inherit">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-all ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:transform active:scale-95"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3 border-inherit">
                  {icons["spinner1"]}
                  Adding Property...
                </div>
              ) : (
                "Add Property"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PropertyFormModel;
