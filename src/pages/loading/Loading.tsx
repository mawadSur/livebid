const LoadingScreen = () => {
  return (
    <div className="h-screen w-screen bg-white text-gray-900 flex flex-col items-center justify-center">
      <h3 className="mt-2 mb-0 font-medium">Live Auction</h3>
      <p className="m-0 text-gray-700">Loading your meeting, please wait...</p>
    </div>
  );
};

export default LoadingScreen;
