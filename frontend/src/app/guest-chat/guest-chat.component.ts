import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Pin, Trash2, LogIn, Menu, Send, Globe, Lock, Copy, Share2, Volume2, RotateCcw, Pencil } from 'lucide-angular';
import { LandingComponent } from '../pages/landing/landing.component';
import { App } from '../app';
import { RagService } from '../services/rag.service';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  timestamp?: string;
  typing?: boolean;
  editing?: boolean;
  editText?: string;
  speaking?: boolean;
}

interface Chat {
  chat_id: string;
  title: string;
  messages: Message[];
  pinned?: boolean;
  showOptions?: boolean;
}

@Component({
  selector: 'app-guest-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './guest-chat.component.html',
  styleUrls: ['./guest-chat.component.css']
})
export class GuestChatComponent implements OnInit {
  chats: Chat[] = [];
  pinnedChats: Chat[] = [];
  otherChats: Chat[] = [];
  currentChat: Chat | null = null;
  newMessage: string = '';
  icons = { Pin, Trash2, LogIn, Menu, Send, Globe, Lock, Copy, Share2, Volume2, RotateCcw, Pencil };

  showDeleteModal: boolean = false;
  chatToDelete: Chat | null = null;

  pinnedCollapsed: boolean = false;
  otherCollapsed: boolean = false;

  showLimitModal: boolean = false;
  isPanelOpen: boolean = false;
  panelType: 'contact' | 'about' | null = null;
  sidebarOpen: boolean = true;

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild(LandingComponent) landingComponent!: LandingComponent;

  constructor(
    private router: Router,
    private app: App,
    private ragService: RagService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.app.setFooterVisibility(false);
    this.loadChats();

    document.addEventListener('click', () => {
      this.chats.forEach(chat => (chat.showOptions = false));
    });
  }

  // ─── Navigation ───────────────────────────────────────────────────────────

