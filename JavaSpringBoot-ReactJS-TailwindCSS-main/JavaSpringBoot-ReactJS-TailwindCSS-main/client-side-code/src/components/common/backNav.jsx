import { useNavigate } from 'react-router-dom';

const GoBack = () => {
    const navigate = useNavigate();

    const handleBackButton = () => {
      navigate(-1);
    };

    return (
        <button type="button"
            className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
            onClick={handleBackButton} >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
        >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
            Back
        </button>

    )
}

export default GoBack;