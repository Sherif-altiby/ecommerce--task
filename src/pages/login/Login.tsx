import LoginBranding from "./LoginBranding";
import LoginForm     from "./LoginForm";
import { useLang }   from "../../store/hooks";

const Login = () => {
  const { isAr } = useLang();

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen flex"
      style={{ fontFamily: isAr ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-12px) rotate(2deg); }
          66%       { transform: translateY(-6px) rotate(-1deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .float-1 { animation: float 6s ease-in-out infinite; }
        .float-2 { animation: float 8s ease-in-out infinite 1s; }
        .float-3 { animation: float 7s ease-in-out infinite 2s; }
        .fade-up   { animation: fadeSlideUp 0.5s ease forwards; }
        .fade-up-1 { animation: fadeSlideUp 0.5s ease 0.1s both; }
        .fade-up-2 { animation: fadeSlideUp 0.5s ease 0.2s both; }
        .fade-up-3 { animation: fadeSlideUp 0.5s ease 0.3s both; }
        .fade-up-4 { animation: fadeSlideUp 0.5s ease 0.4s both; }
        .fade-up-5 { animation: fadeSlideUp 0.5s ease 0.5s both; }
        .shimmer-btn {
          background: linear-gradient(90deg, #2563EB, #6366F1, #2563EB);
          background-size: 200% auto;
          animation: shimmer 2s linear infinite;
        }
        .input-field { transition: all 0.2s ease; }
        .input-field:focus { box-shadow: 0 0 0 3px rgba(37,99,235,0.15); }
      `}</style>

      <LoginBranding />
      <LoginForm />
    </div>
  );
};

export default Login;
