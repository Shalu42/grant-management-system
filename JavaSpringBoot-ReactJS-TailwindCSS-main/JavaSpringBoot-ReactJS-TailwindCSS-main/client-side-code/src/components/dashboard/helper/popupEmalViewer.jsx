

const PopupEmailViewer = ({ content, showModal, onClose}) => {

  return (
    <>
      {showModal ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-3/4 h-3/4 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-center">Email Body</h1>
              </div>
              <div className="p-4 overflow-y-auto" dangerouslySetInnerHTML={{ __html: content }} />
              <div className="p-4 flex justify-center">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => onClose(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
      ) : null}
    </>
  );
};

export default PopupEmailViewer;
