import Logo from "../components/Logo.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";

function Register() {
    return (
        <div className="h-screen overflow-y-auto bg-[#121212] text-white">
            <div className="mx-auto my-8 flex w-full max-w-sm flex-col px-4">
                <Logo />
                
                <div className="mb-6 w-full text-center text-2xl font-semibold uppercase">
                    Play
                </div>

                <Input
                    label="Email*"
                    type="email"
                    placeholder="Enter your email"
                    className="mb-4 rounded-lg px-3 py-2"
                    calssForLabel="text-gray-300"
                />
                
                <Button className="px-4 py-3">
                    Sign up with Email
                </Button>
            </div>
        </div>
    );
}

export default Register;
