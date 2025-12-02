import { useMediaQuery } from "react-responsive";
import ChatDesktopPage from "./ChatDesktopPage";
import ChatPage from "../ChatPage/ChatPage";

const ChatWrapper = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return isDesktop ? <ChatDesktopPage /> : <ChatPage />;
};

export default ChatWrapper;
