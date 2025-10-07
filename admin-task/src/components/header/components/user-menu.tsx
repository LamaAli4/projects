import { forwardRef } from "react";
import { Home, User, Users } from "lucide-react";
import { _myAccount } from "@/_mock";

type Props = {
  open: boolean;
  onToggle: () => void;
};

const UserMenu = forwardRef<HTMLDivElement, Props>(
  ({ open, onToggle }, ref) => {
    return (
      <div className="relative" ref={ref}>
        <button
          onClick={onToggle}
          className="w-10 h-10 flex items-center justify-center cursor-pointer
        rounded-full border-2 border-primary shadow-md overflow-hidden"
        >
          <img
            src={_myAccount.photoURL}
            alt={_myAccount.displayName}
            className="w-full h-full object-cover"
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-sm w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
            <div className="px-lg py-md border-b border-gray-200 bg-primary-lighter/40">
              <p className="text-sm font-semibold text-primary-dark">
                {_myAccount.displayName}
              </p>
              <p className="text-xs text-gray-500">{_myAccount.email}</p>
            </div>

            <div className="py-sm">
              <button className="flex items-center gap-sm px-lg py-sm w-full text-sm text-gray-700 hover:bg-primary-lighter/60 transition cursor-pointer">
                <Home className="w-5 h-5 text-primary-dark" />
                Home
              </button>
              <button className="flex items-center gap-sm px-lg py-sm w-full text-sm text-gray-700 hover:bg-primary-lighter/60 transition cursor-pointer">
                <User className="w-5 h-5 text-primary-dark" />
                Profile
              </button>
              <button className="flex items-center gap-sm px-lg py-sm w-full text-sm text-gray-700 hover:bg-primary-lighter/60 transition cursor-pointer">
                <Users className="w-5 h-5 text-primary-dark" />
                Users
              </button>
            </div>

            <div className="border-t border-gray-200">
              <button className="flex items-center justify-center px-lg py-md w-full text-sm text-error font-medium hover:bg-error-lighter transition cursor-pointer">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default UserMenu;
