const Footer = () => {
    return (
        <footer className="bg-white border-t p-2 text-center text-xs text-gray-500">
            <span>
                Created with <b className="text-red-500">{"</>"}</b> by{' '}
                <a
                    className="text-blue-400 font-semibold hover:underline"
                    href="https://github.com/metakgp"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    OpenLake
                </a>
            </span>
            <span>
                Please discuss or contribute suggestions on our{' '}
                <a
                    className="text-blue-400 font-semibold hover:underline"
                    href="https://github.com/OpenLake"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Github
                </a>
            </span>
        </footer>
    );
};

export default Footer;
