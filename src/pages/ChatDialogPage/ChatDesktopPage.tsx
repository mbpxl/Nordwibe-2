import { useParams } from "react-router-dom";

import ChatList from "../ChatPage/Components/Chat/ChatList/ChatList";
import ChatDialogPage from "./ChatDialogPage";

const ChatDesktopPage = () => {
  const { companionId } = useParams<{ companionId?: string }>();

  return (
    <div className="bg-purple-background-wrap pt-2">
      <div className="max-w-[1340px] mx-auto px-2 mt-20">
        <div className="flex gap-2 h-[calc(100vh-88px)]">
          <div className="w-full max-w-[444px] flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm h-full flex flex-col overflow-hidden">
              <ChatList isDesktop={true} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm h-full flex flex-col overflow-hidden">
              {companionId ? (
                <ChatDialogPage isDesktop={true} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
                  <h3 className="text-xl font-medium mb-2">Выберите чат</h3>
                  <p className="text-gray-500 text-center">
                    Выберите диалог из списка слева, чтобы начать общение
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDesktopPage;
