export default function Projects() {
  const handleOpenChatbot = () => {
    // Open the Collabai Chatbot in a new tab
    window.open('https://effulgent-gumdrop-563fca.netlify.app', '_blank');
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
      <h1 className="text-3xl font-semibold">CollabAI</h1>
      
      <div className="collabai-button-container">
        <button 
          onClick={handleOpenChatbot} 
          className="collabai-button px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          Open Collabai
        </button>
      </div>

      <p className="text-md text-gray-500">
        Build fun and engaging projects while learning HTML, CSS, and JavaScript!
      </p>
    </div>
  );
}
