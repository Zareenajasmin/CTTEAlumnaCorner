import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);  // Track if OTP was sent
  const [otp, setOtp] = useState("");  // OTP input state
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    registerno: ''
  });
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.registerno) {
      return setErrorMessage('Please fill out all fields.');
    }
    console.log(formData);  // Add this log to check the data being sent

    try {
      setLoading(true);
      setErrorMessage(null);

      // Send user details to the backend for signup
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);

      if (res.ok) {
        // If OTP is sent, show OTP input form
        setOtpSent(true); // Set OTP sent status to true
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
  
    if (!otp) {
      return setErrorMessage('Please enter the OTP.');
    }
  
    try {
      setLoading(true);
      setErrorMessage(null);
  
      // Send OTP and user details to the backend
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          otp, 
          username: formData.username,
          email: formData.email,
          password: formData.password,
          registerno: formData.registerno 
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed.");
      }
  
      setLoading(false);
  
      if (res.ok) {
        setSuccessMessage("OTP Verified✅! You can now sign in."); // ✅ Show success message
        setTimeout(() => navigate("/sign-in"), 5000); // Redirect after 3 seconds
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              CTTE Alumna
            </span>
            Corner
          </Link>
          <p className="text-sm mt-5">
            You can sign up with your email and password.
          </p>
        </div>

        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={otpSent ? handleOtpSubmit : handleSubmit}>
            {!otpSent ? (
              <>
                <div>
                  <Label value="Your username" />
                  <TextInput
                    type="text"
                    placeholder="Username"
                    id="username"
                    value={formData.username} // Binding to state
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label value="Your email" />
                  <TextInput
                    type="email"
                    placeholder="name@gmail.com"
                    id="email"
                    value={formData.email}  // Binding to state
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label value="Your password" />
                  <TextInput
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={formData.password}  // Binding to state
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label value="Your RegisterNo" />
                  <TextInput
                    type="number"
                    placeholder="RegisterNo"
                    id="registerno"
                    value={formData.registerno}  // Binding to state
                    onChange={handleChange}
                  />
                </div>
                <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner size="sm" />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </>
            ) : (
              <>
                <div>
                  <Label value="Enter OTP sent to your email" />
                  <TextInput
                    type="text"
                    placeholder="Enter OTP"
                    id="otp"
                    value={otp}  // Bind value of input to OTP state
                    onChange={(e) => setOtp(e.target.value)}  // Update OTP state on change
                  />
                </div>
                <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner size="sm" />
                      <span className="pl-3">Verifying OTP...</span>
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </Button>
              </>
            )}
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>

          {successMessage && (
            <Alert className="mt-5" color="success">
              {successMessage}
            </Alert>
           )}

          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
