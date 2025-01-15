const Header = () => {
    return (
      <header className="bg-blue-800 text-white p-3 text-center">
        <h1 className="bg-blue-600 py-1 px-3 rounded inline-block shadow-sm">
          <strong className="text-lg">
            Periodic Table
            <span className="text-yellow-400"> of </span>
            IIT Bhilai Societies
          </strong>
        </h1>
        <p className="text-gray-300 text-xs mt-1">
          A tabular display of societies, organized by their chemical properties.
          <span className="block text-gray-400 mt-0.5">(Click on an element to learn more)</span>
        </p>
      </header>
    );
  };
  
  export default Header;