export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About CTTE Alumna Corner
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
            The CTTE Alumna Corner & <strong>CollabAI Chatbot</strong> is a web-based platform designed to enhance alumni engagement, specifically catering to CTTE alumni. This platform integrates a secure blog posting system with an AI-powered chatbot, creating an interactive and user-friendly experience. 
            </p>

            <p>
            The CTTE Alumna Corner allows only CTTE alumni to post blogs after authentication, while non-CTTE users can engage by viewing, liking, and commenting on posts. It features an admin panel for blog management and a secure authentication system to ensure exclusive access for verified alumni.
            </p>

            <p>
            The <strong>CollabAI</strong> Chatbot enhances user experience by providing instant AI-driven assistance. The chatbot offers personalized interactions, helping users navigate blogs, find relevant content, and improve overall engagement with the platform. By combining blogging and AI-powered interactions, this project fosters stronger alumni connections, encourages community engagement, and creates a dynamic space for users to share knowledge and experiences.
            </p>

            
          </div>
        </div>
      </div>
    </div>
  );
}