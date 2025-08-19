import React, { useEffect, useState } from "react";
import { Home, Ruler, Calendar, User, Eye, Share2 } from "lucide-react";
import useIcon from "../../hooks/useIcon";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import usePropertiesService from "../../services/usePropertiesService";

const PropertyDetails = () => {
  const { property } = useSelector((state) => state.properties);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { fetchPropertyById } = usePropertiesService();
  const { propertyId } = useParams();
  const icons = useIcon();
  useEffect(() => {
    fetchPropertyById(propertyId);
  }, []);
  if (!property) {
    return (
      <div className="flex items-center justify-center h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
        <div className="text-center">
          <span className="mx-auto h-12 w-12 text-gray-400 mb-4">
            {icons["home"]}
          </span>
          <p className="text-gray-500 text-lg">No property details available</p>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    if (property.images && property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property.images && property.images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + property.images.length) % property.images.length
      );
    }
  };

  return (
    <div className=" mx-auto p-6  min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full"></div>
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="flex-1 text-start min-w-0">
              <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <span className="h-5 w-5 mr-2 text-blue-500">
                  {icons["location"]}
                </span>
                <span className="text-lg">{property.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-sm ${
                property.listingType === "sale"
                  ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
                  : "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
              }`}
            >
              For {property.listingType}
            </span>
            <span className="text-3xl font-bold text-blue-600">
              ₹{property.price?.toLocaleString()}
            </span>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                property.status === "available"
                  ? "bg-green-100 text-green-700"
                  : property.status === "sold" || property.status === "rented"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {property.status?.charAt(0).toUpperCase() +
                property.status?.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      {property.images && property.images.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative group">
            <div className="aspect-video rounded-xl overflow-hidden bg-gray-200 mb-4 relative">
              <img
                src={property.images[currentImageIndex]}
                alt={`Property view ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />

              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                  >
                    →
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </>
              )}
            </div>

            {property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {property.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-blue-500 scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Property Overview */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mx-auto h-12 w-12 text-blue-500 mr-3">
                {icons["home"]}
              </span>
              Property Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                <Home className="h-8 w-8 text-blue-600 mr-4" />
                <div>
                  <p className="text-sm font-medium text-blue-600">Category</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {property.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-green-50 rounded-xl">
                <Ruler className="h-8 w-8 text-green-600 mr-4" />
                <div>
                  <p className="text-sm font-medium text-green-600">Area</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {property.area} {property.unit}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {property.description}
              </p>
            </div>
          </div>

          {/* Amenities */}
          {property.amenities?.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity, i) => (
                  <div
                    key={i}
                    className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-800 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Info</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Price</span>
                <span className="font-bold text-blue-600">
                  ₹{property.price?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Area</span>
                <span className="font-semibold">
                  {property.area} {property.unit}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Category</span>
                <span className="font-semibold">{property.category}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    property.status === "available"
                      ? "bg-green-100 text-green-700"
                      : property.status === "sold" ||
                        property.status === "rented"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {property.status?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Activity Logs */}
          {property.activityLogs?.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                Recent Activity
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {property.activityLogs.slice(0, 5).map((log, i) => (
                  <div
                    key={i}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex-shrink-0">
                      <User className="h-5 w-5 text-gray-500 mt-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {log.action}
                      </p>
                      <p className="text-xs text-gray-600">
                        By {log.performedBy?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(log.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