  goToSignIn() {
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // ─── Sidebar / Chat Management ────────────────────────────────────────────

  toggleOptions(chat: Chat, event: MouseEvent) {
    event.stopPropagation();
    this.chats.forEach(c => {
      if (c.chat_id !== chat.chat_id) c.showOptions = false;
    });
    chat.showOptions = !chat.showOptions;
  }

  togglePin(chat: Chat) {
    chat.pinned = !chat.pinned;
    this.updateChatSections();
    chat.showOptions = false;
  }

  togglePinned() { this.pinnedCollapsed = !this.pinnedCollapsed; }
  toggleOther() { this.otherCollapsed = !this.otherCollapsed; }

  loadChats() {
    if (this.chats.length === 0) {
      this.createNewChat(false);
    } else {
      this.updateChatSections();
    }
  }

  updateChatSections() {
    this.pinnedChats = this.chats.filter(c => c.pinned);
    this.otherChats = this.chats.filter(c => !c.pinned);
  }

  createNewChat(addToSidebar = true) {
    const newChat: Chat = {
      chat_id: 'chat-' + Date.now(),
      title: 'New Chat',
      messages: []
    };

    if (addToSidebar) {
      this.chats = [newChat, ...this.chats];
      this.updateChatSections();
    }

    this.currentChat = newChat;
    this.addAIMessage(
    this.currentChat,
    "Hello there! I'm Polyconomy, an AI trained on economics research and literature.\n\nI can help explain concepts, discuss theories, and explore economic ideas.\n\nPlease note, I provide information for understanding only and cannot offer personalised financial advice.\n\nThink of me as a guide to economic knowledge, not a decision-maker."
  );
  }

  selectChat(chat: Chat) {
    this.currentChat = chat;
    setTimeout(() => this.scrollToBottom(), 50);
  }

  deleteChat(chat: Chat) {
    this.chatToDelete = chat;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.chatToDelete = null;
    this.showDeleteModal = false;
  }

  confirmDeleteChat() {
    if (!this.chatToDelete) return;
    this.chats = this.chats.filter(c => c.chat_id !== this.chatToDelete!.chat_id);
    this.updateChatSections();
    if (this.currentChat?.chat_id === this.chatToDelete?.chat_id) {
      this.currentChat = this.chats.length > 0 ? this.chats[0] : null;
    }
    this.closeDeleteModal();
  }

  // ─── Panels ───────────────────────────────────────────────────────────────

  openPanel(type: 'contact' | 'about') {
    this.panelType = type;
    this.isPanelOpen = true;
  }

  closePanel() {
    this.isPanelOpen = false;
    setTimeout(() => { this.panelType = null; }, 300);
  }

  // ─── Limit Modal ──────────────────────────────────────────────────────────

  closeLimitModal() {
    this.showLimitModal = false;
  }

  // ─── Messaging ────────────────────────────────────────────────────────────

  async sendMessage() {
    if (!this.newMessage.trim() || !this.currentChat) return;

    const userMsgCount = this.currentChat.messages.filter(m => m.sender === 'user').length;
    if (userMsgCount >= 5) {
      this.showLimitModal = true;
      return;
    }

    const text = this.newMessage;
    this.currentChat.messages.push({ text, sender: 'user', timestamp: new Date().toISOString() });
    this.newMessage = '';
    this.askRag(text);
  }

  /**
   * Sends a question to the RAG service and appends the reply. Kept separate
   * from sendMessage so "Try again" and "Edit" can regenerate a response
   * without adding another user bubble.
   */
  async askRag(text: string) {
    if (!this.currentChat) return;
    this.scrollToBottom();

    const typingMessage: Message = { text: 'Typing...', sender: 'ai', typing: true };
    this.currentChat.messages.push(typingMessage);
    this.cdr.markForCheck();
    this.scrollToBottom();

    // Single detect call gives us the language AND the English translation for free
    const { lang: langToUse, translatedToEn } = await this.detectLanguage(text);
    console.log('[askRag] lang:', langToUse, '| query to RAG:', translatedToEn);

    this.ragService.queryRag(translatedToEn).subscribe({
      next: async (res) => {
        const index = this.currentChat!.messages.indexOf(typingMessage);
        if (index > -1) this.currentChat!.messages.splice(index, 1);

        let aiResponse = res.response;
        if (langToUse !== 'en') {
          aiResponse = await this.translateText(aiResponse, langToUse);
        }

        this.addAIMessage(this.currentChat!, aiResponse);
      },
      error: async (err) => {
        const index = this.currentChat!.messages.indexOf(typingMessage);
        if (index > -1) this.currentChat!.messages.splice(index, 1);

        let errorMsg = 'Sorry, something went wrong.';
        if (langToUse !== 'en') {
          errorMsg = await this.translateText(errorMsg, langToUse);
        }

        this.addAIMessage(this.currentChat!, errorMsg);
        console.error('[askRag] RAG error:', err);
      }
    });
  }

  // ─── Message actions (copy / share / read-aloud / edit / try-again) ────────

  copyMessage(text: string) {
    navigator.clipboard?.writeText(text).catch(() => {});
  }

  async shareMessage(text: string) {
    if (typeof navigator !== 'undefined' && (navigator as any).share) {
      try {
        await (navigator as any).share({ title: 'Polyconomy', text });
      } catch { /* user cancelled */ }
    } else {
      this.copyMessage(text);
    }
  }

  toggleReadAloud(msg: Message) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (msg.speaking) {
      window.speechSynthesis.cancel();
      msg.speaking = false;
      return;
    }
    window.speechSynthesis.cancel();
    this.currentChat?.messages.forEach(m => (m.speaking = false));
    const utter = new SpeechSynthesisUtterance(msg.text);
    utter.onend = () => {
      msg.speaking = false;
      this.cdr.markForCheck();
    };
    msg.speaking = true;
    window.speechSynthesis.speak(utter);
  }

  tryAgain(index: number) {
    if (!this.currentChat) return;
    const userMsg = this.currentChat.messages[index - 1];
    if (!userMsg || userMsg.sender !== 'user') return;
    // Drop the old AI reply (and anything after it) then regenerate.
    this.currentChat.messages = this.currentChat.messages.slice(0, index);
    this.askRag(userMsg.text);
  }

  startEdit(msg: Message) {
    msg.editText = msg.text;
    msg.editing = true;
  }

  cancelEdit(msg: Message) {
    msg.editing = false;
  }

  saveEdit(msg: Message, index: number) {
    if (!this.currentChat) return;
    const newText = (msg.editText ?? '').trim();
    if (!newText) return;
    msg.text = newText;
    msg.editing = false;
    msg.timestamp = new Date().toISOString();
    // Keep messages up to and including the edited question, then regenerate.
    this.currentChat.messages = this.currentChat.messages.slice(0, index + 1);
    this.askRag(newText);
  }

  addAIMessage(chat: Chat, text: string) {
    const aiMessage: Message = { text, sender: 'ai', timestamp: new Date().toISOString() };
    chat.messages.push(aiMessage);
    // App runs zoneless, so async updates (RAG response / error) must
    // explicitly notify Angular to re-render the message list.
    this.cdr.markForCheck();
    this.scrollToBottom();
  }

  // ─── Language Detection & Translation ────────────────────────────────────

