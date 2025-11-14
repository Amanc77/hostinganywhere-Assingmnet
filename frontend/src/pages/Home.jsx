import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Server, Shield, Zap } from "lucide-react";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            HostingAnywhere
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Full Stack Intern Assignment - JWT Auth, Public & Private Pages
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/plans")}
              size="lg"
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              View Plans
            </Button>

            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              size="lg"
              className=" bg-gray-600 text-white border-gray-500 hover:bg-blue-600"
            >
              Sign In / Sign Up
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
          <div className="text-center p-6 rounded-lg bg-gray-800 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Secure Authentication
            </h3>
            <p className="text-gray-400">
              JWT login and logout with token validation
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-gray-800 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Server className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Database Storage</h3>
            <p className="text-gray-400">
              User and plan data stored securely in MySQL
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-gray-800 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast & Responsive</h3>
            <p className="text-gray-400">
              Modern React UI with smooth and clean interactions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
