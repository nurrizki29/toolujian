function LoadingPage() {
    return (
        <div>
        <div className="fixed opacity-1 top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-500 flex flex-col items-center justify-center transform duration-500 transition-opacity" id="backdrop">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
            <p className="w-3/4 sm:w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
          </div>
        </div>
    )
}

export default LoadingPage