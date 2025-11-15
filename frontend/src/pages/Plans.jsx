import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import axiosInstance from "../api/axios";
const samplePlans = [
  {
    id: "1",
    name: "Basic",
    price: 5,
    description: "For hobby projects. 1GB storage.",
    features: ["1 GB storage", "Basic Support", "Community Access"],
  },
  {
    id: "2",
    name: "Standard",
    price: 12,
    description: "For small apps. 10GB storage, daily backups.",
    features: ["10 GB storage", "Daily Backups", "Email Support"],
  },
  {
    id: "3",
    name: "Pro",
    price: 30,
    description: "For production. 100GB storage, SLA support.",
    features: ["100 GB storage", "Priority Support", "SLA"],
  },
];

const Plans = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchPlans = async () => {
      try {
        const res = await axiosInstance.get("/plans");

        if (mounted) {
          if (res.data?.success) {
            setPlans(res.data.plans || []);
          } else {
            setError(res.data?.message || "Failed to load plans");
            setPlans(samplePlans);
          }
        }
      } catch (err) {
        console.error("Plans fetch error:", err);
        if (mounted) {
          setError("Unable to load plans — showing sample plans");
          setPlans(samplePlans);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPlans();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Choose Your Perfect Plan
          </h1>
          <p className="text-gray-400 mt-3 text-lg">
            Simple, transparent pricing for your hosting needs
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-md border border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              Get Started
            </button>
          </div>
          {error && <div className="mt-4 text-sm text-yellow-300">{error}</div>}
        </div>

        {loading ? (
          <div className="text-center text-gray-300">Loading plans...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-xl bg-[#0f1720] border border-gray-800 p-8 shadow-lg hover:shadow-xl transition"
              >
                {plan.name === "Standard" && (
                  <div className="inline-block mb-4 px-3 py-1 bg-indigo-600 text-white text-xs rounded-full">
                    Popular
                  </div>
                )}

                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-5">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>

                <ul className="mb-6 space-y-3">
                  {(plan.features || []).map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <Check className="h-5 w-5 text-indigo-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => alert(`Selected ${plan.name}`)}
                  className={`w-full py-3 rounded-md font-medium ${
                    plan.name === "Standard"
                      ? "bg-indigo-600 text-white hover:bg-indigo-500"
                      : "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
                  }`}
                >
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Plans;
