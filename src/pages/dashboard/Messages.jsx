import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { 
  MessageSquare, 
  Loader2, 
  Send,
  Paperclip,
  Image as ImageIcon,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Messages() {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  let myRoleType = 'brand';
  if (user?.role === 'creator') myRoleType = 'creator';
  if (user?.role === 'customer') myRoleType = 'customer';

  const fetchChats = async () => {
    try {
      setLoading(true);
      const res = await api.get('/messages');
      if (res.data.success) {
        setChats(res.data.data);
        if (res.data.data.length > 0) {
          setActiveChat(res.data.data[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    try {
      setSending(true);
      const res = await api.post(`/messages/${activeChat.chatId}`, { text: newMessage });
      if (res.data.success) {
        // Update local state
        const updatedChat = res.data.data;
        setActiveChat(updatedChat);
        setChats(prev => prev.map(c => c.chatId === updatedChat.chatId ? updatedChat : c));
        setNewMessage('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const getChatPartnerName = (chat) => {
    if (user?.role === 'brand_owner') {
      return chat.participants.creatorName || chat.participants.customerName;
    }
    return chat.participants.brandName;
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] text-slate-600 bg-[#FAFAFA]">
        <Loader2 className="size-10 animate-spin text-primary mb-6" />
        <p className="text-sm tracking-widest uppercase font-bold text-slate-500">Loading Conversations...</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] min-h-[600px] bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col md:flex-row">
      
      {/* Sidebar: Contacts */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50/50 flex flex-col">
        <div className="p-6 border-b border-slate-200 bg-white">
          <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="size-5 text-primary" />
            Messages
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {chats.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No active conversations.
            </div>
          ) : (
            chats.map(chat => {
              const lastMessage = chat.messages[chat.messages.length - 1];
              const isActive = activeChat?.chatId === chat.chatId;
              
              return (
                <div 
                  key={chat.chatId} 
                  onClick={() => setActiveChat(chat)}
                  className={`p-4 border-b border-slate-100 cursor-pointer transition-colors hover:bg-slate-100 ${isActive ? 'bg-white border-l-4 border-l-primary' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-900 text-sm truncate pr-2">{getChatPartnerName(chat)}</h4>
                    {lastMessage && (
                      <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">
                        {new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                  {lastMessage && (
                    <p className={`text-xs truncate ${isActive ? 'text-slate-600' : 'text-slate-500'}`}>
                      {lastMessage.sender === myRoleType ? 'You: ' : ''}
                      {lastMessage.text}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white h-full">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-5 border-b border-slate-200 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-bold font-heading">
                  {getChatPartnerName(activeChat).charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{getChatPartnerName(activeChat)}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active</span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <MoreVertical className="size-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
              {activeChat.messages.map((msg, idx) => {
                const isMine = msg.sender === myRoleType;
                return (
                  <div key={idx} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                      isMine 
                        ? 'bg-slate-900 text-white rounded-br-none shadow-md' 
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <div className={`text-[9px] mt-2 font-medium ${isMine ? 'text-white/60 text-right' : 'text-slate-400 text-left'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {isMine && <CheckCircle2 className="inline size-3 ml-1" />}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition-colors shrink-0">
                  <Paperclip className="size-5" />
                </button>
                <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition-colors shrink-0">
                  <ImageIcon className="size-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-100 border-none rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                />
                <Button 
                  type="submit" 
                  disabled={!newMessage.trim() || sending}
                  className="rounded-full w-12 h-12 p-0 flex items-center justify-center bg-primary hover:bg-primary/90 text-white shadow-md shrink-0"
                >
                  <Send className="size-5 ml-1" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <MessageSquare className="size-16 mb-4 opacity-20" />
            <p className="font-medium">Select a conversation to start messaging</p>
          </div>
        )}
      </div>

    </div>
  );
}
