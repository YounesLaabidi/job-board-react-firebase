export default function LoadingSkeleton ({ width, height, borderRadius }) {
  return (
    <div
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
      }}
      className="animate-pulse bg-gray-700 rounded-md w-full"
    ></div>
  );
};

