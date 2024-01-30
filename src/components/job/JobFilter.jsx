import React from "react";
import JobFilterMobile from "./JobFilterMobile";

const JobFilter = ({
  isOpen,
  setIsOpen,
  handleSearchChange,
  search,
  handleCategoryChange,
  category,
}) => {
  const handleSeach = (e) => {
    const { value } = e.target;
    filter(value);
  };

  return (
    <div className="w-1/4">
      <div className="border-2 border-gray-800 bg-gray-900 h-screen p-4 hidden md:block">
        {/* Filter by Label */}
        <div className="mb-4">
          <label
            htmlFor="candidats"
            className="block text-gray-100 text-sm mb-1"
          >
            Search for Jobs
          </label>
          <input
            onChange={handleSearchChange}
            value={search}
            type="text"
            id="candidats"
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-md text-white text-sm bg-gray-800 focus:outline-none"
          />
        </div>

        {/* Sort By */}
        <div>
          <label
            htmlFor="category"
            className="text-sm block font-semibold mb-1"
          >
            Sort By
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleCategoryChange}
            className="w-full bg-gray-800 px-4 py-2 border rounded-md focus:outline-none text-sm capitalize"
          >
            <option className="text-sm capitalize" value="all">
              All
            </option>
            <option className="text-sm capitalize" value="technology">
              Technology
            </option>
            <option className="text-sm capitalize" value="design">
              Design
            </option>
            <option className="text-sm capitalize" value="marketing">
              Marketing
            </option>
            <option className="text-sm capitalize" value="finance">
              Finance
            </option>
            <option className="text-sm capitalize" value="sales">
              Sales
            </option>
            <option className="text-sm capitalize" value="customer-service">
              Customer Service
            </option>
            <option className="text-sm capitalize" value="administration">
              Administration
            </option>
            <option className="text-sm capitalize" value="human-resources">
              Human Resources
            </option>
            <option className="text-sm capitalize" value="operations">
              Operations
            </option>
            <option className="text-sm capitalize" value="legal">
              Legal
            </option>
            <option className="text-sm capitalize" value="healthcare">
              Healthcare
            </option>
            <option className="text-sm capitalize" value="education">
              Education
            </option>
            <option className="text-sm capitalize" value="research">
              Research
            </option>
            <option className="text-sm capitalize" value="manufacturing">
              Manufacturing
            </option>
          </select>
        </div>
      </div>
      {isOpen && (
        <JobFilterMobile
          setIsOpen={setIsOpen}
          handleSearchChange={handleSearchChange}
          search={search}
          handleCategoryChange={handleCategoryChange}
          category={category}
        />
      )}
    </div>
  );
};

export default JobFilter;
