const Copy = ({ mark }: { mark: boolean }) => {
	if (mark) {
		return <img src="/check.svg" alt="Copied weather" className="h-5 w-5" />;
	}

	return <img src="/copy.svg" alt="Copy weather" className="h-5 w-5" />;
};

export default Copy;