  /**
   * Detects the language of the input text.
   * Also extracts the English translation from the same API response for free,
   * so we can send clean English queries to the RAG service without a second call.
   */
  async detectLanguage(text: string): Promise<{ lang: string; translatedToEn: string }> {
    try {
      const sample = text.trim().slice(0, 200);
      console.log('[detectLanguage] Input sample:', sample);

      if (sample.length < 3) {
        console.log('[detectLanguage] Sample too short, defaulting to en');
        return { lang: 'en', translatedToEn: text };
      }

      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(sample)}`;
      console.log('[detectLanguage] Fetching URL:', url);

      const res = await fetch(url);
      console.log('[detectLanguage] Response status:', res.status);

      if (!res.ok) {
        console.warn('[detectLanguage] Response not OK, defaulting to en');
        return { lang: 'en', translatedToEn: text };
      }

      const data = await res.json();
      console.log('[detectLanguage] Full response data:', JSON.stringify(data));
      console.log('[detectLanguage] data[2] (detected lang):', data[2]);

      const detected: string = (data[2] as string) || 'en';
      const lang = detected.split('-')[0].toLowerCase();
      console.log('[detectLanguage] Final detected lang:', lang);

      // Extract the English translation that the API already returns in data[0]
      const translatedToEn = (data[0] as any[])
        .map((segment: any) => (Array.isArray(segment) ? segment[0] : null))
        .filter((t: any): t is string => typeof t === 'string' && t.length > 0)
        .join('') || text;

      console.log('[detectLanguage] Extracted English translation:', translatedToEn);

      document.documentElement.lang = lang;
      return { lang, translatedToEn };
    } catch (err) {
      console.warn('[detectLanguage] CAUGHT ERROR:', err);
      return { lang: 'en', translatedToEn: text };
    }
  }

  /**
   * Translates text FROM English TO the target language.
   * Chunks long text to avoid URL length limits, which is especially important
   * for multi-byte scripts like Sinhala, Korean, and Japanese.
   */
  async translateText(text: string, targetLang: string): Promise<string> {
    try {
      console.log('[translateText] Called with targetLang:', targetLang);
      console.log('[translateText] Text length:', text.length);
      console.log('[translateText] Text preview:', text.slice(0, 100));

      if (!text.trim() || targetLang === 'en') {
        console.log('[translateText] Skipping — empty text or target is en');
        return text;
      }

      const chunks = this.splitTextIntoChunks(text, 1000);
      console.log('[translateText] Number of chunks:', chunks.length);

      const translatedChunks: string[] = [];

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        console.log(`[translateText] Chunk ${i} length:`, chunk.length);
        console.log(`[translateText] Chunk ${i} encoded length:`, encodeURIComponent(chunk).length);

        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(chunk)}`;
        console.log(`[translateText] Chunk ${i} URL length:`, url.length);

        const res = await fetch(url);
        console.log(`[translateText] Chunk ${i} response status:`, res.status);

        if (!res.ok) {
          console.warn(`[translateText] Chunk ${i} failed — pushing original chunk`);
          translatedChunks.push(chunk);
          continue;
        }

        const data = await res.json();
        console.log(`[translateText] Chunk ${i} raw response:`, JSON.stringify(data));
        console.log(`[translateText] Chunk ${i} data[0]:`, JSON.stringify(data[0]));

        const translated = (data[0] as any[])
          .map((segment: any, idx: number) => {
            const val = Array.isArray(segment) ? segment[0] : null;
            console.log(`[translateText] Chunk ${i} segment ${idx}:`, segment, '→ extracted:', val);
            return val;
          })
          .filter((t: any): t is string => typeof t === 'string' && t.length > 0)
          .join('');

        console.log(`[translateText] Chunk ${i} translated result:`, translated);
        translatedChunks.push(translated || chunk);
      }

      const final = translatedChunks.join('');
      console.log('[translateText] Final joined result:', final);
      return final;
    } catch (err) {
      console.warn('[translateText] CAUGHT ERROR:', err);
      return text;
    }
  }

  /**
   * Splits long text into chunks at sentence/newline boundaries
   * to avoid hitting URL length limits for multi-byte encoded scripts.
   */
  private splitTextIntoChunks(text: string, maxLength: number): string[] {
    if (text.length <= maxLength) return [text];

    const chunks: string[] = [];
    let remaining = text;

    while (remaining.length > maxLength) {
      let splitAt = remaining.lastIndexOf('\n', maxLength);
      if (splitAt === -1) splitAt = remaining.lastIndexOf('. ', maxLength);
      if (splitAt === -1) splitAt = maxLength;

      chunks.push(remaining.slice(0, splitAt + 1));
      remaining = remaining.slice(splitAt + 1);
    }

    if (remaining.length > 0) chunks.push(remaining);
    return chunks;
  }

  // ─── UI Helpers ───────────────────────────────────────────────────────────

  translate(lang: string) {
    const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event('change'));
    }
  }

  autoResize(event: any) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 50);
  }
}