export default function JobFilterMobile({
  setIsOpen,
  handleSearchChange,
  search,
  handleCategoryChange,
  category,
}) {
  return (
    <div className="">
      <div className="bg-gray-700 rounded-md h-screen p-4 fixed  top-0 z-30 w-56 rounded-b-none overflow-auto left-0">
        {/* Filter by Label */}
        <button
          className="flex justify-end mb-4"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img
            src="/public/images/close-icon.png"
            alt="close-icon"
            className="w-8 pointer-events-none"
          />
        </button>
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
              all
            </option>
            <option className="text-sm capitalize" value="technology">
              technology
            </option>
            <option className="text-sm capitalize" value="design">
              design
            </option>
            <option className="text-sm capitalize" value="marketing">
              marketing
            </option>
            <option className="text-sm capitalize" value="finance">
              finance
            </option>
            <option className="text-sm capitalize" value="sales">
              sales
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
