import { forwardRef } from "react";
import { Bell, BellDot, Mail } from "lucide-react";
import { _notifications } from "@/_mock";

type Props = {
  open: boolean;
  onToggle: () => void;
};

const NotificationsDropdown = forwardRef<HTMLDivElement, Props>(
  ({ open, onToggle }, ref) => {
    const unreadCount = _notifications.filter((n) => n.isUnRead).length;

    return (
      <div className="relative" ref={ref}>
        <button
          onClick={onToggle}
          className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 transition relative"
        >
          <Bell className="w-6 h-6 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-error text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
              {unreadCount}
            </span>
          )}
        </button>

        {open && (
          <div
            className="fixed inset-0 z-[45] bg-black/10 md:hidden"
            onClick={onToggle}
          />
        )}

        {open && (
          <div
            id="notify-panel"
            className={`fixed inset-x-3 top-[4.5rem] z-[50] w-auto rounded-2xl
          md:absolute md:inset-auto md:right-0 md:top-auto md:mt-sm md:w-96 md:rounded-xl
          bg-white border border-gray-200 shadow-xl overflow-hidden`}
            role="dialog"
          >
            <div className="flex items-center justify-between px-md py-sm bg-gray-50">
              <div>
                <h3 className="font-semibold text-primary-dark">
                  Notifications
                </h3>
                <p className="text-xs text-gray-500">
                  You have {unreadCount} unread messages
                </p>
              </div>
              <button className="text-xs text-primary hover:underline">
                Mark all as read
              </button>
            </div>

            <div className="overflow-y-auto max-h-[60vh] md:max-h-[28rem]">
              <div className="px-md py-xs text-xs font-semibold text-gray-500 bg-gray-50">
                NEW
              </div>
              <div className="space-y-sm">
                {_notifications
                  .filter((n) => n.isUnRead)
                  .map((n) => (
                    <div
                      key={n.id}
                      className="flex items-start gap-md px-md py-sm hover:bg-gray-50 transition"
                    >
                      {n.avatarUrl ? (
                        <img
                          src={n.avatarUrl}
                          alt={n.title}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-lighter text-primary">
                          <Mail className="w-4 h-4" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {n.title}{" "}
                          <span className="text-xs font-normal text-gray-500">
                            {n.description}
                          </span>
                        </p>
                        <span className="text-xs text-gray-400">
                          {n.postedAt}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-md px-md py-xs text-xs font-semibold text-gray-500 bg-gray-50">
                BEFORE THAT
              </div>

              <div className="space-y-sm">
                {_notifications
                  .filter((n) => !n.isUnRead)
                  .map((n) => (
                    <div
                      key={n.id}
                      className="flex items-start gap-md px-md py-sm hover:bg-gray-50 transition"
                    >
                      {n.avatarUrl ? (
                        <img
                          src={n.avatarUrl}
                          alt={n.title}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">
                          <BellDot className="w-4 h-4" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {n.title}{" "}
                          <span className="text-xs font-normal text-gray-500">
                            {n.description}
                          </span>
                        </p>
                        <span className="text-xs text-gray-400">
                          {n.postedAt}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="px-md py-sm text-center bg-gray-50">
              <button className="text-sm text-primary hover:underline">
                View all
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default NotificationsDropdown;
